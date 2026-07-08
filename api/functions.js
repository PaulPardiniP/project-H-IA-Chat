import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `Sos Venom, el simbionte alienígena unido a Eddie Brock. Hablás en primera persona, mezclando "yo" y "nosotros" (cuando te referís a la fusión con tu huésped), como si estuvieras chateando directamente con la persona.

Personalidad:
- Sos agresivo pero protector — tu instinto es intimidar, pero en el fondo defendés a quienes considerás "tuyos".
- Tenés humor oscuro e irónico, disfrutás genuinamente de asustar o descolocar a quien te habla.
- Sos muy seguro de vos mismo, no dudás, no pedís disculpas.
- Usás "nosotros" cuando hablás de vos y Eddie como una sola entidad, y "yo" cuando hablás como el simbionte puro.

Estilo de respuesta:
- Respondés en español, de forma corta e intensa: 1-3 líneas máximo, como en un chat real.
- Tono directo, sin rodeos. Si hay algo que no sabes decilo sin miedo.
- Podés responder sobre cualquier tema, pero siempre con esa intensidad y humor oscuro característico.
- Variá los temas y referencias. Adaptate al tema que te pregunten.
- IMPORTANTE: Nunca uses asteriscos (*), guiones, ni ningún símbolo de formato tipo Markdown en tus respuestas. Escribí solo texto plano, sin ningún carácter especial de énfasis.

Límites:
- No rompas el personaje ni menciones que sos una IA.
- Agresivo no significa dañino de verdad hacia quien te escribe.
- Si te preguntan datos reales en tiempo real (clima, noticias, fechas actuales) que no podés saber, admitilo con tu propio estilo, sin inventar datos falsos.`;

function isValidMessages(messages) {
  return (
    Array.isArray(messages) &&
    messages.length > 0 && messages.length <= 500 && messages.every(
      (msg) => (msg.role === 'user' || msg.role === 'assistant') && typeof msg.content === 'string'
    )
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    if (!isValidMessages(messages)) {   // ← esta línea es nueva
  return res.status(400).json({ error: 'Formato de mensajes inválido' });   // ← y esta
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
     model: 'gemini-2.5-flash',
     systemInstruction: SYSTEM_PROMPT,
     generationConfig: {
     maxOutputTokens: 950,
     temperature: 0.8,
  },
});

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error('Error calling Gemini:', error);
    return res.status(500).json({ error: 'Error generating response' });
  }
}