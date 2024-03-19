const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');

const bq = new BigQuery();
const storage = new Storage();

exports.query = async (file, context) => {
    const gcsFile = file;
    const sourceBucket = storage.bucket(gcsFile.bucket)
    const maliciousBucket = storage.bucket('sp24-41200-antweyer-mid-malicious');
    const benignBucket = storage.bucket('sp24-41200-antweyer-mid-benign');
    try {
        // Fetch malicious and benign file names from BigQuery
        const query = `SELECT Class FROM \`sp24-41200-antweyer-midterm.midterm.pdf\` WHERE filename = '${gcsFile.name}';`;
        const [rows] = await bq.query(query);

        if (rows.length > 0) {
            const fileClass = rows[0].Class;
            console.log(`File: ${gcsFile.name}, Class: ${fileClass}`);
            
            if (fileClass === 'Benign'){
                await copyFile(gcsFile.bucket, gcsFile.name, benignBucket.name, gcsFile.name)
                console.log("File is benign")
            }
            if (fileClass === 'Malicious'){
                await copyFile(gcsFile.bucket, gcsFile.name, benignBucket.name, gcsFile.name)
                console.log("File is Malicious")
            }

        } else {
            console.log(`File: ${gcsFile.name} not found in the database.`);
        }

    } catch (error) {
        console.error(`Error executing queries: ${error}`);
    }

    async function copyFile(sourceBucketName, sourceFileName, destinationBucketName, destinationFileName){
        try{
            const sourceBucket = storage.bucket(sourceBucketName);
            const destinationBucket = storage.bucket(destinationBucketName);

            const sourceFile = sourceBucket.file(sourceFileName);
            const destinationFile = destinationBucket.file(destinationFileName);

            await sourceFile.copy(destinationFile);

            console.log(`File ${sourceFileName} copied to ${destinationFileName}`);
        } catch (error) {
            console.error(`Error copying file: ${error}`)
        }
    }

   

    
};
