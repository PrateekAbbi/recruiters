# 🚀 Recruiter Email Sender

This is a **Next.js** application that allows users to send emails to recruiters, store the sent emails in a **MongoDB** database, and display them in a **data table** with search and pagination. It is deployed on **Vercel** and uses **Particles.js** for an interactive background.

---

## 🌟 Features

- 📩 **Send Emails** to recruiters via **Nodemailer**.
- 📊 **Store Sent Emails** in a **MongoDB database**.
- 🔎 **Search & Filter** by recruiter name or email.
- 📅 **Formatted Dates** for human-readable timestamps.
- 🎨 **Dark Mode UI** with **Zebra-striped table**.
- 🎆 **Interactive Background** using **Particles.js**.
- 🚀 **Deployed on Vercel** with **automatic deployments**.

---

## 🛠 Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB (via **Mongoose**)
- **Email Service**: Nodemailer (SMTP)
- **UI Enhancements**: ShadCN UI, Particles.js
- **Hosting**: Vercel

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository and install the dependencies

```sh
git clone https://github.com/your-username/recruiter-app.git
cd recruiter-app
npm install
```

### 2️⃣ Set Up Environment Variables

```sh
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/RecruitersDB?retryWrites=true&w=majority
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```
🚨 Replace <username>, <password>, and your-email@example.com with actual credentials.

### 3️⃣ Run the project locally

```sh
npm run dev
```
