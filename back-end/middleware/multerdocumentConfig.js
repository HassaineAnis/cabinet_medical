const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf' // Ajout du type MIME pour les fichiers PDF
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'document'); // Remplacez 'photo' par le répertoire de destination souhaité
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).fields([
  { name: 'fichierExterne' },
  { name: 'documentMedical' }
]);