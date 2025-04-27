from fastapi import APIRouter, HTTPException
from models import EmergencyCreate, EmergencyOut
from db import emergency_tb
from bson import ObjectId

emergency_router = APIRouter(prefix="/emergencies", tags=["emergencies"])

@emergency_router.post("/new", response_model=EmergencyOut)
async def create_emergency(emergency: EmergencyCreate):
    record = emergency.dict()
    result = await emergency_tb.insert_one(record)
    return {**record, "id": str(result.inserted_id)}

@emergency_router.get("/list", response_model=list[EmergencyOut])
async def list_emergencies():
    cursor = emergency_tb.find()
    emergencies = await cursor.to_list(length=100)
    return [{**e, "id": str(e["_id"])} for e in emergencies]

@emergency_router.get("/{id}", response_model=EmergencyOut)
async def get_emergency(id: str):
    emergency = await emergency_tb.find_one({"_id": ObjectId(id)})
    if not emergency:
        raise HTTPException(status_code=404, detail="Emergency not found")
    return {**emergency, "id": str(emergency["_id"])}

@emergency_router.delete("/{id}/delete")
async def delete_emergency(id: str):
    result = await emergency_tb.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Emergency not found")
    return {"status": "deleted"}

