/* 
    Antigravity Digital Product Landing Page Script
    Premium V3 - Hyderabad Leads
*/

document.body.classList.add('js-enabled');

/* ============= LIQUID MESH BACKGROUND ============= */
const canvas = document.getElementById('liquidCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(108, 92, 231, 0.15)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    window.addEventListener('resize', initParticles);
    initParticles();

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - distance/150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ============= ANIMATION OBSERVER ============= */
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Start counter if present
            const counter = entry.target.classList.contains('counter') ? entry.target : entry.target.querySelector('.counter');
            if (counter) {
                startCount(counter);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-up, .animate-left').forEach(el => observer.observe(el));

// Fallback: Ensure Hero elements are shown on load if observer misses them
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero-premium-v3 .animate-up, .hero-premium-v3 .animate-left').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('show');
                const counter = el.querySelector('.counter');
                if (counter) startCount(counter);
            }, i * 100);
        });
    }, 200);
});

/* ============= COUNTER LOGIC ============= */
function startCount(el) {
    if (el.dataset.started) return;
    el.dataset.started = "true";
    
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const count = () => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(target * progress);
        el.innerText = currentCount;

        if (frame < totalFrames) {
            requestAnimationFrame(count);
        } else {
            el.innerText = target;
        }
    };
    count();
}

/* ============= NAVBAR SCROLL ============= */
const nav = document.getElementById('navbar');
const announcementBar = document.querySelector('.announcement-bar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        if (announcementBar) announcementBar.style.transform = 'translateY(-100%)';
        nav.style.top = '0';
    } else {
        nav.classList.remove('scrolled');
        if (announcementBar) announcementBar.style.transform = 'translateY(0)';
        nav.style.top = '36px';
    }
});

/* ============= FAQ ACCORDION ============= */
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isOpen = item.classList.contains('open');
        
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

/* ============= 3D DASHBOARD TILT ============= */
const dashboard = document.querySelector('.floating-dashboard');
if (dashboard) {
    window.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        dashboard.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    window.addEventListener('mouseleave', () => {
        dashboard.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    });
}

/* ============= MOBILE URGENCY TIMER ============= */
function startMobileUrgencyTimer() {
    const minsEl = document.getElementById('smb-mins');
    const secsEl = document.getElementById('smb-secs');
    
    if (!minsEl || !secsEl) return;

    let timeLeft = 1200; // 20 Minutes in seconds

    const updateTimer = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        minsEl.textContent = minutes.toString().padStart(2, '0');
        secsEl.textContent = seconds.toString().padStart(2, '0');

        if (timeLeft <= 0) {
            timeLeft = 600; // Reset for infinite urgency effect
        } else {
            timeLeft--;
        }
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', startMobileUrgencyTimer);
// Fallback if DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startMobileUrgencyTimer();
}
