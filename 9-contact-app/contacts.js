const { dir } = require("console");
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// global function
const cl = (cl) => console.log(cl);
const warning = (e) => chalk.red.inverse.bold(e);
const info = (e) => chalk.cyan.inverse.bold(e);
const success = (e) => chalk.green.inverse(e);

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
    cl(warning("Kontak sudah terdaftar, gunakan nama lain!"));
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      cl(warning("Email tidak valid!"));
    }
  }

  // cek nomor HP
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    cl(warning("Nomor HP tidak valid!"));
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  cl(chalk.green.inverse("Terima kasih sudah mengisi data."));
};

const listContact = () => {
  const contacts = loadContact();

  cl(info("Daftar Kontak :"));
  contacts.forEach((contact, i) => {
    cl(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() == nama.toLowerCase()
  );

  if (!contact) {
    cl(warning(`${nama} tidak ditemukan!`));
    return false;
  }

  cl(info(contact.nama));
  cl(contact.noHP);
  if (contact.email) {
    cl(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  const newContacts = contacts.filter((contact) => {
    return contact.nama.toLowerCase() !== nama.toLowerCase();
  });

  if (contacts.length === newContacts.length) {
    cl(warning(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  cl(success(`Data kontak ${nama} berhasil dihapus!`));
};

module.exports = {
  simpanContact,
  cl,
  listContact,
  detailContact,
  deleteContact,
};
