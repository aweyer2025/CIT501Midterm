This function is not needed since CSV was uploaded to BQ by using BQ's upload tool when creating table.




//file function

gcloud functions deploy fileSort \
--runtime nodejs18 \
--trigger-event google.storage.object.finalize \
--entry-point readCSV \
--trigger-resource sp24-41200-antweyer-mid-csv








npm install @google-cloud/storage
npm install @google-cloud/bigquery
npm install csv-parser


