document.addEventListener('DOMContentLoaded', () => {
    const isDesktop = window.innerWidth > 768;

    const preloadPages = (urls) => {
        urls.forEach(url => {
            fetch(url, { method: 'GET', cache: 'force-cache' });
        });
    };

    preloadPages(['contact.html', 'showcase.html']);

    document.querySelectorAll('button, a, .option, .grid-item').forEach(el => {
        el.style.cursor = 'pointer';
    });

    const options = document.querySelectorAll('.option');
    const scrollToOptionsButton = document.getElementById('scroll-to-options');
    const optionsSection = document.getElementById('options-section');
    const optionDescription = document.getElementById('option-description');
    const contactButton = document.getElementById('contact-button');
    const showcaseButton = document.getElementById('showcase-button');
    const modeSwitch = document.getElementById('mode-switch');

    const originalText = "As a third-year computer science student with a passion for web development and artificial intelligence,<br>I am currently advancing my skills as a data scientist. I am dedicated to exploring the frontiers of technology and crafting innovative solutions that enhance user experiences.";

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            optionDescription.classList.remove('visible');
            setTimeout(() => {
                optionDescription.innerHTML = option.getAttribute('data-info');
                optionDescription.classList.add('visible');
                optionDescription.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    });

    const resetText = () => {
        options.forEach(opt => opt.classList.remove('selected'));
        optionDescription.classList.remove('visible');
        setTimeout(() => {
            optionDescription.innerHTML = originalText;
            optionDescription.classList.add('visible');
        }, 300);
    };

    scrollToOptionsButton.addEventListener('click', () => {
        optionsSection.scrollIntoView({ behavior: 'smooth' });
    });

    const handleNavigation = (event, url) => {
        event.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    };

    if (contactButton) {
        contactButton.addEventListener('click', (event) => handleNavigation(event, 'contact.html'));
    }

    if (showcaseButton) {
        showcaseButton.addEventListener('click', (event) => handleNavigation(event, 'showcase.html'));
    }

    // Toggle light/dark mode
    modeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        modeSwitch.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
    });
});
