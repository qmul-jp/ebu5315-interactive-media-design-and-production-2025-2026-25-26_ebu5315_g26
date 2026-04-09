/* ================================================================
   game.js — Circle Master | Mobile-Optimized Game 
   Features: i18n · Dark Theme · Font Size · Touch Events ·
             Dynamic Canvas Resize · Physics Engine
   ================================================================ */

'use strict';

/* ── 1. MULTILINGUAL DICTIONARY ─────────────────────────────────── */
const i18n = {
    en: {
        home:       'Home',
        game:       'Game',
        themeDark:  '🌙 Dark',
        themeLight: '☀️ Light',
        langBtn:    '🌐 中文',
        desc:       'Pop the correct circle based on the GCSE Math formula!',
        score:      'Score',
        lives:      'Lives',
        level:      'Level',
        startText:  'Tap [Start Game] to begin!',   /* 移动端用 Tap */
        idleText:   'Tap Start to Play',
        startBtn:   '▶ Start',
        resetBtn:   '↺ Reset',
        hintBtn:    '❓ Hint',
        gameOver:   'Game Over!',
        hintText:   'Area          = π × r²\nCircumference = 2 × π × r\n(π ≈ 3.14159)',
        qArea:      'Find the circle with Area ≈ ',
        qCircum:    'Find the circle with Circumference ≈ ',
    },
    zh: {
        home:       '主页',
        game:       '游戏',
        themeDark:  '🌙 暗黑',
        themeLight: '☀️ 明亮',
        langBtn:    '🌐 EN',
        desc:       '根据数学公式，戳破正确的圆！',
        score:      '得分',
        lives:      '生命',
        level:      '关卡',
        startText:  '点击【开始游戏】！',
        idleText:   '点击开始游戏',
        startBtn:   '▶ 开始',
        resetBtn:   '↺ 重置',
        hintBtn:    '❓ 提示',
        gameOver:   '游戏结束！',
        hintText:   '面积 = π × r²\n周长 = 2 × π × r\n（π ≈ 3.14159）',
        qArea:      '找出面积约为 ',
        qCircum:    '找出周长约为 ',
    },
};

let currentLang = 'en';

/** 将所有翻译文字刷新到 DOM */
function updateLang() {
    const t    = i18n[currentLang];
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';

    _setText('nav-home',    t.home);
    _setText('nav-game',    t.game);
    _setText('btn-lang',    t.langBtn);
    _setText('btn-theme',   dark ? t.themeLight : t.themeDark);
    _setText('title',       t.title);
    _setText('desc',        t.desc);
    _setText('txt-score',   t.score);
    _setText('txt-lives',   t.lives);
    _setText('txt-level',   t.level);
    _setText('btn-start',   t.startBtn);
    _setText('btn-reset',   t.resetBtn);
    _setText('btn-hint',    t.hintBtn);
    _setText('game-over',   t.gameOver);
    _setText('idle-text',   t.idleText);

    if (!state.isPlaying) {
        _setText('question-box', t.startText);
    } else {
        renderQuestionText();
    }
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateLang();
}

/** Helper: 安全设置 innerText */
function _setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

/* ── 2. INCLUSIVE DESIGN: THEME & FONT SIZE ──────────────────── */

function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    updateLang();
}

let baseFontSize = 16;

function changeFontSize(step) {
    baseFontSize = Math.min(24, Math.max(12, baseFontSize + step * 2));
    document.documentElement.style.setProperty('--font-size', baseFontSize + 'px');
}

function alertHint() {
    alert(i18n[currentLang].hintText);
}

/* ── 3. CANVAS: 动态尺寸 (Mobile Responsive) ─────────────────── */

const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');
const wrapper = document.getElementById('canvas-wrapper');

/**
 * 根据屏幕宽度动态设置 Canvas 逻辑分辨率
 * 移动端使用更小的高度, 减少滚动
 */
function resizeCanvas() {
    const w = wrapper.clientWidth;

    // 移动端比例: 宽 : 高 = 2:1 (手机) → 2.5:1 (平板/桌面)
    const ratio = window.innerWidth >= 768 ? 2.5 : 2.0;
    const h     = Math.round(w / ratio);

    canvas.width  = w;
    canvas.height = h;

    // 同步 CSS 高度 (避免黑边)
    wrapper.style.height = h + 'px';
}

/* ── 4. GAME STATE ───────────────────────────────────────────── */

const state = {
    score:        0,
    lives:        3,
    level:        1,
    isPlaying:    false,
    questionType: 'area',
    targetCircle: null,
};

let circles = [];
let animId  = null;

/* ── 5. CIRCLE CLASS ─────────────────────────────────────────── */

const COLORS = ['#e91e63','#9c27b0','#3f51b5','#00bcd4','#ffeb3b','#ff9800'];

class Circle {
    /**
     * @param {number} r     - 半径 (逻辑像素)
     * @param {string} color - 填充颜色
     */
    constructor(r, color) {
        this.r     = r;
        this.color = color;

        // 初始位置: 留出边距防止初始就出界
        this.x = Math.random() * (canvas.width  - r * 2) + r;
        this.y = Math.random() * (canvas.height - r * 2) + r;

        // 速度随关卡递增
        const spd  = (1 + state.level * 0.25) * (canvas.width / 800);
        this.dx    = (Math.random() - 0.5) * spd * 2;
        this.dy    = (Math.random() - 0.5) * spd * 2;

        // GCSE 数学属性
        this.area          = Math.PI * r * r;
        this.circumference = 2 * Math.PI * r;
    }

    draw() {
        // 发光效果
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 10;

        // 圆形本体
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 0;

        // 半径标签 (字号随圆大小自适应)
        const fontSize = Math.max(9, Math.min(this.r * 0.38, 16));
        ctx.fillStyle    = 'rgba(255,255,255,.95)';
        ctx.font         = `bold ${fontSize}px monospace`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`r=${this.r}`, this.x, this.y);
    }

    update() {
        // 边界碰撞反弹
        if (this.x + this.r >= canvas.width  || this.x - this.r <= 0) this.dx = -this.dx;
        if (this.y + this.r >= canvas.height || this.y - this.r <= 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

/* ── 6. LEVEL GENERATION ─────────────────────────────────────── */

function generateLevel() {
    circles = [];
    const count = Math.min(3 + state.level, 6);

    // 移动端: 半径相对 canvas 宽度缩放, 防止圆太大占满屏幕
    const maxR  = Math.floor(canvas.width * 0.07);  // 最大半径 ≈ canvas 宽度的 7%
    const minR  = Math.max(10, Math.floor(canvas.width * 0.025));

    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * (maxR - minR)) + minR;
        circles.push(new Circle(r, COLORS[i % COLORS.length]));
    }

    state.targetCircle = circles[Math.floor(Math.random() * circles.length)];
    state.questionType = (state.level === 1)
        ? 'area'
        : (Math.random() > 0.5 ? 'area' : 'circumference');

    renderQuestionText();
}

function renderQuestionText() {
    const t  = i18n[currentLang];
    const tc = state.targetCircle;
    if (!tc) return;

    const val   = state.questionType === 'area'
        ? tc.area.toFixed(2)
        : tc.circumference.toFixed(2);
    const label = state.questionType === 'area' ? t.qArea : t.qCircum;

    _setText('question-box', label + val);
}

/* ── 7. ANIMATION LOOP ───────────────────────────────────────── */

function animate() {
    if (!state.isPlaying) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(c => c.update());
    animId = requestAnimationFrame(animate);
}

/* ── 8. HUD UPDATE ───────────────────────────────────────────── */

function updateHUD() {
    _setText('score', state.score);
    _setText('level', state.level);
    _setText('lives',
        '❤️'.repeat(state.lives) + '💔'.repeat(3 - state.lives)
    );
}

/* ── 9. INPUT HANDLERS (Click + Touch) ──────────────────────── */

/**
 * 统一处理 click (桌面) 和 touchend (移动端) 事件
 * 关键: 使用 canvas.getBoundingClientRect() 修正坐标
 */
function handleInput(clientX, clientY) {
    if (!state.isPlaying) return;

    const rect   = canvas.getBoundingClientRect();
    // Scale 修正: CSS 显示尺寸 vs 逻辑像素尺寸
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const x      = (clientX - rect.left) * scaleX;
    const y      = (clientY - rect.top)  * scaleY;

    for (const circle of circles) {
        if (Math.hypot(x - circle.x, y - circle.y) > circle.r) continue;

        if (circle === state.targetCircle) {
            // ✅ 答对
            state.score += 10;
            if (state.score % 30 === 0) state.level++;
            updateHUD();
            generateLevel();
        } else {
            // ❌ 答错 — 红色闪烁反馈
            state.lives--;
            updateHUD();
            const qb = document.getElementById('question-box');
            qb.classList.add('question-box--error');
            setTimeout(() => qb.classList.remove('question-box--error'), 400);
            if (state.lives <= 0) endGame();
        }
        break;
    }
}

/* 桌面端: 鼠标点击 */
canvas.addEventListener('click', (e) => {
    handleInput(e.clientX, e.clientY);
});

/* 移动端: 触摸事件
   使用 touchend 而非 touchstart, 避免与滚动冲突
   preventDefault() 防止触摸后触发 click 事件 (300ms 延迟问题) */
canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    if (touch) handleInput(touch.clientX, touch.clientY);
}, { passive: false });

/* ── 10. GAME LIFECYCLE ──────────────────────────────────────── */

function startGame() {
    if (state.isPlaying) return;

    _resetState();
    state.isPlaying = true;

    // 隐藏空闲遮罩
    const overlay = document.getElementById('canvas-idle');
    overlay.classList.add('hidden');
    setTimeout(() => { overlay.style.display = 'none'; }, 400);

    document.getElementById('game-over').style.display = 'none';

    generateLevel();
    animate();
}

function resetGame() {
    cancelAnimationFrame(animId);
    _resetState();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 重新显示空闲遮罩
    const overlay = document.getElementById('canvas-idle');
    overlay.style.display = 'flex';
    overlay.classList.remove('hidden');

    _setText('question-box', i18n[currentLang].startText);
    _setText('idle-text',    i18n[currentLang].idleText);
    document.getElementById('game-over').style.display = 'none';

    updateHUD();
}

function endGame() {
    state.isPlaying = false;
    cancelAnimationFrame(animId);

    // ⑦ 显示 Game Over Banner
    document.getElementById('game-over').style.display = 'block';
    _setText('question-box', i18n[currentLang].gameOver);
}

function _resetState() {
    state.score        = 0;
    state.lives        = 3;
    state.level        = 1;
    state.isPlaying    = false;
    state.targetCircle = null;
}

/* ── 11. WINDOW RESIZE (重新计算 Canvas 尺寸) ────────────────── */

let resizeTimer;
window.addEventListener('resize', () => {
    // 防抖: 避免 resize 事件触发过于频繁
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        resizeCanvas();

        // 如果游戏正在运行, 重新生成关卡以适应新尺寸
        if (state.isPlaying) {
            generateLevel();
        }
    }, 150);
});

/* ── 12. INITIALISE ──────────────────────────────────────────── */

(function init() {
    resizeCanvas();  // 先设置 Canvas 尺寸
    updateHUD();
    updateLang();
})();
