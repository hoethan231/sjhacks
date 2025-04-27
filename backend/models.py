from pydantic import BaseModel
from typing import List, Optional

class EmergencyCreate(BaseModel):
    incident_type: str
    location: str
    severity: str
    injuries: int
    call_timestamp: str
    raw_transcript: str

class EmergencyOut(EmergencyCreate):
    id: str
