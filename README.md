# VCT Web Scraper

### Ver. 1.0

This application utilizes Cheerio.js and Node.js to scrape Tier 1 Valorant player data from VLR.gg. It 
finds the players' stats from a specific URL that you can edit and replace within the node application.
Once the application runs it will generate a JSON file containing the map and player stats from that 
specific match. 

## Steps To Run Application

1. Install Dependecies
```
npm i
```

2. Run Node Command
```
npm run scrape
```

## Future Plans

I plan to implement Puppeteer.js to automate the browser search so the URL does not have to be edited manually.
I also plan to create a simple frontend UI to make this an accessible app for other users to use and get data. 
