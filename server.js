var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));
var config ={
    user:'bselvakumarb',
    database:'bselvakumarb',
    host:'http://db.imad.hasura-app.io',
    port:'5342',
    password: process.env.DB_PASSWORD
};


var pool = new Pool(config);

function createtemplate (data)
{
 var heading = data.heading;
 var title = data.title;
 var date1 = data.date1;
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
                ${content}
            </div>
        </body>
        </html>
    `
    ;
    return htmltemplate;
}

var articles = {
'article-one': {
       title: 'Article One Written by Selva',
       heading:'Article One',
       date1: '15-Aug-2017',
       content: `
       <div>
        <p> This is first article by Selva. This is the first article by Selva.
       </p>
       </div>`
    },
'article-two': {
       title: 'Article Two Written by Selva',
       heading:'Article Two',
       date1: '20-Aug-2017',
       content: `
       <div>
        <p> This is SECOND article by Selva. This is the SECOND article by Selva.
       </p>
       </div>`
    },
'article-three': {
       title: 'Article Three Written by Selva',
       heading:'Article Three',
       date1: '25-Aug-2017',
       content: `
       <div>
        <p> This is THIRD article by Selva. This is the THIRD article by Selva.
       </p>
       </div>`
    },
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/:articleName',function(req, res) {
   
    var articleName = req.params.articleName;
    var querystring = "SELECT * FROM ARTICLE WHERE TITLE = '" + req.params.articleName + "'" ;
    pool.query(querystring,function(err,results){
        if (err){
            res.status(500).send(err.toString());
        } else {
            if (results.row.length === 0) {
            res.status(404).send('Article Not found');
            } else {
             var artilceData = results.row[0];
             res.send(createtemplate(articleData));
            
            }
        }
    });*/
} );


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
