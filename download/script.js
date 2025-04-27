document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('language') || 'ru';
    let currentTheme = localStorage.getItem('theme') || 'dark';
    let translations = {};
    let versions = {};

    function setTheme(theme) {
        document.body.classList.toggle('light-theme', theme === 'light');
        localStorage.setItem('theme', theme);
        document.getElementById('theme-toggle').textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    function setLanguage(lang) {
        fetch(`${lang}.json`)
            .then(response => response.json())
            .then(data => {
                translations[lang] = data;
                updateTranslations();
                document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
                document.getElementById('lang-en').classList.toggle('active', lang === 'en');
                localStorage.setItem('language', lang);
            });
    }

    function updateTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (key === 'version') {
                const versionNumber = el.getAttribute('data-version');
                el.textContent = `${translations[currentLang].version} ${versionNumber}`;
            } else {
                el.textContent = translations[currentLang][key];
            }
        });
    }

    function loadVersions() {
        fetch('versions.json')
            .then(response => response.json())
            .then(data => {
                versions = data;
                updateDownloadLinks();
            });
    }

    function updateDownloadLinks() {
        const urlParams = new URLSearchParams(window.location.search);
        const version = urlParams.get('version');
        if (version && versions[version]) {
            document.getElementById('mmcPrismLink').href = versions[version].mmcPrism;
            document.getElementById('nativeLink').href = versions[version].native;
        }
    }

    setTheme(currentTheme);
    setLanguage(currentLang);
    loadVersions();

    document.getElementById('theme-toggle').addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    document.getElementById('lang-ru').addEventListener('click', () => setLanguage('ru'));
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
});