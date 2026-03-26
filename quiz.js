// ===================== 核心配置 =====================
const QUESTIONS_PER_LEVEL = 5; // 每级5道题
const LOCK_SCORE = { 2: 80, 3: 85 }; // 解锁分数
let currentLang = "en"; // 默认英文
let currentTheme = "light";
let currentFont = "medium";
let soundEnabled = true;
let currentLevel = 0;
let currentQuestion = null;
let questionIndex = 0;
let score = 0;
let usedQuestions = [];

// ===================== 双语题库（GCSE圆几何） =====================
const quizData = {
    en: {
        level1: [
            {
                q: "The diameter of a circle is twice the ______",
                options: ["radius", "circumference", "area", "chord"],
                a: "radius",
                exp: "Diameter = 2 × Radius (Basic Circle Property)",
                svg: `<svg width="150" height="150"><circle cx="75" cy="75" r="50" stroke="black" fill="none"/><line x1="75" y1="75" x2="125" y2="75" stroke="red"/><line x1="25" y1="75" x2="125" y2="75" stroke="blue"/></svg>`
            },
            {
                q: "The angle in a semicircle is ______ degrees",
                options: ["90", "180", "45", "60"],
                a: "90",
                exp: "Angle inscribed in a semicircle is always a right angle (90°)",
                svg: `<svg width="150" height="150"><circle cx="75" cy="75" r="50" stroke="black" fill="none"/><line x1="25" y1="75" x2="125" y2="75"/><line x1="125" y1="75" x2="75" y2="25"/><line x1="75" y1="25" x2="25" y2="75"/></svg>`
            }
        ],
        level2: [
            {
                q: "Angles subtended by the same arc are ______",
                options: ["equal", "different", "supplementary", "complementary"],
                a: "equal",
                exp: "Angles in the same segment are equal",
                svg: `<svg width="150" height="150"><circle cx="75" cy="75" r="50" stroke="black" fill="none"/></svg>`
            }
        ],
        level3: [
            {
                q: "A tangent to a circle is ______ to the radius at the point of contact",
                options: ["perpendicular", "parallel", "equal", "diagonal"],
                a: "perpendicular",
                exp: "Tangent ⊥ Radius at the point of contact",
                svg: `<svg width="150" height="150"><circle cx="75" cy="75" r="50" stroke="black" fill="none"/></svg>`
            }
        ]
    },
    zh: {
        level1: [
            {
                q: "圆的直径是______的两倍",
                options: ["半径", "周长", "面积", "弦"],
                a: "半径",
                exp: "直径 = 2 × 半径（圆的基本性质）",
                svg: `<svg width="150" height="150"><circle cx="75" cy="75" r="50" stroke="black" fill="none"/><line x1="75" y1="75" x2="125" y2="75" stroke="red"/><line x1="25" y1="75" x2="125" y2="75" stroke="blue"/></svg>`
            },
            {
                q: "半圆所对的圆周角是______度",
                options: ["90", "180", "45", "60"],
                a: "90",
                exp: "半圆内的圆周角恒为直角（90°）",
                svg: `<svg width="150" height="150"><circle cx="75" cy="75" r="50" stroke="black" fill="none"/><line x1="25" y1="75" x2="125" y2="75"/><line x1="125" y1="75" x2="75" y2="25"/><line x1="75" y1="25" x2="25" y2="75"/></svg>`
            }
        ],
        level2: [
            {
                q: "同弧所对的圆周角______",
                options: ["相等", "不相等", "互补", "互余"],
                a: "相等",
                exp: "同弧所对的圆周角相等",
                svg: `<svg width="150" height="150"><circle cx="75" cy="75" r="50" stroke="black" fill="none"/></svg>`
            }
        ],
        level3: [
            {
                q: "圆的切线与过切点的半径______",
                options: ["垂直", "平行", "相等", "相交"],
                a: "垂直",
                exp: "切线与半径在切点处垂直",
                svg: `<svg width="150" height="150"><circle cx="75" cy="75" r="50" stroke="black" fill="none"/></svg>`
            }
        ]
    }
};

// ===================== DOM元素获取 =====================
const elements = {
    level1: document.getElementById("level1"),
    level2: document.getElementById("level2"),
    level3: document.getElementById("level3"),
    levelTitle: document.getElementById("levelTitle"),
    unlockTip: document.getElementById("unlockTip"),
    questionSection: document.querySelector(".question-section"),
    feedbackSection: document.querySelector(".feedback-section"),
    questionNum: document.getElementById("questionNum"),
    scoreText: document.getElementById("scoreText"),
    diagram: document.getElementById("diagram"),
    questionText: document.getElementById("questionText"),
    options: document.getElementById("options"),
    submitBtn: document.getElementById("submitBtn"),
    nextBtn: document.getElementById("nextBtn"),
    resetBtn: document.getElementById("resetBtn"),
    feedbackIcon: document.getElementById("feedbackIcon"),
    feedbackText: document.getElementById("feedbackText"),
    explanationText: document.getElementById("explanationText"),
    langBtn: document.getElementById("langBtn"),
    fontBtn: document.getElementById("fontBtn"),
    themeBtn: document.getElementById("themeBtn"),
    soundBtn: document.getElementById("soundBtn")
};

// ===================== 初始化 =====================
init();
function init() {
    loadLocalStorage();
    bindEvents();
    checkLevelLock();
}

// ===================== 核心功能 =====================
// 选择难度
function startLevel(level) {
    currentLevel = level;
    questionIndex = 0;
    score = 0;
    usedQuestions = [];
    elements.questionSection.classList.remove("hidden");
    elements.feedbackSection.classList.add("hidden");
    loadQuestion();
}

// 加载题目
function loadQuestion() {
    const questions = quizData[currentLang][`level${currentLevel}`];
    if(questionIndex >= QUESTIONS_PER_LEVEL) {
        endQuiz();
        return;
    }
    currentQuestion = questions[questionIndex];
    elements.questionNum.textContent = `Question ${questionIndex+1}/${QUESTIONS_PER_LEVEL}`;
    elements.scoreText.textContent = `Score: ${score} | Correct: ${score}`;
    elements.diagram.innerHTML = currentQuestion.svg;
    elements.questionText.textContent = currentQuestion.q;
    renderOptions();
    elements.submitBtn.classList.remove("hidden");
    elements.nextBtn.classList.add("hidden");
    elements.feedbackSection.classList.add("hidden");
}

// 渲染选项
function renderOptions() {
    elements.options.innerHTML = "";
    currentQuestion.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => selectOption(opt);
        elements.options.appendChild(btn);
    });
}

// 选择选项
function selectOption(option) {
    document.querySelectorAll(".option-btn").forEach(btn => btn.style.border = "1px solid var(--border)");
    event.target.style.border = "2px solid var(--primary)";
    window.selectedAnswer = option;
}

// 提交答案
function submitAnswer() {
    if(!window.selectedAnswer) {
        alert(currentLang === "en" ? "Please select an answer!" : "请选择答案！");
        return;
    }
    const isCorrect = window.selectedAnswer === currentQuestion.a;
    if(isCorrect) score++;
    showFeedback(isCorrect);
    elements.submitBtn.classList.add("hidden");
    elements.nextBtn.classList.remove("hidden");
}

// 显示反馈
function showFeedback(isCorrect) {
    elements.feedbackSection.classList.remove("hidden");
    if(isCorrect) {
        elements.feedbackIcon.textContent = "✅";
        elements.feedbackIcon.className = "feedback-icon correct";
        elements.feedbackText.textContent = currentLang === "en" ? "Correct! Well done" : "回答正确！太棒了";
        if(soundEnabled) playSound("correct");
    } else {
        elements.feedbackIcon.textContent = "❌";
        elements.feedbackIcon.className = "feedback-icon wrong";
        elements.feedbackText.textContent = currentLang === "en" ? "Wrong Answer" : "回答错误";
        if(soundEnabled) playSound("wrong");
    }
    elements.explanationText.textContent = currentQuestion.exp;
}

// ===================== 工具函数 =====================
function playSound(type) {
    const audio = new Audio(`https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3`);
    if(type === "wrong") audio.src = `https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3`;
    audio.play().catch(() => {});
}

function endQuiz() {
    const percentage = (score / QUESTIONS_PER_LEVEL) * 100;
    const msg = currentLang === "en" 
        ? `Quiz Completed! Score: ${score}/${QUESTIONS_PER_LEVEL} (${percentage}%)`
        : `测试完成！得分：${score}/${QUESTIONS_PER_LEVEL} (${percentage}%)`;
    alert(msg);
    saveScore(currentLevel, percentage);
    checkLevelLock();
    elements.questionSection.classList.add("hidden");
}

// 本地存储
function saveScore(level, score) {
    localStorage.setItem(`gc_level${level}`, score);
}
function loadLocalStorage() {
    currentLang = localStorage.getItem("lang") || "en";
    currentTheme = localStorage.getItem("theme") || "light";
    currentFont = localStorage.getItem("font") || "medium";
    soundEnabled = localStorage.getItem("sound") !== "false";
    document.documentElement.className = `${currentTheme}-mode font-${currentFont}`;
    elements.langBtn.textContent = currentLang === "en" ? "中文" : "English";
    elements.themeBtn.textContent = currentTheme === "light" ? "Dark" : "Light";
    elements.soundBtn.textContent = soundEnabled ? "Sound On" : "Sound Off";
}

// 难度解锁
function checkLevelLock() {
    const l2 = parseFloat(localStorage.getItem("gc_level1")) || 0;
    const l3 = parseFloat(localStorage.getItem("gc_level2")) || 0;
    if(l2 >= LOCK_SCORE[2]) elements.level2.classList.replace("locked", "unlocked");
    if(l3 >= LOCK_SCORE[3]) elements.level3.classList.replace("locked", "unlocked");
}

// 事件绑定
function bindEvents() {
    elements.level1.onclick = () => startLevel(1);
    elements.level2.onclick = () => elements.level2.classList.contains("unlocked") && startLevel(2);
    elements.level3.onclick = () => elements.level3.classList.contains("unlocked") && startLevel(3);
    elements.submitBtn.onclick = submitAnswer;
    elements.nextBtn.onclick = () => { questionIndex++; loadQuestion(); };
    elements.resetBtn.onclick = () => { localStorage.clear(); location.reload(); };
    
    // 语言切换
    elements.langBtn.onclick = () => {
        currentLang = currentLang === "en" ? "zh" : "en";
        localStorage.setItem("lang", currentLang);
        elements.langBtn.textContent = currentLang === "en" ? "中文" : "English";
        elements.levelTitle.textContent = currentLang === "en" ? "Circle Geometry Quiz - Select Difficulty" : "圆几何测试 - 选择难度";
        elements.unlockTip.textContent = currentLang === "en" ? "Intermediate unlocks at 80%+ Basic score" : "基础正确率≥80%解锁进阶级";
    };
}
