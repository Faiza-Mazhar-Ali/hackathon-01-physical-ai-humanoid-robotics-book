console.log('Testing basic Node.js functionality...');
const fs = require('fs');
const path = require('path');

// Check if required directories exist
const dirs = ['docs', 'src', 'static'];
dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✓ Directory '${dir}' exists`);
  } else {
    console.log(`✗ Directory '${dir}' does not exist`);
  }
});

// Check if config file exists
if (fs.existsSync('docusaurus.config.js')) {
  console.log('✓ Docusaurus config file exists');
} else {
  console.log('✗ Docusaurus config file does not exist');
}

// Check if package.json exists
if (fs.existsSync('package.json')) {
  console.log('✓ Package.json exists');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✓ Package name: ${pkg.name}`);
  console.log(`✓ Docusaurus version: ${pkg.dependencies['@docusaurus/core'] || 'not found'}`);
} else {
  console.log('✗ Package.json does not exist');
}

console.log('Basic check completed.');