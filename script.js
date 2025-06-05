// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

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
        // In a real application, you would send this data to a server
        alert('感謝您的訊息！我們會盡快與您聯繫。');
        this.reset(); // Reset form fields
    });
}

// Optional: Add a subtle animation to elements on scroll
const observerOptions = {
    root: null, // relative to document viewport 
    rootMargin: '0px',
    threshold: 0.1 // 10% of item is visible
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optional: stop observing once animated
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Apply to elements you want to animate
document.querySelectorAll('.course-item, .instructor-item, .method-content > *').forEach(el => {
    observer.observe(el);
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
// Note: The CSS for the 'visible' class should be in style.css for better organization.
// I'll add it there in the next step if you'd like, or you can add it manually.
// For now, this JS sets up the observation.