import sharp from "sharp";
import fs from "node:fs/promises";

await fs.mkdir("public", { recursive: true });

const pngSizes = [16, 32, 48, 64, 192, 256, 384, 512, 180];
for (const size of pngSizes) {
  const out = size === 180 ? "apple-touch-icon.png" : `icon-${size}x${size}.png`;
  await sharp("public/logo.svg").resize(size, size).png().toFile(`public/${out}`);
}

const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(
  icoSizes.map((s) => sharp("public/logo.svg").resize(s, s).png().toBuffer())
);
await sharp({
  create: { width: 1, height: 1, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .png()
  .toBuffer()
  .then(async () => {
    const toIco = (await import("png-to-ico")).default;
    const ico = await toIco(icoBuffers);
    await fs.writeFile("public/favicon.ico", ico);
  });

console.log("✅ Icons generated into /public");
