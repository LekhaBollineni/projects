# SQLAlchemy Demonstration

This repository contains a simple FastAPI application that demonstrates basic functionality
and serves as a starting point for integrating SQLAlchemy (though the current version focuses
on random number generation).

## Overview

The application exposes a single endpoint (`/generate`) which returns a set of numbers similar
to a lottery drawing. The first five numbers are randomly sampled from 1 to 69, and a final number
is chosen from 1 to 26. This resembles the structure of games like Powerball or Mega Millions.

Although the title references SQLAlchemy, the current codebase is focused on the FastAPI
backend and a simple CORS configuration, and there is no database interaction yet. SQLAlchemy
can be integrated later to store generated numbers or support additional features.

## Files

* `main.py` - FastAPI application with a single GET endpoint to generate numbers.
* `basics.py` - (currently a placeholder) can be used for SQLAlchemy examples and database
  models in future iterations.
* `requirements.txt` - Python dependencies for the project.
* `index.html`, `script.js`, `style.css` - Example frontend files that could consume the API.

## Running the Project

1. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```
2. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
3. Visit `http://localhost:8000/generate` to see the JSON response with generated numbers.

## Next Steps

* Add SQLAlchemy models and database connection for persisting generated numbers.
* Expand the API with additional endpoints for querying stored results.
* Enhance the frontend to display numbers and interact with the backend.

Feel free to explore and extend the project as needed!