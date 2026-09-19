from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from models import MPLADSWork, IngestionAuditLog, SectorMetric, ActionPayload
from data_seed import SEEDED_WORKS, SEEDED_LOGS, DASHBOARD_SUMMARY, RISK_SEVERITY_BREAKDOWN, SECTOR_ALLOCATION

app = FastAPI(
    title="NidhiDrishti API — MPLADS AI Surveillance Engine",
    description="Backend REST API for India's MPLADS Risk Monitoring and Vigilance Audit System under MoSPI.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

works_db = list(SEEDED_WORKS)
logs_db = list(SEEDED_LOGS)


def build_dashboard_snapshot():
    return {
        "summary": DASHBOARD_SUMMARY,
        "riskBreakdown": RISK_SEVERITY_BREAKDOWN,
        "sectorBreakdown": SECTOR_ALLOCATION,
        "works": [work.copy() for work in works_db],
        "auditLogs": [log.copy() for log in logs_db],
        "metadata": {
            "source": "NidhiDrishti Government Monitoring Layer",
            "lastUpdated": "2026-09-19T18:30:00+05:30",
            "visibility": "official-dashboard",
            "status": "live-simulaton"
        }
    }


@app.get("/")
def root():
    return {
        "portal": "NidhiDrishti (निधिदृष्टि)",
        "ministry": "Ministry of Statistics and Programme Implementation (MoSPI)",
        "status": "Operational",
        "version": "v1.0.0",
        "docs_url": "/docs",
        "api_health": "/api/v1/health"
    }


@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "NidhiDrishti API",
        "records": len(works_db),
        "auditLogs": len(logs_db),
        "mode": "live-simulation"
    }


@app.get("/api/v1/summary")
def get_summary_metrics():
    return DASHBOARD_SUMMARY


@app.get("/api/v1/dashboard")
def get_dashboard_snapshot():
    return build_dashboard_snapshot()


@app.get("/api/v1/works", response_model=List[MPLADSWork])
def get_works(
    sector: Optional[str] = Query(None),
    risk_level: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    results = works_db
    if sector and sector != "ALL":
        results = [w for w in results if w["sector"] == sector]
    if risk_level and risk_level != "ALL":
        results = [w for w in results if w["riskLevel"] == risk_level]
    if state and state != "ALL":
        results = [w for w in results if w["state"] == state]
    if search:
        s = search.lower()
        results = [
            w for w in results
            if s in w["id"].lower()
            or s in w["title"].lower()
            or s in w["mpName"].lower()
            or s in w["district"].lower()
            or s in w["contractor"].lower()
        ]
    return results


@app.get("/api/v1/works/{work_id}", response_model=MPLADSWork)
def get_work_by_id(work_id: str):
    for work in works_db:
        if work["id"] == work_id:
            return work
    raise HTTPException(status_code=404, detail=f"Work with ID {work_id} not found")


@app.get("/api/v1/risk-breakdown")
def get_risk_breakdown():
    return RISK_SEVERITY_BREAKDOWN


@app.get("/api/v1/sectors")
def get_sector_breakdown():
    return SECTOR_ALLOCATION


@app.post("/api/v1/actions/freeze")
def freeze_work_outlay(payload: ActionPayload):
    for work in works_db:
        if work["id"] == payload.workId:
            work["status"] = "Disbursement Frozen by Order"
            return {
                "success": True,
                "workId": payload.workId,
                "message": f"Outlay disbursement frozen for Work #{payload.workId}.",
                "officerNote": payload.officerNote
            }
    raise HTTPException(status_code=404, detail="Work not found")


@app.get("/api/v1/audit-logs", response_model=List[IngestionAuditLog])
def get_audit_logs():
    return logs_db


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
