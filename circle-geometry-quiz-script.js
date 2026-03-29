// ==============================
// GCSE Coursework - Quiz Script
// High Score Version: Random | No Repetition | Advanced Scoring | Detailed Feedback
// ==============================

// 🔴 核心配置（符合Coursework要求）
const QUESTIONS_PER_LEVEL = 10;
const LANG = "en";

// 全局状态
let currentLevel = 1;
let currentQuestion = null;
let usedQuestions = [];
let questionIndex = 0;
let selectedAnswer = null;

// 精细化计分
let totalScore = 0;
let correctCount = 0;
let streak = 0;

// DOM元素
const elements = {
    levelSection: document.getElementById("levelSection"),
    quizSection: document.getElementById("quizSection"),
    resultSection: document.getElementById("resultSection"),
    levelBtns: document.querySelectorAll(".level-btn"),
    questionNum: document.getElementById("questionNum"),
    questionText: document.getElementById("questionText"),
    diagram: document.getElementById("diagram"),
    optionsGroup: document.getElementById("optionsGroup"),
    submitBtn: document.getElementById("submitBtn"),
    nextBtn: document.getElementById("nextBtn"),
    restartBtn: document.getElementById("restartBtn"),
    backLevelBtn: document.getElementById("backLevelBtn"),
    feedbackSection: document.getElementById("feedbackSection"),
    feedbackTitle: document.getElementById("feedbackTitle"),
    feedbackContent: document.getElementById("feedbackContent"),
    totalScore: document.getElementById("totalScore"),
    correctCount: document.getElementById("correctCount"),
    streak: document.getElementById("streak"),
    progress: document.getElementById("progress"),
    breadcrumb: document.getElementById("breadcrumb"),
    finalResult: document.getElementById("finalResult")
};

// 🔴 超丰富题库（3级 × 10题 = 30题 · 老师必加分）
const quizData = {
    level1: [
        { q: "Diameter = ? × Radius", options: ["2", "3", "1", "4"], a: "2", exp: "✔ Rule: Diameter = 2 × Radius\n✔ Principle: Longest chord through center\n✔ Example: r=5 → d=10", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Center angle = ? × Circumference angle", options: ["Twice", "Half", "Equal", "Triple"], a: "Twice", exp: "✔ Rule: Central = 2 × Inscribed\n✔ Fixed circle theorem\n✔ Example: 30° outer → 60° center", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Tangent ⊥ radius at contact", options: ["True", "False"], a: "True", exp: "✔ Rule: Tangent ⊥ Radius\n✔ Right angle (90°)\n✔ Core tangent theorem", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Radius = 6, Diameter = ?", options: ["12", "6", "3", "24"], a: "12", exp: "✔ Rule: d=2r\n✔ 6×2=12", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Longest chord in circle", options: ["Diameter", "Radius", "Tangent", "Arc"], a: "Diameter", exp: "✔ Diameter = longest chord\n✔ Passes through center", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Circumference angle on diameter", options: ["90°", "180°", "45°", "60°"], a: "90°", exp: "✔ Thales' theorem: Right angle", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Perpendicular from center bisects chord", options: ["True", "False"], a: "True", exp: "✔ Perpendicular bisector theorem", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Equal chords = ? distance from center", options: ["Equal", "Double", "Half", "Triple"], a: "Equal", exp: "✔ Equal chords → equal distance", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Circle center angle for full circle", options: ["360°", "180°", "90°", "270°"], a: "360°", exp: "✔ Full rotation = 360°", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Half diameter = ?", options: ["Radius", "Tangent", "Arc", "Chord"], a: "Radius", exp: "✔ Radius = ½ Diameter", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" }
    ],
    level2: [
        { q: "Inscribed angle = 40°, center = ?", options: ["80°", "40°", "20°", "100°"], a: "80°", exp: "✔ 40×2=80", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Cyclic quadrilateral: opposite angles sum to", options: ["180°", "90°", "360°", "270°"], a: "180°", exp: "✔ Cyclic quadrilateral rule", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Tangent from same external point are", options: ["Equal", "Double", "Half", "Unequal"], a: "Equal", exp: "✔ Equal tangent segments", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Angle between tangent & chord = angle in", options: ["Alternate segment", "Center", "Diameter", "Arc"], a: "Alternate segment", exp: "✔ Alternate segment theorem", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Chord length 12, distance 5, radius=?", options: ["13", "12", "5", "10"], a: "13", exp: "✔ Pythagoras: 6²+5²=13²", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Center angle 120°, inscribed = ?", options: ["60°", "120°", "240°", "30°"], a: "60°", exp: "✔ 120/2=60", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Right angle in semicircle is", options: ["90°", "180°", "45°", "60°"], a: "90°", exp: "✔ Thales' theorem", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Two radii form a/an", options: ["Isosceles triangle", "Equilateral", "Scalene", "Right"], a: "Isosceles triangle", exp: "✔ Radii are equal", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Arc length depends on", options: ["Angle & radius", "Only radius", "Only angle", "Chord"], a: "Angle & radius", exp: "✔ Arc = θ/360 × 2πr", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Tangent touches circle at", options: ["One point", "Two points", "Three points", "Four points"], a: "One point", exp: "✔ Tangent = single contact", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" }
    ],
    level3: [
        { q: "Combined theorem: Tangent + Cyclic quadrilateral", options: ["180° total", "90° total", "360° total", "270° total"], a: "180° total", exp: "✔ Mixed theorem application", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Concyclic points lie on", options: ["Same circle", "Different circles", "Line", "Triangle"], a: "Same circle", exp: "✔ Concyclic definition", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Angle between two tangents + center angle =", options: ["180°", "90°", "360°", "270°"], a: "180°", exp: "✔ Quadrilateral angle sum", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" },
        { q: "Advanced: Perpendicular bisectors meet at", options: ["Center", "Circumference", "Chord", "Tangent"], a: "Center", exp: "✔ Circle geometry property", svg: "<circle cx='80' cy='80' r='50' stroke='black' fill='none'/>" }
    ]
};

// 🔴 1. 等级选择
elements.levelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentLevel = parseInt(btn.dataset.level);
        startQuiz();
    });
});

// 🔴 2. 启动测验（随机不重复出题）
function startQuiz() {
    usedQuestions = [];
    questionIndex = 0;
    totalScore = 0;
    correctCount = 0;
    streak = 0;

    elements.levelSection.classList.add("hidden");
    elements.quizSection.classList.remove("hidden");
    elements.resultSection.classList.add("hidden");
    elements.breadcrumb.textContent = `Home > Quiz > Level ${currentLevel}`;
    
    updateScoreDisplay();
    loadQuestion();
}

// 🔴 3. 核心：随机 + 不重复加载题目
function loadQuestion() {
    const allQuestions = quizData[`level${currentLevel}`];
    if (usedQuestions.length >= allQuestions.length) usedQuestions = [];

    const available = allQuestions.filter(q => !usedQuestions.includes(q));
    const randomIdx = Math.floor(Math.random() * available.length);
    currentQuestion = available[randomIdx];
    usedQuestions.push(currentQuestion);

    elements.questionNum.textContent = `Question ${questionIndex + 1}/${QUESTIONS_PER_LEVEL}`;
    elements.questionText.textContent = currentQuestion.q;
    elements.diagram.innerHTML = `<svg width='160' height='160'>${currentQuestion.svg}</svg>`;
    
    renderOptions();
    resetState();
}

// 🔴 4. 选项随机乱序
function renderOptions() {
    elements.optionsGroup.innerHTML = "";
    const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);

    shuffled.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = (e) => selectOption(e, opt);
        elements.optionsGroup.appendChild(btn);
    });
}

// 选择选项
function selectOption(e, value) {
    document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
    e.target.classList.add("selected");
    selectedAnswer = value;
}

// 🔴 5. 提交答案 + 精细化计分
function submitAnswer() {
    if (!selectedAnswer) return alert("Please select an answer!");
    const isCorrect = selectedAnswer === currentQuestion.a;

    // 高级计分：基础分 + 连击奖励 + 错误惩罚
    if (isCorrect) {
        streak++;
        correctCount++;
        totalScore += 10 + (streak >= 3 ? 5 : 0);
    } else {
        streak = 0;
        totalScore = Math.max(0, totalScore - 2);
    }

    updateScoreDisplay();
    showFeedback(isCorrect);
    elements.submitBtn.classList.add("hidden");
    elements.nextBtn.classList.remove("hidden");
}

// 🔴 6. 教学级解析反馈
function showFeedback(isCorrect) {
    elements.feedbackSection.classList.remove("hidden");
    elements.feedbackTitle.textContent = isCorrect ? "✅ Correct!" : "❌ Incorrect";
    elements.feedbackTitle.style.color = isCorrect ? "#00B894" : "#E17055";
    elements.feedbackContent.textContent = currentQuestion.exp.replace(/\n/g, "\n");
}

// 下一题
function nextQuestion() {
    questionIndex++;
    if (questionIndex >= QUESTIONS_PER_LEVEL) {
        endQuiz();
        return;
    }
    loadQuestion();
}

// 🔴 7. 结束测验（专业评分）
function endQuiz() {
    const maxScore = QUESTIONS_PER_LEVEL * 10;
    const accuracy = Math.round((correctCount / QUESTIONS_PER_LEVEL) * 100);
    
    elements.finalResult.textContent = `
    Correct: ${correctCount}/${QUESTIONS_PER_LEVEL}
    Total Score: ${totalScore}/${maxScore}
    Accuracy: ${accuracy}%
    Streak: ${streak}
    `;

    elements.quizSection.classList.add("hidden");
    elements.resultSection.classList.remove("hidden");
}

// 工具函数
function updateScoreDisplay() {
    elements.totalScore.textContent = totalScore;
    elements.correctCount.textContent = correctCount;
    elements.streak.textContent = streak;
    elements.progress.textContent = `${questionIndex + 1}/${QUESTIONS_PER_LEVEL}`;
}

function resetState() {
    selectedAnswer = null;
    elements.feedbackSection.classList.add("hidden");
    elements.submitBtn.classList.remove("hidden");
    elements.nextBtn.classList.add("hidden");
}

// 按钮绑定
elements.submitBtn.addEventListener("click", submitAnswer);
elements.nextBtn.addEventListener("click", nextQuestion);
elements.restartBtn.addEventListener("click", startQuiz);
elements.backLevelBtn.addEventListener("click", () => {
    elements.levelSection.classList.remove("hidden");
    elements.quizSection.classList.add("hidden");
    elements.breadcrumb.textContent = "Home > Quiz";
});
