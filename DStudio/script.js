// ============================================
//  T1B-3 DIGITAL STUDIO — script.js v2.0
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // ---- NAVBAR SCROLL ----
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                handleBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---- CONTADORES ANIMADOS ----
    const counters = document.querySelectorAll('.stat-number');

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let count = 0;
            const duration = 1800;
            const increment = target / (duration / 16);

            const update = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });
    };

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // ---- FORMULÁRIO ----
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerText;

            btn.disabled = true;
            btn.innerText = 'Enviando...';

            setTimeout(() => {
                btn.innerText = 'Mensagem Enviada! ✅';
                form.reset();
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerText = original;
                    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                    if (modal) modal.hide();
                }, 2500);
            }, 1500);
        });
    }

    // ---- FILTRO PORTFÓLIO ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-grid-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 400);
                }
            });
        });
    });

    // ---- BACK TO TOP ----
    const backToTopBtn = document.getElementById('backToTop');

    function handleBackToTop() {
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', window.scrollY > 400);
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- SMOOTH SCROLL (links internos) ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- SCROLL REVEAL ----
    const revealElements = document.querySelectorAll(
        '.service-card-detailed, .blog-card, .stat-card, .team-member, .testimonial-card, .process-step, .accordion-item'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.1}s, transform 0.5s ease ${(i % 4) * 0.1}s`;
        revealObserver.observe(el);
    });

    // ---- NAVBAR ACTIVE LINK ON SCROLL ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

});

// ---- SETSERVICE (Modal) ----
function setService(serviceName) {
    const select = document.querySelector('#serviceSelect');
    if (select) {
        for (let opt of select.options) {
            if (opt.text === serviceName) {
                select.value = opt.value;
                break;
            }
        }
    }
    const textarea = document.querySelector('#contactForm textarea');
    if (textarea) {
        textarea.value = `Olá! Tenho interesse em contratar o serviço de: ${serviceName}. Gostaria de mais informações sobre como começar.`;
    }
}
