// Test script to check if Docusaurus is properly installed
try {
  const docusaurus = require('@docusaurus/core');
  console.log('Docusaurus core module loaded successfully');
  console.log('Docusaurus version:', require('@docusaurus/core/package.json').version);
} catch (error) {
  console.error('Failed to load Docusaurus core module:', error.message);
}

try {
  const fs = require('fs');
  const path = require('path');
  
  // Check if config file exists
  const configPath = path.join(__dirname, 'docusaurus.config.js');
  if (fs.existsSync(configPath)) {
    console.log('Config file exists');
  } else {
    console.log('Config file does not exist');
  }
} catch (error) {
  console.error('Error checking config file:', error.message);
}