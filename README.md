# 📚 Media Tracker with AI Description Generator

A full-stack project using **React + TypeScript** for the frontend and **FastAPI + MongoDB** for the backend. Users can manage a list of media items (books, movies, etc.), and generate AI-powered descriptions for new titles using Cohere.

---

## 🚀 Features

### 🖥️ Frontend
- Built with **React + Vite + TypeScript**
- Responsive UI with **Tailwind CSS**
- Pages:
  - `Home`: Welcome page
  - `Tracker`: Create, search, update, delete media
  - `AI Description`: Generate creative AI-based blurbs for titles

### 🔧 Backend
- Built with **FastAPI** (Python)
- Connected to **MongoDB Atlas** using `motor`
- Routes:
  - `GET /media` — List media
  - `POST /media` — Add new
  - `DELETE /media/{id}` — Delete
  - `PUT /media/{id}` — Update
  - `POST /describe` — AI description using Cohere

---

## 🧪 Getting Started

### 🔙 Backend Setup
```bash
cd media-tracker-backend
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate
pip install -r requirements.txt

# Add your API key to .env
COHERE_API_KEY=your_real_key

uvicorn app.main:app --reload
```

### 🌐 Frontend Setup
```bash
cd media-tracker
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 🧠 AI Description Feature
Powered by **Cohere API**. 
Generate a short description from a title and genre.

### Example Prompt:
> "Generate a short, creative description for a horror titled 'Dark Rain'"

### Example Output:
> "A chilling tale of a town drenched in fear as a mysterious rain awakens long-buried nightmares."

---

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI, Python, Uvicorn, MongoDB, Motor, JWT
- **AI**: Cohere API (via `requests`)

---

## 📦 Environment Variables
Add a `.env` file in your backend root:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/media-tracker?retryWrites=true&w=majority
DB_NAME=media-tracker
COHERE_API_KEY=your_real_cohere_api_key
```

---

## 📄 License
MIT — free to use, learn, and improve.
