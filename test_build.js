// Simple test to check if Docusaurus can run at all
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Write a simple test to a log file
const logPath = path.join(__dirname, 'build_test.log');
fs.writeFileSync(logPath, 'Starting build test...\n', { flag: 'a' });

// Try to run the build command and capture output
const command = 'npx docusaurus build';
console.log('Executing:', command);

const child = exec(command, (error, stdout, stderr) => {
  fs.writeFileSync(logPath, `stdout: ${stdout}\n`, { flag: 'a' });
  fs.writeFileSync(logPath, `stderr: ${stderr}\n`, { flag: 'a' });
  
  if (error) {
    fs.writeFileSync(logPath, `Error: ${error}\n`, { flag: 'a' });
    console.error(`Error: ${error}`);
    process.exit(1);
  }
  
  fs.writeFileSync(logPath, 'Build completed successfully!\n', { flag: 'a' });
  console.log('Build completed successfully!');
  process.exit(0);
});

// Also capture any output from the child process
child.stdout.on('data', (data) => {
  fs.writeFileSync(logPath, `stdout chunk: ${data}\n`, { flag: 'a' });
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  fs.writeFileSync(logPath, `stderr chunk: ${data}\n`, { flag: 'a' });
  console.error(`stderr: ${data}`);
});