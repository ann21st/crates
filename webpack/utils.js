const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

function getEnv(dirname) {
    let envFilePath = path.join(dirname, '.env');
    const envLocalFilePath = path.join(dirname, '.env.local');
    envFilePath = fs.existsSync(envLocalFilePath) ? envLocalFilePath : envFilePath;
    return dotenv.parse(fs.readFileSync(envFilePath))
}

module.exports = {
    getEnv
};
