const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/userroutes");
const paymentRoute = require("./routes/payment");
const companyRoute = require("./routes/company");
const businessRoute = require("./routes/business");

const path = require('path');
const port  = 4200;
const swaggerjsdocs = require('swagger-jsdoc');
const swaggerui = require("swagger-ui-express")
require('dotenv').config();


const options = {
    definition:{
        openapi: '3.0.0',
        info: {
            title:" ADNET",
            version:"1.0.0"
        },
        servers:[
            {
                url:'https://adnet-api.vercel.app/'
            }
        ]
    },
    apis: ['./index.js']
}
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

mongoose.connect(process.env.MONGODB_CONNECTION)
.then(()=>{console.log("Database Connected")})
.catch((err)=>{console.log(err)});

app.use(session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, }
    
}));

//parses data  to json
//app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "https://adnet-api.vercel.app",          // Removed the trailing slash
    methods: 'GET, POST, PUT, DELETE',       // Methods allowed
    allowedHeaders: 'Content-Type, Authorization' // Corrected 'authorization' to 'Authorization'
  }));
app.options('*', cors())
const swaggerSpec = swaggerjsdocs(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec, {
    customCss:
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
customCssUrl: CSS_URL,
}));
app.use("/api/auth", authRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/company", companyRoute);
app.use("/api/business", businessRoute);



/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: This API is used to register a new user
 *      description: The API collects JSON data from the frontend to register a new user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                              example: John Doe
 *                          lastName:
 *                               type: string
 *                               example: musa aliyu
 *                          bio:
 *                              type: string
 *                              example: i love coding
 *                          streetAddress:
 *                               type: string
 *                               example: efe omo street
 *                          state:
 *                              type: string
 *                              example: FCT
 *                          phone:
 *                              type: string
 *                              example: 09074235666
 *                          city:
 *                              type: string
 *                              example: Abuja
 *                          zipCode:
 *                              type: string
 *                              exaple: 213045
 *                          email:
 *                              type: string
 *                              example: shazaniyu@gmail.com
 *                          country:
 *                              type: string
 *                              example: Nigeria
 *                          portfolioUrl:
 *                              type: string
 *                              example: https://sanzy-portfolio.com
 *                          plan:
 *                             type: string
 *                             example: Premium
 *                          password:
 *                              type: string
 *                              example: shazaniyu2@
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */


/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: This API is used to log in a user
 *      description: Verifies user credentials.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: shazaniyu@gmail.com
 *                          password:
 *                              type: string
 *                              example: shazaniyu2@
 *      responses:
 *          200:
 *              description: Login successful
 *          401:
 *              description: Unauthorized
 */

/**
 * @swagger
 * /api/payment/verify-payment:
 *  get:
 *      summary: Api link verify  a users payment
 *      description: Api to verify a user payment.
 *      parameters:
 *          - in: query
 *            name: userId
 *            required: true
 *            schema:
 *              type: string
 *            description: The ID of the user to delete
 *      responses:
 *          200:
 *              description: User deleted successfully
 *          404:
 *              description: User not found
 */

/**
 * @swagger
 * /api/auth/message:
 *  post:
 *      summary: Sends an email message
 *      description: Sends an email to a specified recipient.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          recipient:
 *                              type: string
 *                              example: jane.doe@example.com
 *                          subject:
 *                              type: string
 *                              example: Hello!
 *                          body:
 *                              type: string
 *                              example: This is a test email.
 *      responses:
 *          200:
 *              description: Message sent successfully
 *          400:
 *              description: Internal server error

 */




/**
 * @swagger
 * /api/auth/create-expense:
 *  post:
 *      summary: create an expense record
 *      description: Api to create expense record.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: "64fd02d7e124ec1234567890"
 *                          items:
 *                              type: string
 *                              example: fuel
 *                          quantity:
 *                              type: number
 *                              example: 1
 *                          description:
 *                              type: string
 *                              example: money to buy fuel
 *                          amount:
 *                              type: number
 *                              example: 2000
 *                          total:
 *                              type: number
 *                              example: 2000
 *      responses:
 *          200:
 *              description: Message sent successfully
 *          500:
 *              description: Internal server error
 */


/**
 * @swagger
 * /api/auth/create-sales:
 *  post:
 *      summary: create an sales record
 *      description: Api to create sales record.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: "67629dfd7358eb08f21a5238"
 *                          items:
 *                              type: string
 *                              example: fuel
 *                          quantity:
 *                              type: number
 *                              example: 1
 *                          description:
 *                              type: string
 *                              example: money to buy fuel
 *                          amount:
 *                              type: number
 *                              example: 2000
 *      responses:
 *          200:
 *              description: Message sent successfully
 *          500:
 *              description: Internal server error
 */







/**
 * @swagger
 * /api/company/create-company:
 *  post:
 *      summary: This API is used to create a logged in user's company details
 *      description: The API collects JSON data from the frontend to save  a new user's company data.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: 67484330b8a5265d16fbad75
 *                          companyName:
 *                              type: string
 *                              example: shazaniyuJTD
 *                          businessStructure:
 *                              type: string
 *                              example: premium
 *                          address:
 *                              type: string
 *                              example: john
 *                          cacNumber:
 *                              type: string
 *                              example: 4464635464746
 *                          incorporationDate:
 *                              type: string
 *                              example: 12/12/12
 *                          taxId:
 *                              type: string
 *                              example: 4567876
 *                          shareholderAgreement:
 *                              type: string
 *                              example: stonewss
 *                          email:
 *                              type: string
 *                              example: werew@gmail.com
 *                          phone:
 *                              type: number
 *                              example: 98098765
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */


/**
 * @swagger
 * /api/business/create-business:
 *  post:
 *      summary: This API is used to create a logged in user's company details
 *      description: The API collects JSON data from the frontend to save  a new user's company data.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: 67484330b8a5265d16fbad75
 *                          businessName:
 *                              type: string
 *                              example: shazaniyuJTD
 *                          businessAddress:
 *                              type: string
 *                              example: john
 *                          businessType:
 *                              type: string
 *                              example: sole proprietorship
 *                          contactEmail:
 *                              type: string
 *                              example: werew@gmail.com
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */




/**
 * @swagger
 * /api/payment/subscription:
 *  post:
 *      summary: This API is used to make a new payment
 *      description: The API collects JSON data from the frontend to register a new user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: 67484330b8a5265d16fbad75
 *                          email:
 *                              type: string
 *                              example: shazaniyu@gmail.com
 *                          package:
 *                              type: number
 *                              example: 100
 *                          name:
 *                              type: string
 *                              example: john
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 * 
 */


/**
 * @swagger
 * /api/auth/search-report:
 *  get:
 *      summary: Search sales records
 *      description: This API is used to search for sales records (daily, weekly, monthly, or annually).
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: 67629dfd7358eb08f21a5238
 *                          criteria:
 *                              type: string
 *                              enum: [daily, weekly, monthly, annually]
 *                              description: The criteria for searching records.
 *      responses:
 *          200:
 *              description: Successfully fetched records.
 *          400:
 *              description: Bad Request. Invalid input.
 *          500:
 *              description: Internal Server Error.
 */

app.get('/', (req, res)=>{
    res.send('4welcome to mail-crm server')
})



app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
});

module.exports = app