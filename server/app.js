const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static('uploads'));
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const originalExtension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + originalExtension);
    },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' })
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use('/uploads' , express.static('uploads'))


app.get('/', (req, res) => {
    res.status(200).send('Welcome to my application')
})

app.post('/upload', upload.array('files'), (req, res) => {

    // console.log(req.files)
     console.log(req.body)
    // console.log('*****************************')
    // console.log('newname===>', req.files[0].filename)
    // console.log('*****************************')
    // console.log()
    const uploadedFilesPath =  req.files[0].path
    res.status(200).json({ message: 'File successfully uploaded', path: uploadedFilesPath })
})

const port = 9000

app.listen(port, () => {
    console.log('listening on port ' + port)
})
