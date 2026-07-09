import { describe, it, expect } from 'vitest';
import { appendUserMessage, appendAssistantMessage, getTrimmedHistory } from '../src/chatLogic.js';

describe('appendUserMessage', () => {
  it('agrega un mensaje de usuario al array', () => {
    const result = appendUserMessage([], 'Hola');
    expect(result).toEqual([{ role: 'user', content: 'Hola' }]);
  });

  it('no modifica el array original', () => {
    const original = [];
    appendUserMessage(original, 'Hola');
    expect(original).toEqual([]);
  });
});

describe('appendAssistantMessage', () => {
  it('agrega un mensaje del asistente al array', () => {
    const result = appendAssistantMessage([], 'Respuesta');
    expect(result).toEqual([{ role: 'assistant', content: 'Respuesta' }]);
  });
});

describe('getTrimmedHistory', () => {
  it('recorta el historial a los últimos N mensajes', () => {
    const messages = [
      { role: 'user', content: '1' },
      { role: 'user', content: '2' },
      { role: 'user', content: '3' },
    ];
    const result = getTrimmedHistory(messages, 2);
    expect(result).toEqual([
      { role: 'user', content: '2' },
      { role: 'user', content: '3' },
    ]);
  });

  it('devuelve todo el array si tiene menos mensajes que el máximo', () => {
    const messages = [{ role: 'user', content: '1' }];
    const result = getTrimmedHistory(messages, 12);
    expect(result).toEqual(messages);
  });
});