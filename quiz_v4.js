// quiz-v4.js — 完整测验逻辑 + 头部交互（亮/暗/护眼主题、字体、语言）

// ---------- 多语言包 ----------
const languagePack = {
    en: {
        home: 'Home', game: 'Game', quiz: 'Quiz',
        breadcrumb_quiz: 'Quiz',
        welcome_title: 'Circle Geometry Quiz',
        welcome_desc: 'Test your understanding of GCSE-level circle theorems with our interactive quiz.',
        recommend_text: '🎉 Great job on the {level} level! We recommend you try the {next_level} level next.',
        level1_title: 'Foundation Level',
        level1_desc: 'Basic circle theorem concepts, perfect for beginners.',
        level1_diff: 'Easy',
        level2_title: 'Intermediate Level',
        level2_desc: 'Combined problems requiring multi-step reasoning.',
        level2_diff: 'Medium',
        level3_title: 'Higher Level',
        level3_desc: 'Challenging exam-style questions.',
        level3_diff: 'Hard',
        quiz_level_info: 'Level: {level} | Question {current} of {total}',
        quiz_score_info: 'Score: {score}',
        btn_submit_answer: 'Submit Answer',
        btn_next: 'Next Question',
        btn_submit_quiz: 'Submit Quiz',
        btn_exit_quiz: 'Exit Quiz',
        btn_restart: 'Try Another Level',
        btn_review: 'Review Answers',
        btn_hide_review: 'Hide Review',
        feedback_correct: 'Correct! {explanation}',
        feedback_incorrect: 'Incorrect. The right answer is {answer}. {explanation}',
        result_title: 'Quiz Completed!',
        result_desc: 'Well done! Keep practicing to master circle theorems.',
        review_title: 'Your Answer Review',
        footer_line1: '© 2026 Circle Geometry Learning | GCSE Math Helper',
        footer_line2: 'Designed for EBU5315 Coursework | Queen Mary University of London',
        confirm_exit: 'Are you sure you want to exit? Progress will be lost.',
        privacy_title: 'Privacy Policy',
        privacy_desc: 'All learning data is stored only on your local browser.',
        privacy_confirm: 'I Understand',
        rest_title: 'Eye Care Reminder',
        rest_desc: 'Take a 20-second break, look at something 6 meters away.',
        rest_confirm: 'Got It',
        level_name_foundation: 'Foundation',
        level_name_intermediate: 'Intermediate',
        level_name_higher: 'Higher',
        langBtn: '中文'
    },
    zh: {
        home: '主页', game: '游戏', quiz: '测验',
        breadcrumb_quiz: '测验',
        welcome_title: '圆几何知识测验',
        welcome_desc: '通过交互式测验检验你对GCSE级别圆定理的掌握程度。',
        recommend_text: '🎉 你在{level}级别表现出色！推荐挑战{next_level}级别。',
        level1_title: '基础级别',
        level1_desc: '基础圆定理概念，适合初学者。',
        level1_diff: '简单',
        level2_title: '进阶级别',
        level2_desc: '综合题目，需要多步推理和计算。',
        level2_diff: '中等',
        level3_title: '高级级别',
        level3_desc: '考试风格的挑战性题目。',
        level3_diff: '困难',
        quiz_level_info: '级别: {level} | 题目 {current} / {total}',
        quiz_score_info: '得分: {score}',
        btn_submit_answer: '提交答案',
        btn_next: '下一题',
        btn_submit_quiz: '提交测验',
        btn_exit_quiz: '退出测验',
        btn_restart: '更换级别重测',
        btn_review: '查看答案',
        btn_hide_review: '隐藏答案',
        feedback_correct: '回答正确！{explanation}',
        feedback_incorrect: '回答错误。正确答案是 {answer}。{explanation}',
        result_title: '测验完成！',
        result_desc: '恭喜你完成了测验！继续练习，彻底掌握圆定理。',
        review_title: '答案回顾',
        footer_line1: '© 2026 圆几何学习 | GCSE数学助手',
        footer_line2: '为EBU5315课程作业设计 | 伦敦玛丽女王大学',
        confirm_exit: '确定要退出测验吗？进度将丢失。',
        privacy_title: '隐私政策',
        privacy_desc: '所有学习数据仅存储在您的本地浏览器中。',
        privacy_confirm: '我已了解',
        rest_title: '护眼提醒',
        rest_desc: '您已连续使用20分钟，建议远眺20秒。',
        rest_confirm: '知道了',
        level_name_foundation: '基础',
        level_name_intermediate: '进阶',
        level_name_higher: '高级',
        langBtn: 'EN'
    }
};

// ---------- 题库 ----------
const questionBank = {
    1: [
        { id: "f1", question: "What is the angle at the centre of a circle, if the angle at the circumference subtended by the same arc is 30°?", options: ["15°", "30°", "60°", "90°"], correct: 2, explanation: "The angle at the centre is twice the angle at the circumference. 30° × 2 = 60°." },
        { id: "f2", question: "What is the size of an angle inscribed in a semicircle?", options: ["45°", "60°", "90°", "180°"], correct: 2, explanation: "An angle inscribed in a semicircle is always 90° (Thales' theorem)." },
        { id: "f3", question: "Angles subtended by the same arc in a circle are...", options: ["Equal", "Double", "Half", "Supplementary"], correct: 0, explanation: "Angles in the same segment are equal." },
        { id: "f4", question: "What is the sum of opposite angles in a cyclic quadrilateral?", options: ["90°", "180°", "270°", "360°"], correct: 1, explanation: "Opposite angles in a cyclic quadrilateral sum to 180°." },
        { id: "f5", question: "What is the angle between a tangent and the radius at the point of contact?", options: ["45°", "60°", "90°", "180°"], correct: 2, explanation: "A tangent is always perpendicular to the radius." },
        { id: "f6", question: "If an angle at the circumference is 25°, what is the angle at the centre?", options: ["25°", "50°", "75°", "12.5°"], correct: 1, explanation: "Central angle = 2 × circumference angle." },
        { id: "f7", question: "A triangle inscribed in a semicircle is always...", options: ["Acute", "Obtuse", "Right-angled", "Equilateral"], correct: 2, explanation: "Angle in a semicircle is 90°, so triangle is right-angled." }
    ],
    2: [
        { id: "i1", question: "In a circle, an angle at the circumference is 42°. What is the angle at the centre?", options: ["21°", "42°", "84°", "138°"], correct: 2, explanation: "Central angle = 2 × 42° = 84°." },
        { id: "i2", question: "A cyclic quadrilateral has one angle of 75°. What is the opposite angle?", options: ["75°", "105°", "150°", "180°"], correct: 1, explanation: "Opposite angles sum to 180°. 180 - 75 = 105°." },
        { id: "i3", question: "Two tangents from an external point to a circle are...", options: ["Equal", "Perpendicular", "Different", "Parallel"], correct: 0, explanation: "Tangents from the same point are equal." },
        { id: "i4", question: "Angle at centre is 110°. Angle in opposite segment is?", options: ["55°", "110°", "125°", "250°"], correct: 2, explanation: "180 - (110/2) = 125°." },
        { id: "i5", question: "Angle between tangent and chord equals...", options: ["Angle in alternate segment", "Central angle", "90°", "Opposite angle"], correct: 0, explanation: "Alternate segment theorem." }
    ],
    3: [
        { id: "h1", question: "A cyclic quadrilateral has angles in ratio 3:4:5:x. Find x.", options: ["3", "4", "5", "6"], correct: 1, explanation: "Opposite sum 180°, total 360°. 3+5=8 parts=180°, so 1 part=22.5°, 4+x=8 → x=4." },
        { id: "h2", question: "Chords intersect: AE=4, EB=6, CE=3. Find ED.", options: ["4", "6", "8", "12"], correct: 2, explanation: "AE×EB = CE×ED → 24=3×ED → ED=8." },
        { id: "h3", question: "Tangent PT=12, distance to centre=13. Find radius.", options: ["5", "6", "10", "12.5"], correct: 0, explanation: "r² + 12² = 13² → r=5." },
        { id: "h4", question: "Angle between two tangents is 60°. Angle between radii is?", options: ["60°", "90°", "120°", "150°"], correct: 2, explanation: "Quadrilateral sum 360°, two 90° angles → 360-90-90-60=120°." },
        { id: "h5", question: "AB is diameter, angle CAB=40°. Find angle ABC.", options: ["40°", "50°", "60°", "70°"], correct: 1, explanation: "Angle in semicircle=90°, triangle sum 180° → 180-90-40=50°." }
    ]
};

// ---------- 全局状态 ----------
let currentLang = 'en';
let currentLevel = 1;
let currentQIndex = 0;
let currentScore = 0;
let selectedQuestions = [];
let userAnswers = [];
let selectedOption = null;
let isSubmitted = false;
let useStartTime = Date.now();
let restTimer = null;
let baseFontSize = 16;

// ---------- 本地存储 ----------
const StorageUtils = {
    getAnsweredIds: (lvl) => JSON.parse(localStorage.getItem(`quiz_answered_${lvl}`) || '[]'),
    saveAnsweredIds: (lvl, ids) => localStorage.setItem(`quiz_answered_${lvl}`, JSON.stringify(ids)),
    getCompletion: (lvl) => JSON.parse(localStorage.getItem(`quiz_completion_${lvl}`) || 'null'),
    saveCompletion: (lvl, score, total) => localStorage.setItem(`quiz_completion_${lvl}`, JSON.stringify({ score, total, rate: (score/total)*100 })),
    getPrivacy: () => localStorage.getItem('privacy_agreed') === 'true',
    savePrivacy: () => localStorage.setItem('privacy_agreed', 'true')
};

// ---------- DOM 元素 ----------
const welcomeSection = document.getElementById('welcome-section');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackBox = document.getElementById('feedback-box');
const submitBtn = document.getElementById('submit-answer-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('quiz-progress-bar');
const finalScoreSpan = document.getElementById('final-score');
const finalTotalSpan = document.getElementById('final-total');
const reviewContainer = document.getElementById('review-container');
const reviewList = document.getElementById('review-list');
const reviewBtn = document.getElementById('review-btn');
const recommendBox = document.getElementById('recommend-box');
const recommendText = document.getElementById('recommend-text');
const privacyModal = document.getElementById('privacy-modal');
const restModal = document.getElementById('rest-modal');
const captionContainer = document.getElementById('caption-container');
const captionText = document.getElementById('caption-text');

// 头部控件
const themeSelect = document.getElementById('themeSelect');
const langText = document.getElementById('lang-text');
const fontSizeValue = document.getElementById('fontSizeValue');

// ---------- 辅助函数 ----------
function showSection(section) {
    welcomeSection.classList.remove('active');
    quizSection.classList.remove('active');
    resultSection.classList.remove('active');
    section.classList.add('active');
}

function updateTexts() {
    const t = languagePack[currentLang];
    document.getElementById('welcome-title').textContent = t.welcome_title;
    document.getElementById('welcome-desc').textContent = t.welcome_desc;
    document.getElementById('level1_title').textContent = t.level1_title;
    document.getElementById('level1_desc').textContent = t.level1_desc;
    document.getElementById('level1_diff').textContent = t.level1_diff;
    document.getElementById('level2_title').textContent = t.level2_title;
    document.getElementById('level2_desc').textContent = t.level2_desc;
    document.getElementById('level2_diff').textContent = t.level2_diff;
    document.getElementById('level3_title').textContent = t.level3_title;
    document.getElementById('level3_desc').textContent = t.level3_desc;
    document.getElementById('level3_diff').textContent = t.level3_diff;
    document.getElementById('result-title').textContent = t.result_title;
    document.getElementById('result-desc').textContent = t.result_desc;
    document.getElementById('review-title').textContent = t.review_title;
    document.getElementById('footer-line1').textContent = t.footer_line1;
    document.getElementById('footer-line2').textContent = t.footer_line2;
    document.getElementById('privacy-title').textContent = t.privacy_title;
    document.getElementById('privacy-desc').textContent = t.privacy_desc;
    document.getElementById('privacy-confirm-btn').textContent = t.privacy_confirm;
    document.getElementById('rest-title').textContent = t.rest_title;
    document.getElementById('rest-desc').textContent = t.rest_desc;
    document.getElementById('rest-confirm-btn').textContent = t.rest_confirm;
    document.querySelector('#nav-home').textContent = t.home;
    document.querySelector('#nav-game').textContent = t.game;
    document.querySelector('#nav-quiz').textContent = t.quiz;
    document.querySelector('#breadcrumb-quiz').textContent = t.breadcrumb_quiz;
    langText.textContent = t.langBtn;
    document.getElementById('exit-quiz-btn').textContent = t.btn_exit_quiz;
    document.getElementById('restart-btn').textContent = t.btn_restart;
    if (!isSubmitted) {
        submitBtn.textContent = t.btn_submit_answer;
    }
    if (quizSection.classList.contains('active')) updateQuizInfo();
    updateAIRecommendation();
}

function updateQuizInfo() {
    const t = languagePack[currentLang];
    const levelName = {1: t.level_name_foundation, 2: t.level_name_intermediate, 3: t.level_name_higher}[currentLevel];
    document.getElementById('quiz-level-info').textContent = t.quiz_level_info.replace('{level}', levelName).replace('{current}', currentQIndex+1).replace('{total}', selectedQuestions.length);
    document.getElementById('quiz-score-info').textContent = t.quiz_score_info.replace('{score}', currentScore);
    document.getElementById('current-score').textContent = currentScore;
}

function updateProgress() {
    const progress = ((currentQIndex + (isSubmitted ? 1 : 0)) / selectedQuestions.length) * 100;
    progressBar.style.width = progress + '%';
}

function updateAIRecommendation() {
    const t = languagePack[currentLang];
    const l1 = StorageUtils.getCompletion(1);
    const l2 = StorageUtils.getCompletion(2);
    let show = false, text = '';
    if (l1 && l1.rate >= 80 && !l2) {
        show = true;
        text = t.recommend_text.replace('{level}', t.level_name_foundation).replace('{next_level}', t.level_name_intermediate);
    } else if (l2 && l2.rate >= 80) {
        show = true;
        text = t.recommend_text.replace('{level}', t.level_name_intermediate).replace('{next_level}', t.level_name_higher);
    }
    recommendBox.style.display = show ? 'block' : 'none';
    if (show) recommendText.textContent = text;
}

// ---------- 测验核心 ----------
function startQuiz(level) {
    currentLevel = level;
    currentQIndex = 0;
    currentScore = 0;
    userAnswers = [];
    selectedOption = null;
    isSubmitted = false;

    const answeredIds = StorageUtils.getAnsweredIds(level);
    const all = questionBank[level];
    const unused = all.filter(q => !answeredIds.includes(q.id));
    if (unused.length >= 5) {
        selectedQuestions = unused.sort(() => Math.random() - 0.5).slice(0, 5);
    } else {
        const used = all.filter(q => answeredIds.includes(q.id));
        selectedQuestions = [...unused.sort(() => Math.random() - 0.5), ...used.sort(() => Math.random() - 0.5).slice(0, 5 - unused.length)];
    }

    renderQuestion();
    showSection(quizSection);
    updateQuizInfo();
    updateProgress();
}

function renderQuestion() {
    const q = selectedQuestions[currentQIndex];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = '';
    selectedOption = null;
    isSubmitted = false;
    submitBtn.disabled = true;
    submitBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    feedbackBox.className = 'feedback-box';
    feedbackBox.textContent = '';

    q.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'option-item';
        div.dataset.index = i;
        div.innerHTML = `<div class="option-radio"></div><span>${opt}</span>`;
        div.addEventListener('click', () => selectOption(i, div));
        optionsContainer.appendChild(div);
    });
}

function selectOption(index, el) {
    if (isSubmitted) return;
    document.querySelectorAll('.option-item').forEach(o => o.classList.remove('selected'));
    selectedOption = index;
    el.classList.add('selected');
    submitBtn.disabled = false;
}

function handleSubmitAnswer() {
    const t = languagePack[currentLang];
    const q = selectedQuestions[currentQIndex];
    const options = document.querySelectorAll('.option-item');
    isSubmitted = true;
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';

    const isCorrect = selectedOption === q.correct;
    userAnswers[currentQIndex] = {
        question: q.question,
        userAnswer: q.options[selectedOption],
        correctAnswer: q.options[q.correct],
        isCorrect,
        explanation: q.explanation
    };

    if (isCorrect) {
        currentScore++;
        feedbackBox.className = 'feedback-box correct';
        feedbackBox.textContent = t.feedback_correct.replace('{explanation}', q.explanation);
    } else {
        feedbackBox.className = 'feedback-box incorrect';
        feedbackBox.textContent = t.feedback_incorrect.replace('{answer}', q.options[q.correct]).replace('{explanation}', q.explanation);
    }

    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) opt.classList.add('correct');
        else if (i === selectedOption && i !== q.correct) opt.classList.add('incorrect');
    });

    nextBtn.textContent = (currentQIndex === selectedQuestions.length - 1) ? t.btn_submit_quiz : t.btn_next;
    updateQuizInfo();
    updateProgress();
}

function handleNextQuestion() {
    if (currentQIndex === selectedQuestions.length - 1) {
        StorageUtils.saveCompletion(currentLevel, currentScore, selectedQuestions.length);
        const answered = StorageUtils.getAnsweredIds(currentLevel);
        const newIds = [...new Set([...answered, ...selectedQuestions.map(q => q.id)])];
        StorageUtils.saveAnsweredIds(currentLevel, newIds);
        showResult();
    } else {
        currentQIndex++;
        renderQuestion();
        updateQuizInfo();
        updateProgress();
    }
}

function showResult() {
    finalScoreSpan.textContent = currentScore;
    finalTotalSpan.textContent = `/ ${selectedQuestions.length}`;
    showSection(resultSection);
    reviewContainer.style.display = 'none';
    reviewBtn.textContent = languagePack[currentLang].btn_review;
    updateAIRecommendation();
}

function restartQuiz() {
    showSection(welcomeSection);
    resetQuizState();
}

function exitQuiz() {
    const t = languagePack[currentLang];
    if (confirm(t.confirm_exit)) {
        resetQuizState();
        showSection(welcomeSection);
    }
}

function resetQuizState() {
    currentQIndex = 0;
    currentScore = 0;
    selectedQuestions = [];
    userAnswers = [];
    selectedOption = null;
    isSubmitted = false;
    submitBtn.disabled = true;
    submitBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    progressBar.style.width = '0%';
}

function toggleReview() {
    const t = languagePack[currentLang];
    if (reviewContainer.style.display === 'none') {
        reviewList.innerHTML = '';
        userAnswers.forEach((ans, i) => {
            const div = document.createElement('div');
            div.className = 'question-card';
            div.style.marginBottom = '1rem';
            div.innerHTML = `<h3>${i+1}. ${ans.question}</h3>
                <p style="color:${ans.isCorrect ? '#2f855a' : '#c53030'}"><strong>Your answer:</strong> ${ans.userAnswer}</p>
                <p><strong>Correct answer:</strong> ${ans.correctAnswer}</p>
                <p>${ans.explanation}</p>`;
            reviewList.appendChild(div);
        });
        reviewContainer.style.display = 'block';
        reviewBtn.textContent = t.btn_hide_review;
    } else {
        reviewContainer.style.display = 'none';
        reviewBtn.textContent = t.btn_review;
    }
}

// ---------- 朗读 ----------
function speakQuestion() {
    if (!quizSection.classList.contains('active')) return;
    const q = selectedQuestions[currentQIndex];
    const text = `${q.question}. Options: ${q.options.join(', ')}`;
    captionContainer.style.display = 'block';
    captionText.textContent = text;
    if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
        speechSynthesis.speak(u);
        u.onend = () => setTimeout(() => captionContainer.style.display = 'none', 2000);
    } else {
        setTimeout(() => captionContainer.style.display = 'none', 5000);
    }
}

// ---------- 主题/字体/语言 ----------
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}
function toggleLang() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateTexts();
    localStorage.setItem('lang', currentLang);
}
function changeFontSize(delta) {
    baseFontSize = Math.min(24, Math.max(12, baseFontSize + delta * 2));
    document.documentElement.style.setProperty('--font-size-base', baseFontSize + 'px');
    fontSizeValue.textContent = baseFontSize + 'px';
    localStorage.setItem('fontSize', baseFontSize);
}

// ---------- 初始化 ----------
function init() {
    // 加载偏好
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    themeSelect.value = savedTheme;
    const savedLang = localStorage.getItem('lang') || 'en';
    currentLang = savedLang;
    updateTexts();
    const savedFont = localStorage.getItem('fontSize');
    if (savedFont) {
        baseFontSize = parseInt(savedFont);
        document.documentElement.style.setProperty('--font-size-base', savedFont + 'px');
        fontSizeValue.textContent = savedFont + 'px';
    }

    // 隐私弹窗
    if (!StorageUtils.getPrivacy()) {
        privacyModal.classList.add('active');
    }
    document.getElementById('privacy-confirm-btn').addEventListener('click', () => {
        StorageUtils.savePrivacy();
        privacyModal.classList.remove('active');
    });

    // 休息提醒
    restTimer = setInterval(() => {
        if (Date.now() - useStartTime >= 20 * 60 * 1000) {
            restModal.classList.add('active');
            useStartTime = Date.now();
        }
    }, 60000);
    document.getElementById('rest-confirm-btn').addEventListener('click', () => {
        restModal.classList.remove('active');
    });

    // 主题下拉事件
    themeSelect.addEventListener('change', e => setTheme(e.target.value));

    // 绑定全局函数
    window.toggleLang = toggleLang;
    window.changeFontSize = changeFontSize;
    window.startQuiz = startQuiz;
    window.handleSubmitAnswer = handleSubmitAnswer;
    window.handleNextQuestion = handleNextQuestion;
    window.exitQuiz = exitQuiz;
    window.restartQuiz = restartQuiz;
    window.toggleReview = toggleReview;
    window.speakQuestion = speakQuestion;

    updateAIRecommendation();
}

document.addEventListener('DOMContentLoaded', init);