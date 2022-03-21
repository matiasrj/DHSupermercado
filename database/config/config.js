const path = require('path');

require('dotenv').config({
    path: path.join(__dirname ,`../../.env`)
});
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "define": {
            "timestamps": false,
            "underscored": false,
            "freezeTableName": true,
            "logging": false
        }
    },
    "prod": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": 'postgres',
        "define": {
            "timestamps": false,
            "underscored": false,
            "freezeTableName": true,
            "logging": false
        }
    },
    "test": {
        "database": "database_test",
        "dialect": "sqlite"
    },

}