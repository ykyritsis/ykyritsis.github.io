document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) { // Only initialize on larger screens
        const cursor = document.getElementById('cursor');

        if (cursor) {
            console.log('Cursor element found.');

            // Custom cursor movement
            document.addEventListener('mousemove', (e) => {
                cursor.style.top = `${e.clientY}px`;
                cursor.style.left = `${e.clientX}px`;
            });

            // Enlarge cursor on hover
            const hoverElements = document.querySelectorAll('button, .option, a, .option-heading, .grid-item');
            hoverElements.forEach(el => {
                el.addEventListener('mouseover', () => {
                    cursor.classList.add('cursor-hover');
                });
                el.addEventListener('mouseout', () => {
                    cursor.classList.remove('cursor-hover');
                });
            });

            // Hide default cursor for all elements
            document.querySelectorAll('*').forEach(el => {
                el.style.cursor = 'none';
            });
        } else {
            console.error('Cursor element not found.');
        }

        const options = document.querySelectorAll('.option');
        const resetName = document.getElementById('reset-name');
        const name = document.getElementById('name');
        const body = document.body;
        const scrollToOptionsButton = document.getElementById('scroll-to-options');
        const optionsSection = document.getElementById('options-section');
        const optionDescription = document.getElementById('option-description');
        const contactButton = document.getElementById('contact-button');
        const showcaseButton = document.getElementById('showcase-button');

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

        if (resetName) resetName.addEventListener('click', resetText);
        if (name) name.addEventListener('click', resetText);

        scrollToOptionsButton.addEventListener('click', () => {
            optionsSection.scrollIntoView({ behavior: 'smooth' });
        });

        contactButton.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 500); // Duration of the fade-out animation
        });

        showcaseButton.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'showcase.html';
            }, 500); // Duration of the fade-out animation
        });
    }
});
