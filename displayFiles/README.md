gcloud functions deploy displayFileCount \
  --runtime=nodejs18 \
  --region=us-central1 \
  --source=. \
  --entry-point=fileCount \
  --trigger-http \
  --allow-unauthenticated