# Fix InfraredTracking Compilation Error
# This script installs the correct library files and clears cache

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Fix InfraredTracking Error" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$mindPlusPath = "E:\Program Files (x86)\Mind+"
$arduinoLibPath = "$mindPlusPath\Arduino\libraries"
$sourcePath = "e:\03实验室\wzRobot\wzRobot\wzRobot-yiqichuangv0.3.6\arduinoC\libraries"

Write-Host "[1/4] Checking Mind+ installation..." -ForegroundColor Yellow
if (Test-Path $mindPlusPath) {
    Write-Host "  [OK] Mind+ found at: $mindPlusPath" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Mind+ not found, please check installation path" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2/4] Installing InfraredTracking library..." -ForegroundColor Yellow

# Remove old version if exists
$libPath = "$arduinoLibPath\InfraredTracking"
if (Test-Path $libPath) {
    Write-Host "  Removing old version..." -ForegroundColor Gray
    Remove-Item $libPath -Recurse -Force
}

# Create new directory
New-Item -ItemType Directory -Path $libPath -Force | Out-Null

# Copy correct library files
Write-Host "  Copying library files..." -ForegroundColor Gray
Copy-Item "$sourcePath\line_tracker_V3\InfraredTracking.h" $libPath -Force
Copy-Item "$sourcePath\line_tracker_V3\InfraredTracking.cpp" $libPath -Force
Copy-Item "$sourcePath\InfraredTracking\library.properties" $libPath -Force

# Verify files
$files = Get-ChildItem $libPath | Select-Object -ExpandProperty Name
if ($files -contains "InfraredTracking.h" -and $files -contains "InfraredTracking.cpp") {
    Write-Host "  [OK] Library installed successfully" -ForegroundColor Green
    Write-Host "       - InfraredTracking.h" -ForegroundColor Gray
    Write-Host "       - InfraredTracking.cpp" -ForegroundColor Gray
    Write-Host "       - library.properties" -ForegroundColor Gray
} else {
    Write-Host "  [ERROR] Library installation failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[3/4] Clearing Mind+ cache..." -ForegroundColor Yellow

$cachePaths = @(
    "$env:LOCALAPPDATA\DFScratch\cache",
    "$env:LOCALAPPDATA\DFScratch\build"
)

foreach ($path in $cachePaths) {
    if (Test-Path $path) {
        Write-Host "  Clearing: $path" -ForegroundColor Gray
        Remove-Item "$path\*" -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "  [OK] Cache cleared" -ForegroundColor Green

Write-Host ""
Write-Host "[4/4] Verifying installation..." -ForegroundColor Yellow

# Check other required libraries
$requiredLibs = @("Emakefun_MotorDriver", "Sentry-Arduino", "RgbUltrasonic")
foreach ($lib in $requiredLibs) {
    $libDir = "$arduinoLibPath\$lib"
    if (Test-Path $libDir) {
        Write-Host "  [OK] $lib is installed" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] $lib not installed, may need manual installation" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Fix Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Completely close Mind+" -ForegroundColor White
Write-Host "2. Reopen Mind+" -ForegroundColor White
Write-Host "3. Recompile your program" -ForegroundColor White
Write-Host ""
Write-Host "If you still have issues, check:" -ForegroundColor Yellow
Write-Host "- Ensure class names in code match the library" -ForegroundColor White
Write-Host "- Verify I2C address is correct (default 0x50)" -ForegroundColor White
Write-Host "- Check Mind+ error output for more information" -ForegroundColor White
Write-Host ""
