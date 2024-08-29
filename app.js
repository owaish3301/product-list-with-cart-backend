const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Got an error while reading the file: ", err);
      res.status(500).send("Error reading the json file");
    } else if (data) {
      try {
        res.status(200).json(JSON.parse(data));
      } catch {
        res.status(500).send("Error parsing the json data");
      }
    }
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}

module.exports = app;