const path = require('path');
const fs = require('fs');

// Check if the config file exists
const configPath = path.join(__dirname, 'docusaurus.config.js');
console.log('Checking config file at:', configPath);
console.log('Config file exists:', fs.existsSync(configPath));

// Read the config file to check for syntax errors
try {
  const configContent = fs.readFileSync(configPath, 'utf8');
  console.log('Config file size:', configContent.length, 'characters');
  
  // Try to evaluate the config to check for syntax errors
  const configModule = new Function('require', 'module', configContent + '\nmodule.exports = config;');
  const tempModule = { exports: {} };
  configModule(require, tempModule);
  console.log('Config file syntax is valid');
} catch (error) {
  console.error('Config file has syntax errors:', error.message);
  process.exit(1);
}

// Try to import Docusaurus directly
try {
  const docusaurus = require('@docusaurus/core');
  console.log('Successfully imported @docusaurus/core');
  
  // Run the build command programmatically
  const build = docusaurus.build;
  const siteDir = __dirname;
  const config = path.join(siteDir, 'docusaurus.config.js');
  
  console.log('Starting build process...');
  build(siteDir, {
    config: config,
    outDir: path.join(siteDir, 'build'),
  })
  .then(() => {
    console.log('Build completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Build failed:', err);
    console.error('Error stack:', err.stack);
    process.exit(1);
  });
} catch (error) {
  console.error('Failed to import @docusaurus/core:', error.message);
  console.error('Error stack:', error.stack);
  process.exit(1);
}