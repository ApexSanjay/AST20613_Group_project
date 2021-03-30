const express = require('express')
const ffmpeg = require('fluent-ffmpeg');
const multer = require('multer');
const http = require('http');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const port = 4000;

var storage = multer.diskStorage(
    {
        destination: './data/uploads/',
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }
);
var upload = multer({ storage: storage })   //destination of files
// var upload = multer({ dest: 'uploads/' })   //destination of files

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//upload single file
app.post('/upload', upload.single('movie'), function (req, res, next) {   //movie is the name of <input>
    console.log(req.file, req.body);
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    // ffmpeg('uploads/example.mp4', { timeout: 432000 }).addOptions([
    //     '-profile:v baseline',
    //     '-level 3.0',
    //     '-start_number 0',
    //     '-hls_time 10',
    //     '-hls_list_size 0',
    //     '-f hls'
    // ]).output('encoded/example.m3u8').on('end', () => {
    //     console.log('end');
    // }).run();

    console.log("Start encoding...");
    ffmpeg('data/uploads/' + req.file.filename, { timeout: 432000 }).addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls'
    ]).output('data/encoded/' + req.file.filename + '.m3u8').on('end', () => {
        console.log("End of encoding.");
    }).run();
});

app.use("/test", createProxyMiddleware({
    target: "http://localhost:8000/encoded/",
    changeOrigin: true,
    pathRewrite: {
        [`^/test`]: '',
    },
})
);

app.listen(port, () => {
    console.log("Upload server listening at http://localhost:4000")
})
//-------------------

http.createServer(function (request, response) {
    console.log(request.url + " request starting...");

    var filePath = './data/' + request.url;

    fs.readFile(filePath, function (error, content) {
        response.writeHead(200, { "Access-Control-Allow-Origin": "*" });    //permission for player
        if (error) {
            if (error.code == 'ENOENT') {
                // fs.readFile('./404.html', function (error, content) {
                //     response.end(content, 'utf-8');
                // });
            }
            else {
                response.writeHead(500);
                response.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
                response.end();
            }
        }
        else {
            response.end(content, 'utf-8');
        }
    });

}).listen(8000);
console.log("Upload server listening at http://localhost:8000");