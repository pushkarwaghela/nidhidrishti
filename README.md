<div align="center">

# 🛡️ NidhiDrishti

### AI-Powered Public Fund Audit Intelligence Platform

Explainable risk scoring that flags fund disbursal anomalies and vendor irregularities.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![XGBoost](https://img.shields.io/badge/XGBoost-EB6C2A?style=for-the-badge)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

[🌐 Live Demo](YOUR_LIVE_LINK) · [🐞 Report Bug](../../issues)

</div>

---

## 📌 Overview

Public fund audits involve large volumes of disbursal records that are hard to review manually. **NidhiDrishti** is a risk-intelligence dashboard that scores disbursals and vendors, highlights anomalies, and explains *why* each item was flagged, so auditors can focus on the highest-risk cases first.

Built for **Smart India Hackathon 2026** (Team Vertex 1.0).

## ✨ Features

- 📊 **Risk-intelligence dashboard** with interactive data visualization (Chart.js)
- 🧠 **Explainable scoring engine** that combines:
  - Rule-based checks
  - Isolation Forest (unsupervised anomaly detection)
  - XGBoost (supervised risk model)
  - Similarity and network analysis
- 🏢 Detects **vendor irregularities** and unusual fund disbursal patterns
- 🔎 Per-record explanations of the signals behind each risk score

## 🏗️ Architecture

```
React Dashboard  ──►  FastAPI Backend  ──►  Scoring Engine
(Chart.js)            (Pydantic models)     ├─ Rules
                                            ├─ Isolation Forest
                                            ├─ XGBoost
                                            └─ Similarity / Network analysis
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Chart.js |
| Backend | Python, FastAPI, Pydantic |
| ML | Isolation Forest, XGBoost, scikit-learn |

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/pushkarwaghela/nidhidrishti.git
cd nidhidrishti

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

> Adjust folder names and commands to match this repo's structure.

## 🗺️ Roadmap

- [ ] Add authentication and roles for auditors
- [ ] Export audit reports (PDF/CSV)
- [ ] Model evaluation report

## 👤 Author

**Pushkar Waghela** · [LinkedIn](https://linkedin.com/in/pushkar-waghela) · [Portfolio](https://pushkarwaghela.netlify.app)
