// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');

// GSAP Timeline for hero animations
let heroTimeline;
let isAnimationsEnabled = true;

// Check for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isAnimationsEnabled = false;
}

// Initialize GSAP animations
function initGSAPAnimations() {
    if (!isAnimationsEnabled) {
        return;
    }

    // Set initial states for animations
    gsap.set('.hero-line', { x: -50, opacity: 0 });
    gsap.set('.hero-subtitle', { x: -30, opacity: 0 });
    gsap.set('.hero-stats', { y: 20, opacity: 0 });
    gsap.set('.hero-cta', { y: 20, opacity: 0 });
    gsap.set('.dashboard-container', { x: 50, opacity: 0 });
    gsap.set('.feature-badge', { scale: 0.8, y: 10, opacity: 0 });

    // Hero section animations
    heroTimeline = gsap.timeline({ delay: 0.5 });
    
    // Animate hero text with stagger effect
    heroTimeline
        .to('.hero-line', {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        })
        .to('.hero-subtitle', {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-stats', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3')
        .to('.hero-cta', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');

    // Dashboard image animation (slide in from right)
    gsap.to('.dashboard-container', {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.8
    });

    // Feature badges animation with delay
    gsap.to('.feature-badge', {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 1.5
    });

    // Floating elements continuous animation
    gsap.set('.floating-element', { transformOrigin: 'center center' });
    
    document.querySelectorAll('.floating-element').forEach((element, index) => {
        gsap.to(element, {
            y: '+=20',
            rotation: '+=360',
            duration: 6 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
        });
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    if (!isAnimationsEnabled || window.innerWidth <= 768) return;

    // Dashboard image parallax
    gsap.to('.dashboard-container', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Floating elements parallax
    document.querySelectorAll('.floating-element').forEach((element, index) => {
        gsap.to(element, {
            y: -100 - (index * 20),
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    });

    // Navbar background change on scroll
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: self => {
            if (self.progress > 0.1) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Scroll-triggered animations for sections
function initScrollAnimations() {
    if (!isAnimationsEnabled) {
        return;
    }

    // Set initial states
    gsap.set('.section-header h2', { y: 30, opacity: 0 });
    gsap.set('.section-header p', { y: 20, opacity: 0 });
    gsap.set('.service-card', { y: 50, opacity: 0 });
    gsap.set('.product-card', { y: 30, opacity: 0 });
    gsap.set('.feature-card', { y: 40, opacity: 0 });
    gsap.set('.highlight-item', { x: 30, opacity: 0 });

    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.to(header.querySelector('h2'), {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.to(header.querySelector('p'), {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Service cards staggered animation
    gsap.to('.service-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Product cards animation
    gsap.to('.product-card', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });

    // Feature cards animation
    gsap.to('.feature-card', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // About section highlights
    gsap.to('.highlight-item', {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-highlights',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Enhanced hover animations for interactive elements
function initHoverAnimations() {
    if (!isAnimationsEnabled) return;

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
            gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: 'power2.out' });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
            gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });
        });
    });

    // Dashboard image hover effect
    const dashboardImage = document.querySelector('.dashboard-image');
    if (dashboardImage) {
        dashboardImage.addEventListener('mouseenter', () => {
            gsap.to(dashboardImage, { 
                scale: 1.02, 
                duration: 0.4, 
                ease: 'power2.out',
                transformOrigin: 'center center'
            });
        });
        
        dashboardImage.addEventListener('mouseleave', () => {
            gsap.to(dashboardImage, { 
                scale: 1, 
                duration: 0.4, 
                ease: 'power2.out' 
            });
        });
    }
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        // Close animation
        if (isAnimationsEnabled) {
            gsap.to(navMenu, { 
                opacity: 0, 
                y: -20, 
                duration: 0.3, 
                ease: 'power2.in',
                onComplete: () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    } else {
        // Open animation
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (isAnimationsEnabled) {
            gsap.fromTo(navMenu, 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }
}

// Close mobile menu
function closeMobileNav() {
    if (navMenu.classList.contains('active')) {
        if (isAnimationsEnabled) {
            gsap.to(navMenu, { 
                opacity: 0, 
                y: -20, 
                duration: 0.2, 
                ease: 'power2.in',
                onComplete: () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Smooth scrolling to sections with GSAP
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        
        if (isAnimationsEnabled) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: offsetTop, autoKill: true },
                ease: 'power2.inOut'
            });
        } else {
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    closeMobileNav();
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Active nav link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Contact form handling with animations
function handleContactForm(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state with animation
    submitButton.classList.add('loading');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Animate form submission
    if (isAnimationsEnabled) {
        gsap.to(contactForm, { scale: 0.98, duration: 0.2, yoyo: true, repeat: 1 });
    }

    // Simulate form submission
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button state
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Animate success state
        if (isAnimationsEnabled) {
            gsap.fromTo(contactForm, 
                { scale: 0.95 },
                { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
            );
        }
        
        console.log('Contact form submitted:', data);
    }, 2000);
}

// Enhanced notification system with animations
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        if (isAnimationsEnabled) {
            gsap.to(existingNotification, {
                x: '100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => existingNotification.remove()
            });
        } else {
            existingNotification.remove();
        }
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-16);
                box-shadow: var(--shadow-lg);
                z-index: 1001;
                max-width: 400px;
                transform: translateX(100%);
                opacity: 0;
            }
            
            .notification--success {
                background: rgba(var(--color-success-rgb), 0.1);
                border-color: rgba(var(--color-success-rgb), 0.3);
                color: var(--color-success);
            }
            
            .notification--error {
                background: rgba(var(--color-error-rgb), 0.1);
                border-color: rgba(var(--color-error-rgb), 0.3);
                color: var(--color-error);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--space-12);
            }
            
            .notification-message {
                flex: 1;
                font-size: var(--font-size-sm);
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: currentColor;
                opacity: 0.7;
                transition: opacity var(--duration-fast) var(--ease-standard);
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    // Add notification to page
    document.body.appendChild(notification);

    // Animate notification in
    if (isAnimationsEnabled) {
        gsap.fromTo(notification,
            { x: '100%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
    } else {
        gsap.set(notification, { x: '0%', opacity: 1 });
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            if (isAnimationsEnabled) {
                gsap.to(notification, {
                    x: '100%',
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => notification.remove()
                });
            } else {
                notification.remove();
            }
        }
    }, 5000);
}

// Enhanced button click handlers
function handleCTAClick(action) {
    // Add click animation
    if (isAnimationsEnabled && event.target) {
        gsap.to(event.target, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    }

    switch(action) {
        case 'explore-services':
            scrollToSection('services');
            break;
        case 'get-started':
            scrollToSection('contact');
            break;
        case 'more-details':
            showNotification('More details coming soon! Contact us for specific information.', 'info');
            break;
        default:
            scrollToSection('contact');
    }
}

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Responsive animation handling
function handleResize() {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
    
    // Disable complex animations on small screens for performance
    if (window.innerWidth <= 768) {
        // Kill parallax animations on mobile
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars && trigger.vars.scrub) {
                trigger.kill();
            }
        });
    } else if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        initParallaxEffects();
    }
}

// Initialize everything when DOM is loaded
function init() {
    // Add event listeners
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Throttled scroll handler
    const throttledScrollHandler = throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
    }, 16);

    window.addEventListener('scroll', throttledScrollHandler);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Handle window resize
    window.addEventListener('resize', throttle(handleResize, 250));

    // Initialize GSAP animations after a short delay to ensure DOM is ready
    setTimeout(() => {
        initGSAPAnimations();
        initParallaxEffects();
        initScrollAnimations();
        initHoverAnimations();
    }, 100);

    // Set initial states
    handleNavbarScroll();
    updateActiveNavLink();
}

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.handleCTAClick = handleCTAClick;

// Form field enhancements with animations
function enhanceFormFields() {
    const formFields = document.querySelectorAll('.form-control');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            if (isAnimationsEnabled) {
                gsap.to(this, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
            }
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (isAnimationsEnabled) {
                gsap.to(this, { scale: 1, duration: 0.2, ease: 'power2.out' });
            }
            
            if (this.value.trim() === '') {
                this.parentElement.classList.remove('filled');
            } else {
                this.parentElement.classList.add('filled');
            }
        });

        // Real-time validation
        field.addEventListener('input', function() {
            if (this.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.setCustomValidity('Please enter a valid email address');
                } else {
                    this.setCustomValidity('');
                }
            }
        });
    });
}

// Keyboard navigation support
function addKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
        }
        
        if (e.key === 'Enter' && e.target.classList.contains('service-card')) {
            handleCTAClick('more-details');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Additional initialization for enhanced features
document.addEventListener('DOMContentLoaded', () => {
    enhanceFormFields();
    addKeyboardSupport();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.killAll();
    }
    if (typeof gsap !== 'undefined') {
        gsap.killTweensOf('*');
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        handleCTAClick,
        showNotification
    };
}