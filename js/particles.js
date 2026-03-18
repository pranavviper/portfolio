/* Star Particles Canvas */
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("star-canvas");
    const ctx = canvas.getContext("2d");
    
    let width, height;
    let particles = [];
    
    // Track mouse for interaction
    let mouse = { x: null, y: null, radius: 150 };
    
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }
    
    window.addEventListener("resize", resize);
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            // Choose color: white, cyan, or blue
            const colors = ['#ffffff', '#00e6b4', '#0077ff'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.8 + 0.2;
        }
        
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            
            // Add slight glow
            ctx.shadowBlur = 5;
            ctx.shadowColor = this.color;
        }
        
        update() {
            // Natural drifting
            this.x += this.vx;
            this.y += this.vy;
            
            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
            
            // Mouse interaction (repel)
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = forceDirectionX * force * this.density * -0.5;
                    let directionY = forceDirectionY * force * this.density * -0.5;
                    this.x += directionX;
                    this.y += directionY;
                }
            }
        }
    }
    
    function initParticles() {
        particles = [];
        // Number of particles based on screen size
        let numParticles = (width * height) / 8000;
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }
    
    resize();
    animate();
});
