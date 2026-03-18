/* Complex Animations: Magnetic Hover, Text Splitting, Intersection Observers */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initial Hero Animations
    const fadeIns = document.querySelectorAll('.hidden-on-load');
    setTimeout(() => {
        fadeIns.forEach((el, index) => {
            el.style.transition = `opacity 1s ease ${index * 0.2}s`;
            el.style.opacity = '1';
        });
    }, 500);

    // 2. Split Hero Name
    const heroName = document.getElementById("hero-name");
    if(heroName) {
        const text = heroName.innerText;
        heroName.innerHTML = '';
        const words = text.split(" ");
        words.forEach((word) => {
            const wordDiv = document.createElement("div");
            wordDiv.className = "word";
            for (let i = 0; i < word.length; i++) {
                const charSpan = document.createElement("span");
                charSpan.className = "char";
                if (word[i] === " ") {
                    charSpan.innerHTML = "&nbsp;";
                } else {
                    charSpan.innerText = word[i];
                }
                const rx = (Math.random() - 0.5) * window.innerWidth * 0.8;
                const ry = (Math.random() - 0.5) * window.innerHeight * 0.8;
                const rz = (Math.random() - 0.5) * 180;
                charSpan.style.setProperty('--rx', rx);
                charSpan.style.setProperty('--ry', ry);
                charSpan.style.setProperty('--rz', rz);
                charSpan.style.transitionDelay = `${(Math.random() * 0.5)}s`;
                wordDiv.appendChild(charSpan);
            }
            heroName.appendChild(wordDiv);
        });

        setTimeout(() => {
            document.querySelectorAll('.char').forEach(char => {
                char.classList.add('visible');
            });
        }, 100);
    }

    // 3. Scroll Reveal
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

    // 4. Magnetic 3D Hover
    const magneticCards = document.querySelectorAll('.magnetic-hover');
    magneticCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.borderColor = 'var(--accent-cyan)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.borderColor = 'var(--glass-border)';
            card.style.zIndex = '1';
            
            card.style.transition = 'transform 0.5s ease, border-color 0.5s ease';
            setTimeout(() => { card.style.transition = 'border-color 0.5s ease'; }, 500);
        });
        
        card.addEventListener('mouseenter', () => { card.style.transition = 'border-color 0.5s ease'; });
    });

    // 5. Upgrade: Extended Orbital System
    const orbitalContainer = document.getElementById('orbital-skills');
    if (orbitalContainer) {
        const badges = document.querySelectorAll('.orbital-badge');
        
        const updatePositions = () => {
            const centerX = orbitalContainer.offsetWidth / 2;
            const centerY = orbitalContainer.offsetHeight / 2;
            
            badges.forEach(badge => {
                let angle = parseFloat(badge.getAttribute('data-angle'));
                const speed = parseFloat(badge.getAttribute('data-speed'));
                const radius = parseFloat(badge.getAttribute('data-radius'));
                
                const x = centerX + Math.cos(angle) * (radius);
                const y = centerY + Math.sin(angle) * (radius);
                
                badge.style.left = `${x}px`;
                badge.style.top = `${y}px`;
                badge.style.transform = 'translate(-50%, -50%)';
                
                angle += speed;
                if (angle >= Math.PI * 2) angle -= Math.PI * 2;
                if (angle <= -Math.PI * 2) angle += Math.PI * 2;
                badge.setAttribute('data-angle', angle);
            });
            requestAnimationFrame(updatePositions);
        };
        updatePositions();
    }
    
    // 6. Interactive Link Hovers
    const trail = document.getElementById("cursor-trail");
    if(trail) {
        document.querySelectorAll('a.btn-secondary, .pink-glow').forEach(el => {
            el.addEventListener('mouseenter', () => trail.classList.add('hovering-pink'));
            el.addEventListener('mouseleave', () => trail.classList.remove('hovering-pink'));
        });
    }
});
