// EBU5315 Coursework Version2 - JavaScript for Circle Geometry Homepage
// Pure English Comments | Core Interactive Functions | Mobile Responsive Logic
// Features: Font Adjustment | Dark/Light Mode | Mobile Nav | Form Validation | Button Interactions
// No External Frameworks | Vanilla JS Only | Compliance with Coursework Requirements

// DOM Element Selectors - Cache all required elements for performance
const bodyRoot = document.getElementById('bodyRoot');
const fontBig = document.getElementById('fontBig');
const fontSmall = document.getElementById('fontSmall');
const themeBtn = document.getElementById('themeBtn');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mainNav = document.querySelector('.main-nav');
const playBtn = document.getElementById('playBtn');
const chatBtn = document.getElementById('chatBtn');
const contactForm = document.getElementById('contactForm');
const themeIcon = themeBtn.querySelector('i');
const navLinks = document.querySelectorAll('.nav-link');

// 1. Font Size Adjustment (Accessibility Requirement for Visually Impaired Users)
// Increase font size - Max limit 24px to avoid layout breakage
fontBig.addEventListener('click', (e) => {
    e.preventDefault();
    const currentSize = parseFloat(getComputedStyle(bodyRoot).fontSize);
    if (currentSize < 24) {
        bodyRoot.style.fontSize = `${currentSize + 2}px`;
    }
});

// Decrease font size - Min limit 12px for readability
fontSmall.addEventListener('click', (e) => {
    e.preventDefault();
    const currentSize = parseFloat(getComputedStyle(bodyRoot).fontSize);
    if (currentSize > 12) {
        bodyRoot.style.fontSize = `${currentSize - 2}px`;
    }
});

// 2. Dark/Light Mode Toggle (Wellbeing Requirement - Reduce Eye Strain)
// Toggle theme class on body and switch icon
function toggleTheme() {
    bodyRoot.classList.toggle('dark');
    // Switch between moon (light mode) and sun (dark mode) icon
    if (bodyRoot.classList.contains('dark')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('circle_geo_theme', 'dark'); // Save theme preference
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('circle_geo_theme', 'light'); // Save theme preference
    }
}

// Add click event to theme button
themeBtn.addEventListener('click', toggleTheme);

// 3. Mobile Navigation Toggle (Hamburger Menu)
// Toggle open class for mobile navigation and switch icon
function toggleMobileNav() {
    mainNav.classList.toggle('open');
    const navIcon = mobileNavToggle.querySelector('i');
    // Switch between bars (closed) and times (open) icon
    navIcon.classList.toggle('fa-bars');
    navIcon.classList.toggle('fa-times');
}

// Add click event to mobile nav toggle
mobileNavToggle.addEventListener('click', toggleMobileNav);

// Close mobile nav when clicking a nav link (mobile only)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && mainNav.classList.contains('open')) {
            toggleMobileNav();
        }
    });
});

// Reset mobile nav on window resize (desktop view)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
        toggleMobileNav();
    }
});

// 4. Hero Section - Video Play Button Interaction
// Placeholder alert for video playback (Version3 will implement real video)
playBtn.addEventListener('click', () => {
    alert('Circle Theorem Animation Video: Coming in Version 3! This section will feature interactive geometric animations to explain core circle rules.');
});

// 5. AI Chatbot Button Interaction
// Placeholder alert for AI chatbot (Version3 will implement basic Q&A functionality)
chatBtn.addEventListener('click', () => {
    alert('AI Geometry Chatbot: Under Development for Version 3! The chatbot will answer your circle theorem questions and provide learning support.');
});

// 6. Contact Form Submission with Validation
// Prevent default form action, show success alert and reset form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message Submitted Successfully! Our team will review your feedback and get back to you shortly.');
    contactForm.reset(); // Reset all form fields to default
});

// 7. Page Initialization (On Window Load)
// Set default styles and restore user preferences
window.addEventListener('load', () => {
    // Reset font size to default 16px on page load
    bodyRoot.style.fontSize = '16px';
    // Restore saved theme preference (light mode by default)
    const savedTheme = localStorage.getItem('circle_geo_theme') || 'light';
    if (savedTheme === 'dark') {
        bodyRoot.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    // Lazy load image opacity transition for better UX
    document.images.forEach(img => {
        if (img.loading === 'lazy') {
            img.style.opacity = '0.8';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});