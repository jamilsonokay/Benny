import axios from 'axios';

const DEEPSEEK_API_KEY = process.env.REACT_APP_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1';

export const analyzeDocument = async (documentContent) => {
  try {
    const response = await axios.post(
      `${DEEPSEEK_API_URL}/analyze`,
      { content: documentContent },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao analisar documento com DeepSeek:', error);
    throw error;
  }
};

export const extractData = async (documentContent) => {
  try {
    const response = await axios.post(
      `${DEEPSEEK_API_URL}/extract`,
      { content: documentContent },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao extrair dados com DeepSeek:', error);
    throw error;
  }
};