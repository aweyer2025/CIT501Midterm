const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const benignBucket = 'sp24-41200-antweyer-mid-benign';
const maliciousBucket = 'sp24-41200-antweyer-mid-malicious';

exports.fileCount = async (req, res) => {
    try {
        const [benignNum, maliciousNum] = await Promise.all([
            countFiles(benignBucket),
            countFiles(maliciousBucket)
        ]);
        res.status(200).send(`There are ${benignNum} benign files and ${maliciousNum} malicious files`);
    } catch(error) {
        console.error(`Error counting files: ${error}`);
        res.status(500).send('Error counting files');
    }

    async function countFiles(bucketName) {
        try {
            const bucket = storage.bucket(bucketName);
            const [files] = await bucket.getFiles();
            return files.length;
        } catch(error) {
            console.error(`Error counting files: ${error}`);
            throw error;
        }
    }
    
        

};

