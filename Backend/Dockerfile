# Use an official Python runtime as a parent image
FROM python:3.10

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# First, ensure that requirements.txt is copied into the image
COPY requirements.txt .

# Then, use pip to install the requirements. There's no need for a standalone pip command before this.
RUN pip install -r requirements.txt

# After installing dependencies, copy the rest of your application
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Command to run the application. This assumes your app binds to 0.0.0.0:8000 internally.
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

