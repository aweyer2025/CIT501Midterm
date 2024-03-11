//imports
const {Storage} = require('@google-cloud/storage');
const {BigQuery} = require('@google-cloud/bigquery')
const csv = require('csv-parser');


const bq = new BigQuery();
const datasetId = 'malwareScan';
const tableId = 'fileClass';




exports.readCSV = (file, context) => {
    const gcs = new Storage();

    const dataFile= gcs.bucket(file.bucket).file(file.name);
    dataFile.createReadStream()
    .on('error', () => {
        ///Handle an error
        console.error(error);
    })
    .pipe(csv())
    .on('data', (row) => {
        const file_data_obj = () => {
            //Create an object
            fileObject = {};
            fileObject.filename=row.filename;
            fileObject.Class=row.Class;


            writeToBq(fileObject);
        }
        
        
        
        //call that entry point function
        file_data_obj();
        
        
        // Create a helper function that writes to BQ
        // Function must be asynchronous
        async function writeToBq(obj) {
            //BQ expects an arrary of objects, but this function only receives 1
            var rows = []; //Empty array
            rows.push(obj);
        
            // Insert the array of objects into the 'demo' table
            await bq
            .dataset(datasetId)
            .table(tableId)
            .insert(rows)
            .then( () => {
                rows.forEach ( (row) => { console.log(`Inseerted: ${row}`)})
            })
            .catch( (err)=> { console.error(`ERROR: ${err}`) } )
        
        }
        
    })
    .on('end', () => {
        //Handle end of CSV
        console.log('End!');
    })


}

//HELPER FUNCTIONS

// function printDict(row){
//     for (let key in row){
//         console.log(key + ' : '+ row [key]);
//         //second one does same thing
//         // console.log(`${key} : ${row[key]}`);
//     }
// }