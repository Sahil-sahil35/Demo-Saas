// AI Learning Lab - Main JavaScript
class AILearningLab {
    constructor() {
        this.projects = this.loadProjects();
        this.user = this.loadUser();
        this.init();
    }

    init() {
        this.setupBackgroundAnimation();
        this.setupScrollAnimations();
        this.setupTypewriter();
        this.setupCounters();
        this.renderProjects();
        this.setupEventListeners();
        this.startPeriodicUpdates();
    }

    // Background Animation with p5.js
    setupBackgroundAnimation() {
        const sketch = (p) => {
            let particles = [];
            let connections = [];
            
            p.setup = () => {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('hero-bg');
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 6)
                    });
                }
            };
            
            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                particles.forEach((particle, i) => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(193, 120, 23, 100);
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                    
                    // Draw connections
                    particles.forEach((other, j) => {
                        if (i !== j) {
                            const distance = p.dist(particle.x, particle.y, other.x, other.y);
                            if (distance < 100) {
                                p.stroke(124, 152, 133, 50);
                                p.strokeWeight(1);
                                p.line(particle.x, particle.y, other.x, other.y);
                            }
                        }
                    });
                });
            };
            
            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        };
        
        new p5(sketch);
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Typewriter Effect
    setupTypewriter() {
        const typed = new Typed('#hero-text', {
            strings: [
                'Master Machine Learning',
                'Build Intelligent Models',
                'Unlock Data Insights',
                'Create AI Solutions'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }

    // Animated Counters
    setupCounters() {
        const counters = [
            { id: 'projects-count', target: 247, suffix: '' },
            { id: 'models-trained', target: 1834, suffix: '' },
            { id: 'datasets-processed', target: 856, suffix: '' },
            { id: 'learning-hours', target: 1247, suffix: '' }
        ];

        counters.forEach(counter => {
            anime({
                targets: { count: 0 },
                count: counter.target,
                duration: 2000,
                delay: 500,
                easing: 'easeOutExpo',
                update: function(anim) {
                    document.getElementById(counter.id).textContent = 
                        Math.floor(anim.animatables[0].target.count) + counter.suffix;
                }
            });
        });
    }

    // Project Management
    loadProjects() {
        const saved = localStorage.getItem('ai-learning-projects');
        return saved ? JSON.parse(saved) : this.getSampleProjects();
    }

    saveProjects() {
        localStorage.setItem('ai-learning-projects', JSON.stringify(this.projects));
    }

    getSampleProjects() {
        return [
            {
                id: 'project-1',
                name: 'Iris Classification',
                type: 'Classification',
                algorithm: 'Random Forest',
                accuracy: 0.94,
                created: new Date('2025-01-10'),
                status: 'completed',
                description: 'Classifying iris flowers based on petal and sepal measurements'
            },
            {
                id: 'project-2',
                name: 'Housing Price Prediction',
                type: 'Regression',
                algorithm: 'Linear Regression',
                accuracy: 0.87,
                created: new Date('2025-01-08'),
                status: 'completed',
                description: 'Predicting house prices based on various features'
            },
            {
                id: 'project-3',
                name: 'Customer Churn Analysis',
                type: 'Classification',
                algorithm: 'Neural Network',
                accuracy: 0.89,
                created: new Date('2025-01-05'),
                status: 'training',
                description: 'Predicting customer churn for telecom company'
            },
            {
                id: 'project-4',
                name: 'Image Recognition',
                type: 'Deep Learning',
                algorithm: 'CNN',
                accuracy: 0.92,
                created: new Date('2025-01-03'),
                status: 'completed',
                description: 'Handwritten digit recognition using convolutional neural networks'
            },
            {
                id: 'project-5',
                name: 'Stock Price Forecasting',
                type: 'Time Series',
                algorithm: 'LSTM',
                accuracy: 0.78,
                created: new Date('2025-01-01'),
                status: 'training',
                description: 'Predicting stock prices using LSTM neural networks'
            },
            {
                id: 'project-6',
                name: 'Sentiment Analysis',
                type: 'NLP',
                algorithm: 'Transformer',
                accuracy: 0.91,
                created: new Date('2024-12-28'),
                status: 'completed',
                description: 'Analyzing sentiment in social media posts'
            }
        ];
    }

    renderProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        grid.innerHTML = '';
        
        this.projects.slice(0, 6).forEach(project => {
            const card = this.createProjectCard(project);
            grid.appendChild(card);
        });

        // Animate cards
        anime({
            targets: '.project-card',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutExpo'
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => this.openProject(project.id);

        const statusColor = project.status === 'completed' ? '#7c9885' : '#c17817';
        const statusIcon = project.status === 'completed' ? '✅' : '🔄';

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="flex items-center space-x-2">
                    <span class="text-2xl">${this.getProjectIcon(project.type)}</span>
                    <div>
                        <h3 class="font-semibold text-lg">${project.name}</h3>
                        <p class="text-sm text-gray-400">${project.type}</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm" style="color: ${statusColor}">
                        ${statusIcon} ${project.status}
                    </div>
                    <div class="text-xs text-gray-400">
                        ${project.created.toLocaleDateString()}
                    </div>
                </div>
            </div>
            
            <p class="text-gray-300 text-sm mb-4">${project.description}</p>
            
            <div class="flex justify-between items-center">
                <div class="text-sm">
                    <span class="text-gray-400">Algorithm:</span>
                    <span class="text-white">${project.algorithm}</span>
                </div>
                <div class="text-sm">
                    <span class="text-gray-400">Accuracy:</span>
                    <span class="gradient-text">${(project.accuracy * 100).toFixed(1)}%</span>
                </div>
            </div>
            
            <div class="mt-4">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.accuracy * 100}%"></div>
                </div>
            </div>
        `;

        return card;
    }

    getProjectIcon(type) {
        const icons = {
            'Classification': '🏷️',
            'Regression': '📈',
            'Deep Learning': '🧠',
            'Time Series': '⏱️',
            'NLP': '💬',
            'Clustering': '🔍'
        };
        return icons[type] || '🤖';
    }

    // Event Listeners
    setupEventListeners() {
        // Auth form
        const authForm = document.getElementById('auth-form');
        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuth();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'n':
                        e.preventDefault();
                        this.createNewProject();
                        break;
                    case 'u':
                        e.preventDefault();
                        window.location.href = 'dataset.html';
                        break;
                }
            }
        });
    }

    // Authentication
    showAuthModal() {
        document.getElementById('auth-modal').classList.remove('hidden');
    }

    hideAuthModal() {
        document.getElementById('auth-modal').classList.add('hidden');
    }

    handleAuth() {
        // Simulate authentication
        this.user = {
            id: 'user-123',
            name: 'AI Learner',
            email: 'learner@example.com',
            joinDate: new Date()
        };
        this.saveUser();
        this.hideAuthModal();
        this.showNotification('Welcome back! Ready to learn?', 'success');
    }

    loadUser() {
        const saved = localStorage.getItem('ai-learning-user');
        return saved ? JSON.parse(saved) : null;
    }

    saveUser() {
        localStorage.setItem('ai-learning-user', JSON.stringify(this.user));
    }

    // Project Actions
    createNewProject() {
        const projectName = prompt('Enter project name:');
        if (projectName) {
            const newProject = {
                id: 'project-' + Date.now(),
                name: projectName,
                type: 'Classification',
                algorithm: 'Random Forest',
                accuracy: 0,
                created: new Date(),
                status: 'draft',
                description: 'New project - ready for data upload'
            };
            
            this.projects.unshift(newProject);
            this.saveProjects();
            this.renderProjects();
            this.showNotification('New project created! Upload your data to get started.', 'success');
        }
    }

    openProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            if (project.status === 'draft') {
                window.location.href = 'dataset.html?project=' + projectId;
            } else {
                window.location.href = 'results.html?project=' + projectId;
            }
        }
    }

    loadMoreProjects() {
        // Simulate loading more projects
        this.showNotification('Loading more projects...', 'info');
        setTimeout(() => {
            this.showNotification('All projects loaded!', 'success');
        }, 1000);
    }

    // Tutorial System
    showTutorial() {
        const tutorialSteps = [
            {
                title: 'Welcome to AI Learning Lab!',
                content: 'Let\'s take a quick tour of the platform.',
                target: 'hero-text'
            },
            {
                title: 'Your Projects',
                content: 'This is where your machine learning projects live. Each card shows your progress and results.',
                target: 'projects-grid'
            },
            {
                title: 'Learning Progress',
                content: 'Track your ML learning journey and earn achievements as you master new concepts.',
                target: 'learning-progress'
            },
            {
                title: 'Quick Start',
                content: 'Ready to begin? Choose one of these options to start your next project.',
                target: 'quick-actions'
            }
        ];

        this.startTutorial(tutorialSteps);
    }

    startTutorial(steps) {
        let currentStep = 0;
        
        const showStep = (index) => {
            if (index >= steps.length) {
                this.showNotification('Tutorial completed! Ready to start learning?', 'success');
                return;
            }
            
            const step = steps[index];
            const target = document.getElementById(step.target) || document.querySelector(`[data-tutorial="${step.target}"]`);
            
            if (target) {
                this.highlightElement(target, step.title, step.content, () => {
                    currentStep++;
                    showStep(currentStep);
                });
            }
        };
        
        showStep(0);
    }

    highlightElement(element, title, content, callback) {
        // Create overlay and highlight
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
        
        const tooltip = document.createElement('div');
        tooltip.className = 'glass-card p-6 max-w-sm fixed z-50';
        tooltip.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${title}</h3>
            <p class="text-gray-300 mb-4">${content}</p>
            <button class="btn-primary" onclick="this.closest('.glass-card').remove(); this.closest('.fixed').remove();">
                Next
            </button>
        `;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.top = rect.bottom + 20 + 'px';
        tooltip.style.left = rect.left + 'px';
        
        overlay.appendChild(tooltip);
        document.body.appendChild(overlay);
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
                callback();
            }
        };
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 glass-card p-4 z-50 max-w-sm ${
            type === 'success' ? 'border-green-500' : 
            type === 'error' ? 'border-red-500' : 'border-blue-500'
        }`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="text-2xl">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </div>
                <div class="flex-1">${message}</div>
                <button onclick="this.closest('.glass-card').remove()" class="text-gray-400 hover:text-white">✕</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutExpo'
        });
    }

    // Periodic Updates
    startPeriodicUpdates() {
        setInterval(() => {
            this.updateProjectStatuses();
        }, 30000); // Update every 30 seconds
    }

    updateProjectStatuses() {
        // Simulate real-time updates
        this.projects.forEach(project => {
            if (project.status === 'training' && Math.random() > 0.7) {
                project.status = 'completed';
                project.accuracy = Math.min(project.accuracy + Math.random() * 0.1, 0.99);
            }
        });
        
        this.saveProjects();
        this.renderProjects();
    }

    // Utility Functions
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }

    generateId() {
        return 'id-' + Math.random().toString(36).substr(2, 9);
    }
}

// Global Functions
function showAuthModal() {
    window.aiLab.showAuthModal();
}

function hideAuthModal() {
    window.aiLab.hideAuthModal();
}

function startNewProject() {
    window.aiLab.createNewProject();
}

function showTutorial() {
    window.aiLab.showTutorial();
}

function createNewProject() {
    window.aiLab.createNewProject();
}

function loadMoreProjects() {
    window.aiLab.loadMoreProjects();
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    window.aiLab = new AILearningLab();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AILearningLab;
}