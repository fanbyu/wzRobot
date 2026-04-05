# Mind+ 扩展诊断脚本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  wzRobot 扩展诊断工具" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$extPath = "$env:LOCALAPPDATA\DFScratch\extensions\fan-wzrobot-thirdex"

# 检查 1: 扩展目录是否存在
Write-Host "[检查 1] 扩展安装目录" -ForegroundColor Yellow
if (Test-Path $extPath) {
    Write-Host "✓ 扩展目录存在: $extPath" -ForegroundColor Green
} else {
    Write-Host "✗ 扩展目录不存在" -ForegroundColor Red
    Write-Host "  → 请先在 Mind+ 中导入扩展" -ForegroundColor Yellow
    exit
}

# 检查 2: arduinoC 目录
Write-Host "`n[检查 2] arduinoC 目录" -ForegroundColor Yellow
$arduinoCPath = "$extPath\arduinoC"
if (Test-Path $arduinoCPath) {
    Write-Host "✓ arduinoC 目录存在" -ForegroundColor Green
} else {
    Write-Host "✗ arduinoC 目录不存在" -ForegroundColor Red
    exit
}

# 检查 3: libraries 目录
Write-Host "`n[检查 3] libraries 目录" -ForegroundColor Yellow
$libPath = "$arduinoCPath\libraries"
if (Test-Path $libPath) {
    Write-Host "✓ libraries 目录存在" -ForegroundColor Green
    Write-Host "`n库文件列表:" -ForegroundColor Cyan
    Get-ChildItem $libPath | ForEach-Object {
        if ($_.PSIsContainer) {
            Write-Host "  📁 $($_.Name)" -ForegroundColor White
        } else {
            Write-Host "  📄 $($_.Name) ($([math]::Round($_.Length/1KB, 2)) KB)" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "✗ libraries 目录不存在" -ForegroundColor Red
    exit
}

# 检查 4: InfraredTracking 库
Write-Host "`n[检查 4] InfraredTracking 库" -ForegroundColor Yellow
$infraredPath = "$libPath\InfraredTracking"
if (Test-Path $infraredPath) {
    Write-Host "✓ InfraredTracking 目录存在" -ForegroundColor Green
    
    # 检查 library.properties
    $propsFile = "$infraredPath\library.properties"
    if (Test-Path $propsFile) {
        Write-Host "  ✓ library.properties 存在" -ForegroundColor Green
    } else {
        Write-Host "  ✗ library.properties 缺失" -ForegroundColor Red
    }
    
    # 检查 src 目录
    $srcPath = "$infraredPath\src"
    if (Test-Path $srcPath) {
        Write-Host "  ✓ src 目录存在" -ForegroundColor Green
        Write-Host "  源文件:" -ForegroundColor Cyan
        Get-ChildItem $srcPath | ForEach-Object {
            Write-Host "    - $($_.Name)" -ForegroundColor White
        }
    } else {
        Write-Host "  ✗ src 目录缺失" -ForegroundColor Red
    }
} else {
    Write-Host "✗ InfraredTracking 目录不存在" -ForegroundColor Red
    Write-Host "  → 这是导致编译错误的原因" -ForegroundColor Yellow
}

# 检查 5: 其他库
Write-Host "`n[检查 5] 其他库文件" -ForegroundColor Yellow
$expectedLibs = @("Emakefun_MotorDriver", "RgbUltrasonic", "Sentry-Arduino")
foreach ($lib in $expectedLibs) {
    $libDir = "$libPath\$lib"
    if (Test-Path $libDir) {
        Write-Host "  ✓ $lib" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $lib (缺失)" -ForegroundColor Red
    }
}

# 总结
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  诊断完成" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if (Test-Path "$infraredPath\src\InfraredTracking.h") {
    Write-Host "✅ 所有检查通过！" -ForegroundColor Green
    Write-Host "   如果仍然编译失败，请：" -ForegroundColor Yellow
    Write-Host "   1. 完全关闭 Mind+" -ForegroundColor White
    Write-Host "   2. 重新打开 Mind+" -ForegroundColor White
    Write-Host "   3. 再次尝试编译" -ForegroundColor White
} else {
    Write-Host "❌ 发现问题，需要重新导入扩展" -ForegroundColor Red
    Write-Host "   请执行以下步骤：" -ForegroundColor Yellow
    Write-Host "   1. 完全关闭 Mind+" -ForegroundColor White
    Write-Host "   2. 运行: Remove-Item -Path `"$extPath`" -Recurse -Force" -ForegroundColor White
    Write-Host "   3. 重新打开 Mind+" -ForegroundColor White
    Write-Host "   4. 重新导入: d:\mylab\wzRobot\wzRobot-V0.3.7.mpext" -ForegroundColor White
    Write-Host "   5. 完全关闭并重启 Mind+" -ForegroundColor White
}
