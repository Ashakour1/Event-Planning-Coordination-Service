# Event Planning And Coordination Service

## Introduction

Welcome to our Event Planning and Coordination Service! Whether you're organizing a corporate conference, a wedding, or a special celebration, our team is here to turn your vision into a memorable reality. We understand that each event is unique, and we are dedicated to providing personalized, top-notch services to meet your specific needs.

## Get Started

1. - userControllers Users can effortlessly discover upcoming events and create invitations for events of interest using our platform.
2. - vendorControllers Vendors effortlessly explore events and express interest by submitting applications through our platform.

## BASE URL

- [Event-planning-Api](https://event-planning.onrender.com/)

## User Register

### Endpoint `POST : /api/users/`

### Description

The api/users/ endpoint allows a user to sign up as an user by providing their name, email, and password.

### Request Body

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| Name      | String | name of User  |
| Email     | String | email of User |
| Password  | String | pass of User  |

### Response Body

```json
{
  "status" :  201,
  "success": "true",
  "error"  : "null",
  "results": {
    "data" : {
        "message" : "User Created Successfully",
        "token"   : ``token``
    }
  }
}
```

### Error Response

1 **User Already Exists**

```json
{
  "status": 201,
  "message": "User Already exists",
  "Stack": "Null"
}
```

2. **incomplete information**

```json
{
  "status": 400,
  "message": "Please fill all the fields",
  "Stack": "Null"
}
```

## User Login

### Endpoint `POST : /api/users/login`

### Description

The /api/users/login endpoint enables users to log in by providing their email and password.

### Request Body

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| Email     | String | email of User |
| Password  | String | pass of User  |

### Response Body

```json
{
  "status" : 201,
  "success": "true",
  "error": "null",
  "results": {
    "data" : {
        "message" : "User Logged In Successfully",
        "token" : ``token``
    }
  }
}
```

### Error Response

1. **incomplete information**

```json
{
  "status": 400,
  "message": "Please fill all the fields",
  "Stack": "Null"
}
```

2. **User not Exists**

```json
{
  "status": 400,
  "message": "User Already exists",
  "Stack": "Null"
}
```

3. **invalid credentials**

```json
{
  "status": 401,
  "message": "Invalid credentials. Please check your email and password.",
  "Stack": null
}
```

## vendor Register

### Endpoint `POST : /api/vendors/`

### Description

The /api/vendors/ endpoint facilitates vendor registration, allowing vendors to sign up by providing their name, email, and password.

### Request Body

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| Name      | String | name of User  |
| Email     | String | email of User |
| Password  | String | pass of User  |

### Response Body

```json
{
  "status" :  201,
  "success": "true",
  "error"  : "null",
  "results": {
    "data" : {
        "message" : "vendor Created Successfully",
        "token"   : ``token``
    }
  }
}
```

### Error Response

1. **incomplete information**

```json
{
  "status": 400,
  "message": "Please fill all the fields",
  "Stack": "Null"
}
```

2 **vendor Already Exists**

```json
{
  "status": 201,
  "message": "vendor Already exists",
  "Stack": "Null"
}
```

## Vendor Login

### Endpoint `POST : /api/vendors/login`

### Description

The /api/vendors/login endpoint enables vendors to log in by providing their email and password.

### Request Body

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| Email     | String | email of User |
| Password  | String | pass of User  |

### Response Body

```json
{
  "status" : 201,
  "success": "true",
  "error": "null",
  "results": {
    "data" : {
        "message" : "vendor Logged In Successfully",
        "token" : ``token``
    }
  }
}
```

### Error Response

1. **incomplete information**

```json
{
  "status": 400,
  "message": "Please fill all the fields",
  "Stack": "Null"
}
```

2. **vendor not Exists**

```json
{
  "status": 400,
  "message": "vendor not exists",
  "Stack": "Null"
}
```

3. **invalid credentials**

```json
{
  "status": 401,
  "message": "Invalid credentials. Please check your email and password.",
  "Stack": null
}
```

## invitations

### Endpoint POST: /api/invitations

### Description

The /api/invitations endpoint allows users to create and send invitations for events.

### Request Body

| Parameter | Type | Description    |
| --------- | ---- | -------------- |
| eventId   | int  | event of event |
| userId    | int  | userId of User |

```json
{
  "status": 201,
  "success": true,
  "error": null,
  "results": {
    "data": {
      "message": "Invitation Sent Successfully"
    }
  }
}
```

### Error Responses

1. **Incomplete Information**
```json
{
    "status": 400,
    "message": "Please fill in all required fields",
    "Stack": null
}
```
2. **Event Not Found**

```json
{
  "status": 404,
  "message": "Event not found",
  "Stack": null
}
```

4. **user Not Found**

```json
{
  "status": 404,
  "message": "Event not found",
  "Stack": null
}
```
4. **Duplicate invitation**
```json
{
    "status": 409,
    "message": "Duplicate Invitation. Please wait for the response.",
    "Stack": null
}
```

## Applications

### Endpoint POST: /api/applications

### Description

The /api/applications endpoint allows vendors to create and send applications for events.

### Request Body

| Parameter   | Type | Description          |
| ---------   | ---- | -------------------- |
| eventId     | int  | event of event       |
| vendorId    | int  | vendorId of vendor   |

```json
{
  "status": 201,
  "success": true,
  "error": null,
  "results": {
    "data": {
      "message": "Application sent successfully"
    }
  }
}
```

### Error Responses

1. **Incomplete Information**
```json
{
    "status": 400,
    "message": "Please fill in all required fields",
    "Stack": null
}
```
2. **Event Not Found**

```json
{
  "status": 404,
  "message": "Event not found",
  "Stack": null
}
```

4. **vendor Not Found**

```json
{
  "status": 404,
  "message": "vendor not found",
  "Stack": null
}
```
4. **Duplicate invitation**
```json
{
    "status": 409,
    "message": "Duplicate applications. Please wait for the response.",
    "Stack": null
}
```

### Author 

- Github [Github](https://github.com/Ashakour1)
- X [Twitter](https://twitter.com/Ashakour17)
- LinkedIn [LinkedIn](https://www.linkedin.com/in/a-shakour-mohammed-90836725a/)
- Email[Email](engshakrayare114@gmail.com)