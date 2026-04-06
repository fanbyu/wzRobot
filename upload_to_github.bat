@echo off
REM wzRobot V0.3.9 GitHub Upload Helper
REM This script helps you upload to GitHub

echo ========================================
echo wzRobot V0.3.9 - GitHub Upload Helper
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    echo Alternative: Use GitHub Desktop or Web Interface
    echo See: GitHub上传指南.md for detailed instructions
    echo.
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "config.json" (
    echo [ERROR] Please run this script from wzRobot-yiqichuangv0.3.6 directory
    pause
    exit /b 1
)

echo [INFO] Git found!
echo.
echo Select upload method:
echo   1. Initialize new repository and push
echo   2. Update existing repository
echo   3. Show manual instructions only
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto init_repo
if "%choice%"=="2" goto update_repo
if "%choice%"=="3" goto show_help
goto end

:init_repo
echo.
echo ========================================
echo Initializing new Git repository
echo ========================================
echo.

git init
git remote add origin https://github.com/fanbyu/wzRobot.git
git checkout -b yiqichuangv0.3.9

echo.
echo [OK] Repository initialized
echo [OK] Branch created: yiqichuangv0.3.9
echo.
echo Next steps:
echo   1. Add files: git add .
echo   2. Commit: git commit -m "Update to V0.3.9"
echo   3. Push: git push -u origin yiqichuangv0.3.9
echo.
pause
goto end

:update_repo
echo.
echo ========================================
echo Updating existing repository
echo ========================================
echo.

git status
echo.
echo [INFO] Current branch: 
git branch --show-current
echo.

set /p confirm="Continue with commit and push? (y/n): "
if /i "%confirm%" neq "y" goto end

echo.
echo Adding files...
git add .

echo.
echo Committing changes...
git commit -m "Update to V0.3.9 - Fix precompiled files and library structure

- Fixed Sentry-Arduino library structure (keep src/ directory)
- Added missing Emakefun_MotorDriver .o files (3 files)
- Updated generate_precompiled.py to support multi-file compilation
- Total 13 precompiled .o files now complete
- Updated documentation
- Version: 0.3.9"

echo.
echo Pushing to GitHub...
git push -u origin yiqichuangv0.3.9

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Upload completed!
    echo.
    echo View your repository:
    echo https://github.com/fanbyu/wzRobot/tree/yiqichuangv0.3.9
) else (
    echo.
    echo [ERROR] Push failed!
    echo.
    echo Possible solutions:
    echo   1. Check your internet connection
    echo   2. Verify GitHub credentials: git credential-manager configure
    echo   3. Try: git pull origin yiqichuangv0.3.9 (if conflicts)
    echo   4. See GitHub上传指南.md for more help
)

echo.
pause
goto end

:show_help
echo.
echo ========================================
echo Manual Upload Instructions
echo ========================================
echo.
echo Please refer to: GitHub上传指南.md
echo.
echo Quick summary:
echo   Method 1: GitHub Desktop (Recommended)
echo   Method 2: Git Command Line
echo   Method 3: GitHub Web Interface
echo.
echo Key files to upload:
echo   - config.json (version 0.3.9)
echo   - wzRobot-V0.3.9.mpext
echo   - arduinoC/ directory
echo   - All *.md documentation files
echo   - Python scripts (*.py)
echo.
pause
goto end

:end
echo.
echo Done!
pause
