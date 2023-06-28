const { Configuration, OpenAIApi } = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
const organizationId = process.env.OPENAI_ORGANIZATION_ID;

const configuration = new Configuration({
  apiKey,
  organization: organizationId,
});

const client = new OpenAIApi(configuration);

let respuestaGenerada = '';

async function completarTexto(prompt) {
  try {
    const response = await client.completions.create({
      engine: 'davinci',
      prompt,
      maxTokens: 100,
    });

    respuestaGenerada = response.choices[0].text.trim();
    return respuestaGenerada;
  } catch (error) {
    console.error('Error al llamar a la API de OpenAI:', error);
    throw error;
  }
}

module.exports = {
  completarTexto,
  getRespuestaGenerada: () => respuestaGenerada,
};
