document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    const mainText = document.getElementById('main-text');
    const modeToggle = document.getElementById('mode-toggle');
    const resetName = document.getElementById('reset-name');
    const name = document.getElementById('name');
    const body = document.body;

    const originalText = "As a third-year computer science student with a passion for web development and artificial intelligence,<br>I am currently advancing my skills as a data scientist. I am dedicated to exploring the frontiers of technology and crafting innovative solutions that enhance user experiences.";

    const applyMode = (mode) => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark-mode');
            modeToggle.textContent = '🌞';
        } else {
            document.documentElement.classList.remove('dark-mode');
            modeToggle.textContent = '🌙';
        }
    };

    const savedMode = localStorage.getItem('mode') || 'light';
    applyMode(savedMode);

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            mainText.style.opacity = 0;
            setTimeout(() => {
                mainText.innerHTML = option.getAttribute('data-info');
                mainText.style.opacity = 1;
            }, 300);
        });
    });

    const resetText = () => {
        options.forEach(opt => opt.classList.remove('selected'));
        mainText.style.opacity = 0;
        setTimeout(() => {
            mainText.innerHTML = originalText;
            mainText.style.opacity = 1;
        }, 300);
    };

    if (resetName) resetName.addEventListener('click', resetText);
    if (name) name.addEventListener('click', resetText);

    modeToggle.addEventListener('click', () => {
        const currentMode = document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
        const newMode = currentMode === 'dark' ? 'light' : 'dark';
        applyMode(newMode);
        localStorage.setItem('mode', newMode);
    });
});
