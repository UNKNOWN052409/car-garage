// Services Data
const services = [
    { icon: '🔧', title: 'Car Servicing', description: 'Comprehensive maintenance and periodic servicing for all vehicle types' },
    { icon: '⚙️', title: 'Suspension Work', description: 'Expert suspension repair and alignment for smooth ride quality' },
    { icon: '🔩', title: 'Engine Work', description: 'Advanced engine diagnostics, repair, and performance optimization' },
    { icon: '📊', title: 'Diagnostics & Scanning', description: 'State-of-the-art computer diagnostics and error code scanning' },
    { icon: '📋', title: 'PUC & Insurance', description: 'Pollution certificate and insurance assistance services' },
    { icon: '⚡', title: 'Electrical & Electronics', description: 'Complete electrical system diagnostics and repair' },
    { icon: '🔋', title: 'Battery & Tyre', description: 'Battery replacement, tyre services, and wheel alignment' },
    { icon: '🚛', title: 'Towing / Tow Van', description: '24/7 emergency towing and roadside assistance' }
];

// Custom Cursor
let cursor = document.querySelector('.cursor');
let cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    followerX += distX * 0.1;
    followerY += distY * 0.1;

    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.5)`;
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
    });
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 2000);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Render Services
const servicesGrid = document.querySelector('.services-grid');
services.forEach((service, index) => {
    const card = document.createElement('div');
    card.className = 'service-card glass-card';
    card.setAttribute('data-scroll', '');
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
        <div class="service-icon">${service.icon}</div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-description">${service.description}</p>
    `;

    servicesGrid.appendChild(card);
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-scroll]').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Booking Functions
function bookViaCall() {
    const brand = document.getElementById('carBrand').value;
    const model = document.getElementById('carModel').value;
    const year = document.getElementById('carYear').value;
    const service = document.getElementById('serviceType').value;

    if (!brand || !model || !service) {
        alert('Please fill in all required fields');
        return;
    }

    window.location.href = 'tel:+919834756711';
}

function bookViaWhatsApp() {
    const brand = document.getElementById('carBrand').value;
    const model = document.getElementById('carModel').value;
    const year = document.getElementById('carYear').value;
    const service = document.getElementById('serviceType').value;

    if (!brand || !model || !service) {
        alert('Please fill in all required fields');
        return;
    }

    const message = `Hi! I would like to book a service for my ${brand} ${model} (${year}). Service needed: ${service}`;
    const whatsappUrl = `https://wa.me/919834756711?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Form Input Animations
document.querySelectorAll('.form-input, .form-select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');

    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Service Card Click to Expand
document.addEventListener('click', (e) => {
    if (e.target.closest('.service-card')) {
        const card = e.target.closest('.service-card');
        card.style.transform = card.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';

        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 300);
    }
});

// Testimonials Auto Slide (optional enhancement)
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    testimonials.forEach((card, index) => {
        card.style.opacity = index === testimonialIndex ? '1' : '0.5';
        card.style.transform = index === testimonialIndex ? 'scale(1.05)' : 'scale(1)';
    });

    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
}

// Uncomment to enable auto-rotation
// setInterval(rotateTestimonials, 5000);

// Performance: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduce-motion');
}

// Add reduce-motion styles
const reduceMotionStyle = document.createElement('style');
reduceMotionStyle.textContent = `
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(reduceMotionStyle);

console.log('🚗 Advanced Car Garage - Premium Experience Loaded');
console.log('📞 Contact: +91 98347 56711');
console.log('💬 WhatsApp: https://wa.me/919834756711');