# WonderWorm: A Personal Assistant 
  Designed for Singapore Book Council as part of Hack4Good 2025

WonderWorm is a **Personal Assistant website** designed to streamline scheduling and email management for the Singapore Book Council. It includes functionalities for managing meetings, tasks, and emails, with a focus on enhancing productivity through **AI-driven email summarization**.

---

## Features  
1. **Scheduling Functionalities**  
   - Users can manage their meetings and tasks through an intuitive calendar interface powered by [FullCalendar](https://fullcalendar.io/).  

2. **Gmail Integration**  
   - Users can log in with their **Google accounts** and view their emails directly on the platform.  

3. **AI-Powered Email Summarization**  
   - Summarizes Gmail messages using **OpenAI’s API**, condensing long email threads into concise, easy-to-read summaries.  

4. **User Authentication**  
   - Google Sign-In is used for secure authentication and access to personal data.  

5. **Backend Architecture**  
   - Data is securely managed using **MongoDB** for storage.  

---

## Tech Stack  
- **Frontend**: Next.js, Tailwind CSS, FullCalendar  
- **Backend**: Node.js, Express.js, MongoDB  
- **APIs and Integrations**:  
  - **Gmail API** for email access.  
  - **OpenAI API** for email summarization.  
  - **Google Sign-In** for user authentication.  

---

## Installation  

### Prerequisites  
- **Node.js** and **npm** installed.  
- A **MongoDB database** (local or hosted).  
- API credentials for Gmail API and OpenAI API.  

### Setup Instructions  

1. **Clone the repository**:  
   ```bash  
   git clone https://github.com/your-repo-name.git  
   cd your-repo-name

1. **Install dependencies**
   ```bash
   npm install

1. **Environment configuration**
   - create a .env file in the root directory
   - Add the following environment variables:
   ```bash
   GOOGLE_CLIENT_ID=your-google-client-id  
   GOOGLE_CLIENT_SECRET=your-google-client-secret  
   OPENAI_API_KEY=your-openai-api-key  
   MONGO_URI=your-mongodb-connection-string

1. **Run the development server**
   ```bash
   npm run dev

---

## Usage

1. **Login with Google:**
   - Authenticate using your Google account to gain access to calendar and Gmail features.
1. **View and Manage Schedule:**
   - Use the interactive calendar to view and manage meetings or tasks.
1. **Gmail Integration:**
   - View Gmail emails directly within the app.
   - Summarize emails with a single click using the "Summarize" button, powered by OpenAI.
  
## Demo
Video Demo: [Link to your demo video]
