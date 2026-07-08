import { renderNav } from './nav.js';


export function renderAboutView() {
  const app = document.getElementById('app');
  app.innerHTML = `

    ${renderNav()}
    <div class="about-view">
     
     <div class="about-content"> 
      <h1>¿Quién es Venom?</h1>
      
      <section>
        <h2>El personaje: Venom</h2>
        <p>Venom es un icónico simbionte alienígena del universo Marvel. Es una entidad líquida y amorfa que necesita un huésped humano para sobrevivir. Evolucionó desde ser uno de los peores villanos y el reflejo retorcido de Spider-Man, hasta convertirse en un famoso antihéroe..</p>
      </section>

      <section>
        <h2>Historia</h2>
        <p>
        OrigenEl simbionte pertenece a una raza alienígena conocida como los Klyntar. Apareció por primera vez en los cómics en 1984 durante el evento Secret Wars. Spider-Man fue su primer huésped terrestre, pero al descubrir su naturaleza corrupta y parasitaria, se separó de él. Rechazada, la criatura se vinculó con el periodista Eddie Brock, formando el monstruoso ser conocido como Venom para vengarse juntos.
        </p>
      </section>

      <section>
        <h2>Sobre la aplicación</h2>
        <p>Chatea con Venom y descubre su personalidad y sus respuestas hablando directamente con el mismo!.</p>
      </section>
 
     </div>
    </div>
  `;
}