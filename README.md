# devJobs

**devJobs** is a **MERN CRUD application** for managing job listings, hosted as **serverless functions on Vercel**. The app features a **React frontend** and **Express + MongoDB backend**, fully modular and optimized with reusable components.

---

## 🌐 Live Demo
[Website Link Placeholder]

### Preview Images
- Homepage: ![Homepage Preview](./preview-homepage.png)  
- Jobs List: ![Jobs Page Preview](./preview-jobs.png)  
- Add Job Page: ![Add Job Preview](./preview-add-job.png)  
- Edit Job Page: ![Edit Job Preview](./preview-edit-job.png)  
- Job Details Page: ![Job Details Preview](./preview-job-details.png)

---

---

## 🗄 MongoDB Database

- **Database**: MongoDB Atlas (Cloud)  
- **Collection**: `jobs`  
- **Sample Document**:

```json
{
  "_id": "64d8f9b2c123456789abcdef",
  "title": "Frontend Developer",
  "type": "Full-Time",
  "location": "Remote",
  "description": "We are looking for a talented frontend developer to work with React and Tailwind CSS.",
  "salary": "$70K - $80K",
  "company": {
    "name": "Tech Solutions Ltd.",
    "description": "A leading tech company specializing in web and mobile applications.",
    "contactEmail": "hr@techsolutions.com",
    "contactPhone": "+1-234-567-890"
  }
}

```

---

## 🗂 Backend

- **Stack**: Node.js + Express + MongoDB  
- **Serverless Functions**: Hosted on Vercel, each API route is a serverless function  
- **Database Connection**:
  - `config/db.js` handles MongoDB Atlas connection  
  - `config/seed.js` seeds initial data (BSON format) if database is empty  
  - Credentials stored in `.env` or Vercel environment variables to avoid leaks  
- **Controllers**:
  - `controllers/jobsController.js` manages CRUD operations: `getJobs`, `getJob`, `createJob`, `updateJob`, `deleteJob`  
- **Routes**:
  - `/api/jobs` handles all job-related endpoints  
  - Routes connected to controllers for clean separation  
- **Middleware**:
  - `logger.js` logs requests with colors for clarity  
  - `errorHandler.js` handles global errors  
- **Proxy Setup**: `app.use('/api', jobsRoutes)` for clean API prefix  
- **Environment**: All sensitive data stored in `process.env`

---

## ⚡ Serverless Functions

- Each API route (`/api/jobs`) is deployed as a **Vercel serverless function**  
- Functions handle CRUD operations individually:
  - `GET /api/jobs` – fetch all jobs  
  - `GET /api/jobs/:id` – fetch a single job  
  - `POST /api/jobs` – create a new job  
  - `PUT /api/jobs/:id` – update an existing job  
  - `DELETE /api/jobs/:id` – delete a job  
- Serverless functions allow **scalable, on-demand backend execution** without running a dedicated server  
- Backend code in `backend/api` folder, mapped in Vercel to serverless endpoints  

---

## ⚛️ Frontend

- **Stack**: React + Tailwind CSS  
- **Pages**: Homepage, Jobs List, Job Details (`job/:id`), Add Job, Edit Job  
- **Routing**: React Router DOM for client-side routing, dynamic routes supported  
- **State Management**: `useState` for form and page data, `useEffect` for fetching backend data  
- **Reusable Components**: Job cards, buttons, form inputs, headers, and footers to reduce redundancy  
- **Dynamic Data**: Fetched directly from backend APIs, integrated with REST endpoints  
- **Notifications**: `react-toastify` for success and error messages  
- **Clean Modularized Code**: Components and pages are separated for maintainability  

---


## 🗂 Project Structure

```
devJobs/
├── frontend/ # React frontend
│ ├── src/
│ │ ├── pages/ # All five pages: Homepage, Jobs, Job/:id, AddJob, EditJob
│ │ ├── components/ # Reusable components (e.g., JobCard, Navbar, Footer, FormInput)
│ │ ├── App.jsx # Main React App
│ │ └── index.jsx # Entry point
│ └── tailwind.config.js
├── backend/ # Express backend (serverless functions)
│ ├── api/
│ │ └── jobs/ # Serverless API endpoints for Vercel deployment
│ ├── config/
│ │ ├── db.js # MongoDB connection setup
│ │ └── seed.js # Seed initial job data (BSON format)
│ ├── controllers/
│ │ └── jobsController.js # CRUD functions: getJobs, getJob, createJob, updateJob, deleteJob
│ ├── routes/
│ │ └── jobs.js # Express routes mapped to controllers
│ ├── middleware/
│ │ ├── logger.js # Middleware for logging requests using color-coded output
│ │ └── errorHandler.js # Global error handling middleware
│ └── server.js # Main Express server entry
├── .env # Environment variables (MongoDB URI, etc.)
└── README.md

```
