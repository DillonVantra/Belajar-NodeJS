const { dir } = require("console");
const cl = (cl) => console.log(cl);
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contact.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();

  // Cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    cl(chalk.red.inverse.bold("Kontak sudah terdaftar, gunakan nama lain!"));
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      cl(chalk.red.inverse.bold("Email tidak valid!"));
    }
  }

  // cek nomor HP
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    cl(chalk.red.inverse.bold("Nomor HP tidak valid!"));
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  cl(chalk.green.inverse("Terima kasih sudah mengisi data."));
};

const listContact = () => {
  const contacts = loadContact();

  cl(chalk.cyan.inverse.bold("Daftar Kontak :"));
  contacts.forEach((contact, i) => {
    cl(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

module.exports = { simpanContact, cl, listContact };
