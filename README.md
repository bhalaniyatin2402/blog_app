# Blog app using express, mongoDB and cloudinary

## Routes
- `/` 
    - all blogs - get all the blogs
- `/readblog/:id`
    - details blog - read description and details of the blog
- `/addblog`
    - add blog - add new blog including poster
- `/updateblog/:id` - update blog
- `/deleteblog/:id` - delete blog
- `*` - 404 page - page not found


## npm modules
- cloudinary
- cors
- dotenv
- express
- mongoose
- multer


## File Structure
- `config` - configuration for connecting like mongodb and clouinary
- `controllers` - all callback function that each route will call
- `middleware` - authentication middleware for login and reset password
- `models` - define blog schema including
- `routes` - hold different HTTP routes
- `utils` - extending error functionality 
- `app.js` - This is renders all routes and different views
- `package.json` - contain name, version and dependencies
- `server.js` - listen to server


## Project Setup
To run project locally
- Clone repo
- `npm install` in root directory
- Set for `environment variables`
    - `PORT` - set port number to listen the server
    - `DB_URL` - url of your local_database or Atlas
    - `CLOUD_NAME` -  
    - `CLOUD_API_KEY` - 
    - `CLOUD_API_SECRET` - 
- `npm run dev` & if nodemon not installed then `npm run start`
- use `http://127.0.0.1:3000` to go to the page

