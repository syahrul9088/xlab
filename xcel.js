const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
var randomize = require('randomatic')

const functionSendOtp = (nomor, reff) => new Promise((resolve, reject) => {
    const bodys = {
        mobile_number: `+1${nomor}`,
        referral_code: reff,
        otp_hash: "dEMyihk3f7z"
        }
    
      fetch('https://xcelpay.io/api/share-earn/register', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            'authorization': '678996c79ac76dd06e73c82f1LAZLKVUX3WeCb3a',
            'Content-Type': 'application/json',
            'Content-Length': 83,
            'Host': 'xcelpay.io',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'Cookie': 'id=s%3Ac7ecBrYy4Te9B75_1RZOeRN5NkhXlReT.1sZ%2BsFihwF4qBEY%2F%2BWxSrDhJdaKqZpKA0tHjIIuSP5A',
            'User-Agent': 'okhttp/3.12.1'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionVerifOtp = (otp, nomor) => new Promise((resolve, reject) => {
    const bodys = {
        mobile_number: `+1${nomor}`,
        otp_code: otp
        }
    
      fetch('https://xcelpay.io/api/share-earn/verify-otp', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            'authorization': '678996c79ac76dd06e73c82f1LAZLKVUX3WeCb3a',
            'Content-Type': 'application/json',
            'Content-Length': 51,
            'Host': 'xcelpay.io',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'Cookie': 'id=s%3Ac7ecBrYy4Te9B75_1RZOeRN5NkhXlReT.1sZ%2BsFihwF4qBEY%2F%2BWxSrDhJdaKqZpKA0tHjIIuSP5A',
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
        const nomor = randomize('0', 10)
       const regist = await functionSendOtp(nomor, reff)
       const otp = regist.otp
       console.log(`[+] OTP ${otp}`)
       const verif = await functionVerifOtp(otp, nomor)
       console.log(`[+] ${verif.message}\n`)
    } catch (e) {
        console.log(e)
    }
}
})()