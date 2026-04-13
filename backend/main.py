from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import desc
from pydantic import BaseModel
from typing import List, Optional

import models
from database import engine, get_db

# إنشاء الجداول عند البدء
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Programmer's Journey API", description="Full Backend API for educational platform using FastAPI & MySQL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# === Pydantic Schemas ===

class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class CourseCreate(BaseModel):
    title: str
    description: str
    instructor_id: int
    image_url: Optional[str] = None

class LessonCreate(BaseModel):
    course_id: int
    title: str
    video_url: str
    content: str


class QuizQuestionCreate(BaseModel):
    course_id: int
    question_text: str
    op_a: str
    op_b: str
    op_c: str
    op_d: str
    correct_op: str


# === Routes ===

@app.get("/")
def index():
    return {"message": "✅ Backend API is ready and completely built-out!"}

# -- System Stats (For About Page) --
@app.get("/api/system/stats")
def get_system_stats(db: Session = Depends(get_db)):
    users_count = db.query(models.User).count()
    courses_count = db.query(models.Course).count()
    certs_count = db.query(models.Certificate).count()
    return {
        "status": "success",
        "stats": {
            "users": users_count,
            "courses": courses_count,
            "certificates": certs_count
        }
    }

import hashlib
import time

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

# -- Auth Routes --

@app.post("/api/register")
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="البريد الإلكتروني مسجل مسبقاً")
    
    hashed_pw = hash_password(user.password)
    new_user = models.User(name=user.name, email=user.email, password=hashed_pw, role="student", xp=0)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"status": "success", "user": {"id": new_user.id, "name": new_user.name, "email": new_user.email}}

@app.post("/api/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    hashed_pw = hash_password(user.password)
    
    # Allow login if it matches the new hashed password OR the old plain text password (for backward compatibility during testing)
    if not db_user or (db_user.password != hashed_pw and db_user.password != user.password):
        raise HTTPException(status_code=401, detail="البريد الإلكتروني أو كلمة المرور غير صحيحة")
        
    return {
        "status": "success", 
        "token": f"jwt-token-ey-{db_user.id}-{int(time.time())}", 
        "user_id": db_user.id,
        "user_name": db_user.name, 
        "role": db_user.role,
        "xp": db_user.xp
    }

# -- Leaderboard --

@app.get("/api/leaderboard")
def get_leaderboard(db: Session = Depends(get_db)):
    users = db.query(models.User).order_by(desc(models.User.xp)).limit(10).all()
    return {"status": "success", "leaderboard": [{"name": u.name, "xp": u.xp} for u in users]}

# -- Courses --

@app.get("/api/courses")
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(models.Course).all()
    return {"status": "success", "courses": courses}

@app.post("/api/courses")
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    new_course = models.Course(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return {"status": "success", "course": new_course}

@app.get("/api/courses/{course_id}")
def get_course_details(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="الكورس غير موجود")
    
    lessons = db.query(models.Lesson).filter(models.Lesson.course_id == course_id).all()
    return {"status": "success", "course": course, "lessons": lessons}

# -- Enrollments --

@app.post("/api/enroll/{student_id}/{course_id}")
def enroll_course(student_id: int, course_id: int, db: Session = Depends(get_db)):
    exists = db.query(models.Enrollment).filter_by(student_id=student_id, course_id=course_id).first()
    if exists:
        return {"status": "info", "message": "المستخدم مسجل بالفعل في هذا الكورس"}
    
    enrollment = models.Enrollment(student_id=student_id, course_id=course_id, progress=0)
    db.add(enrollment)
    db.commit()
    return {"status": "success", "message": "تم الاشتراك في الكورس بنجاح"}

@app.get("/api/student/{student_id}/courses")
def get_student_courses(student_id: int, db: Session = Depends(get_db)):
    enrollments = db.query(models.Enrollment).filter(models.Enrollment.student_id == student_id).all()
    courses = []
    for en in enrollments:
        course = db.query(models.Course).filter(models.Course.id == en.course_id).first()
        if course:
            courses.append({"course": course, "progress": en.progress})
    return {"status": "success", "student_courses": courses}

# -- Lessons --

@app.post("/api/lessons")
def add_lesson(lesson: LessonCreate, db: Session = Depends(get_db)):
    new_lesson = models.Lesson(**lesson.dict())
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return {"status": "success", "lesson": new_lesson}

@app.post("/api/student/{student_id}/add_xp")
def add_xp(student_id: int, xp_amount: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == student_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="المستخدم غير موجود")
    user.xp += xp_amount
    db.commit()
    return {"status": "success", "new_xp": user.xp}

# -- Certificates --

@app.post("/api/student/{student_id}/certificate/{course_id}")
def issue_certificate(student_id: int, course_id: int, db: Session = Depends(get_db)):
    exists = db.query(models.Certificate).filter_by(student_id=student_id, course_id=course_id).first()
    if exists:
        return {"status": "info", "message": "تم إصدار الشهادة مسبقاً", "certificate": exists}
    
    cert = models.Certificate(student_id=student_id, course_id=course_id)
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return {"status": "success", "message": "تم إصدار الشهادة بنجاح", "certificate": cert}

@app.get("/api/student/{student_id}/certificates")
def get_user_certificates(student_id: int, db: Session = Depends(get_db)):
    certs = db.query(models.Certificate).filter(models.Certificate.student_id == student_id).all()
    results = []
    for c in certs:
        course = db.query(models.Course).filter(models.Course.id == c.course_id).first()
        results.append({
            "certificate_id": c.id,
            "certificate_code": f"PJ-CERT-{c.id:04d}",
            "course_title": course.title if course else "كورس عام",
            "issued_at": c.issued_at
        })
    return {"status": "success", "certificates": results}

@app.get("/api/certificate/verify/{cert_code}")
def verify_certificate(cert_code: str, db: Session = Depends(get_db)):
    try:
        cert_id = int(cert_code.replace("PJ-CERT-", "").replace("pj-cert-", ""))
    except:
        raise HTTPException(status_code=400, detail="كود الشهادة غير صالح (يجب أن يبدأ بـ PJ-CERT-)")
    
    cert = db.query(models.Certificate).filter(models.Certificate.id == cert_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="شهادة غير مسجلة (Fake Certificate)")
    
    user = db.query(models.User).filter(models.User.id == cert.student_id).first()
    course = db.query(models.Course).filter(models.Course.id == cert.course_id).first()
    
    return {
        "status": "success",
        "certificate": {
            "code": f"PJ-CERT-{cert.id:04d}",
            "student_name": user.name if user else "غير معروف",
            "course_name": course.title if course else "غير محدد",
            "issued_at": cert.issued_at.strftime("%Y-%m-%d")
        }
    }

# -- Quizzes --

@app.post("/api/quizzes")
def add_quiz_question(q: QuizQuestionCreate, db: Session = Depends(get_db)):
    db_q = models.QuizQuestion(**q.dict())
    db.add(db_q)
    db.commit()
    db.refresh(db_q)
    return {"status": "success", "question": db_q}

@app.get("/api/courses/{course_id}/quiz")
def get_course_quiz(course_id: int, db: Session = Depends(get_db)):
    questions = db.query(models.QuizQuestion).filter(models.QuizQuestion.course_id == course_id).all()
    return {"status": "success", "questions": questions}
