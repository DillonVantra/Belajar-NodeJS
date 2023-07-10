const yargs = require("yargs");
const {
  tulisPertanyaan,
  simpanContact,
  cl,
  listContact,
} = require("./contacts");

yargs
  .command({
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
  })
  .demandCommand();

// Menampilkan daftar nama & no hp kontak

yargs.command({
  command: "list",
  describe: "Menampilkan kontak yang tersedia",
  handler() {
    listContact();
  },
});

yargs.parse();
