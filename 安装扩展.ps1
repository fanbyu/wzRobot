# wzRobot 扩展安装和验证脚本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  wzRobot 扩展自动安装工具" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$mpextPath = "d:\mylab\wzRobot\wzRobot-V0.3.7.mpext"
$extPath = "$env:LOCALAPPDATA\DFScratch\extensions\fan-wzrobot-thirdex"

# 步骤 1: 检查扩展包是否存在
Write-Host "[步骤 1] 检查扩展包文件" -ForegroundColor Yellow
if (Test-Path $mpextPath) {
    $file = Get-Item $mpextPath
    Write-Host "✓ 扩展包存在: $($file.Name)" -ForegroundColor Green
    Write-Host "  大小: $([math]::Round($file.Length/1KB, 2)) KB" -ForegroundColor Gray
} else {
    Write-Host "✗ 扩展包不存在: $mpextPath" -ForegroundColor Red
    Write-Host "  请先运行: python build.py" -ForegroundColor Yellow
    exit 1
}

# 步骤 2: 清除旧缓存
Write-Host "`n[步骤 2] 清除旧缓存" -ForegroundColor Yellow
if (Test-Path $extPath) {
    try {
        Remove-Item -Path $extPath -Recurse -Force -ErrorAction Stop
        Write-Host "✓ 已清除旧缓存" -ForegroundColor Green
    } catch {
        Write-Host "✗ 清除缓存失败，请手动删除: $extPath" -ForegroundColor Red
        Write-Host "  错误: $_" -ForegroundColor Gray
        exit 1
    }
} else {
    Write-Host "✓ 无需清除（缓存不存在）" -ForegroundColor Green
}

# 步骤 3: 解压扩展包到 Mind+ 目录
Write-Host "`n[步骤 3] 安装扩展" -ForegroundColor Yellow
try {
    # 创建目标目录
    New-Item -ItemType Directory -Path $extPath -Force | Out-Null
    
    # 解压 mpext 文件（本质是 zip）
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($mpextPath, $extPath)
    
    Write-Host "✓ 扩展已解压到: $extPath" -ForegroundColor Green
} catch {
    Write-Host "✗ 安装失败" -ForegroundColor Red
    Write-Host "  错误: $_" -ForegroundColor Gray
    Write-Host "`n请手动在 Mind+ 中导入扩展" -ForegroundColor Yellow
    exit 1
}

# 步骤 4: 验证安装
Write-Host "`n[步骤 4] 验证安装" -ForegroundColor Yellow

$libPath = "$extPath\arduinoC\libraries"
if (Test-Path $libPath) {
    Write-Host "✓ libraries 目录存在" -ForegroundColor Green
    
    $zipPath = "$libPath\libraries.zip"
    if (Test-Path $zipPath) {
        $zipSize = (Get-Item $zipPath).Length
        Write-Host "✓ libraries.zip 存在 ($([math]::Round($zipSize/1KB, 2)) KB)" -ForegroundColor Green
        
        # 检查 zip 内容
        try {
            Add-Type -AssemblyName System.IO.Compression.FileSystem
            $zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
            $infraredFiles = $zip.Entries | Where-Object { $_.FullName -like "*Infrared*" }
            $zip.Dispose()
            
            if ($infraredFiles.Count -gt 0) {
                Write-Host "✓ InfraredTracking 库文件存在 ($($infraredFiles.Count) 个文件)" -ForegroundColor Green
                $infraredFiles | ForEach-Object {
                    Write-Host "    - $($_.FullName)" -ForegroundColor Gray
                }
            } else {
                Write-Host "✗ InfraredTracking 库文件缺失" -ForegroundColor Red
            }
        } catch {
            Write-Host "⚠ 无法检查 zip 内容: $_" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✗ libraries.zip 不存在" -ForegroundColor Red
    }
} else {
    Write-Host "✗ libraries 目录不存在" -ForegroundColor Red
}

# 总结
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  安装完成！" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "下一步操作：" -ForegroundColor Yellow
Write-Host "1. 如果 Mind+ 正在运行，请完全关闭它" -ForegroundColor White
Write-Host "2. 重新打开 Mind+" -ForegroundColor White
Write-Host "3. 测试编译您的代码`n" -ForegroundColor White

Write-Host "如果仍然报错，请运行诊断脚本：" -ForegroundColor Yellow
Write-Host ".\诊断扩展安装.ps1`n" -ForegroundColor Cyan

