import sharp from "sharp";

const sizes = [16, 32, 48, 64, 192, 256, 384, 512];
for (const size of sizes) {
  await sharp("public/logo.svg").resize(size, size).toFile(`public/icon-${size}x${size}.png`);
}
