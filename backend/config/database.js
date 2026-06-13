const { Sequelize } = require('sequelize');

// Mengecek apakah host yang dipakai adalah Aiven Cloud
const isAiven = process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud');

// Menggunakan process.env agar dinamis (bisa Vercel, bisa Laragon)
const sequelize = new Sequelize(
    process.env.DB_NAME || 'sipakat_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '', 
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        // Konfigurasi krusial: SSL Wajib menyala untuk Aiven
        dialectOptions: isAiven ? {
            ssl: {
                require: true,
                rejectUnauthorized: false // Melewati validasi sertifikat CA manual
            }
        } : {} // Kalau pakai Laragon, biarkan kosong tanpa SSL
    }
);

// Tes Koneksi
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Mantap! Sequelize berhasil nyambung ke Database 🚀');
    } catch (error) {
        console.error('Waduh Bro, gagal konek:', error);
    }
};

testConnection();

module.exports = sequelize;