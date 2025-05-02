async function switchLanguage(lang) {
    try {
      const response = await fetch(`download/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      const data = await response.json();
      document.getElementById('tagline').textContent = data.tagline;
      document.getElementById('description').textContent = data.description;
    } catch (error) {
      console.error('Error switching language:', error);
    }
  }
  
  window.onload = () => {
    switchLanguage('en');
  };