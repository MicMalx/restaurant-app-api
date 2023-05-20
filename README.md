# Demonstration Project

This is my demonstration project to show my backend skills.
The projct uses express, express-validator, mongoose dependencies and works with MongoDB to store data.
Project functionalities:
- sing up and login
- make an order
- browse orders by user

# How to run project locally.

To run this project locally on Your machine:

1. Download the code from this repository.
2. Open terminal and go to the repository path.
3. Replace environment variables DB_USER, DB_PASSWORD, DB_NAME in app.js file with your MongoDB data and JWT_KEY in check-auth.js and users-controllers.js file or create a nodemon.json file in the root directory of the project with those variables.
4. Add users, orders, and meals empty collections.
5. Insert some data to meals collection.
6. Run npm install
7. Run npm start
8. Now You can test endpoints with for example postman.

# Available endpoints.
## GET http://localhost:5000/api/meals
## POST http://localhost:5000/api/users/signup

{

    "email": "test@test.com",

    "password": "test"

}
## POST http://localhost:5000/api/users/login

{

    "email": "test@test.com",

    "password": "test"

}

## POST http://localhost:5000/api/orders/create

To connect with this endpoint You need to add header "Authorization" with "Bearer ${TOKEN}" value. Replace ${TOKEN} with the value returned from singup/login endpoint.

{
    "name": "test",

    "address": "test 1/1",

    "phoneNumber": "555 555 555",

    "paymentMethod": "cash",

    "price": 1,

    "meals": [

        {

            "name": "mealName",

            "amount": 1
        },

        {

            "name": "mealName",

            "amount": 1

        }

    ]
    
}

paymentMethod parameter must be "cash" or "card" or API will return error.

## GET http://localhost:5000/api/orders/user

To connect with this endpoint You need to add header "Authorization" with "Bearer ${TOKEN}" value. Replace ${TOKEN} with the value returned from singup/login endpoint.