// /pages/api/upload.js
import multer from 'multer';
import { ref, uploadBytes } from 'firebase/storage'; // Import Firebase Storage functions
import { storage } from 'lib/firebase'; // Import Firebase Storage instance
import { v4 as uuidv4 } from 'uuid'; // Import UUID untuk membuat nama file unik

// Setup multer untuk menangani unggahan file
const upload = multer({
  storage: multer.memoryStorage(), // Menyimpan file sementara di memori
});

const uploadMiddleware = upload.single('file');

// Jalankan middleware multer di Next.js API Routes
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Jalankan middleware untuk menangani unggahan file
      await runMiddleware(req, res, uploadMiddleware);

      // Akses file yang diunggah
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
      }

      // Generate nama file yang unik dengan UUID
      const uniqueFileName = `${uuidv4()}_${file.originalname}`;

      // Buat referensi di Firebase Storage dengan nama file yang unik
      const storageRef = ref(storage, `uploads/${uniqueFileName}`);

      // Unggah file ke Firebase Storage
      await uploadBytes(storageRef, file.buffer);

      console.log('File berhasil diunggah ke Firebase dengan nama:', uniqueFileName);

      return res.status(200).json({ message: 'File berhasil diunggah dan disimpan!', fileName: uniqueFileName });
    } catch (error) {
      console.error('Error selama upload:', error);
      return res.status(500).json({ error: 'Terjadi kesalahan selama upload' });
    }
  } else {
    // Jika metode yang digunakan selain POST
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Metode ${req.method} tidak diizinkan` });
  }
}

export const config = {
  api: {
    bodyParser: false, // Nonaktifkan body parser agar multer bisa bekerja
  },
};
