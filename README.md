<p align="center">
  <img 
    src="https://res.cloudinary.com/dqumagamd/image/upload/v1764782887/icon_t5rjyt.png" 
    alt="NightOwl Logo" 
    width="160"
    style="background:#ffffff; padding:15px; border-radius:12px; box-shadow:0 0 10px rgba(0,0,0,0.15);" 
  />
</p>

<h1 align="center">🦉 NIGHTOWL — Minimal & Modern Journal Web App</h1>

<p align="center">
A beautiful, distraction-free journal application designed for night thinkers.  
Built using Next.js, Clerk, Prisma ORM, TailwindCSS & Arcjet Security.
</p>

---

## 🌐 Live Demo  
✨ Explore the app here: https://nightowl-journal.vercel.app/

---

## 🧩 Features

- 📝 Rich Text Editor (React Quill)
- 📁 Create & manage collections
- 🔐 Clerk authentication (secure login)
- 🌙 Minimal, night-friendly UI
- ⚡ Next.js App Router performance
- 🛡 Arcjet protection for API routes
- 🗃 Data managed using Prisma ORM

---


## 🛠️ Tech Stack

### **Frontend**
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8" />
  <img src="https://img.shields.io/badge/ShadCN-000000?style=for-the-badge&logoColor=white" />
</p>

### **Authentication**
<p align="center">
  <img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" />
</p>

### **Database & ORM**
<p align="center">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
</p>

### **Security**
<p align="center">
  <img src="https://img.shields.io/badge/Arcjet-0A71FF?style=for-the-badge&logoColor=white" />
</p>


---


# ⚙️ DevOps Implementation (Production Setup)

This project is deployed using a complete DevOps pipeline with automation, security, and production-grade configuration.

---

## 🚀 CI/CD Pipeline (Jenkins)

* Integrated **GitHub Webhooks** to automatically trigger builds
* Designed a **multi-stage Jenkins pipeline**:

  * Code checkout
  * Docker image build
  * Security scanning using Trivy
  * Push to DockerHub
  * Automated deployment

---

## 🐳 Containerization

* Application containerized using **Docker (multi-stage build)**
* Managed multi-container setup using **Docker Compose**:

  * App container
  * PostgreSQL database

---

## 🔄 Automated Deployment

* Created custom **`deploy.sh` script** for:

  * Pull latest code
  * Rebuild Docker images
  * Restart containers
  * Perform health checks

---

## 🛡️ Security (DevSecOps)

* Integrated **Trivy** for container vulnerability scanning
* Ensured only secure images are deployed in production

---

## 🌐 Reverse Proxy & HTTPS

* Configured **Nginx as reverse proxy**

* Connected custom domain:
  👉 https://app.dealgo.food

* Enabled **HTTPS using Let's Encrypt SSL**

* Implemented secure traffic routing

---

## ❤️ Health Check & Reliability

* Implemented **application health check using curl**
* Ensured container reliability using restart policies

---

## 📊 Logging

* Used **Docker logs** for debugging and monitoring
* Enabled basic logging for deployment tracking

---

## 🧠 DevOps Workflow

```mermaid
graph LR;
A[GitHub Push] --> B[Jenkins Pipeline];
B --> C[Build Docker Image];
C --> D[Trivy Scan];
D --> E[Push to DockerHub];
E --> F[Deploy using Script];
F --> G[Docker Compose Run];
G --> H[Nginx + HTTPS];
```

---

## 💼 DevOps Highlights

* End-to-end **CI/CD pipeline implementation**
* Real-world **production deployment with domain & SSL**
* **DevSecOps integration** with Trivy
* Automated deployment using **shell scripting**
* Container orchestration using **Docker Compose**
  
---

## 📸 Screenshots

### 🏠 Home Page  
<img src="https://res.cloudinary.com/dqumagamd/image/upload/v1764782808/home_yzgvaj.png" />

---

### ✍️ Text Editor Page  
<img src="https://res.cloudinary.com/dqumagamd/image/upload/v1764782808/text-editor_pczlvs.png" />

---

### 📚 Collections Page  
<img src="https://res.cloudinary.com/dqumagamd/image/upload/v1764782808/collections_ccuxvl.png" />

---

## 📦 Installation & Setup

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/krishnapschauhan/nightowl-journal-app.git
cd nightowl-journal-app
```

---

### **2️⃣ Install dependencies**
run this command all dependence install in one click
```
chmod 754 install.sh
```
```
./install.sh
```

---

### **3️⃣ Setup environment variables**
copy `.env.local` in the root:

```
cp env.local .env
```

---
### **4️⃣ docker compose up**

```
docker compose up -d --build
```
---


Open → http://localhost:3000

---


---


## 🤝 Contributing
Contributions are welcome!  
Feel free to open issues or submit pull requests.

---

## 📝 License
This project is licensed under the **MIT License**.

---

<p align="center">
  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGYzYXMwamxkZnQ5ZTE1YjZyN3I2MTR1azlodG40dnkwNHFsNXo4dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ui1hpJSyBDWlG/giphy.gif" width="300" />
</p>

<p align="center">✨ Built with passion by Krishna ✨</p>
