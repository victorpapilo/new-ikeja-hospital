# New Ikeja Hospital — Website

A full-stack hospital website: a React frontend (with animation) and a Node/Express + MongoDB backend
that handles real appointment bookings and contact messages.

This README is written for a first-time full-stack deployer — follow it top to bottom in order and
you'll go from "files on my computer" to "live website anyone can visit."

```
new-ikeja-hospital/
├── frontend/     React + Vite + Tailwind + Framer Motion (what visitors see)
└── backend/      Node + Express + MongoDB (stores appointments & messages)
```

---

## 0. Before you start — install these on your computer

1. **Node.js** (version 18 or later) — download from https://nodejs.org (get the "LTS" version).
   Check it worked by opening a terminal and running `node -v`.
2. **VS Code** (or any code editor) — https://code.visualstudio.com
3. **Git** — https://git-scm.com (optional, but needed if you want to push to GitHub for deployment)
4. A free **MongoDB Atlas** account — https://www.mongodb.com/cloud/atlas/register (this is your database, in the cloud, free tier is enough)

---

## 1. Set up the database (MongoDB Atlas)

1. Sign up at MongoDB Atlas and create a new **free (M0) cluster**.
2. When it asks for a database user, create one and **save the username and password somewhere safe**.
3. Under **Network Access**, click "Add IP Address" → "Allow access from anywhere" (0.0.0.0/0). This is
   fine for a starter project — you can restrict it later.
4. Once the cluster is ready, click **Connect → Drivers**, choose Node.js, and copy the connection
   string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with the real values, and add a database name before the `?`,
   e.g. `.../newikejahospital?retryWrites=true...`. Keep this string — you'll paste it into the backend
   `.env` file next.

---

## 2. Run the backend locally

```bash
cd backend
npm install
cp .env.example .env
```

Open the new `.env` file and fill in:
- `MONGODB_URI` — the connection string from step 1
- `JWT_SECRET` — any long random string (mash your keyboard)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use to view appointments later
- Leave `PORT` and `CLIENT_URL` as they are for now

Then add some starter doctors and testimonials to the database:

```bash
npm run seed
```

Start the API server:

```bash
npm run dev
```

You should see `MongoDB connected: ...` and `Server running on port 5000` in the terminal. Leave this
running — open a **new terminal tab** for the frontend.

---

## 3. Run the frontend locally

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open the URL it shows (usually `http://localhost:5173`). You should see the full site — hero
animations, services, doctors (pulled live from your backend), and working appointment/contact forms
that save straight into MongoDB.

Try booking a test appointment, then check it landed in Atlas: in Atlas, click **Browse Collections**
on your cluster and open the `appointments` collection.

---

## 4. Replace the placeholder content with your own

Right now the site uses placeholder photos (from picsum.photos) so it's never broken or empty. Before
going live, swap these out — **real photos of your hospital and staff build far more trust than stock
images**, so this is worth doing properly:

- `frontend/src/components/Hero.jsx` — the large hero photo
- `frontend/src/components/AboutPreview.jsx` — the team photo
- `frontend/src/pages/About.jsx` — the facility photo
- Doctor photos — add a real `photoUrl` (an image link) for each doctor either directly in MongoDB
  Atlas (Browse Collections → doctors) or by editing `backend/seed/seed.js` and re-running `npm run seed`

To add a photo, either:
- Upload it somewhere like [Cloudinary](https://cloudinary.com) (free tier) or an Imgur link, and paste
  the URL, **or**
- Drop the image file into `frontend/src/assets/` and `import` it at the top of the component, e.g.
  `import heroPhoto from "../assets/hero.jpg";` then use `src={heroPhoto}`.

Also update:
- `frontend/src/components/Footer.jsx` and `Contact.jsx` — confirm the address/phone/email are correct
- `backend/seed/seed.js` — replace the sample doctors with your real consultants
- The WhatsApp number in `frontend/src/components/WhatsAppButton.jsx`

---

## 5. Deploy the backend (Render.com — free tier)

1. Push this whole `new-ikeja-hospital` folder to a **GitHub repository** (create one at
   github.com/new, then follow GitHub's instructions to push your local folder — or use VS Code's
   built-in "Publish to GitHub" button).
2. Go to https://render.com, sign up, click **New → Web Service**, and connect your GitHub repo.
3. When configuring the service:
   - **Root directory:** `backend`
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Instance type:** Free
4. Under **Environment**, add the same variables from your `backend/.env` file (`MONGODB_URI`,
   `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`). Set `CLIENT_URL` to your future frontend URL (you can
   update this after step 6, once you know it).
5. Click **Create Web Service**. Render will build and deploy it — you'll get a URL like
   `https://new-ikeja-hospital-api.onrender.com`.
6. Note: on Render's free tier, the server "sleeps" after inactivity and takes ~30 seconds to wake up
   on the first request. This is fine for a starter site; upgrade later if traffic grows.

---

## 6. Deploy the frontend (Vercel — free tier)

1. Go to https://vercel.com, sign up, click **Add New → Project**, and import the same GitHub repo.
2. When configuring:
   - **Root directory:** `frontend`
   - **Framework preset:** Vite (Vercel usually detects this automatically)
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://new-ikeja-hospital-api.onrender.com/api` (your Render URL from step 5,
     with `/api` on the end)
4. Click **Deploy**. In a couple of minutes you'll get a live URL like
   `https://new-ikeja-hospital.vercel.app`.
5. Go back to Render (step 5) and update `CLIENT_URL` to this Vercel URL, then redeploy the backend, so
   the API only accepts requests from your real site.

---

## 7. Point your own domain at it (optional)

If you buy a domain (e.g. from Namecheap or a Nigerian registrar like whogohost.com):
- In Vercel, go to your project → **Settings → Domains** → add your domain, and follow the DNS
  instructions it gives you (usually adding an A or CNAME record at your domain registrar).
- Update `CLIENT_URL` on Render to match your new domain once it's live.

---

## 8. Viewing appointments as hospital staff

There's no admin screen built into the frontend yet (this keeps the starter simple), but every
appointment and message is safely stored in MongoDB. To check them:
- Easiest: open **MongoDB Atlas → Browse Collections** any time.
- Or, use a tool like [Postman](https://www.postman.com/downloads/) to call your API:
  1. `POST https://your-api-url/api/admin/login` with body `{ "email": "...", "password": "..." }`
     (the ones from your `.env`) — this returns a token.
  2. `GET https://your-api-url/api/admin/appointments` with header
     `Authorization: Bearer <token>` — this returns the full list.

If you'd like, in a future pass I can build you a proper admin dashboard page in the React app so staff
don't need Atlas or Postman at all — just ask.

---

## 9. Common issues

- **"Network Error" on the forms** — your backend probably isn't running, or `VITE_API_URL` in the
  frontend `.env` doesn't match where the backend actually is.
- **CORS error in the browser console** — the backend's `CLIENT_URL` doesn't match the URL you're
  visiting the frontend from. Update it and restart the backend.
- **Blank page after deploying to Vercel** — double check "Root directory" is set to `frontend` and
  "Output directory" is `dist`.
- **MongoDB connection refused** — check Atlas → Network Access allows your IP (or 0.0.0.0/0), and that
  the password in your connection string doesn't contain characters that need URL-encoding (e.g. `@`).

---

## What's inside, quickly

**Frontend pages:** Home, About, Services, Doctors, Book Appointment, Contact — all animated with
Framer Motion (hero entrance, scroll reveals, hover states, animated stat counters).

**Backend API:**
| Method | Route | What it does |
|---|---|---|
| POST | `/api/appointments` | Patient books an appointment |
| POST | `/api/contact` | Patient sends a contact message |
| GET | `/api/doctors` | Public list of active doctors |
| GET | `/api/testimonials` | Public list of approved testimonials |
| POST | `/api/admin/login` | Staff login, returns a token |
| GET | `/api/admin/appointments` | (staff only) list all appointments |
| PATCH | `/api/admin/appointments/:id` | (staff only) update status |
| GET | `/api/admin/contact` | (staff only) list all messages |

Good luck — and congratulations on shipping your first full-stack project.
