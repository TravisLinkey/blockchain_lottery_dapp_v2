const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ provider: 'u0me76lo5c:j3ncTTFZ6jAd6EZRJ89_E90uAyUFJ5H0vItOR5obH0o@u0vsj32iir-u0fptav0fs-ipfs.us0-aws.kaleido.io', protocol: 'https' });
// const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export const setJSON = (obj) => {
    return new Promise((resolve, reject) => {
        ipfs.addJSON(obj, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });
}

export const getJSON = (hash) => {
    return new Promise((resolve, reject) => {
        ipfs.catJSON(hash, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        });
    });
}
