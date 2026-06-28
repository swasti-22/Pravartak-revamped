import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client, Client
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = FastAPI(title="Pravartak V2 API", version="2.0.0")

# CORS middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Initialization
supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_KEY", "")

supabase_client: Client = None
if supabase_url and supabase_key:
    try:
        supabase_client = create_client(supabase_url, supabase_key)
    except Exception as e:
        print(f"Failed to initialize Supabase client: {e}")

# Gemini AI Initialization
gemini_key = os.getenv("GEMINI_API_KEY", "")
if gemini_key:
    genai.configure(api_key=gemini_key)

# Mock fallback database for offline / credential-free test environments
MOCK_PROCESSES = {
    "driving-licence": {
        "id": "driving-licence",
        "name": {
            "en": "Driving Licence Renewal",
            "hi": "ड्राइविंग लाइसेंस नवीनीकरण",
            "gu": "ડ્રાઇવિંગ લાયસન્સ રિન્યુઅલ"
        },
        "category": "license",
        "trustScore": 97,
        "trustFactors": {
            "officialAlignment": 100,
            "successRate": 94,
            "activeAlerts": 0
        },
        "alerts": [],
        "requiredDocuments": [
            "Expired Driving Licence",
            "Form 1-A Medical Certificate (if applicant is over 40 years)",
            "Form 2 Application Form",
            "Proof of Address (Aadhaar, Passport, or Utility bill)",
            "Three passport-sized photographs"
        ],
        "steps": [
            {
                "id": "dl-step-1",
                "number": 1,
                "title": "Aadhaar authentication & Form 1-A",
                "description": "Log in to the Sarathi portal, select your state, and authenticate using Aadhaar. If you are over 40 years of age, you must download Form 1-A and obtain a signature from a registered government doctor.",
                "type": "hybrid",
                "duration": "1-2 days",
                "cost": "Doctor fee (varies, approx. ₹100-200)",
                "authority": "Ministry of Road Transport and Highways (MoRTH)",
                "link": "https://sarathi.parivahan.gov.in/"
            },
            {
                "id": "dl-step-2",
                "number": 2,
                "title": "Submit application on Sarathi",
                "description": "Upload scanned copies of the expired DL, address proof, and signed Form 1-A. Fill in your current address details and verify that all information aligns with your Aadhaar card.",
                "type": "online",
                "duration": "30 minutes",
                "cost": "₹200 (Renewal fee) + ₹200 (Smart card fee)",
                "authority": "State Transport Department / RTO",
                "link": "https://sarathi.parivahan.gov.in/"
            },
            {
                "id": "dl-step-3",
                "number": 3,
                "title": "RTO Approval & Dispatch",
                "description": "The RTO official reviews the uploaded documents. Once verified, the renewal is approved in the system, and your physical Smart Card Driving Licence is dispatched via Speed Post.",
                "type": "physical",
                "duration": "10-15 days",
                "cost": "Included in submission fee",
                "authority": "Regional Transport Office (RTO)",
                "link": "https://sarathi.parivahan.gov.in/"
            }
        ],
        "communityTips": [
            "Choose Aadhaar authentication to bypass visiting the RTO physically.",
            "Make sure your doctor uploads Form 1-A digitally to the portal directly, or has registered their credentials.",
            "Carry a physical printout of the payment receipt if you must visit an RTO desk for verification."
        ],
        "faqs": [
            {
                "question": "Can I renew my DL if it expired more than a year ago?",
                "answer": "Yes, but if it has been expired for more than a year, you may need to undergo the learner's test again."
            },
            {
                "question": "Is the digital DL on DigiLocker legally valid?",
                "answer": "Yes. Under Rule 139 of the Central Motor Vehicles Rules, 1989, digital documents on DigiLocker are valid at par with physical copies."
            }
        ]
    }
}

class SearchPayload(BaseModel):
    query: str
    language: str = "en"

class SavePayload(BaseModel):
    userId: str
    processIds: list[str]

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "supabase": "connected" if supabase_client else "placeholder",
        "gemini": "configured" if gemini_key else "fallback-mode"
    }

@app.get("/api/saved")
def get_saved_roadmaps(userId: str):
    if not supabase_client:
        return {"processIds": ["driving-licence"]}
    
    try:
        response = supabase_client.table("saved_roadmaps").select("process_ids").eq("user_id", userId).execute()
        if response.data and len(response.data) > 0:
            return {"processIds": response.data[0]["process_ids"]}
        return {"processIds": []}
    except Exception as e:
        print(f"Error querying saved roadmaps: {e}")
        return {"processIds": []}

@app.post("/api/save")
def save_roadmaps(payload: SavePayload):
    if not supabase_client:
        return {"status": "success", "message": "Demo mode: simulation successful"}
    
    try:
        data = {
            "user_id": payload.userId,
            "process_ids": payload.processIds
        }
        supabase_client.table("saved_roadmaps").upsert(data).execute()
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save roadmaps: {str(e)}")

@app.post("/api/search")
def generate_roadmap(payload: SearchPayload):
    query = payload.query.strip().lower()
    
    # Pre-checks for matching mocks to optimize latency
    if "licence" in query or "license" in query or "driving" in query or "dl" in query:
        return MOCK_PROCESSES["driving-licence"]
        
    if not gemini_key:
        # Fallback to DL renewal if Gemini is offline
        return MOCK_PROCESSES["driving-licence"]

    # Construct strict schema guidance prompt
    prompt = f"""
    You are Pravartak, India's default digital companion for navigating government services. 
    Generate a comprehensive, highly reliable roadmap for the following procedure query: "{payload.query}"

    Generate a structured JSON object representing this procedure. The JSON must strictly adhere to the following schema:
    {{
      "id": "slug-style-unique-id",
      "name": {{
        "en": "Name in English",
        "hi": "Name in Hindi",
        "gu": "Name in Gujarati"
      }},
      "category": "license" | "passport" | "tax" | "identity" | "general",
      "trustScore": 95,
      "trustFactors": {{
        "officialAlignment": 98,
        "successRate": 92,
        "activeAlerts": 0
      }},
      "alerts": [
        "Include warnings about fake/unofficial duplicate sites or system outages if any exist"
      ],
      "requiredDocuments": [
        "Exact list of documents required"
      ],
      "steps": [
        {{
          "id": "step-id-1",
          "number": 1,
          "title": "Brief title",
          "description": "Explanation of actions",
          "type": "online" | "physical" | "hybrid",
          "duration": "Duration range",
          "cost": "Cost estimate, in rupees or Free",
          "authority": "Ministry or department name",
          "link": "https://official-government-website-url"
        }}
      ],
      "communityTips": [
        "Practical suggestions, browser advice, or queues updates"
      ],
      "faqs": [
        {{
          "question": "Commonly asked query",
          "answer": "Accurate, reassuring answer"
        }}
      ]
    }}

    Rules:
    - Ensure all fields are filled.
    - Translate name into en, hi, and gu.
    - Provide ONLY valid JSON. Do not write markdown backticks (e.g. do not include ```json).
    """

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Clean potential markdown wrapping if returned despite instructions
        if text.startswith("```"):
            lines = text.split("\n")
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines[-1].startswith("```"):
                lines = lines[:-1]
            text = "\n".join(lines).strip()
            
        parsed_data = json.loads(text)
        return parsed_data
    except Exception as e:
        print(f"Gemini API invocation error: {e}")
        # Secondary fallback
        return MOCK_PROCESSES["driving-licence"]
