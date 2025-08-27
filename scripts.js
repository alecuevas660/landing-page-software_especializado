// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando scripts...');
    
    // Elementos del navbar
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    
    // Verificar que los elementos existen
    if (!navbar || !navToggle || !navMenu || !navOverlay) {
        console.error('No se encontraron elementos del navbar');
        return;
    }
    
    // Navbar sticky
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const toggleMobileMenu = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Keyboard support for mobile menu
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Close mobile menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Función simple para scroll suave
    function scrollToSection(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            // Cerrar menú móvil si está abierto
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Scroll simple y directo
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Agregar event listeners a todos los enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Enlaces internos encontrados:', internalLinks.length);
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const targetId = href.substring(1); // Remover el #
            
            console.log('Click en enlace:', href, 'Target ID:', targetId, 'Texto:', this.textContent.trim());
            
            // Hacer scroll
            scrollToSection(targetId);
        });
    });

    // Animación de contadores en las estadísticas
    const statItems = document.querySelectorAll('.stat-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const target = parseInt(statNumber.textContent.replace('+', ''));
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        statNumber.textContent = target + (statNumber.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(count);
                    }
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => {
        observer.observe(item);
    });
    
    console.log('Scripts inicializados correctamente');
});