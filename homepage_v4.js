// EBU5315 Coursework Version3 - JavaScript for Circle Geometry Homepage
// All comments in English | Vanilla JS only | No frameworks
// NO VIDEO FILES - Canvas animation only
// Features: EN/CN Language Switch | Hero animation | Theorem animations | AI chat | Form validation

const bodyRoot = document.getElementById('bodyRoot');
const fontSmall = document.getElementById('fontSmall');
const fontBig = document.getElementById('fontBig');
const themeBtn = document.getElementById('themeBtn');
const themeIcon = themeBtn.querySelector('i');
const langBtn = document.getElementById('langBtn');
// 新增护眼模式按钮变量
const eyeCareBtn = document.getElementById('eyeCareBtn');
const eyeCareIcon = eyeCareBtn.querySelector('i');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChat = document.querySelector('.chat-btn');
const contactForm = document.getElementById('contactForm');

// ------------------------------
// Multi-Language Dictionary (EN / CN)
// ------------------------------
const i18n = {
    en: {
        title: "Circle Geometry Learning | GCSE Math",
        logo: "Circle Geometry Hub",
        breadcrumb: "Home > Circle Theorems",
        nav_home: "Home",
        nav_theorems: "Theorems",
        nav_game: "Game",
        nav_quiz: "Quiz",
        nav_contact: "Contact",
        hero_title: "Interactive Circle Geometry Learning",
        hero_sub: "Master GCSE circle theorems with animations, games, and AI help",
        theorems_title: "Key Circle Theorems",
        theorem1_title: "Angle at Center",
        theorem1_desc: "The angle at the center is twice the angle at the circumference.",
        theorem2_title: "Cyclic Quadrilateral",
        theorem2_desc: "Opposite angles in a cyclic quadrilateral sum to 180°.",
        theorem3_title: "Tangent & Radius",
        theorem3_desc: "Tangent is perpendicular to the radius at the point of contact.",
        usp_title: "Why Choose Us?",
        usp1: "AI Tutor Support",
        usp2: "Visual Animations",
        usp3: "Interactive Games",
        usp4: "Mobile Friendly",
        ai_title: "AI Geometry Assistant",
        ai_greeting: "Hello! Ask me any circle theorem question.",
        chat_placeholder: "Type your question...",
        chat_send: "Send",
        ad_title: "Premium Math Learning Package",
        ad_desc: "Unlock full quizzes, progress tracking, and live tutoring — Learn More",
        contact_title: "Contact Us",
        label_name: "Full Name",
        placeholder_name: "Your name",
        label_email: "Email Address",
        placeholder_email: "your@email.com",
        label_message: "Message",
        placeholder_message: "Your message...",
        submit_btn: "Send Message",
        footer1: "&copy; 2026 Circle Geometry Learning | GCSE Math Helper",
        footer2: "Designed for EBU5315 Coursework | Queen Mary University of London",
        form_required: "Please fill all required fields.",
        form_success: "Message sent successfully! We will reply soon.",
        // 新增护眼模式多语言
        eye_care_btn: "Eye Care Mode"
    },
    cn: {
        title: "圆几何学习 | GCSE数学",
        logo: "圆几何学习中心",
        breadcrumb: "首页 > 圆定理",
        nav_home: "首页",
        nav_theorems: "圆定理",
        nav_game: "游戏",
        nav_quiz: "测验",
        nav_contact: "联系我们",
        hero_title: "交互式圆几何学习",
        hero_sub: "通过动画、游戏和AI助手掌握GCSE圆定理",
        theorems_title: "核心圆定理",
        theorem1_title: "圆心角",
        theorem1_desc: "圆心角是圆周角的两倍。",
        theorem2_title: "圆内接四边形",
        theorem2_desc: "圆内接四边形对角之和为180°。",
        theorem3_title: "切线与半径",
        theorem3_desc: "切线与半径在接触点处垂直。",
        usp_title: "为什么选择我们？",
        usp1: "AI导师支持",
        usp2: "可视化动画",
        usp3: "互动游戏",
        usp4: "移动端适配",
        ai_title: "AI几何助手",
        ai_greeting: "你好！可以问我任何圆定理问题。",
        chat_placeholder: "输入你的问题...",
        chat_send: "发送",
        ad_title: "高级数学学习套餐",
        ad_desc: "解锁全部测验、学习追踪和在线辅导 — 了解更多",
        contact_title: "联系我们",
        label_name: "姓名",
        placeholder_name: "你的姓名",
        label_email: "邮箱地址",
        placeholder_email: "你的邮箱",
        label_message: "留言",
        placeholder_message: "你的留言...",
        submit_btn: "发送留言",
        footer1: "&copy; 2026 圆几何学习 | GCSE数学助手",
        footer2: "为EBU5315课程作业设计 | 伦敦玛丽女王大学",
        form_required: "请填写所有必填字段。",
        form_success: "留言发送成功！我们会尽快回复。",
        // 新增护眼模式多语言
        eye_care_btn: "护眼模式"
    }
};

// ------------------------------
// Language Switch Function
// ------------------------------
function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    const texts = i18n[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = texts[key];
            } else {
                el.innerHTML = texts[key];
            }
        }
    });

    langBtn.textContent = lang === 'en' ? '中文 / EN' : 'EN / 中文';
    // 新增：更新护眼/主题按钮的title提示
    eyeCareBtn.title = texts.eye_care_btn;
    themeBtn.title = lang === 'en' ? 'Dark/Light Mode' : '暗黑/亮色模式';
}

// Toggle language
langBtn.addEventListener('click', () => {
    const current = localStorage.getItem('language') || 'en';
    setLanguage(current === 'en' ? 'cn' : 'en');
});

// ------------------------------
// 1. Font Size Adjustment (Accessibility)
// ------------------------------
fontBig.addEventListener('click', () => {
    let current = parseFloat(getComputedStyle(bodyRoot).fontSize);
    if (current < 24) bodyRoot.style.fontSize = `${current + 2}px`;
});

fontSmall.addEventListener('click', () => {
    let current = parseFloat(getComputedStyle(bodyRoot).fontSize);
    if (current > 12) bodyRoot.style.fontSize = `${current - 2}px`;
});

// ------------------------------
// 2. Dark / Light Mode Toggle
// ------------------------------
function toggleTheme() {
    // 切换暗黑模式时，先关闭护眼模式
    if (bodyRoot.classList.contains('eye-care')) {
        bodyRoot.classList.remove('eye-care');
        eyeCareIcon.classList.replace('fa-eye-slash', 'fa-leaf');
        localStorage.setItem('eyeCare', 'disabled');
    }

    bodyRoot.classList.toggle('dark');
    if (bodyRoot.classList.contains('dark')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
}
themeBtn.addEventListener('click', toggleTheme);

// ------------------------------
// 新增：护眼模式切换函数
// ------------------------------
function toggleEyeCareMode() {
    // 切换护眼模式时，先关闭暗黑模式
    if (bodyRoot.classList.contains('dark')) {
        bodyRoot.classList.remove('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }

    // 切换护眼模式
    bodyRoot.classList.toggle('eye-care');
    if (bodyRoot.classList.contains('eye-care')) {
        eyeCareIcon.classList.replace('fa-leaf', 'fa-eye-slash');
        localStorage.setItem('eyeCare', 'enabled');
    } else {
        eyeCareIcon.classList.replace('fa-eye-slash', 'fa-leaf');
        localStorage.setItem('eyeCare', 'disabled');
    }
}
// 绑定护眼模式按钮点击事件
eyeCareBtn.addEventListener('click', toggleEyeCareMode);

// ------------------------------
// 3. Mobile Navigation Toggle
// ------------------------------
function toggleMobileNav() {
    mainNav.classList.toggle('open');
    const icon = mobileNavToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}
mobileNavToggle.addEventListener('click', toggleMobileNav);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) toggleMobileNav();
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) mainNav.classList.remove('open');
});

// ------------------------------
// 4. HERO CANVAS ANIMATION (No Video)
// ------------------------------
function startHeroAnimation() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let angle = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#2563eb';

        // Rotating circle animation
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
        ctx.stroke();

        // Moving radius line
        const x = canvas.width / 2 + 100 * Math.cos(angle);
        const y = canvas.height / 2 + 100 * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 3;
        ctx.stroke();

        angle += 0.02;
        requestAnimationFrame(animate);
    }
    animate();
}

// ------------------------------
// 5. Theorem Canvas Animations
// ------------------------------
function drawCanvas1() {
    const ctx = document.getElementById('canvas1').getContext('2d');
    ctx.clearRect(0, 0, 300, 180);
    ctx.beginPath();
    ctx.arc(150, 90, 70, 0, Math.PI * 2);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function drawCanvas2() {
    const ctx = document.getElementById('canvas2').getContext('2d');
    ctx.clearRect(0, 0, 300, 180);
    ctx.beginPath();
    ctx.arc(150, 90, 70, 0, Math.PI * 2);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function drawCanvas3() {
    const ctx = document.getElementById('canvas3').getContext('2d');
    ctx.clearRect(0, 0, 300, 180);
    ctx.beginPath();
    ctx.arc(150, 90, 70, 0, Math.PI * 2);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// ------------------------------
// 6. AI Chatbot Functionality
// ------------------------------
function addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.style.padding = '8px 12px';
    div.style.margin = '6px 0';
    div.style.borderRadius = '6px';
    div.style.maxWidth = '85%';
    if (isUser) {
        div.style.background = '#dbeafe';
        div.style.marginLeft = 'auto';
        div.textContent = `${i18n[localStorage.getItem('language') || 'en'].chat_send.replace('Send', 'You')}: ${text}`;
    } else {
        div.style.background = '#f3f4f6';
        div.style.marginRight = 'auto';
        div.textContent = `AI: ${text}`;
    }
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendChat.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage(msg, true);
    chatInput.value = '';

    setTimeout(() => {
        const lang = localStorage.getItem('language') || 'en';
        if (msg.toLowerCase().includes('angle') || msg.includes('角')) {
            addMessage(i18n[lang].theorem1_desc);
        } else if (msg.toLowerCase().includes('tangent') || msg.includes('切线')) {
            addMessage(i18n[lang].theorem3_desc);
        } else if (msg.toLowerCase().includes('cyclic') || msg.includes('四边形')) {
            addMessage(i18n[lang].theorem2_desc);
        } else {
            addMessage(i18n[lang].ai_greeting.replace('Hello! ', ''));
        }
    }, 700);
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChat.click();
});

// ------------------------------
// 7. Contact Form Validation & Submit
// ------------------------------
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = localStorage.getItem('language') || 'en';
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();

    if (!name || !email || !msg) {
        alert(i18n[lang].form_required);
        return;
    }
    alert(i18n[lang].form_success);
    contactForm.reset();
});

// ------------------------------
// 8. Page Initialization
// ------------------------------
window.addEventListener('load', () => {
    bodyRoot.style.fontSize = '16px';

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        bodyRoot.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // 新增：加载护眼模式状态
    const savedEyeCare = localStorage.getItem('eyeCare') || 'disabled';
    if (savedEyeCare === 'enabled') {
        bodyRoot.classList.add('eye-care');
        eyeCareIcon.classList.replace('fa-leaf', 'fa-eye-slash');
    }

    // Load saved language
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    // Start animations
    startHeroAnimation();
    drawCanvas1();
    drawCanvas2();
    drawCanvas3();

    // AI greeting
    addMessage(i18n[savedLang].ai_greeting);
});

// Handle canvas resize
window.addEventListener('resize', () => {
    startHeroAnimation();
});