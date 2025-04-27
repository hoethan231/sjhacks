from fastapi import FastAPI
from routes import emergency, search

app = FastAPI()

app.include_router(emergency.router, prefix="/routes/emergency")
app.include_router(search.router, prefix="/routes/search")
