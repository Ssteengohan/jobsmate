#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, '../public');
const videoFiles = [
  'jobpost-mobile.mp4',
  'CleanShot 2025-04-04 at 18.37.34.mp4',
  'review.mp4',
  'anti-cheat.mp4'
];

console.log('🔍 Checking for video files...');

videoFiles.forEach(videoFile => {
  const videoPath = path.join(publicDir, videoFile);
  
  if (fs.existsSync(videoPath)) {
    const stats = fs.statSync(videoPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`📹 Found ${videoFile}: ${sizeInMB}MB`);
    
    // Check if ffmpeg is available
    try {
      execSync('ffmpeg -version', { stdio: 'ignore' });
      
      // Create optimized version
      const optimizedPath = path.join(publicDir, `optimized-${videoFile}`);
      
      console.log(`🔄 Optimizing ${videoFile}...`);
      
      // Use ffmpeg to compress video
      execSync(`ffmpeg -i "${videoPath}" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k "${optimizedPath}"`, {
        stdio: 'inherit'
      });
      
      // Check new size
      const newStats = fs.statSync(optimizedPath);
      const newSizeInMB = (newStats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`✅ Optimized ${videoFile}: ${newSizeInMB}MB (${((1 - newStats.size / stats.size) * 100).toFixed(1)}% reduction)`);
      
      // Replace original with optimized version
      fs.unlinkSync(videoPath);
      fs.renameSync(optimizedPath, videoPath);
      
    } catch (error) {
      console.log(`⚠️  ffmpeg not available. Please install ffmpeg to optimize videos.`);
      console.log(`   Install with: brew install ffmpeg (macOS) or apt-get install ffmpeg (Ubuntu)`);
    }
  } else {
    console.log(`❌ Video file not found: ${videoFile}`);
  }
});

console.log('\n🎯 Video optimization complete!');
console.log('💡 Consider using WebM format for even better compression.'); 