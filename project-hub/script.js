document.addEventListener('DOMContentLoaded', function() {
    var hubGrid = document.getElementById('hub-grid');
    var addBtn = document.getElementById('add-btn');
    var modal = document.getElementById('modal');
    var cancelBtn = document.getElementById('cancel-btn');
    var saveBtn = document.getElementById('save-btn');
    var siteNameInput = document.getElementById('site-name');
    var siteUrlInput = document.getElementById('site-url');

    var projects = JSON.parse(localStorage.getItem('hub-projects')) || [
        { name: 'Google', url: 'https://www.google.com' },
        { name: 'YouTube', url: 'https://www.youtube.com' }
    ];

    function saveProjects() {
        localStorage.setItem('hub-projects', JSON.stringify(projects));
    }

    function renderTiles() {
        hubGrid.innerHTML = '';
        projects.forEach(function(project, index) {
            var tile = document.createElement('a');
            tile.href = project.url;
            tile.className = 'tile';
            tile.target = '_blank';

            var initials = project.name
                .split(' ')
                .map(function(n) { return n[0]; })
                .join('')
                .toUpperCase()
                .substring(0, 2);

            tile.innerHTML = 
                '<button class="delete-btn" data-index="' + index + '" title="Delete">✕</button>' +
                '<div class="tile-icon">' + initials + '</div>' +
                '<h2>' + project.name + '</h2>';
            
            // Staggered animation delay
            tile.style.animationDelay = (index * 0.05) + 's';

            // Prevent link navigation when clicking delete
            tile.querySelector('.delete-btn').addEventListener('click', function(e) {
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

    addBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        siteNameInput.focus();
    });

    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        siteNameInput.value = '';
        siteUrlInput.value = '';
    });

    saveBtn.addEventListener('click', function() {
        var name = siteNameInput.value.trim();
        var url = siteUrlInput.value.trim();

        if (name && url) {
            if (url.indexOf('http') !== 0) {
                url = 'https://' + url;
            }
            projects.push({ name: name, url: url });
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
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js')
                .then(function(reg) { console.log('Service Worker registered'); })
                ['catch'](function(err) { console.log('Service Worker failed', err); });
        });
    }

    renderTiles();
});
