from fastapi import APIRouter, HTTPException
from models import EmergencyCreate, EmergencyOut
from db import emergencies_collection
from bson import ObjectId

router = APIRouter()

@router.post("/new", response_model)
async def create_emergency(emergency):
    record = emergency.dict()
    result = await emergencies_collection.insert_one(record)
    return {**record, "id": str(result.inserted_id)}

@router.get("/list", response_model)
async def list_emergencies():
    cursor = emergencies_collection.find()
    emergencies = await cursor.to_list(length=100)
    return [{**e, "id": str(e["_id"])} for e in emergencies]

@router.get("/{id}", response_model)
async def get_emergency(id: str):
    emergency = await emergencies_collection.find_one({"_id": ObjectId(id)})
    if not emergency:
        raise HTTPException(status_code=404, detail="Emergency not found")
    return {**emergency, "id": str(emergency["_id"])}

@router.delete("/{id}/delete")
async def delete_emergency(id: str):
    result = await emergencies_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Emergency not found")
    return {"status": "deleted"}
