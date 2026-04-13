import requests

base_url = "http://localhost:8000"

print("Seeding database with Quiz Questions for HTML course...")

questions = [
    {
        "course_id": 1,
        "question_text": "ما هو اختصار HTML؟",
        "op_a": "Hyper Text Markup Language",
        "op_b": "High Text Machine Language",
        "op_c": "Hyper Tabular Markup Language",
        "op_d": "None of the above",
        "correct_op": "a"
    },
    {
        "course_id": 1,
        "question_text": "أي وسم يستخدم لإنشاء أكبر عنوان؟",
        "op_a": "<heading>",
        "op_b": "<h1>",
        "op_c": "<h6>",
        "op_d": "<head>",
        "correct_op": "b"
    },
    {
        "course_id": 1,
        "question_text": "كيف نقوم بإدراج سطر جديد (New Line)؟",
        "op_a": "<lb>",
        "op_b": "<br>",
        "op_c": "<break>",
        "op_d": "<newline>",
        "correct_op": "b"
    }
]

for q in questions:
    res = requests.post(f"{base_url}/api/quizzes", json=q)
    if res.status_code == 200:
        print(f"Added Question: {q['question_text']}")
    else:
        print(f"Failed: {q['question_text']}")

print("✅ Quizzes Seeding completed!")
