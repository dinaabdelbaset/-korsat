import requests
import json

base_url = "http://localhost:8000"

courses = [
    {
        "title": "أساسيات الويب (HTML)",
        "description": "تعلم كيف تبني هيكل وتصميم المواقع من الصفر. الدورة الأفضل للمبتدئين في مجال الويب.",
        "instructor_id": 1,
        "image_url": "https://img.youtube.com/vi/UB1O30fR-EE/0.jpg"
    },
    {
        "title": "التصميم الاحترافي (CSS)",
        "description": "تعلم كيفية تحويل المواقع الجامدة إلى تحف فنية متجاوبة مع جميع الشاشات.",
        "instructor_id": 1,
        "image_url": "https://img.youtube.com/vi/yfoY53QXEnI/0.jpg"
    },
    {
        "title": "البرمجة التفاعلية (JavaScript)",
        "description": "أضف الحياة لمقوعك وتعلم البرمجة الحقيقية والمنطق البرمجي باستخدام أشهر لغة في العالم.",
        "instructor_id": 1,
        "image_url": "https://img.youtube.com/vi/W6NZfCO5SIk/0.jpg"
    },
    {
        "title": "بناء الواجهات (React)",
        "description": "احترف مكتبة الرياكت لبناء تطبيقات الويب الحديثة Single Page Applications.",
        "instructor_id": 1,
        "image_url": "https://img.youtube.com/vi/Ke90Tje7VS0/0.jpg"
    },
    {
        "title": "برمجة السيرفرات (Node.js)",
        "description": "استخدم معلوماتك في الجافاسكريبت لكتابة أكواد الباك إند وبناء الـ APIs.",
        "instructor_id": 1,
        "image_url": "https://img.youtube.com/vi/Oe421EPjeBE/0.jpg"
    },
    {
        "title": "أساسيات بايثون (Python)",
        "description": "من الصفر وحتى الاحتراف، تعلم لغة البايثون القوية والمطلوبة في كل المجالات.",
        "instructor_id": 1,
        "image_url": "https://img.youtube.com/vi/rfscVS0vtbw/0.jpg"
    }
]

print("Seeding database with courses...")

# First register a dummy admin to be the instructor (if not exists)
admin = {"name": "Admin", "email": "admin@programmer.com", "password": "admin"}
requests.post(f"{base_url}/api/register", json=admin)

# Insert courses
for course in courses:
    res = requests.post(f"{base_url}/api/courses", json=course)
    if res.status_code == 200:
        print(f"Added Course: {course['title']}")
    else:
        print(f"Failed or exists: {course['title']}")

print("-" * 30)
print("Seeding Lessons for HTML Course (Course ID 1)...")

lessons = [
    {
        "course_id": 1,
        "title": "الدرس الأول: ما هي لغة HTML؟",
        "video_url": "https://www.youtube.com/watch?v=UB1O30fR-EE",
        "content": "في هذا الدرس سنتعرف على تاريخ الويب وكيف تعمل المتصفحات، وهيكل صفحة HTML الأساسي (html, head, body)."
    },
    {
        "course_id": 1,
        "title": "الدرس الثاني: النصوص والعناوين",
        "video_url": "https://www.youtube.com/watch?v=kIMEA_x0oGg",
        "content": "تعلم كيفية كتابة العناوين (h1 to h6) والفقرات النصية (p) وإضافة التنسيقات البسيطة مثل الخط العريض (b)."
    },
    {
        "course_id": 1,
        "title": "الدرس الثالث: الروابط والصور",
        "video_url": "https://www.youtube.com/watch?v=kKGEU7k14wA",
        "content": "كيف نربط صفحات الموقع ببعضها عبر وسم <a>، وكيف ندرج الصور باستخدام وسم <img>."
    }
]

for lesson in lessons:
    res = requests.post(f"{base_url}/api/lessons", json=lesson)
    if res.status_code == 200:
        print(f"Added Lesson: {lesson['title']}")
    else:
        print(f"Failed: {lesson['title']}")

print("✅ Seeding completed! Real data is now in your database.")
