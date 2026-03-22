document.addEventListener('DOMContentLoaded', () => {
    const hubGrid = document.getElementById('hub-grid');
    const addBtn = document.getElementById('add-btn');
    const modal = document.getElementById('modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const saveBtn = document.getElementById('save-btn');
    const siteNameInput = document.getElementById('site-name');
    const siteUrlInput = document.getElementById('site-url');

    let projects = JSON.parse(localStorage.getItem('hub-projects')) || [
        { name: 'Google', url: 'https://www.google.com' },
        { name: 'YouTube', url: 'https://www.youtube.com' }
    ];

    function saveProjects() {
        localStorage.setItem('hub-projects', JSON.stringify(projects));
    }

    function renderTiles() {
        hubGrid.innerHTML = '';
        projects.forEach((project, index) => {
            const tile = document.createElement('a');
            tile.href = project.url;
            tile.className = 'tile';
            tile.target = '_blank';

            const initials = project.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);

            tile.innerHTML = `
                <button class="delete-btn" data-index="${index}" title="Delete">✕</button>
                <div class="tile-icon">${initials}</div>
                <h2>${project.name}</h2>
            `;
            
            // Staggered animation delay
            tile.style.animationDelay = `${index * 0.05}s`;

            // Prevent link navigation when clicking delete
            tile.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteProject(index);
            });

            hubGrid.appendChild(tile);
        });
    }

    function deleteProject(index) {
        if (confirm('Remove this project?')) {
            projects.splice(index, 1);
            saveProjects();
            renderTiles();
        }
    }

    addBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        siteNameInput.focus();
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        siteNameInput.value = '';
        siteUrlInput.value = '';
    });

    saveBtn.addEventListener('click', () => {
        const name = siteNameInput.value.trim();
        let url = siteUrlInput.value.trim();

        if (name && url) {
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
            projects.push({ name, url });
            saveProjects();
            renderTiles();
            modal.style.display = 'none';
            siteNameInput.value = '';
            siteUrlInput.value = '';
        } else {
            alert('Please enter both a name and a URL.');
        }
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(err => console.log('Service Worker failed', err));
        });
    }

    renderTiles();
});
