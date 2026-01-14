const { build } = require('@docusaurus/core');
const path = require('path');

async function debugBuild() {
  console.log('Starting debug build process...');
  
  const siteDir = __dirname;
  const configPath = path.join(siteDir, 'docusaurus.config.js');
  
  console.log('Site directory:', siteDir);
  console.log('Config path:', configPath);
  
  try {
    console.log('Attempting to build...');
    await build(siteDir, {
      config: configPath,
      outDir: path.join(siteDir, 'build'),
    });
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed with error:');
    console.error(error.message);
    console.error('Stack trace:', error.stack);
    
    // Check if the error is related to missing dependencies
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('This might be a dependency issue. Try running: npm install');
    }
  }
}

debugBuild();