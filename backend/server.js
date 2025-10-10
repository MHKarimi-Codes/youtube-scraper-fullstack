// server.js
const express = require("express");
const cors = require('cors');
const scrapeRoute = require('./scrapeRoute');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/scrape', scrapeRoute); // mount router

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
