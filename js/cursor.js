/* Custom Cursor Implementation */
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("custom-cursor");
    const trail = document.getElementById("cursor-trail");
    
    // Track mouse position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Track actual trail position for loose following
    let trailX = window.innerWidth / 2;
    let trailY = window.innerHeight / 2;
    
    // Add event listener for mouse movement
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant cursor update
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });
    
    // Add hover effects for interactive elements
    const interactives = document.querySelectorAll('a, button, .magnetic-hover');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => trail.classList.add('hovering'));
        el.addEventListener('mouseleave', () => trail.classList.remove('hovering'));
    });
    
    // Animation loop for trail (smooth trailing effect)
    function animateCursor() {
        // Easing interpolation
        const easing = 0.15;
        
        trailX += (mouseX - trailX) * easing;
        trailY += (mouseY - trailY) * easing;
        
        trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide default cursor globally just in case (CSS handles it, this is backup)
    document.body.style.cursor = 'none';
});
