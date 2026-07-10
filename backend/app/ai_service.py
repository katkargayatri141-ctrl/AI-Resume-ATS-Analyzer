from google import genai
import json
from app.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def analyze_resume(resume_text: str):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Analyze the following resume.

Return ONLY valid JSON.

JSON format:

{{
    "ats_score": number,
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "suggestions": []
}}

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    return json.loads(text)