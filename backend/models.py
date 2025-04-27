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

class CallTranscriptCreate(BaseModel):
    caller_id: Optional[str]           # ID or phone number of the caller
    operator_id: Optional[str]         # ID of the dispatcher/operator
    call_timestamp: str                # ISO format timestamp (e.g., "2024-04-27T14:30:00Z")
    raw_transcript: str                # The full text of the call
    language: Optional[str] = "en"     # Language code, default English
    tags: Optional[List[str]] = []     # Optional tags or keywords

class CallTranscriptOut(CallTranscriptCreate):
    id: str                            # MongoDB ObjectId as string