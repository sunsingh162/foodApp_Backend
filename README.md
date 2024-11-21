- Installed express, mongoose and connected to DB
- Setup the routes based on their respective route handler
- Kept the validation for payload in different path
- Create a User schema with all required fields
- Created a POST api for Signup
   - Hash all the password before saving it into DB using bcrypt package
   - Create jwt token and send the cookie added in token back to the user
   - Set expiry time of cookies as well

- Created POST api for login

- Created Schema for restaurants
  - POST API to add multiple restaurants
  - GET API to get all the restaurant when home page loads

- Created Schema for Products with resId as field also
  - Created post api to add products to the restaurant with categories
  - Created get API to get the Product list using restaurantId

- Created Schema for Cart with refernce to User
  - API to add items to cart
  - API to update cart
  - API to remove items from cart
  - API to show cart
  - API to generate Sharable link of user cart using uuid (Universally Unique Identifiers) library
  - API to access shared cart using link

- Create route for Profile section
  - Create api to view the user profile
  - Create api to edit the user profile with allowed fields
