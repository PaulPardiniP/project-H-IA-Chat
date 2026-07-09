export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function appendUserMessage(messages, text) {
  return [...messages, { role: 'user', content: text }];
}

export function appendAssistantMessage(messages, text) {
  return [...messages, { role: 'assistant', content: text }];
}

export function getTrimmedHistory(messages, maxTurns = 12) {
  return messages.slice(-maxTurns);
}

