import sys
import os
sys.path.append('e:\\مشروع ابراهيم\\رحله مبرمج\\خله\\backend')
from database import SessionLocal
import models

db = SessionLocal()
certs = db.query(models.Certificate).all()
print("Certificates in DB:", len(certs))
for c in certs:
    print(f"ID: {c.id}, Student: {c.student_id}, Course: {c.course_id}")
