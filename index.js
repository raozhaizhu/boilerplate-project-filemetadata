var express = require('express');
var cors = require('cors');
var multer = require('multer'); // 引入 multer
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// 配置 multer 存储选项
var storage = multer.memoryStorage(); // 将文件存储在内存中，适用于小文件
var upload = multer({ storage: storage });

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// 从/api/fileanalyse收到POST请求，并返回file name, type, and size in bytes.
// 使用 multer 处理上传的文件
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname: name, mimetype: type, size } = req.file;

    // 返回文件的名称、类型和大小
    res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port);
});

