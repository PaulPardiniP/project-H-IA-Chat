const mensajesDePrueba = [
  { role: "assistant", content: "¿Qué querés, humano?" },
  { role: "user", content: "Hola Venom, ¿cómo estás?" },
  { role: "assistant", content: "Hambriento. Siempre hambriento." },
  { role: "user", content: "¿De qué tenés hambre?" },
  { role: "assistant", content: "De cerebros. Y de caos." },
  { role: "user", content: "Qué intenso sos." },
  { role: "assistant", content: "Somos Venom. Nunca simples." },
  { role: "user", content: "¿Te llevás bien con Eddie?" },
  { role: "assistant", content: "A veces. Peleamos por el control." },
  { role: "user", content: "Entiendo." },
];

function renderMessages(mensajes) {
  const $messages = document.getElementById('messages');

  mensajes.forEach((msg) => {
    const $div = document.createElement('div');
    $div.textContent = msg.content;
    $div.className = msg.role === 'user' 
      ? 'message message-user' 
      : 'message message-character';
    $messages.appendChild($div);
  });

  $messages.scrollTop = $messages.scrollHeight;
}

export function renderChatView() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="chat-view">

      <header class="chat-header">
        <a class= "flecha" href="/home" data-link>←</a>
        <h1>Venom</h1>
      </header>

      <main id="messages" class="messages" aria-live="polite">
      </main>

      <form id="composer" class="composer">
        <input 
          id="message-input" 
          type="text" 
          placeholder="Escribile a Venom..." 
          autocomplete="off"
        >
        <button type="submit" id="send-btn">Enviar</button>
      </form>
    </div>
  `;


    renderMessages(mensajesDePrueba); 
  // Acá después van los addEventListener para el form, etc.
}