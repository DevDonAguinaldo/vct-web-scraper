const axios = require('axios');
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.vlr.gg/183774/sentinels-vs-100-thieves-champions-tour-2023-americas-league-w1/?game=all&tab=overview";

async function Scrape() {
  const statistics = [];
  await axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data);

      $('div.vm-stats-game').each((index, game) => {
        const mapPlayed = $(game).find('.map > div > span').text().replace(/\s+/g, '').replace('PICK', '');

        if (mapPlayed !== '') {
          $(game).find('table.wf-table-inset > tbody > tr').each((index, row) => {
            const playerStats = {};

            playerStats.map = mapPlayed;
            playerStats.agent = $(row).find('td.mod-agents > div > span > img').attr('title');
            const player = $(row).find('.mod-player').text().replace(/\s+/g, ' ').split(' ');
            playerStats.username = player[1];
            playerStats.kills = Number($(row).find('td.mod-vlr-kills > span > span.mod-both').text());
            playerStats.deaths = Number($(row).find('td.mod-vlr-deaths > span > span > span.mod-both').text());
            playerStats.assists = Number($(row).find('td.mod-vlr-assists > span > span.mod-both').text());
            $(row).find('td.mod-stat > span > span.mod-both').each((i, stat) => {
              switch(i) {
                case 0:
                  playerStats.rating = parseFloat($(stat).text());
                  break;
                case 1:
                  playerStats.acs = Number($(stat).text());
                  break;
                case 5:
                  const kast = parseFloat((Number($(stat).text().replace('%', '')) * 0.01).toFixed(2));
                  playerStats.kast = kast;
                  break;
                case 6:
                  playerStats.adr = Number($(stat).text());
                  break;
                case 7:
                  const hs = parseFloat((Number($(stat).text().replace('%', '')) * 0.01).toFixed(2));
                  playerStats.headshots = hs;
                  break;
                default:
                  break;
              }
            });

            statistics.push(playerStats);
          });
        }
      });
    }).catch(error => console.error(error));

  fs.writeFile('MatchHistory.json', JSON.stringify(statistics), (error) => {
    if (error) console.error(error);
  });
}

Scrape();