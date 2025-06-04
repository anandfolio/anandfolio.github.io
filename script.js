// Typing effect for terminal
const terminalText = `> Initializing system...
> Running security protocols...
> Access granted...
> Welcome to my portfolio...`;

const typingDelay = 50;
const terminalContent = document.querySelector('.typing-text');

function typeText() {
    let charIndex = 0;
    const textArray = terminalText.split('');
    
    const typing = setInterval(() => {
        if (charIndex < textArray.length) {
            terminalContent.innerHTML += textArray[charIndex];
            charIndex++;
        } else {
            clearInterval(typing);
        }
    }, typingDelay);
}

// Matrix rain effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fontSize = 14;
        this.initialize();
        window.addEventListener('resize', () => this.initialize());
    }

    initialize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
        this.animate();
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Header Toggle Functionality
function setupHeaderToggle() {
    const header = document.querySelector('header');
    const toggleBtn = document.getElementById('header-toggle');
    const icon = toggleBtn?.querySelector('.btn-icon');
    const spacer = document.querySelector('.header-spacer');
    
    if (!header || !toggleBtn || !icon || !spacer) return;

    let isHeaderVisible = true;

    function updateHeader() {
        const mobileHeight = window.innerWidth <= 768 ? '120px' : '60px';
        header.style.transform = isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)';
        spacer.style.height = isHeaderVisible ? mobileHeight : '0';
        icon.textContent = isHeaderVisible ? '▾' : '▴';
    }

    toggleBtn.addEventListener('click', () => {
        isHeaderVisible = !isHeaderVisible;
        updateHeader();
        console.log('Header toggled:', isHeaderVisible);
    });

    window.addEventListener('resize', updateHeader);
    updateHeader();
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    function initTheme() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    themeBtn.addEventListener('click', toggleTheme);
    initTheme();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    setupHeaderToggle();
    setupSmoothScrolling();
    setupThemeToggle();
    
    // Effects and animations
    typeText();
    new MatrixRain();
    
    // Terminal simulation
    new TerminalSimulation();
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });
});

// Terminal Simulation (keep this single implementation)
class TerminalSimulation {
    constructor() {
        this.lines = [
            'Initializing system...',
            'Loading security protocols...',
            'Scanning for vulnerabilities...',
            'Access granted. Welcome back.',
        ];
        this.currentLine = 0;
        this.terminal = document.querySelector('.terminal-body');
        if (this.terminal) this.simulate();
    }
    
    async simulate() {
        for (const line of this.lines) {
            await this.typeLine(line);
            await this.wait(1000);
        }
    }
    
    async typeLine(text) {
        const lineElement = document.createElement('div');
        lineElement.classList.add('line');
        this.terminal.appendChild(lineElement);
        
        for (const char of text) {
            lineElement.textContent += char;
            await this.wait(50);
        }
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}