# Fine Media - Live Deployment Guide

Congratulations! Your code has been securely uploaded to `https://github.com/sooryagopal/finemedia.git`. You are now exactly 5 minutes away from launching. 

Follow these instructions exactly to put your Frontend (website) and Backend (database) on the public internet!

---

## 🚀 PHASE 1: Deploy the Backend (The Database API)
*We start with the backend so the frontend has somewhere to connect to!*

1. **Sign in to Render:** Go to [Render.com](https://render.com/) and sign in with your GitHub account.
2. **Create Web Service:** Click the **"New +"** button in the top right and select **Web Service**.
3. **Select Repository:** Choose your `sooryagopal/finemedia` repository from the list.
4. **Configure Settings (CRITICAL):**
   - **Name:** `finemedia-api`
   - **Region:** Singapore or Frankfurt (whichever is closest to you)
   - **Branch:** `main`
   - **Root Directory:** Type in `backend` *(Extremely important!)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install --legacy-peer-deps`
   - **Start Command:** `node server.js`
5. **Environment Variables:** Scroll down to Advanced -> **Environment Variables**. You must click "Add Environment Variable" and securely paste **everything** from your local `backend/.env` file. It should look like this:
   - `PORT` = `5000`
   - `MONGODB_URI` = `mongodb://finemedia_admin:finemedia@...` (Copy the massive legacy string)
   - `JWT_SECRET` = `finemedia_secure_jwt_secret_2026`
   - `EMAIL_USER` = `sooryagopaal@gmail.com`
   - `EMAIL_PASS` = `1234567890` (Your Gmail SMTP App Password)
   - `CLOUDINARY_CLOUD_NAME` = `Finemedia`
   - `CLOUDINARY_API_KEY` = `265265676629514`
   - `CLOUDINARY_API_SECRET` = `21O1ytnjAO578oOu2JNv7azkw70`
   - `GOOGLE_CALENDAR_ID` = `sooryagopaal@gmail.com`
   - `GOOGLE_CREDENTIALS_JSON` = *(Open your `google-calendar-service-account.json` file, copy all the massive `{...}` code inside it, and paste it completely inside this value box!)*
6. Click **Create Web Service** at the bottom.
7. **Wait 2 minutes.** At the top of your screen, Render will give you a live URL like `https://finemedia-api.onrender.com`. **Copy that link!**

---

## 🚀 PHASE 2: Connect the Frontend to Your Live Backend
Before deploying the website, we have to tell it to talk to your brand new Render link instead of your local computer!

1. Go back to your computer (VS Code).
2. Open `frontend/src/services/api.jsx`.
3. Change the `baseURL` on line 4 from `"http://localhost:5000"` to the Render link you just copied (e.g., `"https://finemedia-api.onrender.com"`).
4. Save the file.
5. In your VS Code Terminal, type these 3 commands to push this tiny update to GitHub:
   ```bash
   git add .
   git commit -m "Update API to live production Render link"
   git push
   ```

---

## 🚀 PHASE 3: Deploy the Frontend (The Beautiful Website)
1. **Sign in to Vercel:** Go to [Vercel.com](https://vercel.com/) and sign in with GitHub.
2. **Import Project:** Click **Add New** -> **Project**. Import your `sooryagopal/finemedia` repository.
3. **Configure Settings (CRITICAL):**
   - **Framework Preset:** Usually auto-detects `Vite`. Keep it.
   - **Root Directory:** Click "Edit" and type `frontend`. *(Extremely important!)*
4. Click **Deploy**!
5. Wait 60 seconds. Vercel will burst into confetti and hand you your official live website URL!

**You are done! 🎉 Your Apple-style event management platform is safely live to the world.**
