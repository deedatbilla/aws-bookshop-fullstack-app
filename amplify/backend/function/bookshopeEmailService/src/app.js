
var express = require("express");
var cors = require("cors");
var aws = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var ses = new aws.SES({ region: "us-east-1" });
// declare a new express app
var app = express();
app.use(express.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods","*")
  next();
});

app.post("/sendmail", async (req, res) => {
  try {
    const { email, order } = req.body;
    var params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        
        Body: {
          Html: {
            Charset: "UTF-8",
            Data:  `<html>
            <head><style>
            #orders {
              font-family: Arial, Helvetica, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
            
            #orders td, #orders th {
              border: 1px solid #ddd;
              padding: 8px;
            }
            
            #orders tr:nth-child(even){background-color: #f2f2f2;}
            
            #orders tr:hover {background-color: #ddd;}
            
            #orders th {
              padding-top: 12px;
              padding-bottom: 12px;
              text-align: left;
              background-color: #4CAF50;
              color: white;
            }
            </style>
            </head>
            <body>
            <h3>Your order has been recieved. Thanks for your purchade</h3>
      
            <table id="orders">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Download url</th>
              </tr>
              ${order.map(
                (item, index) =>
                  `<tr>
               <td>${index + 1} </td>
               <td>${item.title} </td>
               <td>${item.description} </td>
               <td>${item.count} </td> 
      
               <td> <a href='${item.fileurl}'> ${item.fileurl}</a> </td>
             </tr>`
              )}
             
            </table>
            
            </body></html>`,
           },
          // Text: { Data: "Test" },
          
        },
  
        Subject: { Data: "Order Details" },
      },
      Source: "deedat5@gmail.com",
    };
   
    await  ses.sendEmail(params).promise()
    res.status(200).json({
          message: "order summary sent",
        });
   
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
});

app.listen(3000, function () {
  console.log("App started");
});
module.exports = app;
