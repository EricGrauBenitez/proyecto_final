const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const organizationId = process.env.OPENAI_ORGANIZATION_ID;

// console.log('API Key:', apiKey);
// console.log('Organization ID:', organizationId);

const configuration = new Configuration({
  apiKey,
  organization: organizationId,
});

// console.log('Configuration:', configuration);

const client = new OpenAIApi(configuration);

let respuestaGenerada = '';

async function completarTexto(prompt) {
  try {
    const response = await client.createCompletion({
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

// console.log('Client:', client);

module.exports = {
  completarTexto,
  getRespuestaGenerada: () => respuestaGenerada,
};
