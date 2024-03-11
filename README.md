gcloud functions deploy pdfReader \
--runtime nodejs18 \
--trigger-event google.storage.object.finalize \
--entry-point readCSV \
--trigger-resource sp24-41200-mid-csv

npm install @google-cloud/storage
npm install @google-cloud/bigquery
npm install csv-parser


