- Installed express, mongoose and connected to DB
- Setup the routes based on their respective route handler
- Kept the validation for payload in different path
- Create a User schema with all required fields
- Created a POST api for Signup
   - Hash all the password before saving it into DB using bcrypt package
   - Create jwt token and send the cookie added in token back to the user
   - Set expiry time of cookies as well

- Created POST api for login

- Created a resturant schema where we have schema for individual items, categories and restaurants
- Add restaurant router
- Created POST api to add items to the specific restaurant