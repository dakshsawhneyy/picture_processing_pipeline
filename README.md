# Picture Processing Pipeline

Most image processing apps today? Locked behind subscriptions or bloated services.

So I built my own. End-to-end. Real-time. Scalable.

<img width="1420" height="688" alt="diagram-export-8-1-2025-4_18_03-PM" src="https://github.com/user-attachments/assets/351619bf-1553-4388-9576-a2ddc6e7ebc3" />

## What I Built

A complete picture processing pipeline using:
- Node.js (Express) for the backend
- Redis + BullMQ for job queueing
- Sharp.js for powerful image processing
- Arena UI to monitor queue activity

Every image gets picked, queued, processed, resized, and stored. All automatically.

## Features

- Asynchronous and fault-tolerant architecture
- Built-in job status monitoring with Arena UI
- Fail-safe error handling with retry support
- Auto-generated logs and structured job data
- Clean, production-ready code

<img width="1778" height="770" alt="image (52)" src="https://github.com/user-attachments/assets/f1785064-331e-44cf-93d9-5bbd2c87d71a" />
<img width="1742" height="915" alt="image (54)" src="https://github.com/user-attachments/assets/c2af4726-25a7-40af-b968-ed84f2135d3c" />
<img width="1051" height="936" alt="image (53)" src="https://github.com/user-attachments/assets/55791c4a-76b2-4cb2-885c-1bcf9c848c2a" />


## Stack

- Node.js
- Express.js
- Redis (local or containerized)
- BullMQ
- Sharp.js
- Arena UI

## How it Works

1. Upload an image to the backend API.
2. Image data is pushed to a Redis queue (BullMQ).
3. A worker listens to the queue, processes the image using Sharp, and stores it.
4. Monitor everything from Arena UI in real time.

## Setup

1. Clone the repository
2. Run `npm install` in both `api/` and `worker/` folders
3. Start Redis server (can be via Docker)
4. Run the backend server and worker
5. Access Arena UI at `http://localhost:9000`

## Why I Built This

Image pipelines are usually abstracted, locked behind paywalls, or under-documented. I wanted full control, full visibility, and full performance.

This project helped me master Redis, BullMQ, and async architecture in real-world backend systems.

## Author

Built confidently by Daksh Sawhney — because reinventing pipelines is better than paying for one.
