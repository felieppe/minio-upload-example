const Minio = require('minio')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

if (!process.env.MINIO_ACCESS_KEY || !process.env.MINIO_SECRET_KEY) {
    console.error('Please set MINIO_ACCESS_KEY and MINIO_SECRET_KEY'); process.exit(1) 
}

const client = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: process.env.MINIO_PORT || 9000,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
})

function main() {
    try {
        if (process.argv.length < 4) { return console.log('Usage: node app.js <bucket_name> <file>'); process.exit(1) }

        const bucketName = process.argv[2]
        const filePath = process.argv[3]
        const objectName = path.basename(filePath);

        if (!fs.existsSync(filePath)) { return console.log('File not found: ' + filePath) }

        client.bucketExists(bucketName, function(err, exists) {
            if (err) { return console.log(err) }
            
            if (exists) {
                client.fPutObject(bucketName, objectName, filePath, function(err, etag) {
                    if (err) { return console.log(err) }
                    console.log(`File uploaded to https://${process.env.MINIO_ENDPOINT}/${bucketName}/${objectName}!`)
                })
            }
        })
    } catch (err) { console.log("An error occurred: ", err) }
}

main()