from pydantic import BaseModel
from typing import List, Optional

class ForensicFinding(BaseModel):
    rule: str
    severity: str
    detail: str

class MPLADSWork(BaseModel):
    id: str
    title: str
    sector: str
    mpName: str
    house: str
    constituency: str
    district: str
    state: str
    sanctionedAmountLakhs: float
    disbursedPercent: int
    physicalProgressPercent: int
    contractor: str
    contractorGstin: str
    riskScore: int
    riskLevel: str
    triggerReason: str
    coordinates: List[float]
    sanctionDate: str
    implementingAgency: str
    nodalOfficer: str
    disparityIndex: int
    status: str
    forensics: List[ForensicFinding]

class IngestionAuditLog(BaseModel):
    id: str
    timestamp: str
    issueCategory: str
    sourceField: str
    rawVal: str
    resolvedVal: str
    ruleApplied: str
    status: str
    confidence: str
    datasetOrigin: str

class SectorMetric(BaseModel):
    sector: str
    sanctionedCr: float
    flaggedCr: float
    share: str
    icon: str

class ActionPayload(BaseModel):
    workId: str
    actionType: str
    officerNote: Optional[str] = None
