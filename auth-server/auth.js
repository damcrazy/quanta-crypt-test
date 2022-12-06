const User = require("./users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');



router.get("/getkey", async (req, res) => {
  User.findOne({id:req.query.id,password:req.query.password }).then((user) => {
    if (user) {
    res.send(user.uid);
    }else{
      res.send({error:"User not found"});
    }
  }
  ).catch((err) => {
    console.log(err);
  });
});

router.get('/payment', async (req, res) => {
  console.log(req.query.id);
  User.findById(req.query.id).then((user) => {
    if (user){
    if (user.payment == 0) {
      res.json({ payment: false });
    }
    else {
      res.json({ payment: true });
    }}else{
      res.status(404).send("User not found");
    }
  }).catch((err) => {
    console.log(err);
  }); 
});



//REGISTER
router.post("/register", async (req, res) => {
  console.log("register");
  User.findOne({email: req.body.email}).then((user) => {
    if (user) {
      res.status(400).json({message: "User already exists!"});
    } else if(req.body.password !== req.body.confirmPassword) {
      res.status(400).json({message: "Passwords do not match!"});
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        payment: 0,
        uid: uuidv4(),
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            res.status(200).json({loggedUser :user._id,username : user.username, email: user.email});
          });
        });
      });
    }
  });
});


//LOGIN
router.post("/login", async (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            res.status(400).json({ message: "Wrong username or password" });
        } else {
            bcrypt.compare(req.body.password, user.password).then((match) => {
                if (!match) {
                    res.status(400).json({ message: "Wrong username or password" });
                } else {
                    res.status(200).json({loggedUser :user._id,username : user.username, email: user.email});
                }
            }).catch((err) => {
                res.status(500).json({ message: err.message });
            });
        }
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
});

module.exports = router;
