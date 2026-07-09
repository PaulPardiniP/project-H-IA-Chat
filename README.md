# Chat con Venom 🕷️

SPA que permite chatear con Venom, el simbionte de Marvel, usando inteligencia artificial (Google Gemini).

## Sobre el personaje

Venom es un simbionte alienígena unido a Eddie Brock. En este chat, Venom mantiene su personalidad característica: agresivo pero protector, con humor oscuro e irónico, y muy seguro de sí mismo. Las respuestas son cortas e intensas, como en una conversación real de chat.

## Demo

🔗 **App desplegada:** https://iachat-nu.vercel.app

### Capturas

Home

![Home](/src/assets/Screenshots/Home.png)

Chat

![Chat](/src/assets/Screenshots/Chat.png)

About

![About](/src/assets/Screenshots/About.png)

## Stack técnico

- HTML, CSS (mobile-first), JavaScript vanilla
- Routing SPA con History API
- Google Gemini AI (`gemini-2.5-flash`)
- Vercel Serverless Functions
- Vitest (testing)
- Despliegue en Vercel

## Estructura del proyecto

project-root/
├── api/
│   └── functions.js       # Serverless function, proxy hacia Gemini
├── src/
│   ├── assets
│   │    └── # Imagenes
│   ├── index.html
│   ├── styles.css
│   ├── app.js              # Routing SPA
│   ├── chat.js              # Vista y lógica del chat
│   ├── chatLogic.js          # Funciones puras (historial)
│   ├── chatApi.js             # Fetch hacia la serverless function
│   ├── home.js
│   ├── about.js
│   ├── nav.js
│   ├── reset.css
│   └── styles.css
├── tests/
│   └── chatLogic.test.js
├── .env.example
├── vercel.json
└── package.json


## Cómo correr el proyecto en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/PaulPardiniP/project-H-IA-Chat.git
cd Project-H-IA-Chat
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz, basado en `.env.example`:
GEMINI_API_KEY=tu_api_key_aqui
Podés obtener una API key gratuita en [Google AI Studio](https://aistudio.google.com).

### 4. Correr en local

```bash
vercel dev
```

Abrir el servidor activo.

## Cómo correr los tests

```bash
npm test
```

Se ejecutan los tests unitarios de `tests/chatLogic.test.js`, que cubren las funciones de manejo del historial de conversación.

## Cómo desplegar en Vercel

1. Conectar el repositorio de GitHub a Vercel
2. En el dashboard de Vercel, ir a **Settings → Environment Variables** y agregar `GEMINI_API_KEY` con tu key real
3. Desplegar con:

```bash
vercel --prod
```

## Uso de IA en el desarrollo

Se utilizó Claude (Anthropic) como asistente durante el desarrollo para:
- Diseñar el system prompt de Venom, iterando sobre tono y personalidad
- Debuggear errores de routing SPA (rewrites de Vercel, rutas absolutas)
- Diseñar la arquitectura de separación de responsabilidades (chatLogic.js, chatApi.js, chat.js)
- Resolver el manejo de rate limiting (error 429) y diseñar el indicador visual de estado de conexión: offline, online y límite alcanzado

Capturas de métodos utilizados
![Online](/src/assets/Screenshots/online-chat.png)
![Sin cuota](/src/assets/Screenshots/limite-alcanzado-chat.png)
![Sin internet](/src/assets/Screenshots/sin-internet-chat.png)
![Dirigiendo errores](/src/assets/Screenshots/dirigiendo-errores.png)
![Corroborando avances](/src/assets/Screenshots/corroborando-avances.png)

## Notas

- El historial de conversación se mantiene solo durante la sesión (se pierde al recargar la página)
- La API de Gemini tiene un límite gratuito de 20 peticiones por día en el free tier sin facturación

Ejemplos de funcionamiento en producción 

Escribiendo

![escribiendo...](/src/assets/Screenshots/escribiendo-status.png)

Primera respuesta

![primer respuesta](/src/assets/Screenshots/primera-respuesta.png)
Historial activo

![recuerda el historial](/src/assets/Screenshots/segunda-historial-recordado.png)

Indicador led y por color en desconexión

![sin internet](/src/assets/Screenshots/sin-internet.png)