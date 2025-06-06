// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const pageBody = document.body;

function applyTheme(theme) {
    if (!pageBody || !themeToggleBtn) {
        // console.warn("Theme toggle button or body not found for applyTheme.");
        return;
    }

    if (theme === 'dark') {
        pageBody.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️'; // Sun icon for light mode
        localStorage.setItem('theme', 'dark');
    } else {
        pageBody.classList.remove('dark-mode');
        themeToggleBtn.textContent = '🌙'; // Moon icon for dark mode
        localStorage.setItem('theme', 'light');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (pageBody.classList.contains('dark-mode')) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    });
}

// Active navigation link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLi = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Basic form validation for contact form (example)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('感謝您的訊息！我們會盡快與您聯繫。');
        this.reset();
    });
}

// IntersectionObserver for scroll animations
// This observer adds a 'visible' class to elements when they enter the viewport,
// triggering a CSS animation defined in style.css.
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries, observerInstance) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerInstance.unobserve(entry.target);
        }
    });
};

const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll('.course-item, .instructor-item, .method-content > *').forEach(el => {
    scrollObserver.observe(el);
});

// Add a CSS class for the animation (can be in style.css)
/*
.course-item, .instructor-item, .method-content > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.course-item.visible,
.instructor-item.visible,
.method-content > *.visible {
    opacity: 1;
    transform: translateY(0);
}
*/

// DOMContentLoaded for initializations
document.addEventListener('DOMContentLoaded', () => {
    // Initial theme setup
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme); // applyTheme uses global themeToggleBtn and pageBody, and has null checks.

    // IntersectionObserver for Lazy Loading Images (enhanced)
    // This observer dynamically loads images with the 'lazy-load' class and a 'data-src' attribute
    // when they are about to enter the viewport. The native `loading="lazy"` attribute is also used
    // for browsers that support it, providing a fallback and progressive enhancement.
    let lazyloadImages = document.querySelectorAll("img.lazy-load[data-src]");
    if (lazyloadImages.length > 0) {
        if ('IntersectionObserver' in window) {
            let imageObserver = new IntersectionObserver(function(entries, imgObserver) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let image = entry.target;
                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                            image.removeAttribute('data-src'); // Clean up
                        }
                        image.classList.remove("lazy-load");
                        imgObserver.unobserve(image);
                    }
                });
            });
            lazyloadImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            // Native lazy loading should still work if supported, otherwise images load normally.
            lazyloadImages.forEach(function(image) {
                if (image.dataset.src) {
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                }
                image.classList.remove("lazy-load");
            });
        }
    }
});