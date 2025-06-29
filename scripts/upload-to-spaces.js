#!/usr/bin/env node

// Load environment variables from .env file
require('dotenv').config();

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// DigitalOcean Spaces configuration
const spacesEndpoint = process.env.SPACES_ENDPOINT || 'https://nyc3.digitaloceanspaces.com';
const spacesBucket = process.env.SPACES_BUCKET || 'your-bucket-name';
const spacesKey = process.env.SPACES_KEY;
const spacesSecret = process.env.SPACES_SECRET;

if (!spacesKey || !spacesSecret) {
  console.error('❌ Missing DigitalOcean Spaces credentials!');
  console.error('Please set the following environment variables:');
  console.error('  SPACES_ENDPOINT (e.g., https://nyc3.digitaloceanspaces.com)');
  console.error('  SPACES_BUCKET (your bucket name)');
  console.error('  SPACES_KEY (your access key)');
  console.error('  SPACES_SECRET (your secret key)');
  process.exit(1);
}

// Configure AWS SDK for DigitalOcean Spaces
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: spacesKey,
  secretAccessKey: spacesSecret,
  s3ForcePathStyle: false,
  region: 'us-east-1', // DigitalOcean Spaces uses us-east-1
});

const publicDir = path.join(__dirname, '../public');
const videoFiles = [
  'jobpost-mobile.mp4',
  'CleanShot 2025-04-04 at 18.37.34.mp4',
  'review.mp4',
  'anti-cheat.mp4'
];

async function uploadVideo(fileName) {
  const filePath = path.join(publicDir, fileName);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${fileName}`);
    return;
  }

  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`📤 Uploading ${fileName} (${sizeInMB}MB)...`);

  try {
    // Clean filename for URL (replace spaces with hyphens)
    const cleanFileName = fileName.replace(/\s+/g, '-');
    const key = `videos/${cleanFileName}`;

    const uploadParams = {
      Bucket: spacesBucket,
      Key: key,
      Body: fs.createReadStream(filePath),
      ACL: 'public-read',
      ContentType: 'video/mp4',
      CacheControl: 'public, max-age=31536000', // Cache for 1 year
    };

    const result = await s3.upload(uploadParams).promise();
    
    console.log(`✅ Uploaded: ${fileName}`);
    console.log(`   URL: ${result.Location}`);
    console.log(`   Key: ${key}`);
    console.log('');

    return result.Location;
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting video upload to DigitalOcean Spaces...\n');
  
  const results = [];
  
  for (const videoFile of videoFiles) {
    const url = await uploadVideo(videoFile);
    if (url) {
      results.push({ file: videoFile, url });
    }
  }

  console.log('📋 Upload Summary:');
  console.log('==================');
  
  if (results.length > 0) {
    results.forEach(({ file, url }) => {
      console.log(`${file}: ${url}`);
    });
    
    console.log('\n🎯 Next steps:');
    console.log('1. Update your .env.local file with the Spaces configuration');
    console.log('2. Remove video files from the public folder');
    console.log('3. Test the application to ensure videos load correctly');
  } else {
    console.log('❌ No videos were uploaded successfully');
  }
}

main().catch(console.error); 