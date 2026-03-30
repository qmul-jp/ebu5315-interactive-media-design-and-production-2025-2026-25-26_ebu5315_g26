/* ============================================================
   game.js — Circle Master
   Covers: i18n · Theme · Font Size · Game Engine · Canvas
   ============================================================ */

'use strict';

// ─── 1. MULTILINGUAL DICTIONARY (Bilingual EN / ZH) ─────────────────
const i18n = {
    en: {
        home:      'Home',
        game:      'Game',
        themeDark: '🌙 Dark Mode',
        themeLight:'☀️ Light Mode',
        langBtn:   '🌐 中文',
 Master',
        desc:      'Pop the correct circle based on the GCSE Math formula!',
        score:     'Score',
        lives:     'Lives',
        level:     'Level',
        startText: 'Click [Start Game] to begin!',
        startBtn:  '▶ Start Game',
        resetBtn:  '↺ Reset',
        hintBtn:   '❓ Hint',
        gameOver:  'Game Over!',
        hintText:  'Area          = π × r²\nCircumference = 2 × π × r\n(π ≈ 3.14159)',
        qArea:     'Find the circle with Area ≈ ',
        qCircum:   'Find the circle with Circumference ≈ ',
    },
    zh: {
        home:      '主页',
        game:      '游戏',
        themeDark: '🌙 开启暗黑',
        themeLight:'☀️ 开启明亮',
        langBtn:   '🌐 English',
        desc:      '根据数学公式，戳破正确的圆！',
        score:     '得分',
        lives:     '生命',
        level:     '关卡',
        startText: '点击【开始游戏】！',
        startBtn:  '▶ 开始游戏',
        resetBtn:  '↺ 重置',
        hintBtn:   '❓ 提示',
        gameOver:  '游戏结束！',
        hintText:  '面积 = π × r²\n周长 = 2 × π × r\n（π ≈ 3.14159）',
        qArea:     '找出面积约为 ',
        qCircum:   '找出周长约为 ',
    },
};

let currentLang = 'en';

/** Apply all translated strings to DOM */
function updateLang() {
    const t   = i18n[currentLang];
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';

    document.getElementById('nav-home').textContent   = t.home;
    document.getElementById('nav-game').textContent   = t.game;
    document.getElementById('btn-lang').textContent   = t.langBtn;
    document.getElementById('btn-theme').textContent  = dark ? t.themeLight : t.themeDark;
    document.getElementById('title').textContent      = t.title;
    document.getElementById('desc').textContent       = t.desc;
    document.getElementById('txt-score').textContent  = t.score;
    document.getElementById('txt-lives').textContent  = t.lives;
    document.getElementById('txt-level').textContent  = t.level;
    document.getElementById('btn-start').textContent  = t.startBtn;
    document.getElementById('btn-reset').textContent  = t.resetBtn;
    document.getElementById('btn-hint').textContent   = t.hintBtn;
    document.getElementById('game-over').textContent  = t.gameOver;

    if (!state.isPlaying) {
        document.getElementById('question-box').textContent = t.startText;
    } else {
        renderQuestionText();
    }
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateLang();
}

// ─── 2. INCLUSIVE DESIGN: THEME & FONT SIZE ─────────────────────────

function toggleTheme() {
    const root = document.documentElement;
    root.setAttribute(
        'data-theme',
        root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
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

// ─── 3. GAME STATE ───────────────────────────────────────────────────

const state = {
    score:        0,
    lives:        3,
    level:        1,
    isPlaying:    false,
    questionType: 'area',   // 'area' | 'circumference'
    targetCircle: null,
};

// ─── 4. CANVAS SETUP ─────────────────────────────────────────────────

const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');
let   circles = [];
let   animId  = null;

// ─── 5. CIRCLE CLASS ─────────────────────────────────────────────────

const CIRCLE_COLORS = [
    '#e91e63', // pink
    '#9c27b0', // purple
    '#3f51b5', // indigo
    '#00bcd4', // cyan
    '#ffeb3b', // yellow
    '#ff9800', // orange
];

class Circle {
    /**
     * @param {number} r     - radius in logical canvas px
     * @param {string} color - fill colour
     */
    constructor(r, color) {
        this.r     = r;
        this.color = color;
        this.x     = Math.random() * (canvas.width  - r * 2) + r;
        this.y     = Math.random() * (canvas.height - r * 2) + r;
        // Speed scales slightly with level
        const spd  = 1 + state.level * 0.3;
        this.dx    = (Math.random() - 0.5) * spd * 2;
        this.dy    = (Math.random() - 0.5) * spd * 2;

        // GCSE maths properties
        this.area          = Math.PI * r * r;
        this.circumference = 2 * Math.PI * r;
    }

    draw() {
        // Shadow glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 12;

        // Circle fill
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 0;

        // Radius label inside circle
        ctx.fillStyle      = 'rgba(255,255,255,.92)';
        ctx.font           = `bold ${Math.max(11, this.r * 0.4)}px monospace`;
        ctx.textAlign      = 'center';
        ctx.textBaseline   = 'middle';
        ctx.fillText(`r=${this.r}`, this.x, this.y);
    }

    update() {
        // Bounce off walls
        if (this.x + this.r >= canvas.width  || this.x - this.r <= 0) this.dx = -this.dx;
        if (this.y + this.r >= canvas.height || this.y - this.r <= 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

// ─── 6. LEVEL GENERATION ─────────────────────────────────────────────

function generateLevel() {
    circles = [];
    const count = Math.min(3 + state.level, 6);

    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * 40) + 10; // 10–50
        circles.push(new Circle(r, CIRCLE_COLORS[i % CIRCLE_COLORS.length]));
    }

    // Pick random target
    state.targetCircle  = circles[Math.floor(Math.random() * circles.length)];
    // Level 1 → area only; level 2+ → random
    state.questionType  = (state.level === 1)
        ? 'area'
        : (Math.random() > 0.5 ? 'area' : 'circumference');

    renderQuestionText();
}

function renderQuestionText() {
    const t  = i18n[currentLang];
    const tc = state.targetCircle;
    if (!tc) return;

    const val = state.questionType === 'area'
        ? tc.area.toFixed(2)
        : tc.circumference.toFixed(2);

    const label = state.questionType === 'area' ? t.qArea : t.qCircum;

    document.getElementById('question-box').textContent = label + val;
}

// ─── 7. ANIMATION LOOP ───────────────────────────────────────────────

function animate() {
    if (!state.isPlaying) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(c => c.update());
    animId = requestAnimationFrame(animate);
}

// ─── 8. HUD UPDATE ───────────────────────────────────────────────────

function updateHUD() {
    document.getElementById('score').textContent = state.score;
    document.getElementById('level').textContent = state.level;
    document.getElementById('lives').textContent =
        '❤️'.repeat(state.lives) + '💔'.repeat(3 - state.lives);
}

// ─── 9. CANVAS CLICK HANDLER ─────────────────────────────────────────

canvas.addEventListener('click', (e) => {
    if (!state.isPlaying) return;

    const rect   = canvas.getBoundingClientRect();
    // Scale-corrected coordinates (handles CSS resizing)
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx     = (e.clientX - rect.left) * scaleX;
    const cy     = (e.clientY - rect.top)  * scaleY;

    for (const circle of circles) {
        const dist = Math.hypot(cx - circle.x, cy - circle.y);
        if (dist > circle.r) continue;

        if (circle === state.targetCircle) {
            // ✅ Correct hit
            state.score += 10;
            if (state.score % 30 === 0) state.level++;
            updateHUD();
            generateLevel();
        } else {
            // ❌ Wrong hit — tolerance feedback (⑦ Question box flash)
            state.lives--;
            updateHUD();
            const qb = document.getElementById('question-box');
            qb.classList.add('question-box--error');
            setTimeout(() => qb.classList.remove('question-box--error'), 400);

            if (state.lives <= 0) endGame();
        }
        break;
    }
});

// ─── 10. GAME LIFECYCLE ──────────────────────────────────────────────

function startGame() {
    if (state.isPlaying) return;

    // Reset state silently then begin
    _resetState();
    state.isPlaying = true;

    document.getElementById('game-over').style.display = 'none';
    document.querySelector('.canvas-wrapper').classList.remove('idle');

    generateLevel();
    animate();
}

function resetGame() {
    _resetState();
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('question-box').textContent =
        i18n[currentLang].startText;
    document.getElementById('game-over').style.display = 'none';
    document.querySelector('.canvas-wrapper').classList.add('idle');

    updateHUD();
}

function endGame() {
    state.isPlaying = false;
    cancelAnimationFrame(animId);

    // ⑦ Show Game Over Banner (display:none → block)
    const banner = document.getElementById('game-over');
    banner.style.display = 'block';

    document.getElementById('question-box').textContent =
        i18n[currentLang].gameOver;
}

function _resetState() {
    state.score        = 0;
    state.lives        = 3;
    state.level        = 1;
    state.isPlaying    = false;
    state.targetCircle = null;
}

// ─── 11. INITIALISE ──────────────────────────────────────────────────

(function init() {
    updateHUD();
    updateLang();
    // Show wireframe idle cross-lines before game starts
    document.querySelector('.canvas-wrapper').classList.add('idle');
})();
