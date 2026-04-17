// EBU5315 Coursework Version3 - JavaScript for Circle Geometry Homepage
// All comments in English | Vanilla JS only | No frameworks
// NO VIDEO FILES - Canvas animation only
// Features: Hero animation | Theorem animations | AI chat | Form validation

const bodyRoot = document.getElementById('bodyRoot');
const fontSmall = document.getElementById('fontSmall');
const fontBig = document.getElementById('fontBig');
const themeBtn = document.getElementById('themeBtn');
const themeIcon = themeBtn.querySelector('i');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const contactForm = document.getElementById('contactForm');

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
        div.textContent = `You: ${text}`;
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
        if (msg.toLowerCase().includes('angle')) addMessage('The angle at the center is twice the angle at the circumference.');
        else if (msg.toLowerCase().includes('tangent')) addMessage('Tangent is perpendicular to the radius at the point of contact.');
        else if (msg.toLowerCase().includes('cyclic')) addMessage('Opposite angles in cyclic quadrilateral sum to 180 degrees.');
        else addMessage('I can help you with circle theorems: angle at center, tangent, cyclic quadrilateral, and more!');
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
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();
    if (!name || !email || !msg) {
        alert('Please fill all required fields.');
        return;
    }
    alert('Message sent successfully! We will reply soon.');
    contactForm.reset();
});

// ------------------------------
// 8. Page Initialization
// ------------------------------
window.addEventListener('load', () => {
    bodyRoot.style.fontSize = '16px';
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') {
        bodyRoot.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    startHeroAnimation();
    drawCanvas1();
    drawCanvas2();
    drawCanvas3();
    addMessage('Hi! Ask me any circle theorem question.');
});

// Handle canvas resize
window.addEventListener('resize', () => {
    startHeroAnimation();
});