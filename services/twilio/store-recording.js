const resolve = require('path').resolve;
const { createGoogleCloudWriteStream } = require('../transcribe/google-speaker-diarization');

const storeRecording = ({recording, meetingId}) => {
    // const relativePath = `./Recordings/${meetingId}.wav`;
    // const relativePath = `recordings/${meetingId}.wav`;
    // const path = resolve(relativePath);
    // console.log(path);
    const stream = recording.pipe(createGoogleCloudWriteStream(meetingId));
    return new Promise((resolve, reject) => {
        stream
            .on('finish', () => {
                resolve();
            })
            .on('error', (err) => {
                console.log(err);
                reject();
            });
    });
};

module.exports = storeRecording;