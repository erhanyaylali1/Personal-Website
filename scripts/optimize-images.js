#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts and compresses all images to WebP and AVIF formats
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Requires: sharp package - npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const QUALITY = {
  webp: 75,
  avif: 65,
  jpeg: 70,
};

// Image size thresholds for different devices
const SIZES = {
  thumbnail: 400,
  mobile: 800,
  tablet: 1200,
  desktop: 1920,
};

async function getImageDimensions(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    return metadata;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return null;
  }
}

async function optimizeImage(inputPath, filename) {
  try {
    const ext = path.extname(filename).toLowerCase();
    const nameWithoutExt = path.basename(filename, ext);
    const metadata = await getImageDimensions(inputPath);

    if (!metadata) return;

    const { width, height, format } = metadata;

    // Skip if too small
    if (width < 100) {
      console.log(`⊘ Skipping ${filename} (too small: ${width}x${height})`);
      return;
    }

    console.log(`\nOptimizing ${filename}...`);
    console.log(`  Original: ${width}x${height} (${format})`);

    const inputStats = await fs.stat(inputPath);
    const originalSize = inputStats.size;

    // Create WebP version
    const webpPath = path.join(ASSETS_DIR, `${nameWithoutExt}-optimized.webp`);
    let webpSize = 0;

    try {
      const webpBuffer = await sharp(inputPath)
        .resize(Math.min(width, SIZES.desktop), Math.min(height, SIZES.desktop), {
          withoutEnlargement: true,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .webp({ quality: QUALITY.webp })
        .toBuffer();

      await fs.writeFile(webpPath, webpBuffer);
      webpSize = webpBuffer.length;
      console.log(`  ✓ WebP: ${webpSize} bytes (${((webpSize / originalSize) * 100).toFixed(1)}%)`);
    } catch (err) {
      console.error(`  ✗ WebP failed: ${err.message}`);
    }

    // Create AVIF version
    const avifPath = path.join(ASSETS_DIR, `${nameWithoutExt}-optimized.avif`);
    let avifSize = 0;

    try {
      const avifBuffer = await sharp(inputPath)
        .resize(Math.min(width, SIZES.desktop), Math.min(height, SIZES.desktop), {
          withoutEnlargement: true,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .avif({ quality: QUALITY.avif })
        .toBuffer();

      await fs.writeFile(avifPath, avifBuffer);
      avifSize = avifBuffer.length;
      console.log(`  ✓ AVIF: ${avifSize} bytes (${((avifSize / originalSize) * 100).toFixed(1)}%)`);
    } catch (err) {
      console.error(`  ✗ AVIF failed: ${err.message}`);
    }

    // Create optimized JPEG/PNG (in-place compression)
    if (ext === '.jpg' || ext === '.jpeg') {
      try {
        const jpegPath = path.join(ASSETS_DIR, `${nameWithoutExt}-optimized.jpg`);
        const jpegBuffer = await sharp(inputPath)
          .resize(Math.min(width, SIZES.desktop), Math.min(height, SIZES.desktop), {
            withoutEnlargement: true,
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 },
          })
          .jpeg({ quality: QUALITY.jpeg, progressive: true })
          .toBuffer();

        await fs.writeFile(jpegPath, jpegBuffer);
        console.log(`  ✓ Optimized JPEG: ${jpegBuffer.length} bytes (${((jpegBuffer.length / originalSize) * 100).toFixed(1)}%)`);
      } catch (err) {
        console.error(`  ✗ JPEG optimization failed: ${err.message}`);
      }
    } else if (ext === '.png') {
      try {
        const pngPath = path.join(ASSETS_DIR, `${nameWithoutExt}-optimized.png`);
        const pngBuffer = await sharp(inputPath)
          .resize(Math.min(width, SIZES.desktop), Math.min(height, SIZES.desktop), {
            withoutEnlargement: true,
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 },
          })
          .png({ compressionLevel: 9 })
          .toBuffer();

        await fs.writeFile(pngPath, pngBuffer);
        console.log(`  ✓ Optimized PNG: ${pngBuffer.length} bytes (${((pngBuffer.length / originalSize) * 100).toFixed(1)}%)`);
      } catch (err) {
        console.error(`  ✗ PNG optimization failed: ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`Error optimizing ${filename}:`, err);
  }
}

async function main() {
  try {
    console.log('🖼️ Image Optimization Started...\n');
    console.log(`Scanning: ${ASSETS_DIR}\n`);

    const files = await fs.readdir(ASSETS_DIR);
    const imageFiles = files.filter((file) => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));

    if (imageFiles.length === 0) {
      console.log('No images found to optimize.');
      return;
    }

    console.log(`Found ${imageFiles.length} images to optimize.\n`);

    for (const file of imageFiles) {
      const filePath = path.join(ASSETS_DIR, file);
      await optimizeImage(filePath, file);
    }

    console.log('\n✅ Image optimization complete!');
    console.log('\nNext steps:');
    console.log('1. Update image references to use -optimized.webp/.avif formats');
    console.log('2. Use picture elements with format fallbacks');
    console.log('3. Run Lighthouse to verify performance improvements\n');
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

main();
