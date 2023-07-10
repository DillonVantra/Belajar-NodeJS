const yargs = require("yargs");
const { tulisPertanyaan, simpanContact, cl } = require("./contacts");

yargs.command({
  command: "add",
  describe: "Menambahkan contact baru",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email",
      demandOption: false,
      type: "string",
    },
    noHP: {
      describe: "Nomor HP",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    simpanContact(argv.nama, argv.email, argv.noHP);
  },
});

yargs.command({
  command: "list",
  describe: "Melihat kontak yang tersedia.",
});

yargs.parse();

// const main = async () => {
//   const nama = await tulisPertanyaan("Masukkan Nama Anda: ");
//   const email = await tulisPertanyaan("Masukkan Email Anda: ");
//   const noHP = await tulisPertanyaan("Masukkan nomor HP Anda: ");

//   simpanContact(nama, email, noHP);
// };

// main();
