const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
var randomize = require('randomatic')
const delay = require('delay')
var md5 = require('md5');
 
const functionSendOtp = (nomor, reff, auth, hash) => new Promise((resolve, reject) => {
    const bodys = {
        mobile_number: `+1${nomor}`,
        referral_code: reff,
        otp_hash: hash
        }
   
      fetch('https://xcelpay.io/api/share-earn/register', {
          method: 'POST',
          body: JSON.stringify(bodys),
          headers: {
            'authorization': auth,
            'Content-Type': 'application/json',
            'Content-Length': 83,
            'Host': 'xcelpay.io',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
           // 'Cookie': 'id=s%3Ac7ecBrYy4Te9B75_1RZOeRN5NkhXlReT.1sZ%2BsFihwF4qBEY%2F%2BWxSrDhJdaKqZpKA0tHjIIuSP5A',
            'User-Agent': 'okhttp/3.12.1'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });
 
const functionVerifOtp = (otp, nomor, auth) => new Promise((resolve, reject) => {
    const bodys = {
        mobile_number: `+1${nomor}`,
        otp_code: otp
        }
   
      fetch('https://xcelpay.io/api/share-earn/verify-otp', {
          method: 'POST',
          body: JSON.stringify(bodys),
          headers: {
            'authorization': auth,
            'Content-Type': 'application/json',
            'Content-Length': 51,
            'Host': 'xcelpay.io',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            //'Cookie': 'id=s%3Ac7ecBrYy4Te9B75_1RZOeRN5NkhXlReT.1sZ%2BsFihwF4qBEY%2F%2BWxSrDhJdaKqZpKA0tHjIIuSP5A',
            'User-Agent': 'okhttp/3.12.1'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });
 
(async () => {
    const reff = readlineSync.question('[?] Reff code: ')
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    for (var i = 0; i < jumlah; i++){
    try {
        const hash = randomize('Aa0',12)
        const nomor = randomize('0', 10)
        const auth = md5(nomor)
       const regist = await functionSendOtp(nomor, reff, auth, hash)
       const otp = regist.otp
       console.log(`[${i+1}] OTP ${otp}`)
       const verif = await functionVerifOtp(otp, nomor, auth)
       console.log(`[${i+1}] ${verif.message}\n`)
       await delay(2000)
    } catch (e) {
        console.log(e)
    }
}
})()
