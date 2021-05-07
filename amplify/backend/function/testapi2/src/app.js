/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
var app = express();
app.use(bodyParser.json());
var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/sendmail", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/sendmail/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

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
            Data: `<html>
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
      
               <td> <a href='${item.fileurl}' download> ${item.fileurl.substring(0,40)}...</a> </td>
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

    await ses.sendEmail(params).promise();
    res.send({
      message: "order summary sent",
    });
  } catch (error) {
    res.status(400).send({ e: error.message, msg: "there was an issue" });
    console.log(error.message);
  }
});
// app.post('/sendmail/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

/****************************
 * Example put method *
 ****************************/

app.put("/sendmail", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/sendmail/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/sendmail", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/sendmail/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
