from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import uvicorn
import os
from dotenv import load_dotenv
from main import gpt3_logs, main

app = FastAPI()

load_dotenv(".env")
secret_key_from_env = os.environ.get("SECRET_KEY")

app.add_middleware(
    SessionMiddleware,
    secret_key = secret_key_from_env
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def home():
    return "Hit from Hive Bot"

@app.get("/api/response")
async def get_response(message: str, request: Request):
    chat_log = request.session.get('chat_log')
    print(chat_log,'chaaaat')
    print(message,'asdfadsfsdfdsf')
    # if(chat_log == None):
    #     request.session['chat_log'] = gpt3_logs('', '', chat_log)
    #     chat_log = request.session.get('chat_log')
    response =  main(message,chat_log)
    if(len(response)!=0):
        request.session['chat_log'] = gpt3_logs(message, response, chat_log)
        return response
    else: 
        return "Oops! Something went wrong"

if __name__ == "__main__":
    uvicorn.run("app:app", port=8001, reload=True)