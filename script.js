const ThemeManager = (() => {
    const storageKey = 'theme-preference';
    const toggleButton = document.querySelector('.theme-toggle i');
    
    const getSystemPreference = () => 
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const applyTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        toggleButton.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
    };

    const init = () => {
        const savedTheme = localStorage.getItem(storageKey);
        const systemTheme = getSystemPreference();
        const isDark = savedTheme ? savedTheme === 'dark' : systemTheme === 'dark';
        applyTheme(isDark);
    };

    const toggle = () => applyTheme(!document.body.classList.contains('dark-mode'));

    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({ matches }) => {
            if (!localStorage.getItem(storageKey)) {
                applyTheme(matches);
            }
        });

    return { init, toggle };
})();

const HoverEffect = {
    init: () => {
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mousemove', HoverEffect.handleHover);
            card.addEventListener('mouseleave', HoverEffect.resetCard);
        });
    },
    
    handleHover: (e) => {
        const card = e.currentTarget;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width/2) / 25;
        const y = (e.clientY - top - height/2) / 25;
        card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg) scale(1.05)`;
    },
    
    resetCard: (e) => {
        e.currentTarget.style.transform = 'none';
    }
};

const GameInteraction = {
    init: () => {
        document.querySelectorAll('.game-card, .hobby-card').forEach(card => {
            card.addEventListener('mousemove', GameInteraction.handleHover);
            card.addEventListener('mouseleave', GameInteraction.resetCard);
            card.addEventListener('click', GameInteraction.handleClick);
        });
    },
    
    handleHover: (e) => {
        const card = e.currentTarget;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width/2) / 15;
        const y = (e.clientY - top - height/2) / 15;
        card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg) scale(1.05)`;
        card.style.boxShadow = `0 15px 30px rgba(104, 195, 212, 0.3)`;
    },
    
    resetCard: (e) => {
        const card = e.currentTarget;
        card.style.transform = 'none';
        card.style.boxShadow = '0 2px 8px var(--shadow-color)';
    },
    
    handleClick: (e) => {
        const card = e.currentTarget;
        card.style.animation = 'gamePulse 0.3s ease';
    }
};

const hobbies = [
    { name: "登山", icon: "fas fa-mountain" },
    { name: "网络技术", icon: "fas fa-network-wired" },
    { name: "电子硬件", icon: "fas fa-microchip" }
];

const games = ["Minecraft", "Battlefield 1", "文明系列", "Grand Theft Auto V"];

function init() {
    AOS.init({ duration: 800, once: true });
    ThemeManager.init();
    HoverEffect.init();
    GameInteraction.init();
    renderHobbies();
    renderGames();
    document.querySelector('.theme-toggle').addEventListener('click', ThemeManager.toggle);
}

function renderHobbies() {
    const container = document.querySelector('.hobbies-grid');
    container.innerHTML = hobbies.map(hobby => `
        <div class="hobby-card" data-aos="zoom-in">
            <i class="${hobby.icon}"></i>
            <span>${hobby.name}</span>
        </div>
    `).join('');
}

function renderGames() {
    const container = document.querySelector('.games-grid');
    container.innerHTML = games.map(game => `
        <div class="game-card" data-aos="zoom-in">
            <span>${game}</span>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', init);