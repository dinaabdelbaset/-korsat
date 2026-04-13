import sys
import os
sys.path.append('e:\\مشروع ابراهيم\\رحله مبرمج\\خله\\backend')
from database import SessionLocal
import models

db = SessionLocal()

# Ensure we have at least one user
user = db.query(models.User).filter_by(id=1).first()
if not user:
    user = models.User(name="إبراهيم (للتجربة)", email="test@test.com", password="123", role="student", xp=100)
    db.add(user)
    db.commit()

# Ensure we have at least one course
course = db.query(models.Course).filter_by(id=1).first()
if not course:
    course = models.Course(title="أساسيات البرمجة الكاملة", description="كورس", instructor_id=user.id)
    db.add(course)
    db.commit()

# Ensure we have certificate #1
cert = db.query(models.Certificate).filter_by(id=1).first()
if not cert:
    cert = models.Certificate(id=1, student_id=user.id, course_id=course.id)
    db.add(cert)
    db.commit()
    print("Created Certificate ID: 1")
else:
    print("Certificate 1 already exists")

db.close()
