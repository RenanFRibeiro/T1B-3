document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector('.navbar');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });

    // CONTADORES
    const counters = document.querySelectorAll('.stat-number');

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let count = 0;

            const update = () => {
                count += target / 60;

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

    // FORM
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso!');
        });
    }

});

function setService(serviceName) {
    const textarea = document.querySelector('#contactForm textarea');
    if (textarea) {
        textarea.value = `Olá! Tenho interesse em contratar o serviço de: ${serviceName}. Gostaria de mais informações sobre como começar.`;
    }
}

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    btn.disabled = true;
    btn.innerText = 'Enviando sinal...';

    setTimeout(() => {
        btn.innerText = 'Mensagem Enviada! ✅';
        this.reset();
        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = originalText;
        }, 3000);
    }, 1500);
});