FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY worker.py .
EXPOSE 8081
CMD ["python", "worker.py"]