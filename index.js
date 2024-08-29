const express = require('express')
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;


app.get('/getCartItems', (req, res) => {
  fs.readFile('./public/data.json', 'utf8', (err, data)=>{
    if(err){
        console.error("Got an error while reading the file : ",err)
        res.status(500).send("Error reading the json file");
    } else if (data){
        try{
            res.status(200).send(JSON.parse(data));
        }catch{
            res.status(500).send("Error parsing the json data");
        };
    };
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});