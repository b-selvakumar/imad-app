var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

function createtemplate (data)
{
 var heading = data.heading;
 var title = data.title;
 var date1 = data.data1;
 var content = data.content;
 
    var htmltemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width-device-width, initial-scale=1" >
             <link href="/ui/style.css" rel="stylesheet" />
            </head>
        <body>
            <div class="container">
                <div>
                    <a href = "/" >Home </a>
                </div>    
                <hr/>
                <div>
                    <h3>
                        ${heading}
                    </h3>
                </div>    
                <div>
                    <h4>
                        ${date1}
                    </h4>    
                </div>
                ${content};
            </div>
        </body>
        
    </html>
    `
    ;
    return htmltemplate;
}

var article_one = {
   title: 'Article One Written by Selva',
   heading:'Article One',
   date1: '15-Aug-2017',
   content: `
   <div>
    <p> This is first article by Selva. This is the first article by Selva--
   </p>
   </div>`
};


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/articleone',function(req, res) {
  res.send(createtemplate(article_one));
} );

app.get('/articletwo', function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});


app.get('/articlethree',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
