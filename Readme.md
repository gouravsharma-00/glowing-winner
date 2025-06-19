# Real-time Event Engagement Platform

This project is a simplified version of a real-time event engagement platform, demonstrating full-stack coordination and real-time communication. Users can browse upcoming events, join them, and instantly see a live list of other attendees via WebSocket updates.

## 🚀 Features

* **Event Listing**: View a list of available events.

* **Event Details**: See details for a specific event, including current attendees.

* **Join Event**: Users can join an event.

* **Real-time Attendee Updates**: Instantly see new attendees join an event without refreshing, powered by WebSockets.

* **Mock Authentication**: A basic login system for user identification.

## 🛠️ Tech Stack

### Backend

* **Node.js**: JavaScript runtime.

* **GraphQL**: API query language.

* **Prisma**: Next-generation ORM for Node.js and TypeScript.

* **PostgreSQL**: Relational database.

* **Socket.io**: Real-time bidirectional event-based communication.

* **TypeScript**: Strongly typed JavaScript.

### Frontend

* **React Native (Expo)**: Framework for building cross-platform mobile applications.

* **Zustand**: A small, fast, and scalable bearbones state-management solution.

* **Apollo Client**: GraphQL client for React.

* **Socket.io Client**: For real-time communication with the backend.

* **TypeScript**: Strongly typed JavaScript.

## 💻 Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **Node.js**: v18 or higher (includes npm)

  * [Download Node.js](https://nodejs.org/)

* **PostgreSQL**: Database server

  * [Download PostgreSQL](https://www.postgresql.org/download/)

* **Expo CLI**:

  ```
  npm install -g expo-cli
  ```

* **Git**: For cloning the repository.

  * [Download Git](https://git-scm.com/downloads)

## 📦 Installation & Setup

Follow these steps to get the project up and running on your local machine.

### 1. Backend Setup

1. **Navigate to the backend directory**:

   ```
   cd backend
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

3. 
   ```
   npx prisma generate
   ```

4. **Run Prisma Migrations**: This will create the necessary tables in your PostgreSQL database based on `prisma/schema.prisma`.

   ```
   npx prisma migrate dev --name init
   ```
5. 
    ```
    npm run seed
    ```
6. 
    ```
    npm start
    ```
    You should see output indicating that the GraphQL server is running on `http://localhost:4000/graphql`

### 3. Frontend Setup

1. **Navigate to the frontend directory**:

   ```
   cd event
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

## 🔑 Example Credentials (Mocked Login)

For the mocked authentication system, you can use the following credentials to log in:

* **Email**: `bob@example.com`or `alice@example.com`


Upon successful login, a mock token is generated, and you'll be redirected to the event list.

## 🚀 Usage

1. **Login**: Use the provided example credentials on the login screen.

2. **Browse Events**: After logging in, you will see a list of available events.

3. **View Event Details**: its location, time, and a list of current attendees.

4. **Join Event**:  if you haven't already joined, you'll see a "Join Event" button. Tap it to join.

5. **Real-time Updates**: To observe real-time updates, open the app on two different devices/simulators and navigate to the same event detail page. When one user joins the event, the attendee list will instantly update on both screens.
