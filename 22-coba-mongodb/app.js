const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// nama database dan collection
const dbName = "testing";
const db = client.db(dbName);
const collection = db.collection("mahasiswa");

async function main() {
  // Use connect method to connect to the server
  await client.connect();

  // menambahkan 1 data ke mahasiswa
  // const insertDoc = await collection.insertOne({
  //   nama: "Dono",
  //   email: "dono@gmail.com",
  // });
  // console.log(insertDoc);

  // Menambahkan lebih dari satu document
  // const insertDocs = await collection.insertMany([
  //   {
  //     nama: "Yahoo",
  //     email: "yahoo@gmail.com",
  //   },
  //   {
  //     nama: "Asip",
  //     email: "asip@gmail.com",
  //   },
  // ]);

  // menampilkan documents berdasarkan kriteria di collection mahasiswa

  // mengubah document berdasarkan id
  // await collection.updateOne(
  //   {
  //     _id: new ObjectId("64bcd3ecd92c927257e2027e"),
  //   },
  //   {
  //     $set: {
  //       email: "asipsurta@gmail.com",
  //     },
  //   }
  // );

  // Mengubah data lebih dari satu, berdasarkan kriteria
  // collection.updateOne(
  //   {
  //     nama: "Dillon",
  //   },
  //   {
  //     $set: {
  //       nama: "Dillon Saja",
  //     },
  //   }
  // );

  // menghapus satu document
  // await collection.deleteMany({
  //   nama: "Yahoo",
  // });

  console.log(await collection.find().toArray());
}

main()
  .catch(console.error)
  .finally(() => client.close());
