//imports
const { Storage } = require('@google-cloud/storage');
const { BigQuery } = require('@google-cloud/bigquery');
const csv = require('csv-parser');

const bq = new BigQuery();
const storage = new Storage();

const datasetId = 'midterm';
const tableId = 'allFiles';

exports.readCSV = async (file, context) => {
    const dataFile = storage.bucket(file.bucket).file(file.name);

    dataFile.createReadStream()
        .on('error', (error) => {
            console.error(`Error reading file: ${error}`);
        })
        .pipe(csv())
        .on('data', async (row) => {
            try {
                await writeToBq(row);
            } catch (error) {
                console.error(`Error inserting row: ${error}`);
            }
        })
        .on('end', () => {
            console.log('End of CSV');
        });
};

async function writeToBq(row) {
    const obj = {
        filename: row.filename,
        Class: row.Class
    };

    try {
        await bq
            .dataset(datasetId)
            .table(tableId)
            .insert(obj);

        console.log(`Inserted: ${JSON.stringify(obj)}`);
    } catch (error) {
        console.error(`Error inserting row: ${error}`);
        throw error;
    }
}