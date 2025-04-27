from fastapi import APIRouter, HTTPException
from models import CallTranscriptCreate, CallTranscriptOut, EmergencyCreate, EmergencyOut
from db import call_tb
from bson import ObjectId

call_router = APIRouter(prefix="/calls", tags=["calls"])

@call_router.post("/", response_model=CallTranscriptOut)
async def create_call_transcript(transcript: CallTranscriptCreate):
    record = transcript.dict()
    result = await call_tb.insert_one(record)
    return {**record, "id": str(result.inserted_id)}

@call_router.get("/", response_model=list[CallTranscriptOut])
async def list_call_transcripts():
    cursor = call_tb.find()
    transcripts = await cursor.to_list(length=100)
    return [{**t, "id": str(t["_id"])} for t in transcripts]

@call_router.get("/{id}", response_model=CallTranscriptOut)
async def get_call_transcript(id: str):
    transcript = await call_tb.find_one({"_id": ObjectId(id)})
    if not transcript:
        raise HTTPException(status_code=404, detail="Transcript not found")
    return {**transcript, "id": str(transcript["_id"])}