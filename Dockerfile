# Use an official Python runtime as a parent image
FROM python:3.10-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /user/app

# Install dependencies
COPY ./ ./
RUN pip install -r requirements.txt

# Set the default command to run when the container starts
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]