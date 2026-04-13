from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# رابط الاتصال بقاعدة بيانات MySQL
# قم بتعديل اسم المستخدم (root)، كلمة المرور (فارغة في XAMPP عادةً)، واسم القاعدة (programmers_journey)
SQLALCHEMY_DATABASE_URL = "sqlite:///./programmers_journey.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# دالة لفتح وإغلاق الاتصال بقاعدة البيانات لكل طلب (Dependency)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
