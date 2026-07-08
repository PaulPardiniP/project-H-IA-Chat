export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const mockReply = 'Recibí tu mensaje. Esta es una respuesta simulada de Venom.';

    return res.status(200).json({ reply: mockReply });

  } catch (error) {
    console.error('Error en mock:', error);
    return res.status(500).json({ error: 'Error generando respuesta' });
  }
}


