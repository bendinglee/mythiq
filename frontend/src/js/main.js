// Mythiq Frontend JavaScript

// Emotional state management
class EmotionalUI {
    constructor() {
        this.currentEmotion = 'neutral';
        this.emotionColors = {
            sad: { bg: 'from-blue-900 to-indigo-900', text: 'text-blue-200' },
            inspired: { bg: 'from-yellow-600 to-orange-600', text: 'text-yellow-100' },
            anxious: { bg: 'from-teal-700 to-cyan-700', text: 'text-teal-100' },
            excited: { bg: 'from-purple-600 to-pink-600', text: 'text-purple-100' },
            neutral: { bg: 'from-gray-800 to-gray-900', text: 'text-gray-300' }
        };
        this.init();
    }

    init() {
        this.setupEmotionDetection();
        this.setupSmoothScrolling();
        this.setupParticleSystem();
        this.setupMobileOptimizations();
        this.setupAgentInteractions();
    }

    // Detect user emotion from text input (simplified)
    detectEmotion(text) {
        const sadWords = ['sad', 'depressed', 'down', 'upset', 'crying'];
        const inspiredWords = ['amazing', 'incredible', 'awesome', 'excited', 'love'];
        const anxiousWords = ['worried', 'nervous', 'anxious', 'stressed', 'scared'];
        
        const lowerText = text.toLowerCase();
        
        if (sadWords.some(word => lowerText.includes(word))) return 'sad';
        if (inspiredWords.some(word => lowerText.includes(word))) return 'inspired';
        if (anxiousWords.some(word => lowerText.includes(word))) return 'anxious';
        
        return 'neutral';
    }

    // Apply emotional theme to UI
    applyEmotionalTheme(emotion) {
        this.currentEmotion = emotion;
        const theme = this.emotionColors[emotion];
        
        // Update background gradient
        document.body.className = document.body.className.replace(
            /bg-gradient-to-br from-\w+-\d+ via-\w+-\d+\/\d+ to-\w+-\d+\/\d+/,
            `bg-gradient-to-br ${theme.bg} via-purple-900/20 to-pink-900/20`
        );

        // Trigger gentle animation
        this.triggerEmotionalResponse(emotion);
    }

    triggerEmotionalResponse(emotion) {
        const responses = {
            sad: () => this.showComfortMessage(),
            inspired: () => this.showEncouragementPulse(),
            anxious: () => this.showCalmingEffect(),
            excited: () => this.showCelebrationEffect()
        };

        if (responses[emotion]) {
            responses[emotion]();
        }
    }

    showComfortMessage() {
        this.showToast("I'm here to help you create something beautiful 💙", 'comfort');
    }

    showEncouragementPulse() {
        document.body.style.animation = 'goldenPulse 2s ease-in-out 3';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 6000);
    }

    showCalmingEffect() {
        const calmOverlay = document.createElement('div');
        calmOverlay.className = 'fixed inset-0 bg-teal-500/10 pointer-events-none z-50';
        calmOverlay.style.animation = 'fadeInOut 3s ease-in-out';
        document.body.appendChild(calmOverlay);
        
        setTimeout(() => {
            document.body.removeChild(calmOverlay);
        }, 3000);
    }

    showCelebrationEffect() {
        this.createConfetti();
    }

    setupEmotionDetection() {
        // Listen for text inputs to detect emotional state
        document.addEventListener('input', (e) => {
            if (e.target.type === 'text' || e.target.tagName === 'TEXTAREA') {
                const emotion = this.detectEmotion(e.target.value);
                if (emotion !== this.currentEmotion) {
                    this.applyEmotionalTheme(emotion);
                }
            }
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

    setupParticleSystem() {
        // Create floating particles
        const particleContainer = document.querySelector('.floating-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particle.style.animation = 'float ' + particle.style.animationDuration + ' ease-in-out infinite';
            particleContainer.appendChild(particle);
        }
    }

    setupMobileOptimizations() {
        // Touch-friendly interactions
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Add touch feedback
            document.addEventListener('touchstart', (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    e.target.style.transform = 'scale(0.95)';
                }
            });

            document.addEventListener('touchend', (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    setTimeout(() => {
                        e.target.style.transform = '';
                    }, 150);
                }
            });
        }

        // Swipe gestures for mobile navigation
        this.setupSwipeGestures();
    }

    setupSwipeGestures() {
        let startX, startY, endX, endY;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right
                this.navigateSection('prev');
            } else {
                // Swipe left
                this.navigateSection('next');
            }
        }
    }

    navigateSection(direction) {
        const sections = ['home', 'studio', 'assistant', 'gallery'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % sections.length;
        } else {
            nextIndex = (currentIndex - 1 + sections.length) % sections.length;
        }

        const nextSection = document.getElementById(sections[nextIndex]);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = 'home';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.id;
            }
        });
        
        return currentSection;
    }

    setupAgentInteractions() {
        // Agent avatar hover effects
        document.querySelectorAll('.group').forEach(agentCard => {
            agentCard.addEventListener('mouseenter', () => {
                this.showAgentGreeting(agentCard);
            });
        });
    }

    showAgentGreeting(agentCard) {
        const agentName = agentCard.querySelector('h3').textContent;
        const greetings = {
            'The Mentor': "Ready to learn something new? 🧙‍♂️",
            'The Artist': "Let's create something beautiful! 🎨",
            'The Healer': "I'm here to support you 💚",
            'The Rebel': "Time to break some rules! ⚡"
        };

        const greeting = greetings[agentName];
        if (greeting) {
            this.showToast(greeting, 'agent');
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-20 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        toast.textContent = message;

        // Apply type-specific styling
        const typeStyles = {
            comfort: 'bg-blue-600',
            agent: 'bg-purple-600',
            success: 'bg-green-600',
            warning: 'bg-yellow-600'
        };

        if (typeStyles[type]) {
            toast.className = toast.className.replace('bg-gray-800', typeStyles[type]);
        }

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Animate out
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    createConfetti() {
        const colors = ['#6366f1', '#ec4899', '#3b82f6', '#14b8a6', '#f59e0b'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'fixed w-2 h-2 pointer-events-none z-50';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, 5000);
        }
    }
}

// Game Builder Studio functionality
class GameStudio {
    constructor() {
        this.currentGenre = 'adventure';
        this.currentMood = 'epic';
        this.gamePreview = null;
        this.init();
    }

    init() {
        this.setupGenreSelector();
        this.setupMoodSelector();
        this.setupPreviewSystem();
    }

    setupGenreSelector() {
        // Will be implemented when we create the studio page
    }

    setupMoodSelector() {
        // Will be implemented when we create the studio page
    }

    setupPreviewSystem() {
        // Will be implemented when we create the studio page
    }

    generateGame(prompt, genre, mood) {
        // Placeholder for game generation
        return {
            title: `${genre} Game`,
            description: `A ${mood} ${genre} game based on: ${prompt}`,
            mechanics: this.getGenreMechanics(genre),
            assets: this.generateAssets(genre, mood)
        };
    }

    getGenreMechanics(genre) {
        const mechanics = {
            adventure: ['exploration', 'puzzle-solving', 'story-driven'],
            action: ['combat', 'reflexes', 'power-ups'],
            puzzle: ['logic', 'pattern-recognition', 'progression'],
            rpg: ['character-development', 'inventory', 'quests']
        };
        return mechanics[genre] || mechanics.adventure;
    }

    generateAssets(genre, mood) {
        // Placeholder for asset generation
        return {
            sprites: [`${genre}_character.png`, `${genre}_background.png`],
            sounds: [`${mood}_music.mp3`, `${genre}_effects.wav`],
            scripts: [`${genre}_logic.js`]
        };
    }
}

// Assistant Hub functionality
class AssistantHub {
    constructor() {
        this.activeAgent = null;
        this.conversationHistory = [];
        this.emotionalState = 'neutral';
        this.init();
    }

    init() {
        this.setupAgentSelection();
        this.setupChatInterface();
        this.setupEmotionalTracking();
    }

    setupAgentSelection() {
        // Will be implemented when we create the assistant page
    }

    setupChatInterface() {
        // Will be implemented when we create the assistant page
    }

    setupEmotionalTracking() {
        // Track emotional evolution over time
    }

    selectAgent(agentType) {
        this.activeAgent = agentType;
        this.showAgentPersonality(agentType);
    }

    showAgentPersonality(agentType) {
        const personalities = {
            mentor: {
                greeting: "Welcome, seeker of knowledge. How may I guide you today?",
                style: "wise and patient",
                color: "text-yellow-400"
            },
            artist: {
                greeting: "Let's paint the world with imagination! What shall we create?",
                style: "creative and inspiring",
                color: "text-pink-400"
            },
            healer: {
                greeting: "I sense you may need some comfort. I'm here to listen.",
                style: "compassionate and nurturing",
                color: "text-green-400"
            },
            rebel: {
                greeting: "Ready to break some rules and think outside the box?",
                style: "bold and unconventional",
                color: "text-red-400"
            }
        };

        return personalities[agentType] || personalities.mentor;
    }

    sendMessage(message) {
        const emotion = this.detectEmotion(message);
        this.updateEmotionalState(emotion);
        
        const response = this.generateResponse(message, this.activeAgent, emotion);
        this.conversationHistory.push({ user: message, agent: response, emotion });
        
        return response;
    }

    generateResponse(message, agentType, emotion) {
        // Placeholder for AI response generation
        const responses = {
            mentor: "That's a thoughtful question. Let me share some wisdom...",
            artist: "What a beautiful idea! Let's explore this creatively...",
            healer: "I understand how you're feeling. You're not alone...",
            rebel: "Forget the rules! Here's a wild idea..."
        };

        return responses[agentType] || responses.mentor;
    }

    updateEmotionalState(emotion) {
        this.emotionalState = emotion;
        // Update UI to reflect emotional state
    }

    detectEmotion(text) {
        // Simplified emotion detection
        return 'neutral'; // Placeholder
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core systems
    window.mythiqUI = new EmotionalUI();
    window.gameStudio = new GameStudio();
    window.assistantHub = new AssistantHub();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
        
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes goldenPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
            50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.6); }
        }
    `;
    document.head.appendChild(style);

    // Setup intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    console.log('🎨 Mythiq UI initialized successfully!');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmotionalUI, GameStudio, AssistantHub };
