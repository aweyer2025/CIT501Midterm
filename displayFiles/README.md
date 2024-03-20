Counts the number of files in each bucket and displays on a http page.






gcloud functions deploy displayFileCount \
  --runtime=nodejs18 \
  --region=us-central1 \
  --source=. \
  --entry-point=fileCount \
  --trigger-http \
  --allow-unauthenticated