from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"
    print("[PASS] Root endpoint test")

def test_overview_endpoint():
    response = client.get("/api/overview")
    assert response.status_code == 200
    data = response.json()
    assert "kpis" in data
    assert data["kpis"]["total_works"] > 0
    print(f"[PASS] Overview API test. Total works: {data['kpis']['total_works']}, Flagged: {data['kpis']['flagged_works_count']}")

def test_anomalies_endpoint():
    response = client.get("/api/anomalies")
    assert response.status_code == 200
    data = response.json()
    assert "anomalies" in data
    assert len(data["anomalies"]) > 0
    first = data["anomalies"][0]
    print(f"[PASS] Anomalies API test. Top anomaly: {first['work_id']} - {first['primary_trigger']} ({first['risk_score']})")

def test_explain_endpoint():
    response = client.get("/api/anomalies")
    first_work_id = response.json()["anomalies"][0]["work_id"]
    explain_res = client.get(f"/api/anomalies/{first_work_id}/explain")
    assert explain_res.status_code == 200
    assert "explanations" in explain_res.json()
    print(f"[PASS] Explainability API test for {first_work_id}")

def test_contractors_graph_endpoint():
    response = client.get("/api/contractors/graph")
    assert response.status_code == 200
    data = response.json()
    assert "graph" in data
    assert "nodes" in data["graph"]
    print(f"[PASS] Contractor Graph API test. Graph nodes: {len(data['graph']['nodes'])}, links: {len(data['graph']['links'])}")

if __name__ == "__main__":
    test_root_endpoint()
    test_overview_endpoint()
    test_anomalies_endpoint()
    test_explain_endpoint()
    test_contractors_graph_endpoint()
    print("\nALL BACKEND API TESTS PASSED SUCCESSFULLY!")
