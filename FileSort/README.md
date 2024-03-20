
gcloud functions deploy queryFiles \
--runtime nodejs18 \
--trigger-event google.storage.object.finalize \
--entry-point query \
--trigger-resource sp24-41200-antweyer-mid-quarantine


//test
gsutil -m cp gs://iupui-cit41200-class-malpdf-pdf-source-test/* gs://sp24-41200-antweyer-mid-quarantine

//run all
gsutil -m cp gs://iupui-cit41200-class-malpdf-pdf-source/* gs://sp24-41200-antweyer-mid-quarantine



npm install @google-cloud/storage
npm install @google-cloud/bigquery
npm install csv-parser


