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

// Form submission handler
async function submitForm(formData, formType) {
    try {
        const response = await fetch('send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, formType }),
        });

        const result = await response.json();
        
        if (result.success) {
            Swal.fire({
                title: 'Success!',
                text: formType === 'admission' ? 
                    'Your application has been submitted successfully. We will contact you soon.' :
                    'Your message has been sent successfully. We will get back to you soon.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#0d6efd'
            });
            return true;
        } else {
            throw new Error(result.message || 'Failed to submit form');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'There was a problem submitting the form. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dc3545'
        });
        return false;
    }
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            // Re-enable button after submission
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }, 2000);
        });
    }
});

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

// Image lazy loading with preloading
document.addEventListener('DOMContentLoaded', function() {
    // Preload images that are close to viewport
    const preloadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px', // Increased margin for earlier loading
                threshold: 0.01 // Lower threshold for faster trigger
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
            });
        }
    };

    // Start preloading images
    preloadImages();

    // Optimize carousel transitions
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const instance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            pause: 'hover'
        });

        // Preload next slide images
        carousel.addEventListener('slide.bs.carousel', function(e) {
            const nextSlide = e.relatedTarget;
            const images = nextSlide.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        });
    });
});

// Performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Defer non-critical scripts
    const deferScripts = () => {
        const scripts = document.querySelectorAll('script[defer]');
        scripts.forEach(script => {
            script.setAttribute('async', '');
        });
    };

    // Initialize components only when needed
    const initializeComponents = () => {
        // Initialize tooltips only when hovering over elements with tooltips
        document.addEventListener('mouseover', function(e) {
            if (e.target.dataset.bsToggle === 'tooltip') {
                new bootstrap.Tooltip(e.target);
            }
        }, { passive: true });
    };

    deferScripts();
    initializeComponents();
});

// Program selection logic
document.addEventListener('DOMContentLoaded', function() {
    const departmentSelect = document.getElementById('department');
    const programSelect = document.getElementById('program');

    if (departmentSelect && programSelect) {
        const programsByDepartment = {
            fsc: [
                'Medical Lab Technology (MLT)',
                'Operation Theatre Technology (OTT)',
                'X-Ray Technology',
                'Dental Hygiene Technology',
                'Dispensing Technology',
                'Cardiac Technology'
            ],
            bs: [
                'Medical Laboratory Sciences',
                'Operation Theatre Technology',
                'Medical Imaging Technology',
                'Emergency Medical Technology',
                'Anaesthesia Technology'
            ],
            nursing: [
                'Lady Health Visitor (LHV)',
                'Certified Nursing Assistant (CNA)',
                'Mid-Wifery'
            ],
            diploma: [
                'Dispenser',
                'Medical Lab Technology (MLT)',
                'Operation Theatre Technology (OT)'
            ]
        };

        departmentSelect.addEventListener('change', function() {
            programSelect.disabled = false;
            programSelect.innerHTML = '<option value="">Select Program</option>';
            
            const selectedDepartment = this.value;
            if (selectedDepartment && programsByDepartment[selectedDepartment]) {
                programsByDepartment[selectedDepartment].forEach(program => {
                    const option = document.createElement('option');
                    option.value = program;
                    option.textContent = program;
                    programSelect.appendChild(option);
                });
            } else {
                programSelect.disabled = true;
                programSelect.innerHTML = '<option value="">First Select Department</option>';
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            // Re-enable button after submission
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }, 2000);
        });
    }

    // Admission Form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Submitting...';

            // Re-enable button after submission
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit Application';
            }, 2000);
        });
    }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default as we want the form to submit to Formspree
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            // After 2 seconds, show success message
            setTimeout(() => {
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'Thank you for your message. We will get back to you soon.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#0d6efd'
                }).then(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                });
            }, 2000);
        });
    }
});
