sutharsan-backend

# Portfolio Backend

This is the backend code for your portfolio application. It enables users to send messages to you through a contact form. The backend is built using Express and Nodemailer libraries for handling email sending.

## Setup

1. Install the required dependencies by running `npm install` in your project directory.
2. Create a `.env` file in the project's root directory with the following environment variables:

```
EMAIL=your_email@gmail.com
PASSWORD=your_email_password
YOUR_EMAIL=your_email_to_receive_messages@gmail.com
```

Replace `your_email@gmail.com`, `your_email_password`, and `your_email_to_receive_messages@gmail.com` with your actual email credentials and the email address where you want to receive messages.

## Running the Server

Start the backend server by running `node app.js` or `npm start` in the terminal. The server will be accessible at the specified port (usually port 3000 by default).

## API Endpoint

### POST /form

**Description:** This endpoint receives a POST request with data containing the sender's name (`fName`) and the message (`message`). The server sends an email using Nodemailer to the specified recipient (your email address). If the email is sent successfully, it returns a `200` status with a success message; otherwise, it returns a `500` status with an error message.

**Request Payload:**

```json
{
  "fName": "sparkz",
  "message": "Hello, this is a test message!"
}
```

**Response (Success):**

```json
{
  "success": "Email sent successfully"
}
```

**Response (Error):**

```json
{
  "error": "Something went wrong."
}
```

// Path: sutharsan-backend/app.js
