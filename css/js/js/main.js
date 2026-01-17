// ==========================================
// Smooth Scroll
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// FAQ Accordion
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ==========================================
// Header Scroll Effect
// ==========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// Scroll Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll(
    '.problem-card, .feature-card, .use-case-card, .step, .faq-item'
);

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==========================================
// Form Validation (Demo)
// ==========================================
const demoForm = document.querySelector('.demo-form');

if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const purpose = document.getElementById('purpose').value;
        
        // Basic validation
        if (!email || !age || !purpose) {
            alert('すべての項目を入力してください。');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('有効なメールアドレスを入力してください。');
            return;
        }
        
        // Show success message (in production, this would submit to backend)
        alert('登録ありがとうございます！\n\nこれはデモフォームです。実際にはGoogle Formに置き換えてください。\n\n入力内容:\nメール: ' + email + '\n年齢層: ' + age + '\n目的: ' + purpose);
        
        // Reset form
        demoForm.reset();
    });
}

// ==========================================
// Stats Counter Animation
// ==========================================
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateValue(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

function animateValue(element) {
    const text = element.textContent;
    
    // Skip animation for non-numeric values
    if (text === '24/7' || text === '∞' || text === 'AI') {
        element.style.opacity = '1';
        return;
    }
    
    const duration = 1000;
    const start = 0;
    const end = parseInt(text) || 0;
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * range + start);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text;
        }
    }
    
    requestAnimationFrame(update);
}

// ==========================================
// Mobile Menu Toggle (if needed in future)
// ==========================================
// Uncomment this section if you add a mobile hamburger menu

/*
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}
*/

// ==========================================
// CTA Button Click Tracking (for analytics)
// ==========================================
const ctaButtons = document.querySelectorAll('.cta-button-primary, .cta-button-small');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Log to console (replace with actual analytics in production)
        console.log('CTA Button clicked:', button.textContent.trim());
        
        // Example: Google Analytics tracking
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'click', {
        //         'event_category': 'CTA',
        //         'event_label': button.textContent.trim()
        //     });
        // }
    });
});

// ==========================================
// Prevent FOUC (Flash of Unstyled Content)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// ==========================================
// Performance Optimization: Lazy Load Images
// ==========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// Console Welcome Message
// ==========================================
console.log('%c🤖 Vincent Bot', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cAIで英語学習を革新する', 'font-size: 14px; color: #64748b;');
console.log('%c開発に興味がある方は、お気軽にお問い合わせください！', 'font-size: 12px; color: #94a3b8;');
