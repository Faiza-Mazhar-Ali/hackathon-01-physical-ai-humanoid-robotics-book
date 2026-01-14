@echo off
echo Starting Docusaurus build...
npx docusaurus build > build_output.txt 2>&1
echo Build process completed with error level %ERRORLEVEL%
type build_output.txt
pause