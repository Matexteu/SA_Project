const {google} = require('googleapis');
const fs = require('fs');
const GOOGLE_DRIVE_ID = "1XFhXVJtzv3MHDU1svOY5hoQVcgyr3Ovy";

async function UploadImage(image){
    if(!image) return null
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './driveAPI.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })
        const driveService = google.drive({
            version: 'v3',
            auth
        })
        const fileMetaData = {
            'name': image,
            'parents': [GOOGLE_DRIVE_ID]
        }
        let imagePath = `./src/temp/uploads/${image}`
        const media = {
            mimeType: [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif'
            ],
            body: fs.createReadStream(imagePath)
        }
        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        })
        return {url: `https://drive.google.com/uc?export=view&id=${response.data.id}`, status: response.status};
    } catch (error) {
        return error;
    }

}
module.exports = UploadImage;