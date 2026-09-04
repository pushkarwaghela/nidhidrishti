import datetime  # <-- ADD THIS LINE
import json
import asyncio
from typing import Optional, List
from fastapi import FastAPI, Depends, Query, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
import asyncio           # <-- ADD THIS TOO (for WebSocket)

from database import engine, Base, get_db
from models import Work, Anomaly, Contractor, DataQualityLog
from ingest import run_ingestion
from ml.run_ml_pipeline import run_full_ml_pipeline
from ml.contractor_network import analyze_contractor_network

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NidhiDrishti API",
    description="AI-Powered Anomaly, Fraud & Inefficiency Detection System for MPLAD Scheme (MoSPI - SIH26102)",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket Connection Manager for Live Alert Streaming
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                pass

manager = ConnectionManager()

@app.get("/")
def read_root():
    return {
        "status": "online",
        "system": "NidhiDrishti Anomaly & Fraud Engine",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/overview")
def get_overview(db: Session = Depends(get_db)):
    total_works = db.query(Work).count()
    total_sanctioned = db.query(func.sum(Work.sanctioned_amount)).scalar() or 0.0
    total_expenditure = db.query(func.sum(Work.actual_expenditure)).scalar() or 0.0

    critical_anomalies = db.query(Anomaly).filter(Anomaly.severity == "Critical").count()
    warning_anomalies = db.query(Anomaly).filter(Anomaly.severity == "Warning").count()
    moderate_anomalies = db.query(Anomaly).filter(Anomaly.severity == "Moderate").count()
    low_anomalies = db.query(Anomaly).filter(Anomaly.severity == "Low").count()

    flagged_works_count = critical_anomalies + warning_anomalies

    # Sum of sanctioned amount for flagged works
    flagged_sanctioned = db.query(func.sum(Work.sanctioned_amount))\
        .join(Anomaly, Work.work_id == Anomaly.work_id)\
        .filter(Anomaly.severity.in_(["Critical", "Warning"]))\
        .scalar() or 0.0

    # Data quality stats
    total_quality_logs = db.query(DataQualityLog).count()

    # Category breakdown
    category_counts = db.query(Work.category, func.count(Work.id))\
        .group_by(Work.category).all()

    # State breakdown
    state_anomalies = db.query(Work.state, func.count(Anomaly.id))\
        .join(Anomaly, Work.work_id == Anomaly.work_id)\
        .filter(Anomaly.severity.in_(["Critical", "Warning"]))\
        .group_by(Work.state).all()

    return {
        "kpis": {
            "total_works": total_works,
            "total_sanctioned_amount": total_sanctioned,
            "total_expenditure": total_expenditure,
            "flagged_works_count": flagged_works_count,
            "flagged_sanctioned_amount": flagged_sanctioned,
            "critical_anomalies_count": critical_anomalies,
            "warning_anomalies_count": warning_anomalies,
            "data_quality_issues": total_quality_logs
        },
        "severity_distribution": {
            "Critical": critical_anomalies,
            "Warning": warning_anomalies,
            "Moderate": moderate_anomalies,
            "Low": low_anomalies
        },
        "categories": [{"category": c[0], "count": c[1]} for c in category_counts],
        "state_risk_distribution": [{"state": s[0], "flagged_count": s[1]} for s in state_anomalies]
    }

@app.get("/api/works")
def get_works(
    search: Optional[str] = None,
    category: Optional[str] = None,
    severity: Optional[str] = None,
    district: Optional[str] = None,
    limit: int = 100,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    query = db.query(Work, Anomaly).outerjoin(Anomaly, Work.work_id == Anomaly.work_id)

    if search:
        s_pattern = f"%{search}%"
        query = query.filter(
            Work.work_name.ilike(s_pattern) |
            Work.work_id.ilike(s_pattern) |
            Work.mp_name.ilike(s_pattern) |
            Work.contractor_name.ilike(s_pattern)
        )

    if category:
        query = query.filter(Work.category == category)

    if district:
        query = query.filter(Work.nodal_district == district)

    if severity:
        query = query.filter(Anomaly.severity == severity)

    total_records = query.count()
    results = query.order_by(Anomaly.risk_score.desc().nullslast()).offset(offset).limit(limit).all()

    works_data = []
    for w, a in results:
        works_data.append({
            "work_id": w.work_id,
            "work_name": w.work_name,
            "category": w.category,
            "mp_name": w.mp_name,
            "house": w.house,
            "constituency": w.constituency,
            "nodal_district": w.nodal_district,
            "state": w.state,
            "sanctioned_amount": w.sanctioned_amount,
            "actual_expenditure": w.actual_expenditure,
            "contractor_name": w.contractor_name,
            "latitude": w.latitude,
            "longitude": w.longitude,
            "sanction_date": w.sanction_date,
            "completion_date": w.completion_date,
            "execution_days": w.execution_days,
            "status": w.status,
            "risk_score": a.risk_score if a else 0.0,
            "severity": a.severity if a else "Low",
            "primary_trigger": a.primary_trigger if a else "None"
        })

    return {
        "total": total_records,
        "offset": offset,
        "limit": limit,
        "works": works_data
    }

@app.get("/api/anomalies")
def get_anomalies(
    severity: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    query = db.query(Anomaly, Work).join(Work, Anomaly.work_id == Work.work_id)

    if severity:
        query = query.filter(Anomaly.severity == severity)

    total = query.count()
    results = query.order_by(Anomaly.risk_score.desc()).offset(offset).limit(limit).all()

    anomalies_list = []
    for a, w in results:
        explain_payload = json.loads(a.explainability_json) if a.explainability_json else {}
        anomalies_list.append({
            "anomaly_id": a.id,
            "work_id": a.work_id,
            "work_name": w.work_name,
            "category": w.category,
            "mp_name": w.mp_name,
            "nodal_district": w.nodal_district,
            "state": w.state,
            "sanctioned_amount": w.sanctioned_amount,
            "contractor_name": w.contractor_name,
            "latitude": w.latitude,
            "longitude": w.longitude,
            "risk_score": a.risk_score,
            "severity": a.severity,
            "primary_trigger": a.primary_trigger,
            "summary_headline": explain_payload.get("summary_headline", ""),
            "explanations": explain_payload.get("explanations", []),
            "signals": explain_payload.get("signals", [])
        })

    return {"total": total, "anomalies": anomalies_list}

@app.get("/api/anomalies/{work_id}/explain")
def get_anomaly_explainability(work_id: str, db: Session = Depends(get_db)):
    anomaly = db.query(Anomaly).filter(Anomaly.work_id == work_id).first()
    if not anomaly:
        # Fallback query work details
        work = db.query(Work).filter(Work.work_id == work_id).first()
        if not work:
            raise HTTPException(status_code=404, detail="Work record not found")
        return {
            "work_id": work.work_id,
            "work_name": work.work_name,
            "risk_score": 0.0,
            "severity": "Low",
            "summary_headline": "No anomaly flags detected for this work",
            "explanations": ["Work execution is within expected category metrics."],
            "signals": []
        }

    return json.loads(anomaly.explainability_json)

@app.get("/api/contractors/graph")
def get_contractor_graph(db: Session = Depends(get_db)):
    works = db.query(Work).all()
    contractor_metrics, graph_json = analyze_contractor_network(works)

    top_contractors = db.query(Contractor).order_by(Contractor.total_sanctioned_amount.desc()).all()
    contractors_summary = []
    for c in top_contractors:
        metrics = contractor_metrics.get(c.contractor_name, {})
        contractors_summary.append({
            "contractor_name": c.contractor_name,
            "total_works": c.total_works,
            "total_sanctioned_amount": c.total_sanctioned_amount,
            "districts_count": c.districts_count,
            "mp_count": c.mp_count,
            "dominant_district": metrics.get("dominant_district", ""),
            "max_district_share_pct": metrics.get("max_district_share_pct", 0.0),
            "hhi_score": metrics.get("district_hhi", 0.0),
            "is_monopoly_risk": metrics.get("is_monopoly_risk", False)
        })

    return {
        "graph": graph_json,
        "contractors_summary": contractors_summary
    }

@app.get("/api/data-quality")
def get_data_quality_report(db: Session = Depends(get_db)):
    logs = db.query(DataQualityLog).order_by(DataQualityLog.created_at.desc()).all()
    issue_type_counts = db.query(DataQualityLog.issue_type, func.count(DataQualityLog.id))\
        .group_by(DataQualityLog.issue_type).all()

    return {
        "total_issues_logged": len(logs),
        "breakdown": [{"issue_type": i[0], "count": i[1]} for i in issue_type_counts],
        "logs": [
            {
                "id": l.id,
                "work_id": l.work_id,
                "issue_type": l.issue_type,
                "field_name": l.field_name,
                "description": l.description,
                "action_taken": l.action_taken,
                "created_at": l.created_at.isoformat()
            }
            for l in logs[:100]
        ]
    }

@app.post("/api/pipeline/run")
async def trigger_pipeline_execution():
    ingest_res = run_ingestion()
    ml_res = run_full_ml_pipeline()

    broadcast_msg = json.dumps({
        "event": "PIPELINE_REEXECUTION_COMPLETE",
        "timestamp": json.dumps(datetime.datetime.utcnow().isoformat()),
        "ingested_works": ingest_res["works_count"],
        "flagged_anomalies": ml_res["flagged_anomalies"]
    })
    await manager.broadcast(broadcast_msg)

    return {
        "status": "success",
        "ingestion": ingest_res,
        "ml_pipeline": ml_res
    }

@app.websocket("/ws/alerts")
async def websocket_alerts(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
