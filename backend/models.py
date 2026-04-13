from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    email = Column(String(150), unique=True, index=True)
    password = Column(String(255))
    role = Column(String(50), default="student") # student, teacher, admin
    xp = Column(Integer, default=0)

    enrollments = relationship("Enrollment", back_populates="student")
    certificates = relationship("Certificate", back_populates="student")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    description = Column(Text)
    instructor_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String(255), nullable=True)

    lessons = relationship("Lesson", back_populates="course")
    enrollments = relationship("Enrollment", back_populates="course")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String(200))
    video_url = Column(String(255))
    content = Column(Text)

    course = relationship("Course", back_populates="lessons")


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    progress = Column(Integer, default=0) # Percentage 0-100

    student = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    issued_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("User", back_populates="certificates")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    question_text = Column(String(500))
    op_a = Column(String(200))
    op_b = Column(String(200))
    op_c = Column(String(200))
    op_d = Column(String(200))
    correct_op = Column(String(1)) # 'a', 'b', 'c', or 'd'

    course = relationship("Course")
