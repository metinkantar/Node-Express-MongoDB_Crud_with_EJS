const Userdb = require('../models/user');

exports.postUser = (req, res) => {
  // validate request & gelen requesti doğrulama
  if (!req.body) {
    res.status(400).send({ message: "İnput alanı boş bırakılamaz!" });
    return;
  }
  const { name, email, gender, status } = req.body;
  // new user & yeni kullanıcı oluşturma
  const user = new Userdb({
    name,
    email,
    gender,
    status
  })

  // save user in the database & kullanıcıyı veritabanına kaydet
  user
    .save(user)
    .then(data => {
      //res.send(data)
      res.redirect('/add-user');
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Kayıt işlemi sırasında bir hata oluştu."
      });
    });

};

exports.getUser = (req, res) => {

  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: id + "'li " + "Kullanıcı bulunamadı!" })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: id + "Kullanıcı bilgileri istenirken bir hata oluştu!" })
      })

  } else {
    Userdb.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
      })
  }


};

exports.putUser = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Güncellenecek veriler boş bırakılamaz!" });
  }

  const id = req.params.id;

  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `${id} ile kullanıcı güncellenemiyor ve ya kullanıcı kaydı yok!` })
      } else {
        res.send(data)
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Hata! Kullanıcı bilgilerini güncelle" })
    })
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `${id}'li kullanıcı silinemez ve ya id yanlıştır` })
      } else {
        res.send({
          message: "Kullanıcı başarıyla silindi!"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Kullanıcı silinemedi id=" + id
      });
    });
};