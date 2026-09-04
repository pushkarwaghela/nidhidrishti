import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Work(Base):
    __tablename__ = "works"

    id = Column(Integer, primary_key=True, index=True)
    work_id = Column(String, unique=True, index=True, nullable=False)
    work_name = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    mp_name = Column(String, index=True, nullable=False)
    house = Column(String, nullable=False)
    constituency = Column(String, nullable=False)
    nodal_district = Column(String, index=True, nullable=False)
    state = Column(String, index=True, nullable=False)
    sanctioned_amount = Column(Float, nullable=False)
    actual_expenditure = Column(Float, nullable=False)
    contractor_name = Column(String, index=True, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    sanction_date = Column(String, nullable=False)
    completion_date = Column(String, nullable=False)
    execution_days = Column(Integer, nullable=False)
    status = Column(String, nullable=False)
    is_augmented_case = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    anomalies = relationship("Anomaly", back_populates="work", cascade="all, delete-orphan")

class Anomaly(Base):
    __tablename__ = "anomalies"

    id = Column(Integer, primary_key=True, index=True)
    work_id = Column(String, ForeignKey("works.work_id", ondelete="CASCADE"), nullable=False, index=True)
    risk_score = Column(Float, nullable=False, index=True) # 0 to 100
    severity = Column(String, nullable=False, index=True) # Critical, Warning, Low
    primary_trigger = Column(String, nullable=False) # Outlier, Duplicate, Concentration, FastExecution
    explainability_json = Column(Text, nullable=False) # Detailed breakdown JSON string
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    work = relationship("Work", back_populates="anomalies")

class Contractor(Base):
    __tablename__ = "contractors"

    id = Column(Integer, primary_key=True, index=True)
    contractor_name = Column(String, unique=True, index=True, nullable=False)
    total_works = Column(Integer, default=0)
    total_sanctioned_amount = Column(Float, default=0.0)
    districts_count = Column(Integer, default=0)
    mp_count = Column(Integer, default=0)
    hhi_score = Column(Float, default=0.0) # Herfindahl-Hirschman Index in assigned districts
    is_high_risk = Column(Boolean, default=False)

class DataQualityLog(Base):
    __tablename__ = "data_quality_logs"

    id = Column(Integer, primary_key=True, index=True)
    work_id = Column(String, nullable=True)
    issue_type = Column(String, nullable=False) # EntityResolution, MissingField, UnitCorrection, OutOfBounds
    field_name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    action_taken = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
