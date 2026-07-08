import { renderNav } from './nav.js';

export function renderHomeView() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="home-view">
      <h1>Venom</h1>  
      <p>El simbionte más letal, unido a Eddie Brock...</p>
    <a class= "btnhome" href="/chat" data-link>Chateá con Venom</a>
    </div>
  `;
}