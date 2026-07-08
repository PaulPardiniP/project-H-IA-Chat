const mensajesDePrueba = [];

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

async function getReply(messages) {
  const response = await fetch('/api/functions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al obtener respuesta');
  }

  return data;
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
  
  const $form = document.getElementById('composer');
  const $input = document.getElementById('message-input');

$form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const texto = $input.value.trim();
  if (!texto) return;

  renderMessages([{ role: 'user', content: texto }]);
  $input.value = '';

  try {
    const data = await getReply([{ role: 'user', content: texto }]);
    renderMessages([{ role: 'assistant', content: data.reply }]);
  } catch (err) {
    renderMessages([{ role: 'assistant', content: 'Uh... algo salió mal humano. Intentá de nuevo si quieres.' }]);
  }
});

}