# **EcoBridge: Sustainable Resource Redistribution**

This repository is a collection of 3 other repositories that make up EcoBridge

- EcoBridge-Frontend: Website written with reactjs
- EcoBridge-Backend: Backend API Written in Python
- EcoBridge-Blockchain-Node: Our own Blockchain node from scratch written in python

More information for these repositories are on their own respective README files

Scroll below to see how to run the repo

# What is Eco Bridge

**EcoBridge** is a Platform that connects individuals and organizations to donate, request, and redistribute excess food, clothing, and other supplies. Using AI, blockchain, and gamification, EcoBridge promotes sustainability and community engagement.

# Features

### 🔒 Blockchain-Powered Transparency

All donations are securely tracked and recorded on our blockchain system—ensuring transparency, traceability, and peace of mind. Every transaction is tamper-proof, so you can be confident your donation is going to the right hands.

### 📊 Donation History & Impact Tracking

After donating, users can view a detailed history of how their contribution is being used by organizations—creating long-term trust and accountability.

### 📦 Public Inventory System

Organizations maintain an open inventory to show what they currently need and what they have in abundance. This helps avoid oversupply and guides smarter giving.

### 📣 Public Request System

Organizations can post specific needs, making it easier for donors to provide timely and targeted support.

### 🗺️ Map View of Organizations

An interactive map gives users a clear view of all participating organizations, helping them choose who to support based on location or cause.

### 📈 Recent Donations Feed

See real-time donation activity across the platform. Highlighting generosity encourages others to join in and builds a sense of momentum.

### 💬 Community Tab

A space for users and organizations to share stories, express gratitude, and showcase the impact of donations. It’s where inspiration meets community action.

### 🎁 Donation Management & Updates
Create, track, and manage your donations easily. Get notified with updates to see exactly where your donations are going and how they’re making a difference.

# How to run this repo

Running all of this components in your machine is technically possible and we totall want you guys to try it, but it will be a little challenging and it requires a lot of setup. If you still wish to proceed here are the steps:

### Running the Frontend

requirements: nodejs

1. run these commands

```bash
cd EcoBridge-Frontend
npm install
npm run dev
```

### Running the Backend

requiremets: python, ODBC SQL Server Driver 17

When running the backend we need to set the firewall rule of our azure sql server so it can query the database on your machine. Please email us at emiljohnllanes772@gmail.com with subject "Firewall Rule Request". After this you just have to follow these following steps

1. Run these commands

```bash
pip install -r requirements.txt
fastapi run main.py --reload
```

After this it should be up and running

### Running the Blockchain Node

requirements: python

The blockchain node spawns two terminals that communicates to eachother simulating a blockchain network peer to peer connection. For more information go to EcoBridge-Blockchain-Node/Readme.md

1. Run these commands in powershell

```bash
cd EcoBridge-Blockchain-Node
pip install -r requirements.txt
./run-instance.ps1
```

Blockchain node is for windows only
