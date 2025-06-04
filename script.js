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
    const penguin = toggleBtn.querySelector('.penguin');
    
    if (!header || !toggleBtn) return;

    let isHeaderVisible = true;

    function updateHeader() {
        const mobileHeight = window.innerWidth <= 768 ? '120px' : '60px';
        header.style.transform = isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)';
        document.querySelector('.header-spacer').style.height = isHeaderVisible ? mobileHeight : '0';
        
        // Update button appearance
        toggleBtn.querySelector('.btn-icon').textContent = isHeaderVisible ? '▾' : '▴';
        toggleBtn.querySelector('.btn-text').textContent = isHeaderVisible ? 'Click to Hide Header' : 'Click to Show Header';
        
        // Penguin reaction
        if (!isHeaderVisible) {
            penguin.style.animation = 'penguin-fall 0.5s forwards';
            setTimeout(() => {
                penguin.style.display = 'none';
            }, 500);
        } else {
            penguin.style.display = 'block';
            penguin.style.animation = 'penguin-rescue 0.5s forwards, penguin-swing 3s 0.5s infinite ease-in-out';
        }
    }

    toggleBtn.addEventListener('click', () => {
        isHeaderVisible = !isHeaderVisible;
        updateHeader();
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

// Terminal Simulation
class HackerTerminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.currentPath = '~';
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.fileSystem = {
            '~': {
                'README.txt': 'Welcome to Anandram\'s cyber domain.\n\nThis terminal provides direct access to my portfolio systems.\nType "help" for available commands.',
                'projects': {
                    'xor_cipher.md': 'A custom implementation of XOR cipher with multiple encryption modes.',
                    'ai_assistant.md': 'Fully offline AI assistant using LLaMA2 and Ollama.',
                    'solana_token.md': 'Custom cryptocurrency token deployed on Solana blockchain.'
                },
                'contact.txt': 'Email: anandrammohan9952@gmail.com\nGitHub: ArenRedd\nTelegram: @PeterDinklag'
            }
        };
        
        this.commands = {
            help: this.help.bind(this),
            about: this.about.bind(this),
            projects: this.projects.bind(this),
            contact: this.contact.bind(this),
            clear: this.clear.bind(this),
            ls: this.ls.bind(this),
            cat: this.cat.bind(this),
            cd: this.cd.bind(this),
            banner: this.banner.bind(this),
            sudo: this.sudo.bind(this)
        };
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('keydown', this.handleInput.bind(this));
        this.printBanner();
    }
    
    handleInput(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.processCommand(command);
            }
            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            if (this.commandHistory.length > 0) {
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                }
                this.input.value = this.commandHistory[this.historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex] || '';
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }
    
    processCommand(input) {
        const [command, ...args] = input.split(' ');
        const output = document.createElement('div');
        output.innerHTML = `<span class="prompt">anandram@portfolio:<span class="path">${this.currentPath}</span>$</span> ${input}`;
        this.output.appendChild(output);
        
        if (this.commands[command]) {
            const result = this.commands[command](...args);
            if (result !== undefined) {
                const resultElement = document.createElement('div');
                resultElement.innerHTML = result;
                this.output.appendChild(resultElement);
            }
        } else {
            this.output.appendChild(this.createLine(`Command not found: ${command}. Type 'help' for available commands.`));
        }
        
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    createLine(text, className = '') {
        const line = document.createElement('div');
        line.className = className;
        line.textContent = text;
        return line;
    }
    
    // Command implementations
    help() {
        return `<pre>Available commands:
  about      - Who is Anandram?
  projects   - List my hacking creations
  contact    - My contact information
  clear      - Clear the terminal
  ls         - List directory contents
  cat [file] - View file contents
  cd [dir]   - Change directory
  banner     - Display system banner
  sudo [cmd] - Execute privileged command</pre>`;
    }
    
    about() {
        return `Anandram Mohan - Cybersecurity Specialist

Ethical hacker and security researcher with expertise in:
- Penetration Testing
- Vulnerability Assessment
- Security Architecture
- Cryptography

Currently building private, secure systems for personal use.`;
    }
    
    projects() {
        return `My current projects:
1. <span class="command">Cloud File Storage Server</span> - Private cloud solution
2. <span class="command">Multi-Engine Search Platform</span> - Privacy-focused search
3. <span class="command">Custom Cryptocurrency</span> - Solana blockchain token
4. <span class="command">AI Chatbot</span> - Offline LLaMA2 implementation

Type <span class="command">'ls projects'</span> for details.`;
    }
    
    contact() {
        return this.cat('contact.txt');
    }
    
    clear() {
        this.output.innerHTML = '';
        return undefined;
    }
    
    ls(path = this.currentPath) {
        const folder = this.getFolder(path);
        if (!folder) return `<span class="error">ls: cannot access '${path}': No such directory</span>`;
        
        const items = Object.keys(folder).map(item => {
            if (typeof folder[item] === 'string') {
                return `<span class="command">${item}</span>`;
            } else {
                return `<span style="color:#0af">${item}/</span>`;
            }
        });
        
        return items.join('  ');
    }
    
    cat(filename) {
        const path = this.getFolder(this.currentPath);
        if (!path || !path[filename]) {
            return `<span class="error">cat: ${filename}: No such file</span>`;
        }
        return path[filename];
    }
    
    cd(dirname) {
        if (!dirname || dirname === '~') {
            this.currentPath = '~';
            return '';
        }
        
        const path = this.getFolder(this.currentPath);
        if (path && path[dirname] && typeof path[dirname] === 'object') {
            this.currentPath = `${this.currentPath}/${dirname}`;
            return '';
        }
        
        return `<span class="error">cd: ${dirname}: No such directory</span>`;
    }
    
    banner() {
        return `<Portnix Terminal>
   
╭━━━┳━━━┳━━━┳━╮╱╭┳━━━┳━━━┳━━━┳━━━╮
┃╭━╮┃╭━╮┃╭━━┫┃╰╮┃┃╭━╮┃╭━━┻╮╭╮┣╮╭╮┃
┃┃╱┃┃╰━╯┃╰━━┫╭╮╰╯┃╰━╯┃╰━━╮┃┃┃┃┃┃┃┃
┃╰━╯┃╭╮╭┫╭━━┫┃╰╮┃┃╭╮╭┫╭━━╯┃┃┃┃┃┃┃┃
┃╭━╮┃┃┃╰┫╰━━┫┃╱┃┃┃┃┃╰┫╰━━┳╯╰╯┣╯╰╯┃
╰╯╱╰┻╯╰━┻━━━┻╯╱╰━┻╯╰━┻━━━┻━━━┻━━━╯

Secure Terminal v1.0
<Welcome To My Portfolio>`;
    }
    
    sudo(cmd) {
        if (cmd === 'rm -rf /') {
            return `<span class="error">Nice try. System protections engaged.</span>`;
        }
        return `<span class="error">sudo: ${cmd}: command not found</span>`;
    }
    
    getFolder(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.fileSystem;
        
        for (const part of parts) {
            if (current[part] && typeof current[part] === 'object') {
                current = current[part];
            } else {
                return null;
            }
        }
        
        return current;
    }
    
    printBanner() {
        const bannerElement = document.createElement('pre');
        bannerElement.className = 'line ascii-art';
        bannerElement.textContent = this.banner();
    
        this.output.appendChild(bannerElement);
    
        // Fetch quotes from local JSON
        fetch('quotes.json')
            .then(res => res.json())
            .then(quotes => {
                const quote = quotes[Math.floor(Math.random() * quotes.length)];
                const quoteElement = this.createLine(`"${quote}"`, 'quote');
                this.output.appendChild(quoteElement);
    
                const welcome = this.createLine('Type "help" to list available commands');
                this.output.appendChild(welcome);
            })
            .catch(err => {
                const fallback = this.createLine('> Secure connection established. No quotes loaded.', 'quote');
                this.output.appendChild(fallback);
                const welcome = this.createLine('Type "help" to list available commands');
                this.output.appendChild(welcome);
            });
    }
    
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HackerTerminal();
});

