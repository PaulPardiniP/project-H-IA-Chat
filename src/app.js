import { renderHomeView } from './home.js';
import { renderChatView } from './chat.js';
import { renderAboutView } from './about.js';

const routes = {
  '/': renderHomeView,
  '/home': renderHomeView,
  '/chat': renderChatView,
  '/about': renderAboutView,
};

function router() {
  const path = window.location.pathname;
  const renderView = routes[path] || renderHomeView; // si la ruta no existe, cae a Home
  renderView();
}

function navigateTo(path) {
  window.history.pushState({}, '', path);
  router();
}

// Escuchar cuando el usuario usa back/forward del navegador
window.addEventListener('popstate', router);

// Interceptar clicks en links de navegación (data-link)
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    navigateTo(e.target.getAttribute('href'));
  }
});

router(); // primera carga