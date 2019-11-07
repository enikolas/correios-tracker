const cheerio = require('cheerio');

const dateRegex = new RegExp(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
const locationRegex = new RegExp(/([^0-9:\/ ]+ )+\/ \w{2}$/);

const parser = (resultHTML) => {
  const $ = cheerio.load(resultHTML);
  const resultData = [];

  $('table.listEvent tr').each((i, tr) => {
    const tds = $(tr).find('td');
    if (tds.length) {
      const column1 = $(tds[0]).text().replace(/\s+/gi, ' ').trim();

      const hasDate = dateRegex.test(column1);
      const date = hasDate ? dateRegex.exec(column1)[0] : column1;

      const haslocation = locationRegex.test(column1);
      const location = haslocation ? locationRegex.exec(column1)[0] : column1;

      const description = $(tds[1]).text().replace(/\s+/gi, ' ').trim();

      resultData.push({
        date,
        location,
        description,
      });
    }
  });
  return resultData;
};

module.exports = parser;
