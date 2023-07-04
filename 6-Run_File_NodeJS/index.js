// const fs = require("fs"); // core module, karna tak ada './'
// const moment = require("moment"); // third party module / node module / npm module

const coba = require("./coba.js"); // ini namanya import local module karna ada './'

console.log(coba);
console.log(
  coba.cetakNama("Jojo"),
  coba.pi,
  coba.mahasiswa.cetakMhs(),
  new coba.Orang()
);
