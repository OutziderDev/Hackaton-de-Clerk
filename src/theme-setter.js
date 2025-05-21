(function() {
  function getInitialTheme() {

    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme === 'true') {
      return 'dark';
    }
    if (storedTheme === 'false') {
      return 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const theme = getInitialTheme();

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();