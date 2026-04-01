const fontBig = document.getElementById('fontBig');
const fontSmall = document.getElementById('fontSmall');
const body = document.body;

fontBig.addEventListener('click', (e) => {
    e.preventDefault();
    let size = parseFloat(getComputedStyle(body).fontSize);
    body.style.fontSize = (size + 2) + 'px';
});

fontSmall.addEventListener('click', (e) => {
    e.preventDefault();
    let size = parseFloat(getComputedStyle(body).fontSize);
    if (size > 12) {
        body.style.fontSize = (size - 2) + 'px';
    }
});

const chatBtn = document.querySelector('.chat-btn');
chatBtn.addEventListener('click', () => {
    alert('AI Chatbot will be implemented in Version 2.');
});

const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message submitted successfully! (Test Version)');
    form.reset();
});

const enBtn = document.getElementById('enBtn');
const cnBtn = document.getElementById('cnBtn');

enBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('English version is currently active.');
});

cnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Chinese version will be added in Version 2.');
});
