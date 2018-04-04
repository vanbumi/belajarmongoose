var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://root:abc123@ds047305.mlab.com:47305/mongoosecobafsd', function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Sudah Konek ke Database")
  }
});

var UserSchema = new mongoose.Schema({
  name: String,
  age : Number
});

UserSchema.methods.addLastName = function(lastName){
  this.name = this.name + ' ' + lastName;
  return this.name;
}


// membuat model
var User = mongoose.model('User', UserSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// halaman index or root
// app.get('/', function(req, res, next){
//   res.json('Selamat Datang di Halaman Beranda!')
// });

// app.get('/', function(req, res, next){
//   User.find({}, function(err, foundUser){
//     if (foundUser){
//       res.json(foundUser);
//     } else {
//       res.json("User tidak ada")
//     }
//   });
// });

// app.get('/:id', function(req, res, next){
//   User.findOne({ _id: req.params.id }, function(err, foundUser){
//     if (foundUser){
//       res.json(foundUser);
//     } else {
//       res.json("User tidak ada")
//     }
//   });
// });

app.get('/:id', function(req, res, next){
  User.findById({ _id: req.params.id }, function(err, foundUser){
    foundUser.addLastName("Bumi");
    foundUser.save(function(err){
      res.json(foundUser)
    })
  });
});

// Menambahkan new User
app.post('/create-user', function(req, res, next){
  var user = new User();
  user.name = req.body.name;
  user.age = req.body.age;
  user.save(function(err){
    if (err) console.log (err)
    res.json(user);
  });
});

// app.get('/:name', function(req, res, next){
//   res.json(req.params.name)
// });

app.listen(3000, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Server berjalan pada port 3000")
  }
});