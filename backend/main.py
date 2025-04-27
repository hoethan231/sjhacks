import uvicorn
from fastapi import FastAPI
from routes import emergency, call

app = FastAPI()

app.include_router(emergency.emergency_router)
app.include_router(call.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
