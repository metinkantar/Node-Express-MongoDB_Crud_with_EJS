const mongoose = require('mongoose');

const dbBaglanti = async () => {
  await mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log("MongoDB Bağlantısı Başarılı...");
    }).catch((hata) => {
      console.log("Mongodb bağlantısı başarısız... Hata sebebi : ", hata);
      process.exit(1);
    });
};

module.exports = dbBaglanti;