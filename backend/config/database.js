const { Sequelize } = require('sequelize');

const isAiven = process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'sipakat_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '', 
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        dialectModule: require('mysql2'), // <--- INI MANTRA SAKTINYA BIAR VERCEL GAK ERROR
        logging: false,
        dialectOptions: isAiven ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {} 
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