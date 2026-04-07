# 电机驱动模块修复 - 自动安装脚本
# 此脚本会安装修复后的V0.4.1版本扩展

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  电机驱动模块修复 - 自动安装" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查扩展包是否存在
$mpextPath = "d:\mylab\wzRobot\wzRobot\wzRobot-V0.4.1.mpext"
if (-not (Test-Path $mpextPath)) {
    Write-Host "[错误] 扩展包不存在: $mpextPath" -ForegroundColor Red
    Write-Host "请先运行: python build.py" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/5] 找到扩展包: wzRobot-V0.4.1.mpext" -ForegroundColor Green

# 2. 删除旧扩展
$extensionPath = "$env:LOCALAPPDATA\DFScratch\extensions\fan-wzrobot-thirdex"
if (Test-Path $extensionPath) {
    Write-Host "[2/5] 删除旧扩展..." -ForegroundColor Yellow
    Remove-Item $extensionPath -Recurse -Force
    Write-Host "      已删除: $extensionPath" -ForegroundColor Gray
} else {
    Write-Host "[2/5] 未发现旧扩展，跳过删除" -ForegroundColor Gray
}

# 3. 创建扩展目录并解压
Write-Host "[3/5] 安装新扩展..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $extensionPath -Force | Out-Null

try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($mpextPath, $extensionPath)
    Write-Host "      扩展已解压到: $extensionPath" -ForegroundColor Gray
} catch {
    Write-Host "[错误] 解压失败: $_" -ForegroundColor Red
    exit 1
}

# 4. 复制依赖库到Mind+全局目录
$mindPlusLibPath = "C:\Program Files (x86)\Mind+\Arduino\libraries\Emakefun_MotorDriver"
$sourceLibPath = "d:\mylab\wzRobot\wzRobot\arduinoC\libraries\Emakefun_MotorDriver"

if (Test-Path $sourceLibPath) {
    Write-Host "[4/5] 复制电机驱动库到Mind+全局目录..." -ForegroundColor Yellow
    
    if (Test-Path $mindPlusLibPath) {
        Remove-Item $mindPlusLibPath -Recurse -Force
    }
    
    New-Item -ItemType Directory -Path $mindPlusLibPath -Force | Out-Null
    Copy-Item "$sourceLibPath\*" $mindPlusLibPath -Recurse -Force
    Write-Host "      库文件已复制到: $mindPlusLibPath" -ForegroundColor Gray
} else {
    Write-Host "[警告] 源库目录不存在: $sourceLibPath" -ForegroundColor Yellow
}

# 5. 清理Mind+缓存
Write-Host "[5/5] 清理Mind+缓存..." -ForegroundColor Yellow
$cachePath = "$env:LOCALAPPDATA\DFScratch\cache"
$buildPath = "$env:LOCALAPPDATA\DFScratch\build"

if (Test-Path $cachePath) {
    Remove-Item "$cachePath\*" -Force -ErrorAction SilentlyContinue
    Write-Host "      已清理缓存目录" -ForegroundColor Gray
}

if (Test-Path $buildPath) {
    Remove-Item "$buildPath\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "      已清理解构目录" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  安装完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 完全关闭 Mind+（如果正在运行）" -ForegroundColor White
Write-Host "2. 重新打开 Mind+" -ForegroundColor White
Write-Host "3. 加载示例程序进行测试：" -ForegroundColor White
Write-Host "   - examples/电机驱动板测试.mp" -ForegroundColor Gray
Write-Host "   - examples/电机驱动板测试2.mp" -ForegroundColor Gray
Write-Host ""
Write-Host "验证要点：" -ForegroundColor Cyan
Write-Host "- DC电机应该能正常转动" -ForegroundColor White
Write-Host "- 编码器电机应该能正常转动" -ForegroundColor White
Write-Host "- 舵机应该能转到指定角度" -ForegroundColor White
Write-Host "- 步进电机应该能按步数移动" -ForegroundColor White
Write-Host ""
Write-Host "如需查看生成的代码，在Mind+中切换到'代码'视图" -ForegroundColor Yellow
Write-Host ""

