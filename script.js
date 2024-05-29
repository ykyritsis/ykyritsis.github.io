document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    const mainText = document.getElementById('main-text');
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    options.forEach(option => {
        option.addEventListener('mouseover', () => {
            mainText.style.opacity = 0;
            setTimeout(() => {
                mainText.textContent = option.getAttribute('data-info');
                mainText.style.opacity = 1;
            }, 300);
        });
    });

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            modeToggle.textContent = '🌙';
        } else {
            modeToggle.textContent = '🌞';
        }
    });
});
