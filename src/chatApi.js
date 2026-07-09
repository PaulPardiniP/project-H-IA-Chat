
export async function getReply(messages) {
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
