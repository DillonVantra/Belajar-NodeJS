const { tulisPertanyaan, simpanContact } = require("./contacs");

const main = async () => {
  const nama = await tulisPertanyaan("Masukkan Nama Anda: ");
  const email = await tulisPertanyaan("Masukkan Email Anda: ");
  const noHP = await tulisPertanyaan("Masukkan nomor HP Anda: ");

  simpanContact(nama, email, noHP);
};

main();
