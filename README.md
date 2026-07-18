# Customer Segmentation App

This is an end-to-end Machine Learning project featuring a modern React/Tailwind frontend and a Python Flask backend.

## Deployment Instructions

### Frontend (Vercel)
The `frontend` directory contains a Vite + React application. It includes a `vercel.json` file. You can simply connect the `frontend` folder to Vercel to deploy it seamlessly.

### Backend (Hugging Face Spaces)
The `backend` directory contains the Flask application and trained model files. Since Hugging Face Spaces supports Docker, we have included a `Dockerfile` and `requirements.txt`.
**Note:** If the backend API isn't running from the Vercel link, it means the Hugging Face Space might be paused or down. You can deploy this backend on your own:
1. Create a new Docker Space on Hugging Face.
2. Upload the contents of the `backend` folder.
3. The Space will automatically build and run the Flask API.

Remember to update the API fetch URL in the frontend (`App.tsx`) to point to your newly deployed backend!
