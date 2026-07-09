import { appendUserMessage, appendAssistantMessage, getTrimmedHistory, debounce } from './chatLogic.js';
import { getReply } from './chatApi.js';

let chatHistory = [];

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
        <a class="flecha" href="/home" data-link>←</a>
        <h1>Venom</h1>
      </header>
      <main id="messages" class="messages" aria-live="polite"></main>
      <form id="composer" class="composer">
        <input id="message-input" type="text" placeholder="Escribile a Venom..." autocomplete="off">
        <button type="submit" id="send-btn">Enviar</button>
      </form>
    </div>
  `;

  renderMessages(chatHistory);

  const $form = document.getElementById('composer');
  const $input = document.getElementById('message-input');

  const enviarMensaje = debounce(async (texto) => {
    chatHistory = appendUserMessage(chatHistory, texto);
    renderMessages([{ role: 'user', content: texto }]);
    $input.value = '';

    try {
      const payloadHistory = getTrimmedHistory(chatHistory);
      const data = await getReply(payloadHistory);
      chatHistory = appendAssistantMessage(chatHistory, data.reply);
      renderMessages([{ role: 'assistant', content: data.reply }]);
      } catch (err) {
        renderMessages([{ role: 'assistant', content: err.message || 'Uh... algo salió mal humano. Intentá de nuevo si quieres.' }]);
      }
  }, 300);

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = $input.value.trim();
    if (!texto) return;
    enviarMensaje(texto);
  });
  
}