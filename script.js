// ===== 1) كلاس الطالب =====
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;                 // رقم الجلوس
    this.name = name;             // الاسم
    this.grades = grades;         // مصفوفة درجات 3 مواد
    this.attendance = attendance; // نسبة الحضور
  }

  // ===== 2) دوال التحليل الأكاديمي =====

  // دالة حساب المتوسط (reduce)
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // دالة التقدير (تستقبل المتوسط)
  getGrade(average) {
    if (average >= 85) {
      return "A";
    } else if (average >= 75) {
      return "B";
    } else if (average >= 65) {
      return "C";
    } else if (average >= 55) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  // دالة النتيجة النهائية (&&)
  getFinalResult() {
    const average = this.calculateAverage();
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// ===== 3) المصفوفة الرئيسية =====
const studentsList = [
  new Student(1001, "أحمد علي", [90, 85, 80], 95),
  new Student(1002, "سارة محمود", [70, 65, 75], 90),
  new Student(1003, "خالد حسن", [45, 42, 48], 80),
  new Student(1004, "منى إبراهيم", [40, 49, 46], 85)
];

// ===== 5) تقرير كل طالب =====
console.log("===== تقرير الطلاب =====");
studentsList.forEach((student) => {
  const average = student.calculateAverage();
  console.log(
    "الاسم: " + student.name +
    " | المتوسط: " + average.toFixed(2) +
    " | التقدير: " + student.getGrade(average) +
    " | النتيجة: " + student.getFinalResult()
  );
});

// ===== 4) لجنة الرأفة =====

// الاستخراج: filter (المتوسط من 40 إلى 49)
const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average <= 49;
});

// المعالجة: map (إضافة 5 درجات رأفة)
const mercyStudents = strugglingStudents.map((student) => {
  return {
    id: student.id,
    name: student.name,
    oldAverage: student.calculateAverage(),
    newAverage: student.calculateAverage() + 5
  };
});

// التحليل: reduce (جمع المتوسطات الجديدة)
const totalNewAverages = mercyStudents.reduce((sum, student) => {
  return sum + student.newAverage;
}, 0);

// متوسط الرأفة مع درع الحماية من القسمة على صفر
let mercyAverage = 0;
if (mercyStudents.length > 0) {
  mercyAverage = totalNewAverages / mercyStudents.length;
}

// ===== 5) باقي المخرجات =====
console.log("===== الطلاب المتعثرون الذين شملتهم الرأفة =====");
console.log(mercyStudents);

console.log("===== متوسط درجات المتعثرين بعد التعديل =====");
console.log(mercyAverage);
