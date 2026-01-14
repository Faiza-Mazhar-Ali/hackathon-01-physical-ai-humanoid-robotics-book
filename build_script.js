const {build} = require('@docusaurus/core');
const path = require('path');

console.log('Starting build process...');
const siteDir = __dirname;
const config = path.join(siteDir, 'docusaurus.config.js');

console.log('Site directory:', siteDir);
console.log('Config file:', config);

build(siteDir, {
  config: config,
  outDir: path.join(siteDir, 'build'),
  // Add more options as needed
}).then(() => {
  console.log('Build completed successfully!');
}).catch((err) => {
  console.error('Build failed:', err);
  console.error('Error stack:', err.stack);
  process.exit(1);
});