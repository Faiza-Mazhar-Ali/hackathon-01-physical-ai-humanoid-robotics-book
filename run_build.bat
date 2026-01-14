@echo off
echo Starting Docusaurus build...
cd /d "C:\Users\Ali\OneDrive\Desktop\hackathon-01\my-docusaurus"
npx docusaurus build
echo Build process completed with exit code: %ERRORLEVEL%
pause