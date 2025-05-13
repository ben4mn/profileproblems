@echo off
echo ----------------------------------------------
echo Telecom System Visualization Suite - Setup Tool
echo ----------------------------------------------
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Recommended version: 18 LTS or 20 LTS
    echo.
    pause
    exit /b
)

echo Node.js is installed. Checking version...
node -v
echo.

REM Clean up any previous attempts
if exist node_modules (
    echo Removing previous node_modules folder...
    rmdir /s /q node_modules
    echo.
)

if exist package-lock.json (
    echo Removing previous package-lock.json...
    del package-lock.json
    echo.
)

echo Setting up environment...
echo SET NODE_OPTIONS=--no-warnings > .env
echo.

echo Installing dependencies (this may take a moment)...
call npm install

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error during installation. Trying alternative approach...
    echo.
    call npm cache clean --force
    call npm install --legacy-peer-deps
)

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo Still having issues. Let's try installing core dependencies only...
    echo.
    call npm install react react-dom lucide-react
    call npm install -D vite @vitejs/plugin-react tailwindcss autoprefixer postcss
)

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Installation failed after multiple attempts.
    echo.
    echo Possible solutions:
    echo 1. Try running as administrator
    echo 2. Check your internet connection
    echo 3. Try installing Yarn and run: yarn install
    echo 4. Try a clean Node.js install
    echo.
    pause
    exit /b
)

echo.
echo Dependencies installed successfully!
echo.
echo Starting development server...
echo.
echo ----------------------------------------------
echo INFORMATION:
echo - The app will start at http://localhost:5173
echo - Press Ctrl+C to stop the server
echo - Code files are in the src/ directory
echo - Make changes and see them live in the browser
echo ----------------------------------------------
echo.

call npm run dev

pause
