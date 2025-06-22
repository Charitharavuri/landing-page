// Smooth scrolling for navigation links
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

// Enhanced navbar scroll effect with progress bar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Progress bar
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
    }
    
    // Active section highlighting
    updateActiveNavLink();
});

// Enhanced mobile menu toggle with overlay
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

if (mobileMenu && navMenu && mobileOverlay) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking overlay
    mobileOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Enhanced navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu && navMenu && mobileOverlay) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    });
}

// Enhanced nav CTA button
const navCta = document.getElementById('nav-cta');
if (navCta) {
    navCta.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Animated counter for social proof
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters when they come into view
            if (entry.target.classList.contains('proof-number')) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
            
            // Add fade-in animations
            if (entry.target.hasAttribute('data-aos')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe all elements with animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe counter elements
    document.querySelectorAll('.proof-number').forEach(el => {
        observer.observe(el);
    });
    
    // Setup AOS-like animations
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// CTA Button interactions
document.getElementById('primary-cta').addEventListener('click', () => {
    // Scroll to contact section
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Add some visual feedback
    const button = document.getElementById('primary-cta');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'translateY(-3px)';
    }, 150);
});

document.getElementById('secondary-cta').addEventListener('click', () => {
    // Simulate demo modal or redirect
    alert('Demo video would open here! 🎥');
});

// Form handling
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #10b981, #34d399)';
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ffd700)';
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
});

// Pricing card interactions
document.querySelectorAll('.pricing-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        
        // Add click animation
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'translateY(-2px)';
        }, 150);
        
        // Simulate plan selection
        if (planName === 'Enterprise') {
            alert(`Let's discuss your ${planName} needs! Our sales team will contact you soon. 📞`);
        } else {
            alert(`Welcome to ${planName}! Redirecting to checkout... 🚀`);
        }
    });
});

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particle {
        pointer-events: none;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Add parallax effect to hero background shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.bg-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Enhanced typing effect with cursor
function typeWriter(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    
    // Create typing cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.style.cssText = `
        display: inline-block;
        width: 2px;
        height: 1.2em;
        background: linear-gradient(45deg, #6366f1, #ec4899);
        margin-left: 2px;
        animation: blink 1s infinite;
        vertical-align: text-bottom;
    `;
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.slice(0, i + 1);
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed + Math.random() * 30); // Variable speed for natural feel
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.remove();
                }
            }, 2000);
        }
    }
    
    type();
}

// Add typing cursor animation
const style = document.createElement('style');
style.textContent += `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
    }
    
    .typing-cursor {
        animation: blink 1s infinite;
    }
`;
document.head.appendChild(style);

// Initialize typing effect on hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.feature-card, .pricing-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
});

// Advanced Cursor System with Multiple Types
let mouseX = 0;
let mouseY = 0;
let cursorDot = null;
let cursorOutline = null;
let cursorGlow = null;
let sparkles = [];
let trailElements = [];
let isHovering = false;

// Create enhanced cursor system
function createAdvancedCursor() {
    // Main cursor dot - Premium diamond shape
    cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 16px;
        height: 16px;
        background: conic-gradient(from 0deg, #ffffff 0%, #6366f1 25%, #8b5cf6 50%, #ec4899 75%, #ffffff 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10004;
        transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 
            0 0 25px rgba(99, 102, 241, 0.8),
            0 0 50px rgba(236, 72, 153, 0.6),
            inset 0 0 12px rgba(255, 255, 255, 0.9);
        border: 2px solid rgba(255, 255, 255, 0.4);
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursorDot);

    // Outer glow with morphing effect
    cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, 
            rgba(99, 102, 241, 0.3) 0%, 
            rgba(139, 92, 246, 0.2) 30%,
            rgba(236, 72, 153, 0.1) 60%, 
            transparent 80%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        filter: blur(3px);
        animation: glowPulse 3s ease-in-out infinite;
    `;
    document.body.appendChild(cursorGlow);

    // Cursor outline with gradient border
    cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    cursorOutline.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        border: 3px solid transparent;
        background: linear-gradient(45deg, rgba(99, 102, 241, 0.4), rgba(236, 72, 153, 0.4)) border-box;
        background-clip: padding-box, border-box;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10003;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        backdrop-filter: blur(15px);
        box-shadow: 
            0 0 30px rgba(99, 102, 241, 0.3),
            inset 0 0 30px rgba(255, 255, 255, 0.2);
    `;
    document.body.appendChild(cursorOutline);

    // Create enhanced sparkle system
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        sparkle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: conic-gradient(from ${i * 45}deg, #ffffff, #ffd700, #ff6b6b, #6366f1);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10005;
            opacity: 0;
            transition: all 0.4s ease-out;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.9);
            filter: brightness(1.5);
        `;
        document.body.appendChild(sparkle);
        sparkles.push(sparkle);
    }

    // Create premium trail system
    for (let i = 0; i < 25; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        const size = 12 - i * 0.4;
        const opacity = 0.9 - i * 0.035;
        trail.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, ${opacity * 0.9}) 0%,
                rgba(99, 102, 241, ${opacity * 0.7}) 25%,
                rgba(139, 92, 246, ${opacity * 0.5}) 50%,
                rgba(236, 72, 153, ${opacity * 0.3}) 75%,
                transparent 100%
            );
            border-radius: 50%;
            pointer-events: none;
            z-index: ${10000 - i};
            transition: all 0.${Math.max(2, 12 - i * 0.4)}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 0 ${8 + i * 0.5}px rgba(99, 102, 241, ${opacity * 0.4});
            filter: blur(${i * 0.08}px);
            mix-blend-mode: ${i < 5 ? 'normal' : 'multiply'};
        `;
        document.body.appendChild(trail);
        trailElements.push(trail);
    }
}

// Initialize advanced cursor
createAdvancedCursor();
document.body.style.cursor = 'none';

// Enhanced cursor movement with physics
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update main cursor elements
    if (cursorDot) {
        cursorDot.style.left = mouseX - 8 + 'px';
        cursorDot.style.top = mouseY - 8 + 'px';
    }
    
    if (cursorGlow) {
        cursorGlow.style.left = mouseX - 40 + 'px';
        cursorGlow.style.top = mouseY - 40 + 'px';
    }
    
    if (cursorOutline) {
        cursorOutline.style.left = mouseX - 25 + 'px';
        cursorOutline.style.top = mouseY - 25 + 'px';
    }
    
    // Enhanced sparkle orbital system
    sparkles.forEach((sparkle, index) => {
        const time = Date.now() * 0.002;
        const angle = (time + index * Math.PI / 4) % (Math.PI * 2);
        const radius = 35 + Math.sin(time * 2 + index) * 8;
        const sparkleX = mouseX + Math.cos(angle) * radius;
        const sparkleY = mouseY + Math.sin(angle) * radius;
        
        sparkle.style.left = sparkleX - 3 + 'px';
        sparkle.style.top = sparkleY - 3 + 'px';
        
        if (isHovering) {
            sparkle.style.opacity = Math.abs(Math.sin(time * 3 + index)) * 0.9;
            sparkle.style.transform = `scale(${1 + Math.sin(time * 4 + index) * 0.3})`;
        } else {
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0.5)';
        }
    });
    
    // Advanced trail with organic movement
    trailElements.forEach((trail, index) => {
        setTimeout(() => {
            const size = 12 - index * 0.4;
            const offset = Math.sin(Date.now() * 0.003 + index * 0.5) * 3;
            trail.style.left = mouseX - size/2 + offset + 'px';
            trail.style.top = mouseY - size/2 + Math.cos(Date.now() * 0.003 + index * 0.5) * 2 + 'px';
            trail.style.opacity = Math.max(0, 0.9 - index * 0.035);
        }, index * 25);
    });
});

// Enhanced interaction states
document.addEventListener('mousedown', (e) => {
    createRipple(e.clientX, e.clientY);
    
    if (cursorDot) {
        cursorDot.style.transform = 'scale(1.8)';
        cursorDot.style.background = 'conic-gradient(from 0deg, #ff6b6b 0%, #ffd700 25%, #10b981 50%, #6366f1 75%, #ff6b6b 100%)';
    }
    if (cursorOutline) {
        cursorOutline.style.transform = 'scale(0.6)';
        cursorOutline.style.background = 'linear-gradient(45deg, rgba(255, 107, 107, 0.6), rgba(255, 215, 0, 0.6)) border-box';
    }
    if (cursorGlow) {
        cursorGlow.style.transform = 'scale(1.8)';
        cursorGlow.style.filter = 'blur(5px)';
    }
});

document.addEventListener('mouseup', () => {
    if (cursorDot) {
        cursorDot.style.transform = 'scale(1)';
        cursorDot.style.background = 'conic-gradient(from 0deg, #ffffff 0%, #6366f1 25%, #8b5cf6 50%, #ec4899 75%, #ffffff 100%)';
    }
    if (cursorOutline) {
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.background = 'linear-gradient(45deg, rgba(99, 102, 241, 0.4), rgba(236, 72, 153, 0.4)) border-box';
    }
    if (cursorGlow) {
        cursorGlow.style.transform = 'scale(1)';
        cursorGlow.style.filter = 'blur(3px)';
    }
});

// Enhanced ripple effect
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.cssText = `
        position: fixed;
        left: ${x - 30}px;
        top: ${y - 30}px;
        width: 60px;
        height: 60px;
        border: 3px solid rgba(99, 102, 241, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: rippleExpand 0.8s ease-out;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%);
    `;
    
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
}

document.addEventListener('mouseup', () => {
    if (cursorDot) {
        cursorDot.style.transform = 'scale(1)';
        cursorDot.style.background = 'radial-gradient(circle, #ffffff 20%, #6366f1 40%, #ec4899 100%)';
        cursorDot.style.boxShadow = `
            0 0 20px rgba(99, 102, 241, 0.6),
            0 0 40px rgba(236, 72, 153, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.8)
        `;
    }
    if (cursorOutline) {
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.background = 'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3)) border-box';
    }
    if (cursorGlow) {
        cursorGlow.style.transform = 'scale(1)';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)';
    }
});

// Enhanced special cursor effects for different elements
document.querySelectorAll('button, a, .nav-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add('cursor-magnetic');
        
        if (cursorDot) {
            cursorDot.style.transform = 'scale(2)';
            cursorDot.style.background = 'radial-gradient(circle, #ffffff 10%, #10b981 40%, #f59e0b 80%, #ec4899 100%)';
            cursorDot.style.boxShadow = `
                0 0 40px rgba(16, 185, 129, 0.8),
                0 0 80px rgba(245, 158, 11, 0.6),
                inset 0 0 20px rgba(255, 255, 255, 0.9)
            `;
        }
        if (cursorOutline) {
            cursorOutline.style.transform = 'scale(2.5)';
            cursorOutline.style.background = 'linear-gradient(45deg, rgba(16, 185, 129, 0.4), rgba(245, 158, 11, 0.4)) border-box';
            cursorOutline.style.border = '3px solid transparent';
        }
        if (cursorGlow) {
            cursorGlow.style.transform = 'scale(2)';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 70%)';
        }
        
        // Activate sparkles
        sparkles.forEach(sparkle => {
            sparkle.style.opacity = '1';
            sparkle.style.background = 'linear-gradient(45deg, #10b981, #f59e0b)';
        });
    });
    
    element.addEventListener('mouseleave', () => {
        element.classList.remove('cursor-magnetic');
        resetCursorStyle();
    });
});

// Function to reset cursor to default style
function resetCursorStyle() {
    if (cursorDot) {
        cursorDot.style.transform = 'scale(1)';
        cursorDot.style.background = 'radial-gradient(circle, #ffffff 20%, #6366f1 40%, #ec4899 100%)';
        cursorDot.style.boxShadow = `
            0 0 20px rgba(99, 102, 241, 0.6),
            0 0 40px rgba(236, 72, 153, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.8)
        `;
    }
    if (cursorOutline) {
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.background = 'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3)) border-box';
        cursorOutline.style.border = '2px solid transparent';
    }
    if (cursorGlow) {
        cursorGlow.style.transform = 'scale(1)';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)';
    }
    
    // Deactivate sparkles
    sparkles.forEach(sparkle => {
        sparkle.style.opacity = '0';
    });
}

// Text selection cursor effect with premium styling
document.querySelectorAll('h1, h2, h3, p').forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (cursorOutline) {
            cursorOutline.style.border = '2px dashed rgba(99, 102, 241, 0.8)';
            cursorOutline.style.animation = 'cursorPulse 1s ease-in-out infinite';
        }
        if (cursorDot) {
            cursorDot.style.background = 'radial-gradient(circle, #ffffff 30%, #6366f1 70%)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (cursorOutline) {
            cursorOutline.style.border = '2px solid transparent';
            cursorOutline.style.animation = 'none';
        }
        resetCursorStyle();
    });
});

// Feature cards magnetic effect
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (cursorDot) {
            cursorDot.style.background = 'radial-gradient(circle, #10b981, #3b82f6)';
            cursorDot.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.6)';
        }
        if (cursorOutline) {
            cursorOutline.style.borderColor = 'rgba(16, 185, 129, 0.8)';
            cursorOutline.style.background = 'rgba(16, 185, 129, 0.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (cursorDot) {
            cursorDot.style.background = 'linear-gradient(45deg, #6366f1, #ec4899)';
            cursorDot.style.boxShadow = 'none';
        }
        if (cursorOutline) {
            cursorOutline.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            cursorOutline.style.background = 'rgba(99, 102, 241, 0.1)';
        }
    });
});

// Logo interaction
document.querySelector('.logo-container')?.addEventListener('mouseenter', () => {
    if (cursorDot) {
        cursorDot.style.background = 'linear-gradient(45deg, #ffd700, #ff6b6b)';
        cursorDot.style.transform = 'scale(2)';
    }
    if (cursorOutline) {
        cursorOutline.style.borderColor = 'rgba(255, 215, 0, 0.8)';
        cursorOutline.style.transform = 'scale(1.5)';
        cursorOutline.style.background = 'rgba(255, 215, 0, 0.2)';
    }
});

document.querySelector('.logo-container')?.addEventListener('mouseleave', () => {
    if (cursorDot) {
        cursorDot.style.background = 'linear-gradient(45deg, #6366f1, #ec4899)';
        cursorDot.style.transform = 'scale(1)';
    }
    if (cursorOutline) {
        cursorOutline.style.borderColor = 'rgba(99, 102, 241, 0.5)';
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.background = 'rgba(99, 102, 241, 0.1)';
    }
});

// Form inputs cursor effect
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('mouseenter', () => {
        if (cursorDot) {
            cursorDot.style.background = 'linear-gradient(45deg, #8b5cf6, #06b6d4)';
        }
        if (cursorOutline) {
            cursorOutline.style.borderColor = 'rgba(139, 92, 246, 0.8)';
            cursorOutline.style.transform = 'scale(0.8)';
        }
    });
    
    input.addEventListener('mouseleave', () => {
        if (cursorDot) {
            cursorDot.style.background = 'linear-gradient(45deg, #6366f1, #ec4899)';
        }
        if (cursorOutline) {
            cursorOutline.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            cursorOutline.style.transform = 'scale(1)';
        }
    });
    
    input.addEventListener('focus', () => {
        if (cursorOutline) {
            cursorOutline.style.animation = 'cursorPulse 0.5s ease-in-out infinite';
        }
    });
    
    input.addEventListener('blur', () => {
        if (cursorOutline) {
            cursorOutline.style.animation = 'none';
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations go here
}, 10);

window.addEventListener('scroll', debouncedScroll);
