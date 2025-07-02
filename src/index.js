const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Route tambahan untuk root URL
app.get('/', (req, res) => {
  res.send('✅ Backend aktif dan siap digunakan!');
});

// (rute API lainnya)
app.get('/api/contact', (req, res) => {
  res.send('Gunakan metode POST untuk mengirim pesan ke /api/contact');
});

// ...rute POST, portfolios, dll...

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
