// scrapeRoute.js
const express = require('express');
const scrapeYoutubeCould = require('./cloudScraper'); // import the cloud scraper function
const router = express.Router();



router.post('/', async (req, res) => {
    const { url } = req.body;
    const data = await scrapeYoutubeCould(url);
    res.json(data); // sends { title, comments }
    console.log(data)
});


module.exports = router;
