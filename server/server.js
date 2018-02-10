const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname,'../public/view');//get a corret path address
const port = process.env.PORT || 3000 ;
var app = express();


app.use(express.static(publicPath));
app.listen(port, () => {
   console.log(`server is up on ${port}`); // using `` . that was ECMAScript 6 feature ,template literals
});
