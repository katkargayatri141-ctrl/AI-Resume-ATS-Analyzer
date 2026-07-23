from google import genai
import json
from app.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def analyze_resume(resume_text: str):

    prompt = f"""
You are an Expert ATS Resume Reviewer.

Analyze the following resume like a professional recruiter.

Return ONLY valid JSON.

{{
  "ats_score": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "suggestions": []
}}

Rules:
- ATS score should be between 0 and 100.
- Give a professional summary.
- Mention at least 3 strengths.
- Mention at least 3 weaknesses.
- Mention important missing skills.
- Give practical suggestions for improvement.

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

    try:
        return json.loads(text)

    except Exception:

        return {
            "ats_score": 0,
            "summary": "Unable to analyze the resume.",
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "suggestions": [
                "Please upload a valid resume."
            ]
        }