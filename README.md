# 📦 InventoryTrac PRO - Real-Time Inventory & Stock Management

An enterprise-grade, full-stack inventory management web application built with **FastAPI**, **PostgreSQL**, **SQLAlchemy**, **React 18**, **TypeScript**, and **Tailwind CSS**. Features a modern **frosted glassmorphism UI**, real-time stock metric calculations, interactive sorting, and dynamic theme switching.

---

## 🌟 Features

- **⚡ High-Speed FastAPI Backend**: Async REST API endpoints for complete product lifecycle (CRUD) operations.
- **🐘 PostgreSQL & SQLAlchemy ORM**: Robust relational data persistence with automatic schema binding and transactions.
- **💎 Transparent Glassmorphism UI**: High-end frosted glass layout floating over an atmospheric global logistics hub background.
- **🎨 Dynamic Theme Switching**: Instant client-side theme engine with 4 curated color schemes:
  - 🌿 **Emerald Aurora** (Default - Radiant Emerald & Cyber Cyan)
  - 🔮 **Cyber Violet** (Electric Violet & Neon Magenta)
  - 🌅 **Amber Sunset** (Warm Tangerine & Coral)
  - ❄️ **Oceanic Ice** (Ice Cyan & Sapphire Blue)
- **📊 Real-Time Metrics & Analytics**: Auto-computes **Core SKUs**, **Total Valuation ($)**, **Alerts / Out-of-Stock**, and **Low Stock Counts** on the fly.
- **🔍 Interactive Data Grid**: Multi-column sorting (by ID, Product Details, Price, and Stock Quantity) with in-place row editing and deletion.
- **🛡️ Safe CRUD Validation**: Strict Pydantic validation on the backend and typed form handlers with validation on the frontend.
- **💓 Live Health Monitor**: Dynamic pulse indicator showing PostgreSQL / FastAPI connection health in real time.

---

## 🏗️ Architecture & Platform Stack

```mermaid
graph LR
    subgraph Frontend [React 18 + TypeScript + Vite]
        UI[Glassmorphic UI]
        ThemeEngine[Theme Engine]
        AxiosClient[Axios API Client]
    end

    subgraph Backend [FastAPI + Uvicorn]
        Router[REST API Endpoints]
        PydanticModels[Pydantic Validation]
        SQLAlchemyORM[SQLAlchemy ORM]
    end

    subgraph Database [PostgreSQL]
        PostgresDB[(inventory_db)]
    end

    UI --> AxiosClient
    AxiosClient --> Router
    Router --> PydanticModels
    PydanticModels --> SQLAlchemyORM
    SQLAlchemyORM --> PostgresDB
```

---

## 📂 Project Directory Structure

```text
Inventory_management/
├── backend/
│   ├── database.py         # SQLAlchemy engine, session maker & declarative base
│   ├── database_models.py  # SQLAlchemy DB Table models (ProductTable)
│   ├── model.py            # Pydantic schema validation models
│   └── main.py             # FastAPI application, CORS & REST API routes
├── frontend/
│   ├── public/             # Static assets & background imagery
│   ├── src/
│   │   ├── components/     # UI Components (Header, DashboardHero, InventoryCatalog, Toast)
│   │   ├── types/          # TypeScript interfaces (Product, InventoryStats, Theme)
│   │   ├── utils/          # Theme tokens & configuration
│   │   ├── App.tsx         # Main application controller & state
│   │   ├── index.css       # Tailwind CSS & custom glassmorphism utilities
│   │   └── main.tsx        # React entry point
│   ├── package.json        # Frontend scripts & dependencies
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── vite.config.js      # Vite build tool and API proxy config
├── .gitignore              # Ignored files (node_modules, pycache, dist)
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+** (Python 3.10 - 3.14 supported)
- **Node.js 18+** & **npm**
- **PostgreSQL** server running locally or remotely

---

### 1. Backend Setup (FastAPI & PostgreSQL)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (optional but recommended):
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic
   ```

4. Configure Database Credentials:
   Open `backend/database.py` and update your PostgreSQL connection string:
   ```python
   DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@localhost:5432/inventory_db"
   ```

5. Launch the FastAPI backend server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   - API Server: `http://localhost:8000`
   - Interactive Swagger Docs: `http://localhost:8000/docs`
   - Redoc Alternative Docs: `http://localhost:8000/redoc`

---

### 2. Frontend Setup (React + Vite + Tailwind CSS)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   - Application URL: `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/products` | Retrieve all inventory products | None |
| **GET** | `/products/{id}` | Fetch a single product by ID | None |
| **POST** | `/products` | Register a new product into catalog | JSON (`id`, `name`, `description`, `price`, `quantity`) |
| **PUT** | `/products/{id}` | Update product specifications / stock | JSON (`name`, `description`, `price`, `quantity`) |
| **DELETE** | `/products/{id}` | Permanently remove product from inventory | None |

---

## 💻 Tech Stack Detail

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/), [SQLAlchemy](https://www.sqlalchemy.org/), [Pydantic v2](https://docs.pydantic.dev/), [Uvicorn](https://www.uvicorn.org/)
- **Frontend**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

---


