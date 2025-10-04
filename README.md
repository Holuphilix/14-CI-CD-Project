# Mini Project: GitHub Actions CI/CD Deployment

## Introduction
This project demonstrates how to implement a full CI/CD pipeline using GitHub Actions. The application is built with Node.js and Docker, and it is deployed to an AWS EC2 instance.

## Prerequisites
- GitHub repository
- AWS EC2 instance
- Docker and Docker Compose
- GitHub Secrets configured for deployment
- Node.js installed locally

## Lesson 1: Project Setup & GitHub Repository

🔹 **Goal: Set up your project directory, initialize Git, and push it to GitHub.**

### Step 1: Create and Initialize the Project

- To begin, create the project directory named **ci-cd-project**, navigate into it, and initialize it as a Git repository.

**Note:** For this project, I am using **Git Bash** on a Windows workstation to execute these shell commands, as it provides a Unix-like command-line experience.

**Commands:**
```bash
mkdir ci-cd-project && cd ci-cd-project
git init
```
![Initialize Git Repository](./images/1.mkdir_project.png)

### Step 2: Create Project Structure

- Run the following command to set up necessary directories:

**Commands:**
```bash
mkdir -p .github/workflows api tests webapp images
```
![Project Directories](./images/2.Workflow_directories.png)

**Project Structure:**

**Commands:**
```bash
ci-cd-project/
│── .github/
│   ├── workflows/   # GitHub Actions workflows
│── api/             # Backend API
│── webapp/          # Frontend (optional)
│── images/          # Screenshots for documentation
│── tests/           # Test files
│── README.md        # Project documentation
│── docker-compose.yml  # Docker setup
│── .gitignore       # Ignore unnecessary files
```

### Step 3: Initialize Git & Create a GitHub Repository
1️⃣ Create a GitHub repository:

- Go to GitHub → New Repository
- Name it ci-cd-project
- Select Public or Private
- Do NOT initialize with a README (we will add ours)
- Click Create Repository

![Github Account Creation](./images/3.Github_creation.png)

2️⃣ Link local project to GitHub:

**Commands:**
```bash
git remote add origin https://github.com/Holuphilix/ci-cd-project.git
```

### Step 4: Create a README.md
- Inside your project folder, run:

**Commands:**
```bash
touch README.md
```

### Step 5: Add & Push to GitHub
- Run these commands to push the code:

**Commands:**
```bash
git add .
git commit -m "Initial project setup"
git branch -M main
git push -u origin main
```


## Lesson 2: Automated Releases & Versioning

### Goal: Automate versioning and releases using GitHub Actions and Semantic Versioning.

### Step 1: Install `semantic-release`

Semantic versioning helps automate releases based on commit messages.

**Commands:**
```bash
npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/github
```

### Step 2: Create a GitHub Actions Workflow for Releases

Inside `.github/workflows/`, create a new file called `release.yml`:

**Commands:**
```bash
touch .github/workflows/release.yml
```

Add the following content to `release.yml`:

```yaml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm ci

      - name: Run Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GH_PAT }}  # Use built-in token
        run: npx semantic-release
```
        
### Step 3: Push Changes to GitHub

**Commands:**
```bash
git add .
git commit -m "Add automated release workflow"
git push origin main
```

Once this is set up, every push to the `main` branch will trigger a new release with an auto-generated changelog. 🎉

## Lesson 3: Building the Backend API

🔹 **Goal: Create a simple Node.js backend API with Express, add unit tests, and containerize it using Docker.**

### Step 1: Set Up a Node.js Application

1️⃣ Navigate to the `api/` directory and initialize a Node.js project:

```bash
cd api
npm init -y
```

2️⃣ Install **Express.js** to create a basic server:

```bash
npm install express
```

---

### Step 2: Create the API Server

- Inside the `api/` directory, create an `index.js` file:

```bash
touch index.js
```

- Open `index.js` and add the following code:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "CI/CD Deployment Success!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

### Step 3: Test the API Locally

1️⃣ Run the server:

```bash
node index.js
```

2️⃣ Open your browser and visit:  
   👉 `http://localhost:3000/`  
   You should see:

   ```json
   { "message": "CI/CD Deployment Success!" }
   ```

### Step 4: Add Unit Tests

1️⃣ Install Jest for testing:

```bash
npm install --save-dev jest supertest
```

2️⃣ Create a test file:

```bash
mkdir tests && touch tests/api.test.js
```

3️⃣ Open `tests/api.test.js` and add:

```javascript
const request = require("supertest");
const express = require("express");

const app = express();
app.get("/", (req, res) => {
    res.json({ message: "CI/CD Deployment Success!" });
});

describe("API Tests", () => {
    it("should return a success message", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("CI/CD Deployment Success!");
    });
});
```

4️⃣ Run the tests:

```bash
npx jest
```

### Step 5: Containerize the API with Docker

1️⃣ Inside the **api/** folder, create a `Dockerfile`:
Since we will deploy the API to an AWS EC2 instance via GitHub Actions, we will set up Docker but NOT run it locally yet.

```bash
touch Dockerfile
```

2️⃣ Open `Dockerfile` and add:

```dockerfile
# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files to container
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
```

3️⃣ Build and run the Docker container:

```bash
docker build -t ci-cd-api .
docker run -p 3000:3000 ci-cd-api
```

4️⃣ Open `http://localhost:3000/` to verify the API is running inside a container.

---

🚀 **Next Step:** Move to [Lesson 3: Setting Up CI/CD with GitHub Actions](#lesson-3-setting-up-cicd-with-github-actions)  

---

Let me know if you need modifications! 🔥🚀