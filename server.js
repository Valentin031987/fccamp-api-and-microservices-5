var express = require('express');
var cors = require('cors');
var multer = require('multer');
var path = require('path')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let filename = file.fieldname + '-' + Date.now()
    let extension  = path.extname(file.originalname)
    cb(null, filename + extension)
  }
})
 
var upload = multer({ storage: storage })
const uploadFile = upload.single('upfile')
app.post('/api/fileanalyse', uploadFile , (req, res) => {

  console.log(req.file)
res.json({
  name: req.file.originalname,
  type: req.file.mimetype,
  size: req.file.size
})
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

