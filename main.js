document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ?
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

   
    // Category Tabs (for work.html)
    const categoryTabs = document.querySelectorAll('.category-tab');
    const eventSections = document.querySelectorAll('.event-section');

    if (categoryTabs.length && eventSections.length) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                const category = tab.getAttribute('data-category');

                // Show/hide sections
                eventSections.forEach(section => {
                    if (category === 'all' || section.id === category) {
                        section.classList.add('active');
                        section.style.display = 'block';
                        // Trigger animation for gallery items
                        section.querySelectorAll('.gallery-item').forEach(item => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 100);
                        });
                    } else {
                        section.classList.remove('active');
                        section.style.display = 'none';
                    }
                });

                // Smooth scroll to .work-categories
                const workCategories = document.querySelector('.work-categories');
                if (workCategories) {
                    window.scrollTo({
                        top: workCategories.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Activate first tab by default
        if (!document.querySelector('.category-tab.active')) {
            categoryTabs[0].click();
        }
    }

    // Clients Carousel (for work.html)
    const clientsCarousel = document.querySelector('.clients-carousel');

    if (clientsCarousel) {
        let scrollAmount = 0;
        const scrollSpeed = 1;
        const carouselWidth = clientsCarousel.scrollWidth / 2; // Half due to duplicated items

        function scrollCarousel() {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= carouselWidth) {
                scrollAmount = 0;
                clientsCarousel.scrollTo({ left: 0, behavior: 'instant' });
            }
            clientsCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            requestAnimationFrame(scrollCarousel);
        }

        scrollCarousel();
    }

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
        animateOnScroll();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .gallery-item');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const animateOnScroll = () => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    animateOnScroll();

    // Hero Slideshow
    const heroSlideshow = () => {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;

        if (slides.length === 0) return;

        slides[0].classList.add('active');
        if (dots.length > 0) dots[0].classList.add('active');

        const showSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);

        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    showSlide(index);
                    slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
                });
            });
        }
    };

    heroSlideshow();
});