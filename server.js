var express = require("express");
var app = express();
const PORT = 3000;
var path = require("path");
const mongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const opers = require("./modules/Operations.js");
console.log(opers);


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("static"));

app.post("/", function (req, res) {
  
});


app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});



mongoClient.connect("mongodb://localhost/bazunia", function (err, db) {
  if (err) console.log(err);
  else console.log("mongo podłączone!");
  _db = db;
  const coll = db.collection("uzytkownicy");

  db.createCollection("uzytkownicy", function (err, coll) {
    console.log("kolekcja powstała, sprawdź efekt w konsoli klienta mongo")
  })
  app.post("/addUser", function (req, res) {
    console.log(req.body)
    opers.InsertToDatabase(coll, req.body)
  });

  app.post("/deleteUser", function (req, res) {
    console.log(req.body)
    //req.body to moje id przekazane
    opers.DeleteById(ObjectID, coll, req.body.x)
  });

  app.post("/updatePassword", function (req, res) {
    console.log(req.body)

    coll.updateOne({_id: ObjectID(req.body.x)}, {$set:{passwd: req.body.passwd}})
    //req.body to moje id przekazane
    
  });

  app.post("/getIDs", function (req, res) {
    opers.SelectAndLimit (coll,function (data) {  
      let lol = data.map((xd)=>{
        return xd._id
      })  
      console.log(lol)  
      res.send(lol)
    })

    //usuwanie wszystkiego
    //opers.DeleteById(null, coll, null)
  
  });

  app.post("/getAllData", function (req, res) {
    opers.SelectAndLimit (coll,function (data) {  
      console.log(data)  
      res.send(data)
    })

    //usuwanie wszystkiego
    //opers.DeleteById(null, coll, null)
  
  });
});
