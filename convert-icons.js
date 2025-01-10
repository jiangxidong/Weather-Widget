const sharp = require('sharp');
const sizes = [16, 32, 48, 128];

async function convertIcons() {
    for (const size of sizes) {
        await sharp('assets/icons/icon.svg')
            .resize(size, size)
            .png()
            .toFile(`assets/icons/icon${size}.png`);
        console.log(`Created icon${size}.png`);
    }
}

convertIcons().catch(console.error); 