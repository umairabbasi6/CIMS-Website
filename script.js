// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Custom cursor effect for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.faculty-card, .program-card, .facility-card, .campus-life-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height / 2) / 20}deg)
                rotateY(${-(x - rect.width / 2) / 20}deg)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Faculty section hover effect
const facultyCards = document.querySelectorAll('.faculty-card');
facultyCards.forEach(card => {
    const image = card.querySelector('.faculty-image img');
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });
}

// Program cards link handling
const programCards = document.querySelectorAll('.program-card');
programCards.forEach(card => {
    const link = card.querySelector('a');
    card.addEventListener('click', (e) => {
        if (!e.target.matches('a')) {
            link.click();
        }
    });
});

// Facilities hover effect
const facilityCards = document.querySelectorAll('.facility-card');
facilityCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('img').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('img').style.transform = 'scale(1)';
    });
});

// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});
