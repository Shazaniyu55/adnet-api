ADNET API



Features User Registration and Authentication: Secure sign-up, login, and session management.dynamic content using Reactjs . MongoDB Integration: Store and manage data with MongoDB.

Technologies Node.js: JavaScript runtime for building scalable network applications. Express: Web application framework for Node.js. ReactJs: FrontEnd. MongoDB: NoSQL database for flexible and scalable data storage. MVC Architecture: Model-View-Controller pattern for a clean separation of concerns.

Getting Started Prerequisites Node.js (v14 or later) MongoDB (v4.2 or later) npm (Node Package Manager)

Installation Clone the repository: git clone cd adain-affiliate

npm install

Set up environment variables by creating the .env file:

Create a .env file in the root directory and add the following configuration: PORT=4000 MONGO_URI=mongodb://localhost:27017/adain_affiliate SESSION_SECRET=your_secret_key

npm start
Project Structure /models: Contains Mongoose schemas and models. /views: EJS templates for rendering HTML. /controllers: Contains the logic for handling requests and responses. /routes: Defines the routes for the application. /cloudinary: Configuration of files uploads, including database and server settings. /public: Static assets like CSS, JavaScript, and images. /Utils: Middleware functions for handling requests and responses.

API ROUTES
/API Routes:

adminRoutes: for the admin login registeradmin getallusers getuserprofiles deleteuser searchusers

NOTIFICATION ROUTES
notificationRoute: create a notification getusernotification markasread

PAYMENTROUTES
paymentRoute: banktransfer withdraw subscription referallsubscription paymentcallback getallBanks

USERROUTES
userRoute: loginroute registerroute updateroute messageroute passwordrestroute

resetpassword updatepasswordroute dashboardroute referalnetworkroute profileroute settingsroute withdraw buyairtimeroute getreferalltokenroute signupwithreferallroute subscriptionpopuproute subscriptionreferallroute

USAGE
Usage User Management: Register and manage users through the provided routes. Affiliate Tracking: View and manage affiliate networks and commission structures. Dashboard: Monitor key metrics and activities via the dashboard interface.

License This project is licensed under the MIT License - see the LICENSE file for details.

Contact For any questions or support, please contact:

Author: Shazaniyu Gbadamosi, Rachael Omiachi