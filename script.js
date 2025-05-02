async function switchLanguage(lang) {
  try {
      const response = await fetch(`${lang}.json`);
      const data = await response.json();
      document.getElementById('tagline').textContent = data.tagline;
      document.getElementById('description').textContent = data.description;
  } catch (error) {
      console.error('Ошибка загрузки перевода:', error);
  }
}