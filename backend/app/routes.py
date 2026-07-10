from fastapi import APIRouter, UploadFile, File
from app.ai_service import analyze_resume
from app.pdf_service import extract_text_from_pdf

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }


@router.post("/analyze-resume")
async def analyze(file: UploadFile = File(...)):
    pdf_bytes = await file.read()

    resume_text = extract_text_from_pdf(pdf_bytes)

    result = analyze_resume(resume_text)

    return result