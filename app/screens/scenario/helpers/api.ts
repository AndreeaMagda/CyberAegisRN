const BASE_URL = 'https://scego.onrender.com';

export const API_ENDPOINTS = {
  generateScenario: (lang: string = 'ro') => `${BASE_URL}/generate-scenario?lang=${lang}`,
};