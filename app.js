const express = require('express');
const fs = require('fs');
const cors = require('cors');

const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.get('/api', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf8', (err, data) => {
      if (err) {
          console.error("Got an error while reading the file: ", err);
          res.status(500).json({ error: "Error reading the json file" });
      } else {
          try {
              const jsonData = JSON.parse(data);
              console.log("Sending data:", jsonData);
              res.json(jsonData);
          } catch (parseError) {
              console.error("Error parsing the json data:", parseError);
              res.status(500).json({ error: "Error parsing the json data" });
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