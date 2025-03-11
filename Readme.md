# Finacplus assignment     
   
## frontend  - https://finacplus.vercel.app/    
## backend - https://finacplus-production.up.railway.app     
## video demonstration-     
## postman api collection - https://dark-shuttle-316146.postman.co/workspace/New-Team-Workspace~2520c6ff-2b4c-429d-8afb-f76492bfc532/collection/29159995-e27188fc-eec2-42aa-81e1-0c5e31dc537a?action=share&creator=29159995    

  
    
## To run locally-    
1.   
```
   git clone https://github.com/rohannsahh/finacplus  


  
2. backend folder - 
  
```  
   cd backend 
   npm i 
   npm run dev
  
  
3. frontend folder -  
```
  cd ../frontend  
  npm i  
  npme run dev

  
 Set up env in backend and frontend for mongo db and backend url        


# Tech stack - React , express js , nodejs, mongoose, mongodb , vercel(frontend deploy ), railway(backend deploy)  
  
# api design -    
  
1. create user - /api/user/     post request  

```
  {
  "name": "Rohan shah",
  "age": 50,
  "dob": "1980-05-10",
  "password": "securepassword123",
  "gender": "Male",
  "about": "I am a software engineer."
}


{
    "message": "User created successfully",
    "user": {
        "name": "Rohan shah",
        "age": 50,
        "dob": "1980-05-10T00:00:00.000Z",
        "password": "$2b$10$mN4bcqNo803nuRV8W1zJ7uKaq9MDfKW5y9saxMysEwyAIVLLBoSE6",
        "gender": "Male",
        "about": "I am a software engineer.",
        "_id": "67cf5160745775e09217db80",
        "__v": 0
    }
}

  
2. update user -/api/user/:id  put request

```{
    "_id": "67cf431ed88997b97d00283e",
    "name": "Rahul Doe",
    "age": 25,
    "dob": "1998-05-10T00:00:00.000Z",
    "password": "$2b$10$9R4uYdaMP7buhFBTgpxq9erPYfhJ6zCeOCgbV9dBjkE2lQuLHDI.S",
    "gender": "Male",
    "about": "I am a software engineer.",
    "__v": 0
}

{
    "message": "User updated successfully",
    "user": {
        "_id": "67cf431ed88997b97d00283e",
        "name": "Rahul Doe",
        "age": 25,
        "dob": "1998-05-10T00:00:00.000Z",
        "password": "$2b$10$mvJxK.1WmrUDi7poeB5uTOmJQfCPpG0Cys/sVN2w6iBcqZbDfBLi2",
        "gender": "Male",
        "about": "I am a software engineer.",
        "__v": 0
    }
}  

  
3. getall user - /api/user/  Get request  

4. get user byid - /api/user/:id     

5. delete user -/api/user/:id  

  

## Database design  

```
    name:{
    type:String,
    required:true,
    minlength:2,

  },
 
  age:{
    type: Number,
    required:true,
    min:0, 
    max:120,
  },
  dob:{
    type:Date,
    required:true,
  },
  password:{
    type:String ,
    required : true,
    minlength:10,
  },
  gender:{
    type:String,
    required:true,
    enum:["Male","Female", "Others"],
  },
  about:{
    type:String,
    maxlength:5000,
  }
