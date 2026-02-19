// ===== Typing Animation =====
const titles = [
    "QA Automation Engineer",
    "Test Architect",
    "Selenium Expert",
    "API Testing Specialist"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById("typedText");

function type() {
    const current = titles[titleIndex];

    if (isDeleting) {
        typedText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 500;
    }

    setTimeout(type, speed);
}

type();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ===== Mobile Navigation =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navMenu.classList.remove("open");
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    });
}

window.addEventListener("scroll", updateActiveNav);

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-count");
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

// ===== Scroll Reveal =====
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            el.classList.add("visible");
        }
    });
}

// Add reveal class to elements
document.querySelectorAll(
    ".about-card, .skill-category, .timeline-item, .project-card, .cert-card, .contact-card, .education-card"
).forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
});

window.addEventListener("scroll", reveal);

// ===== Intersection Observer for counters =====
const statsSection = document.querySelector(".hero-stats");
let countersStarted = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// ===== Particles =====
function createParticles() {
    const container = document.getElementById("particles");
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = (Math.random() * 8 + 6) + "s";
        particle.style.animationDelay = (Math.random() * 10) + "s";
        particle.style.width = (Math.random() * 3 + 1) + "px";
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

createParticles();

// Initial reveal check
reveal();
