# 修复InfraredTracking库编译错误脚本
# 此脚本会安装正确的库文件并清理缓存

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  修复 InfraredTracking 编译错误" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$mindPlusPath = "E:\Program Files (x86)\Mind+"
$arduinoLibPath = "$mindPlusPath\Arduino\libraries"
$sourcePath = "e:\03实验室\wzRobot\wzRobot\wzRobot-yiqichuangv0.3.6\arduinoC\libraries"

Write-Host "[1/4] 检查 Mind+ 安装路径..." -ForegroundColor Yellow
if (Test-Path $mindPlusPath) {
    Write-Host "  [OK] Mind+ 已安装在: $mindPlusPath" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Mind+ 未找到，请检查安装路径" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2/4] 安装 InfraredTracking 库..." -ForegroundColor Yellow

# 删除旧版本（如果存在）
$libPath = "$arduinoLibPath\InfraredTracking"
if (Test-Path $libPath) {
    Write-Host "  删除旧版本库..." -ForegroundColor Gray
    Remove-Item $libPath -Recurse -Force
}

# 创建新目录
New-Item -ItemType Directory -Path $libPath -Force | Out-Null

# 复制正确的库文件
Write-Host "  复制库文件..." -ForegroundColor Gray
Copy-Item "$sourcePath\line_tracker_V3\InfraredTracking.h" $libPath -Force
Copy-Item "$sourcePath\line_tracker_V3\InfraredTracking.cpp" $libPath -Force
Copy-Item "$sourcePath\InfraredTracking\library.properties" $libPath -Force

# 验证文件
$files = Get-ChildItem $libPath | Select-Object -ExpandProperty Name
if ($files -contains "InfraredTracking.h" -and $files -contains "InfraredTracking.cpp") {
    Write-Host "  [OK] 库文件安装成功" -ForegroundColor Green
    Write-Host "       - InfraredTracking.h" -ForegroundColor Gray
    Write-Host "       - InfraredTracking.cpp" -ForegroundColor Gray
    Write-Host "       - library.properties" -ForegroundColor Gray
} else {
    Write-Host "  [ERROR] 库文件安装失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[3/4] 清理 Mind+ 缓存..." -ForegroundColor Yellow

$cachePaths = @(
    "$env:LOCALAPPDATA\DFScratch\cache",
    "$env:LOCALAPPDATA\DFScratch\build"
)

foreach ($path in $cachePaths) {
    if (Test-Path $path) {
        Write-Host "  清理: $path" -ForegroundColor Gray
        Remove-Item "$path\*" -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "  [OK] 缓存清理完成" -ForegroundColor Green

Write-Host ""
Write-Host "[4/4] 验证安装..." -ForegroundColor Yellow

# 检查其他必需的库
$requiredLibs = @("Emakefun_MotorDriver", "Sentry-Arduino", "RgbUltrasonic")
foreach ($lib in $requiredLibs) {
    $libDir = "$arduinoLibPath\$lib"
    if (Test-Path $libDir) {
        Write-Host "  [OK] $lib 已安装" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] $lib 未安装，可能需要手动安装" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  修复完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 完全关闭 Mind+" -ForegroundColor White
Write-Host "2. 重新打开 Mind+" -ForegroundColor White
Write-Host "3. 重新编译您的程序" -ForegroundColor White
Write-Host ""
Write-Host "如果仍有问题，请检查：" -ForegroundColor Yellow
Write-Host "- 确认代码中使用的类名与库文件匹配" -ForegroundColor White
Write-Host "- 确认I2C地址正确（默认0x50）" -ForegroundColor White
Write-Host "- 查看 Mind+ 的错误输出获取更多信息" -ForegroundColor White
Write-Host ""
