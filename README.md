# Huze

Huze is a pet-focused web application that helps users identify cat and dog breeds from images and discover information about different breeds.

The project combines a React-based web application with a machine learning-powered image identification service.

## Features

- 🐱 Cat breed identification
- 🐶 Dog breed identification
- 🔍 Image-based pet breed recognition
- 📚 Huzepedia — breed information and characteristics
- 🔐 User registration and authentication
- 👤 User profiles
- 📝 Pet-related articles and blogs
- ❤️ Save/favorite pet breeds
- 📊 Prediction confidence and model information
- 🚦 Rate limiting for image identification requests

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Mantine
- Tailwind CSS
- Axios

### Machine Learning

The breed identification feature uses a machine learning model to classify uploaded pet images.

The frontend communicates with the Huze API to process images and retrieve prediction results.

## Architecture

```text
┌─────────────────────┐
│     Huze Web        │
│ React + TypeScript  │
└──────────┬──────────┘
           │
           │ HTTP API
           ▼
┌─────────────────────┐
│      Huze API       │
│  Authentication     │
│  Breed Information  │
│  Image Prediction   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Machine Learning    │
│       Model         │
└─────────────────────┘
