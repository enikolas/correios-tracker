const rp = require('request-promise').defaults({ simple: false });

const parser = require('./parser');

const trackingUri = 'https://www2.correios.com.br/sistemas/rastreamento/ctrl/ctrlRastreamento.cfm';
const resultUri = 'https://www2.correios.com.br/sistemas/rastreamento/resultado.cfm';

const correiosTracker = async code => {
  const cookieJar = rp.jar();
  try {
    await rp({
      method: 'POST',
      uri: trackingUri,
      jar: cookieJar,
      rejectUnauthorized: false,
      formData: {
        acao: 'track',
        objetos: code,
      }
    });
    
    const resultBody = await rp({
      method: 'GET',
      uri: resultUri,
      jar: cookieJar,
      encoding: 'latin1',
      rejectUnauthorized: false
    });

    const parsed = parser(resultBody);
    return parsed;
  } catch(error) {
    throw new Error('Something bad happend:', error);
  }
};

module.exports = correiosTracker;
