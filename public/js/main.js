// Arquivo: public/js/main.js

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
}

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href').substring(2);
        const target = document.getElementById(id);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            if(navMenu && mobileMenuToggle) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const submitText = document.getElementById('submitText');
    const submitLoading = document.getElementById('submitLoading');
    const successMessage = document.getElementById('successMessage');

    const patterns = {
        name: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\d\s\-\(\)]+$/,
        message: /^.{10,}$/
    };

    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const formGroup = field.closest('.form-group');

        if (!formGroup) return true; // Safety check

        if (field.hasAttribute('required') && !fieldValue) {
            formGroup.classList.add('error');
            return false;
        }

        if (patterns[fieldName] && fieldValue && !patterns[fieldName].test(fieldValue)) {
            formGroup.classList.add('error');
            return false;
        }

        formGroup.classList.remove('error');
        return true;
    }

    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group')?.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fields = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        submitText.style.display = 'none';
        submitLoading.style.display = 'inline-block';

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            successMessage.classList.add('show');
            contactForm.reset();
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        } finally {
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .benefit-card, .case-card, .about-text, .about-image, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
if(heroSection) {
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            if(heroContent) heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;

            floatingElements.forEach((el, index) => {
                const speed = 0.3 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
}