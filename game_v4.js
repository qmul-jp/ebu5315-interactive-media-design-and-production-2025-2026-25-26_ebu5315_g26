/* ─────────────────────────────────────────────────────────────────
   GAME MODE REGISTRY
   ───────────────────────────────────────────────────────────────── */
const MODES = {
    classic: {
        key:'classic', category:'classic', descKey:'descClassic',
        getQuestion(c, type, lang) {
            const t = i18n[lang];
            if (type === 'area')          return { text: t.qArea   + ' ' + c.area.toFixed(2) };
            if (type === 'circumference') return { text: t.qCircum + ' ' + c.circumference.toFixed(2) };
            return { text: t.qDiam + ' ' + c.diameter };
        },
        hints(lang) {
            const t = i18n[lang];
            return [
                { title:t.hintAreaTitle, eq:t.hintAreaEq, note:t.hintAreaNote },
                { title:t.hintCircTitle, eq:t.hintCircEq, note:t.hintCircNote },
                { title:t.hintDiamTitle, eq:t.hintDiamEq, note:t.hintDiamNote },
            ];
        },
    },
    angle_centre: {
        key:'angle_centre', category:'theorem', descKey:'descAngleCentre',
        getQuestion(c, _t, lang) {
            const t = i18n[lang];
            return { text: t.qAngleCentre + ' ' + (c.r * 2) + ' deg' };
        },
        hints(lang) {
            const t = i18n[lang];
            return [{ title:t.thmAngleCentreTitle, eq:t.thmAngleCentreEq, note:t.thmAngleCentreNote, cls:'eq--theorem' }];
        },
    },
    angle_semicircle: {
        key:'angle_semicircle', category:'theorem', descKey:'descAngleSemi',
        getQuestion(c, _t, lang) {
            const t = i18n[lang];
            return { text: t.qAngleSemi + ' ' + c.diameter + ' ' + t.unitPx };
        },
        hints(lang) {
            const t = i18n[lang];
            return [{ title:t.thmSemiTitle, eq:t.thmSemiEq, note:t.thmSemiNote, cls:'eq--theorem' }];
        },
    },
    cyclic_quad: {
        key:'cyclic_quad', category:'theorem', descKey:'descCyclicQuad',
        getQuestion(c, _t, lang) {
            const t = i18n[lang];
            const a = Math.round(c.r * 1.5), b = 180 - a;
            return { text: t.qCyclicQuad + ' ' + a + ' deg — ' + t.qFindOpposite + ' ' + b + ' deg' };
        },
        hints(lang) {
            const t = i18n[lang];
            return [{ title:t.thmCyclicTitle, eq:t.thmCyclicEq, note:t.thmCyclicNote, cls:'eq--theorem' }];
        },
    },
    same_arc: {
        key:'same_arc', category:'theorem', descKey:'descSameArc',
        getQuestion(c, _t, lang) {
            const t = i18n[lang];
            return { text: t.qSameArc + ' ' + Math.round(c.r * 1.8) + ' deg' };
        },
        hints(lang) {
            const t = i18n[lang];
            return [{ title:t.thmSameArcTitle, eq:t.thmSameArcEq, note:t.thmSameArcNote, cls:'eq--theorem' }];
        },
    },
    alternate_seg: {
        key:'alternate_seg', category:'theorem', descKey:'descAltSeg',
        getQuestion(c, _t, lang) {
            const t = i18n[lang];
            return { text: t.qAltSeg + ' ' + Math.round(c.r * 2) + ' deg' };
        },
        hints(lang) {
            const t = i18n[lang];
            return [{ title:t.thmAltSegTitle, eq:t.thmAltSegEq, note:t.thmAltSegNote, cls:'eq--theorem' }];
        },
    },
    tangent_radius: {
        key:'tangent_radius', category:'theorem', descKey:'descTanRadius',
        getQuestion(c, _t, lang) {
            const t = i18n[lang];
            return { text: t.qTanRadius + ' ' + c.r + ' — ' + t.qTanRadiusAngle };
        },
        hints(lang) {
            const t = i18n[lang];
            return [{ title:t.thmTanRadTitle, eq:t.thmTanRadEq, note:t.thmTanRadNote, cls:'eq--theorem' }];
        },
    },
    tangent_equal: {
        key:'tangent_equal', category:'theorem', descKey:'descTanEqual',
        getQuestion(c, _t, lang) {
            const t = i18n[lang];
            const d = c.r * 1.8;
            const tLen = Math.sqrt(d * d - c.r * c.r).toFixed(2);
            return { text: t.qTanEqual + ' ' + tLen + ' ' + t.unitPx };
        },
        hints(lang) {
            const t = i18n[lang];
            return [{ title:t.thmTanEqTitle, eq:t.thmTanEqEq, note:t.thmTanEqNote, cls:'eq--theorem' }];
        },
    },
    arrow_theorem: {
        key:'arrow_theorem', category:'theorem', descKey:'descArrow',
        getQuestion(c, _t, lang) {
            const t = i18n[lang];
            return { text: t.qArrow + ' ' + (360 - 2 * c.r) + ' deg' };
        },
        hints(lang) {
            const t = i18n[lang];
            return [{ title:t.thmArrowTitle, eq:t.thmArrowEq, note:t.thmArrowNote, cls:'eq--theorem' }];
        },
    },
};

/* ─────────────────────────────────────────────────────────────────
   I18N
   ───────────────────────────────────────────────────────────────── */
const i18n = {
    en: {
        home:'Home', game:'Game', quiz:'Quiz',
        themeLabel:'Theme:',
        themeLight:'Light', themeDark:'Dark',
        themeEyecare:'Eye Care', themeColorblind:'Color Blind Friendly',
        langBtn:'ZH', modeLabel:'Mode:',
        optClassic:'Classic', optgroupClassic:'Classic', optgroupTheorems:'Circle Theorems',
        optAngleCentre:'Angle at Centre', optAngleSemi:'Angles in Semicircle',
        optCyclicQuad:'Cyclic Quadrilateral', optSameArc:'Same Segment',
        optAltSeg:'Alternate Segment', optTanRadius:'Tangent-Radius (90)',
        optTanEqual:'Tangents from Same Point', optArrow:'Arrow Head Theorem',
        score:'Score', lives:'Lives', level:'Level', timer:'Time',
        startText:'Click [Start] to begin!', idleText:'Tap Start to Play',
        startBtn:'Start', resetBtn:'Reset', hintBtn:'Hint',
        gameOver:'Game Over!', finalScore:'Final Score',
        levelReached:'Level Reached', modeLabel2:'Mode', playAgain:'Play Again',
        confirmReset:'Reset Game?', resetMsg:'Your current progress will be lost.',
        confirm:'Confirm', cancel:'Cancel', gotIt:'Got it', unitPx:'units',
        descClassic:'Find the circle matching the given area, circumference or diameter.',
        descAngleCentre:'Angle at Centre: the central angle is twice any inscribed angle on the same arc.',
        descAngleSemi:'Angle in a Semicircle: any inscribed angle in a semicircle is always 90 degrees.',
        descCyclicQuad:'Cyclic Quadrilateral: opposite angles sum to 180 degrees.',
        descSameArc:'Angles in the Same Segment: angles subtending the same arc on the same side are equal.',
        descAltSeg:'Alternate Segment Theorem: tangent-chord angle equals the inscribed angle in the alternate segment.',
        descTanRadius:'Tangent-Radius: a tangent is perpendicular (90 deg) to the radius at the contact point.',
        descTanEqual:'Tangents from the Same External Point are always equal in length.',
        descArrow:'Arrow Head Theorem: reflex central angle = 360 - 2 x inscribed angle.',
        qArea:'Find the circle with Area =', qCircum:'Find the circle with Circumference =',
        qDiam:'Find the circle with Diameter =',
        qAngleCentre:'Find the circle with central angle =',
        qAngleSemi:'Semicircle with diameter =',
        qCyclicQuad:'Cyclic quad: angle A =', qFindOpposite:'find the circle where opposite angle =',
        qSameArc:'Find the circle with inscribed angle =',
        qAltSeg:'Find the circle with chord-tangent angle =',
        qTanRadius:'Tangent meets radius r =', qTanRadiusAngle:'at 90 degrees — find that circle.',
        qTanEqual:'Tangent length from external point =',
        qArrow:'Arrow theorem — reflex angle =',
        hintTitle:'Formulas',
        hintAreaTitle:'Area', hintAreaEq:'A = pi x r^2', hintAreaNote:'r = radius,  pi = 3.14159',
        hintCircTitle:'Circumference', hintCircEq:'C = 2 x pi x r', hintCircNote:'Also written as C = pi x d',
        hintDiamTitle:'Diameter', hintDiamEq:'d = 2 x r', hintDiamNote:'Diameter = twice the radius',
        thmAngleCentreTitle:'Angle at Centre', thmAngleCentreEq:'Central angle = 2 x inscribed angle', thmAngleCentreNote:'Both angles subtend the same arc.',
        thmSemiTitle:'Angle in a Semicircle', thmSemiEq:'Inscribed angle in semicircle = 90 deg', thmSemiNote:'The diameter acts as the hypotenuse.',
        thmCyclicTitle:'Cyclic Quadrilateral', thmCyclicEq:'Angle A + Angle C = 180 deg', thmCyclicNote:'Opposite angles are supplementary.',
        thmSameArcTitle:'Angles in Same Segment', thmSameArcEq:'Inscribed angle1 = Inscribed angle2', thmSameArcNote:'Both angles subtend the same chord.',
        thmAltSegTitle:'Alternate Segment', thmAltSegEq:'Tangent-chord angle = inscribed angle', thmAltSegNote:'Also called the Tangent-Chord Angle Theorem.',
        thmTanRadTitle:'Tangent-Radius', thmTanRadEq:'Tangent is perpendicular to the radius', thmTanRadNote:'Angle at contact point = 90 deg.',
        thmTanEqTitle:'Tangents from Same Point', thmTanEqEq:'Tangent length = sqrt(d^2 - r^2)', thmTanEqNote:'d = distance from external point to centre, r = radius.',
        thmArrowTitle:'Arrow Head Theorem', thmArrowEq:'Reflex angle = 360 - 2 x inscribed angle', thmArrowNote:'Applies when the centre lies outside the inscribed angle.',
        comboPfx:'Combo x',
    },
    zh: {
        home:'主页', game:'游戏', quiz:'测验',
        themeLabel:'主题:',
        themeLight:'明亮', themeDark:'暗黑',
        themeEyecare:'护眼模式', themeColorblind:'色盲友好',
        langBtn:'EN', modeLabel:'模式:',
        optClassic:'经典模式', optgroupClassic:'经典', optgroupTheorems:'圆的定理',
        optAngleCentre:'圆心角定理', optAngleSemi:'半圆中的角',
        optCyclicQuad:'圆内接四边形', optSameArc:'同弧上的角',
        optAltSeg:'切线-弦角定理', optTanRadius:'切线与半径(90度)',
        optTanEqual:'同点切线等长', optArrow:'箭头定理',
        score:'得分', lives:'生命', level:'关卡', timer:'时间',
        startText:'点击【开始】游戏！', idleText:'点击开始游戏',
        startBtn:'开始', resetBtn:'重置', hintBtn:'提示',
        gameOver:'游戏结束！', finalScore:'最终得分',
        levelReached:'到达关卡', modeLabel2:'模式', playAgain:'再玩一次',
        confirmReset:'重置游戏？', resetMsg:'当前进度将丢失。',
        confirm:'确认', cancel:'取消', gotIt:'明白了', unitPx:'单位',
        descClassic:'找到符合给定面积、周长或直径的圆。',
        descAngleCentre:'圆心角定理：圆心角是同弧圆周角的两倍。',
        descAngleSemi:'半圆中的圆周角：半圆所对圆周角永远是 90 度。',
        descCyclicQuad:'圆内接四边形：对角之和为 180 度。',
        descSameArc:'同弧圆周角：同弧所对圆周角相等。',
        descAltSeg:'切线-弦角定理：切线与弦的夹角等于弦在另一侧所对的圆周角。',
        descTanRadius:'切线与半径定理：切线垂直于切点处的半径（90 度）。',
        descTanEqual:'同点两切线：从圆外同一点作两条切线，切线长相等。',
        descArrow:'箭头定理：优弧圆心角 = 360 - 2 x 圆周角。',
        qArea:'找出面积 =', qCircum:'找出周长 =', qDiam:'找出直径 =',
        qAngleCentre:'找出圆心角 =', qAngleSemi:'半圆直径 =',
        qCyclicQuad:'四边形角 A =', qFindOpposite:'找出对角 =',
        qSameArc:'找出圆周角 =', qAltSeg:'找出切线-弦角 =',
        qTanRadius:'切线与半径 r =', qTanRadiusAngle:'成 90 度，找到该圆。',
        qTanEqual:'切线长（从外部点）=', qArrow:'箭头定理 — 优弧圆心角 =',
        hintTitle:'公式提示',
        hintAreaTitle:'面积', hintAreaEq:'A = pi x r^2', hintAreaNote:'r = 半径，pi = 3.14159',
        hintCircTitle:'周长', hintCircEq:'C = 2 x pi x r', hintCircNote:'也可写作 C = pi x d',
        hintDiamTitle:'直径', hintDiamEq:'d = 2 x r', hintDiamNote:'直径 = 两倍半径',
        thmAngleCentreTitle:'圆心角定理', thmAngleCentreEq:'圆心角 = 2 x 圆周角', thmAngleCentreNote:'两角均对同一段弧。',
        thmSemiTitle:'半圆中的角', thmSemiEq:'半圆中的圆周角 = 90 度', thmSemiNote:'直径是直角三角形的斜边。',
        thmCyclicTitle:'圆内接四边形', thmCyclicEq:'角 A + 角 C = 180 度', thmCyclicNote:'圆内接四边形对角互补。',
        thmSameArcTitle:'同弧圆周角', thmSameArcEq:'圆周角1 = 圆周角2', thmSameArcNote:'两个角在同侧对同一条弦。',
        thmAltSegTitle:'切线-弦角定理', thmAltSegEq:'切线-弦角 = 另一侧的圆周角', thmAltSegNote:'也称弦切角定理。',
        thmTanRadTitle:'切线与半径', thmTanRadEq:'切线垂直于半径', thmTanRadNote:'切点处夹角 = 90 度。',
        thmTanEqTitle:'同点两切线等长', thmTanEqEq:'切线长 = sqrt(d^2 - r^2)', thmTanEqNote:'d = 外点到圆心距离，r = 半径。',
        thmArrowTitle:'箭头定理', thmArrowEq:'优弧圆心角 = 360 - 2 x 圆周角', thmArrowNote:'适用于圆心在圆周角外侧的情形。',
        comboPfx:'连击 x',
    },
};

let currentLang = 'en';
let currentMode = 'classic';

/* ─────────────────────────────────────────────────────────────────
   DOM CACHE
   ───────────────────────────────────────────────────────────────── */
const G = {};
[
    'nav-home-text','nav-game','nav-quiz',
    'theme-label-text','theme-select',
    'opt-theme-light','opt-theme-dark','opt-theme-eyecare','opt-theme-colorblind',
    'btn-lang-text',
    'mode-select','mode-label-text','game-title','desc',
    'mode-badge','theorem-desc-bar','theorem-desc-text',
    'txt-score','txt-lives','txt-level','txt-timer',
    'score','hearts-display','level','timer',
    'question-box','question-text','combo-text',
    'gameCanvas','canvas-wrapper','canvas-idle','idle-text','float-popup',
    'game-over','gameover-title-text',
    'gameover-score-label','gameover-score-value',
    'gameover-level-label','gameover-level-value',
    'gameover-mode-label','gameover-mode-value',
    'btn-start-text','btn-reset-text','btn-hint-text','btn-restart-text',
    'hint-modal','hint-title','hint-body','hint-close-text',
    'reset-modal','reset-title','reset-confirm-text',
    'btn-confirm-reset','btn-cancel-reset',
].forEach(id => { G[id] = document.getElementById(id); });

/* Shorthand aliases */
const canvas = G['gameCanvas'];
const ctx    = canvas.getContext('2d');

/* ─────────────────────────────────────────────────────────────────
   GAME STATE
   ───────────────────────────────────────────────────────────────── */
const state = {
    score:0, lives:3, level:1, combo:0, timeLeft:0,
    isPlaying:false, questionType:'area', targetCircle:null,
};
let circles = [], particles = [], animId = null, timerInterval = null;

/* ─────────────────────────────────────────────────────────────────
   COLORS
   ───────────────────────────────────────────────────────────────── */
const COLORS_N = ['#e91e63','#9c27b0','#3f51b5','#00bcd4','#ffeb3b','#ff9800','#4caf50','#f44336'];
const COLORS_CB= ['#0077bb','#33bbee','#009988','#ee7733','#cc3311','#ee3377','#bbbbbb','#dddddd'];
const getColors = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    return (theme === 'colorblind') ? COLORS_CB : COLORS_N;
};

/* ─────────────────────────────────────────────────────────────────
   CANVAS RESIZE - 移动端优化
   ───────────────────────────────────────────────────────────────── */
function resizeCanvas() {
    const wrapper = G['canvas-wrapper'];
    const w = wrapper.clientWidth;
    
    // 根据屏幕尺寸动态调整宽高比
    let ratio;
    const isMobile = window.innerWidth < 768;
    const isLandscape = window.innerWidth > window.innerHeight && window.innerHeight < 500;
    
    if (isLandscape) {
        ratio = 3.0;  // 横屏模式
    } else if (window.innerWidth < 480) {
        ratio = 1.9;  // 小屏幕手机
    } else if (isMobile) {
        ratio = 2.0;  // 平板/大屏手机
    } else {
        ratio = 2.4;  // 桌面
    }
    
    const h = Math.round(w / ratio);
    canvas.width  = w;
    canvas.height = h;
    canvas.style.height  = h + 'px';
    wrapper.style.height = h + 'px';
}

/* ─────────────────────────────────────────────────────────────────
   WEB AUDIO
   ───────────────────────────────────────────────────────────────── */
let audioCtx = null;
function _getAC() {
    if (!audioCtx) {
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
        catch(e) { return null; }
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}
function _tone(freq, type, dur, gain, delay) {
    delay = delay || 0;
    const ac = _getAC(); if (!ac) return;
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = type;
    o.frequency.setValueAtTime(freq, ac.currentTime + delay);
    g.gain.setValueAtTime(gain, ac.currentTime + delay);
    g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + delay + dur);
    o.start(ac.currentTime + delay); o.stop(ac.currentTime + delay + dur);
}
function playCorrectSound() { _tone(523,'sine',.12,.25,0); _tone(659,'sine',.12,.2,.08); _tone(784,'sine',.18,.2,.16); }
function playWrongSound()   { _tone(280,'sawtooth',.09,.15,0); _tone(220,'sawtooth',.13,.12,.09); }
function playLevelUpSound() { [523,659,784,1047].forEach((f,i)=>_tone(f,'sine',.15,.18,i*.08)); }
function playGameOverSound(){ [392,330,277,220].forEach((f,i)=>_tone(f,'square',.15+i*.08,.1,i*.15)); }

/* ─────────────────────────────────────────────────────────────────
   HUD
   ───────────────────────────────────────────────────────────────── */
const HEART_D = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
function updateHearts() {
    let h = '';
    for (let i = 0; i < 3; i++) {
        h += `<svg class="heart-svg ${i < state.lives ? 'heart-svg--full' : 'heart-svg--empty'}" viewBox="0 0 24 24"><path d="${HEART_D}"/></svg>`;
    }
    G['hearts-display'].innerHTML = h;
}
function updateHUD() {
    G['score'].textContent = state.score;
    G['level'].textContent = state.level;
    updateHearts();
}
function updateComboDisplay() {
    G['combo-text'].textContent = state.combo > 1
        ? i18n[currentLang].comboPfx + ' ' + state.combo : '';
}

/* ─────────────────────────────────────────────────────────────────
   TIMER
   ───────────────────────────────────────────────────────────────── */
function getTimeForLevel(lvl) { return Math.max(8, 22 - (lvl - 1) * 2); }
function startTimer() {
    clearInterval(timerInterval);
    state.timeLeft = getTimeForLevel(state.level);
    _renderTimer();
    timerInterval = setInterval(() => {
        state.timeLeft--; _renderTimer();
        if (state.timeLeft <= 3) G['timer'].classList.add('timer--warning');
        if (state.timeLeft <= 0) {
            clearInterval(timerInterval);
            state.lives--; state.combo = 0;
            updateHUD(); updateComboDisplay();
            playWrongSound(); _flashError();
            if (state.lives <= 0) endGame(); else generateLevel();
        }
    }, 1000);
}
function _renderTimer() {
    G['timer'].textContent = state.timeLeft + 's';
    if (state.timeLeft > 3) G['timer'].classList.remove('timer--warning');
}
function stopTimer() {
    clearInterval(timerInterval);
    G['timer'].textContent = '--';
    G['timer'].classList.remove('timer--warning');
}

/* ─────────────────────────────────────────────────────────────────
   CIRCLE & PARTICLE CLASSES
   ───────────────────────────────────────────────────────────────── */
function lighten(hex, amt) {
    const n = parseInt(hex.replace('#',''),16);
    return `rgb(${Math.min(255,(n>>16)+amt)},${Math.min(255,((n>>8)&0xff)+amt)},${Math.min(255,(n&0xff)+amt)})`;
}

class Circle {
    constructor(r, color) {
        this.r = r; this.color = color;
        this.x = r + Math.random() * (canvas.width  - r * 2);
        this.y = r + Math.random() * (canvas.height - r * 2);
        const spd = (1 + state.level * 0.18) * (canvas.width / 800);
        this.dx = (Math.random() < .5 ? 1 : -1) * (.5 + Math.random() * .7) * spd;
        this.dy = (Math.random() < .5 ? 1 : -1) * (.5 + Math.random() * .7) * spd;
        this.area          = parseFloat((Math.PI * r * r).toFixed(2));
        this.circumference = parseFloat((2 * Math.PI * r).toFixed(2));
        this.diameter      = r * 2;
        this.phase         = Math.random() * Math.PI * 2;
    }
    draw(t) {
        const isT = (this === state.targetCircle);
        const pr  = this.r + (isT ? Math.sin(t * .003 + this.phase) * 2.5 : 0);
        ctx.shadowColor = this.color; ctx.shadowBlur = isT ? 24 : 10;
        if (isT) {
            ctx.beginPath(); ctx.arc(this.x, this.y, pr + 7, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 2;
            ctx.stroke(); ctx.closePath();
        }
        ctx.beginPath(); ctx.arc(this.x, this.y, pr, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(this.x-pr*.3, this.y-pr*.3, pr*.1, this.x, this.y, pr);
        g.addColorStop(0, lighten(this.color, 45)); g.addColorStop(1, this.color);
        ctx.fillStyle = g; ctx.fill(); ctx.closePath(); ctx.shadowBlur = 0;
        
        // 移动端使用稍小的字体
        const isMobile = window.innerWidth < 768;
        const fs = isMobile 
            ? Math.max(7, Math.min(pr * 0.3, 12))
            : Math.max(8, Math.min(pr * 0.35, 14));
            
        ctx.fillStyle = 'rgba(255,255,255,.92)';
        ctx.font = `bold ${fs}px 'Courier New', monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('r=' + this.r, this.x, this.y);
    }
    update(t) {
        if (this.x + this.r >= canvas.width  || this.x - this.r <= 0) this.dx = -this.dx;
        if (this.y + this.r >= canvas.height || this.y - this.r <= 0) this.dy = -this.dy;
        this.x += this.dx; this.y += this.dy; this.draw(t);
    }
}

class Particle {
    constructor(x, y, color) {
        this.x=x; this.y=y; this.color=color;
        this.r = Math.random()*4+2;
        const s=Math.random()*5.5+2, a=Math.random()*Math.PI*2;
        this.dx=Math.cos(a)*s; this.dy=Math.sin(a)*s;
        this.life=1; this.decay=Math.random()*.03+.02; this.grav=.13;
    }
    update() {
        this.x+=this.dx; this.y+=this.dy; this.dy+=this.grav; this.dx*=.97; this.life-=this.decay;
        ctx.globalAlpha=Math.max(0,this.life); ctx.shadowColor=this.color; ctx.shadowBlur=7;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r*this.life, 0, Math.PI*2);
        ctx.fillStyle=this.color; ctx.fill(); ctx.closePath();
        ctx.globalAlpha=1; ctx.shadowBlur=0;
        return this.life > 0;
    }
}
function spawnParticles(x, y, color, n) {
    for (let i=0; i<n; i++) particles.push(new Particle(x, y, color));
}

/* ─────────────────────────────────────────────────────────────────
   BACKGROUND - 根据主题自适应
   ───────────────────────────────────────────────────────────────── */
function drawBackground() {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    
    // 根据主题设置背景色
    const bgColors = {
        light: '#f8fafc',
        dark: '#0f172a',
        eyecare: '#f5f0dc',
        colorblind: '#e8f0fe'
    };
    
    ctx.fillStyle = bgColors[theme] || '#080818';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 网格线颜色也根据主题调整
    const gridColor = theme === 'dark' ? 'rgba(80,100,255,0.05)' : 'rgba(0,0,0,0.03)';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let x=0; x<canvas.width;  x+=40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
    for (let y=0; y<canvas.height; y+=40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y);  ctx.stroke(); }
}

/* ─────────────────────────────────────────────────────────────────
   LEVEL GENERATION
   ───────────────────────────────────────────────────────────────── */
function generateLevel() {
    circles = []; particles = [];
    const count  = Math.min(3 + state.level, 7);
    const colors = getColors();
    const maxR   = Math.floor(Math.min(canvas.width * .075, 52));
    const minR   = Math.max(14, Math.floor(canvas.width * .025));
    const usedR  = new Set();

    for (let i = 0; i < count; i++) {
        let r, tries = 0;
        do { r = Math.floor(Math.random() * (maxR - minR)) + minR; tries++; }
        while (usedR.has(r) && tries < 30);
        usedR.add(r);
        circles.push(new Circle(r, colors[i % colors.length]));
    }

    state.targetCircle = circles[Math.floor(Math.random() * circles.length)];

    if (currentMode === 'classic') {
        const pool = state.level === 1 ? ['area']
                   : state.level === 2 ? ['area','circumference']
                   : ['area','circumference','diameter'];
        state.questionType = pool[Math.floor(Math.random() * pool.length)];
    } else {
        state.questionType = 'default';
    }

    renderQuestionText();
    startTimer();
}

function renderQuestionText() {
    if (!state.targetCircle) return;
    const q = MODES[currentMode].getQuestion(state.targetCircle, state.questionType, currentLang);
    G['question-text'].textContent = q.text;
}

/* ─────────────────────────────────────────────────────────────────
   INPUT HANDLING - 移动端触摸优化
   ───────────────────────────────────────────────────────────────── */
function handleInput(clientX, clientY) {
    if (!state.isPlaying || state.lives <= 0) return;

    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;

    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top)  * scaleY;

    // 增加触摸容差（移动端更容易误触）
    const isMobile = window.innerWidth < 768;
    const touchTolerance = isMobile ? 5 : 0;
    
    let hit = null;
    for (let i = circles.length - 1; i >= 0; i--) {
        const c = circles[i];
        const dist = Math.sqrt((cx - c.x) * (cx - c.x) + (cy - c.y) * (cy - c.y));
        if (dist <= c.r + touchTolerance) { hit = c; break; }
    }

    if (!hit) return;

    const popX = ((clientX - rect.left) / rect.width)  * 100;
    const popY = ((clientY - rect.top)  / rect.height) * 100;

    if (hit === state.targetCircle) {
        state.combo++;
        const pts = 10 * state.combo;
        state.score += pts;
        showScorePopup(popX, popY, pts, true);
        spawnParticles(hit.x, hit.y, hit.color, isMobile ? 20 : 30);
        playCorrectSound(); _flashCorrect(); updateComboDisplay();
        if (state.score >= state.level * 50) {
            state.level++;
            playLevelUpSound();
            spawnParticles(canvas.width / 2, canvas.height / 2, '#f1c40f', isMobile ? 30 : 50);
        }
        updateHUD();
        generateLevel();
    } else {
        state.lives--; state.combo = 0;
        showScorePopup(popX, popY, 0, false);
        playWrongSound(); _flashError();
        updateComboDisplay(); updateHUD();
        if (state.lives <= 0) {
            spawnParticles(hit.x, hit.y, '#e74c3c', isMobile ? 25 : 40);
            endGame();
        } else {
            generateLevel();
        }
    }
}

function showScorePopup(x, y, pts, correct) {
    const el = document.createElement('div');
    el.className = 'score-pop ' + (correct ? 'score-pop--correct' : 'score-pop--wrong');
    el.textContent = correct ? ('+' + pts) : 'X';
    el.style.left = x + '%';
    el.style.top  = y + '%';
    G['float-popup'].appendChild(el);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 1000);
}

function _flashCorrect() {
    G['question-box'].classList.add('question-box--correct');
    setTimeout(() => G['question-box'].classList.remove('question-box--correct'), 300);
}
function _flashError() {
    G['question-box'].classList.add('question-box--error');
    setTimeout(() => G['question-box'].classList.remove('question-box--error'), 350);
}

/* ─────────────────────────────────────────────────────────────────
   GAME LOOP
   ───────────────────────────────────────────────────────────────── */
function loop(t) {
    if (!state.isPlaying) return;
    drawBackground();
    circles.forEach(c => c.update(t));
    particles = particles.filter(p => p.update());
    animId = requestAnimationFrame(loop);
}

/* ─────────────────────────────────────────────────────────────────
   GAME START / END
   ───────────────────────────────────────────────────────────────── */
function startGame() {
    state.score = 0; state.lives = 3; state.level = 1; state.combo = 0;
    state.isPlaying = true;
    updateHUD(); updateComboDisplay();
    G['game-over'].hidden = true;
    G['canvas-idle'].classList.add('hidden');
    _getAC(); resizeCanvas(); generateLevel();
    if (animId) cancelAnimationFrame(animId);
    animId = requestAnimationFrame(loop);
}

function endGame() {
    state.isPlaying = false; stopTimer();
    if (animId) cancelAnimationFrame(animId);
    G['game-over'].hidden = false;
    G['gameover-score-value'].textContent = state.score;
    G['gameover-level-value'].textContent = state.level;
    const opt = G['mode-select'].querySelector('option[value="' + currentMode + '"]');
    G['gameover-mode-value'].textContent = opt ? opt.textContent.trim() : currentMode;
    G['question-text'].textContent = i18n[currentLang].gameOver;
    playGameOverSound();
}

function resetGame() { hideReset(); startGame(); }

/* ─────────────────────────────────────────────────────────────────
   MODE / LANG / THEME
   ───────────────────────────────────────────────────────────────── */
function handleModeChange(value) {
    currentMode = value;
    _updateModeBadge(); _updateTheoremDesc(); _updateQBoxStyle();
    if (state.isPlaying) generateLevel();
}

function _updateModeBadge() {
    const opt = G['mode-select'].querySelector('option[value="' + currentMode + '"]');
    G['mode-badge'].textContent = opt ? opt.textContent.trim() : currentMode;
    const cat = MODES[currentMode].category;
    G['mode-badge'].className = 'mode-badge ' + (cat === 'theorem' ? 'mode-badge--theorem' : 'mode-badge--classic');
}

function _updateTheoremDesc() {
    const t = i18n[currentLang];
    if (MODES[currentMode].category === 'theorem') {
        G['theorem-desc-text'].textContent = t[MODES[currentMode].descKey] || '';
        G['theorem-desc-bar'].hidden = false;
    } else {
        G['theorem-desc-bar'].hidden = true;
    }
}

function _updateQBoxStyle() {
    G['question-box'].classList.toggle('question-box--theorem-mode', MODES[currentMode].category === 'theorem');
}

/* ─────────────────────────────────────────────────────────────────
   THEME HANDLING
   ───────────────────────────────────────────────────────────────── */
function handleThemeChange(value) {
    const root = document.documentElement;
    root.setAttribute('data-theme', value);
    
    // 更新主题选择器的值
    if (G['theme-select']) {
        G['theme-select'].value = value;
    }
    
    // 如果是色盲友好主题，同时设置 data-colorblind 属性
    if (value === 'colorblind') {
        root.setAttribute('data-colorblind', 'true');
    } else {
        root.setAttribute('data-colorblind', 'false');
    }
    
    // 重新绘制背景
    if (!state.isPlaying) {
        drawBackground();
    }
}

function updateLang() {
    const t    = i18n[currentLang];
    
    G['nav-home-text'].textContent   = t.home;
    G['nav-game'].textContent        = t.game;
    G['nav-quiz'].textContent        = t.quiz;
    G['btn-lang-text'].textContent   = t.langBtn;
    G['mode-label-text'].textContent = t.modeLabel;
    G['desc'].textContent            = t.descClassic;
    G['txt-score'].textContent       = t.score;
    G['txt-lives'].textContent       = t.lives;
    G['txt-level'].textContent       = t.level;
    G['txt-timer'].textContent       = t.timer;
    G['idle-text'].textContent       = t.idleText;
    G['btn-start-text'].textContent  = t.startBtn;
    G['btn-reset-text'].textContent  = t.resetBtn;
    G['btn-hint-text'].textContent   = t.hintBtn;
    G['btn-restart-text'].textContent= t.playAgain;
    G['hint-close-text'].textContent = t.gotIt;
    G['gameover-title-text'].textContent  = t.gameOver;
    G['gameover-score-label'].textContent = t.finalScore;
    G['gameover-level-label'].textContent = t.levelReached;
    G['gameover-mode-label'].textContent  = t.modeLabel2;
    G['reset-title'].textContent          = t.confirmReset;
    G['reset-confirm-text'].textContent   = t.resetMsg;
    G['btn-confirm-reset'].textContent    = t.confirm;
    G['btn-cancel-reset'].textContent     = t.cancel;
    
    // 更新主题选择器
    if (G['theme-label-text']) {
        G['theme-label-text'].textContent = t.themeLabel;
    }
    if (G['opt-theme-light']) {
        G['opt-theme-light'].textContent = t.themeLight;
    }
    if (G['opt-theme-dark']) {
        G['opt-theme-dark'].textContent = t.themeDark;
    }
    if (G['opt-theme-eyecare']) {
        G['opt-theme-eyecare'].textContent = t.themeEyecare;
    }
    if (G['opt-theme-colorblind']) {
        G['opt-theme-colorblind'].textContent = t.themeColorblind;
    }

    const opts = {
        'opt-classic':t.optClassic, 'opt-angle_centre':t.optAngleCentre,
        'opt-angle_semicircle':t.optAngleSemi, 'opt-cyclic_quad':t.optCyclicQuad,
        'opt-same_arc':t.optSameArc, 'opt-alternate_seg':t.optAltSeg,
        'opt-tangent_radius':t.optTanRadius, 'opt-tangent_equal':t.optTanEqual,
        'opt-arrow_theorem':t.optArrow,
    };
    Object.entries(opts).forEach(([id,txt]) => { const e=document.getElementById(id); if(e) e.textContent=txt; });
    const og1=document.getElementById('optgroup-classic');   if(og1) og1.label=t.optgroupClassic;
    const og2=document.getElementById('optgroup-theorems');  if(og2) og2.label=t.optgroupTheorems;

    if (!state.isPlaying) {
        G['question-text'].textContent = t.startText;
    } else {
        renderQuestionText();
    }
    _updateModeBadge(); _updateTheoremDesc();
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    document.documentElement.lang = currentLang;
    updateLang();
}

let baseFontSize = 16;
function changeFontSize(step) {
    baseFontSize = Math.min(24, Math.max(12, baseFontSize + step * 2));
    document.documentElement.style.setProperty('--font-size', baseFontSize + 'px');
}

/* ─────────────────────────────────────────────────────────────────
   MODALS
   ───────────────────────────────────────────────────────────────── */
function showHint() {
    const t = i18n[currentLang];
    G['hint-title'].textContent = t.hintTitle;
    G['hint-body'].innerHTML    = '';
    MODES[currentMode].hints(currentLang).forEach(h => {
        const d = document.createElement('div');
        d.className = 'hint-formula-block';
        d.innerHTML = `
            <div class="hint-formula-title">${h.title}</div>
            <div class="hint-formula-eq ${h.cls || ''}">${h.eq}</div>
            <div class="hint-formula-note">${h.note}</div>
        `;
        G['hint-body'].appendChild(d);
    });
    G['hint-modal'].hidden = false;
}
function hideHint()  { G['hint-modal'].hidden  = true; }
function showReset() { G['reset-modal'].hidden = false; }
function hideReset() { G['reset-modal'].hidden = true; }

/* ─────────────────────────────────────────────────────────────────
   INIT - 移动端事件处理
   ───────────────────────────────────────────────────────────────── */
function init() {
    // 初始化主题选择器的值
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme') || 'light';
    if (G['theme-select']) {
        G['theme-select'].value = currentTheme;
    }
    
    resizeCanvas();
    updateLang();
    drawBackground();
    G['canvas-idle'].classList.remove('hidden');
    updateHearts();

    // 触摸和指针事件 - 移动端优化
    canvas.addEventListener('pointerdown', function(e) {
        e.preventDefault();
        handleInput(e.clientX, e.clientY);
    }, { passive: false });

    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) {
            handleInput(touch.clientX, touch.clientY);
        }
    }, { passive: false });

    // 阻止移动端滑动和缩放干扰
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
    });

    canvas.addEventListener('touchcancel', function(e) {
        e.preventDefault();
    });

    // 鼠标点击作为备用
    canvas.addEventListener('click', function(e) {
        handleInput(e.clientX, e.clientY);
    });

    // 模态框关闭
    G['hint-modal'].addEventListener('click',  function(e) { if (e.target === G['hint-modal'])  hideHint(); });
    G['reset-modal'].addEventListener('click', function(e) { if (e.target === G['reset-modal']) hideReset(); });

    // 键盘可访问性
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('role', 'application');
    canvas.setAttribute('aria-label', 'Game canvas — click the correct circle');
    canvas.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            handleInput(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
    });

    // 窗口大小变化
    window.addEventListener('resize', function() {
        resizeCanvas();
        if (!state.isPlaying) drawBackground();
    });
    
    // 屏幕方向变化 - 移动端
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            resizeCanvas();
            if (!state.isPlaying) drawBackground();
        }, 100);
    });
    
    // 检测移动设备并调整
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        // 移动端特殊处理
        document.body.classList.add('mobile-device');
    }
}

document.addEventListener('DOMContentLoaded', init);
