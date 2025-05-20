import * as jose from 'jose'
let rsaPublicKey = {};
const algorithm = 'RS256';

async function getPublicCert() {

    if (Object.keys(rsaPublicKey).length == 0) {
        const response = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
        const publicKeys = await response.json();
        //TODO Add cache expiry 
        console.log('Cert expires on', response.headers);

        for (const [key, value] of Object.entries(publicKeys)) {
            rsaPublicKey[key] = await jose.importX509(publicKeys[key], algorithm);
        }
    }
}