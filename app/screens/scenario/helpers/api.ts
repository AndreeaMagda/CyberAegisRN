const BASE_URL = 'https://scego.onrender.com';
const LOCAL_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  generateScenario: (lang: string = 'ro') =>
    `${BASE_URL}/generate-scenario?lang=${lang}`,
};
