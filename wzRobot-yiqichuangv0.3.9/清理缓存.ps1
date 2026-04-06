# wzRobot 扩展库清理和安装脚本
# 用于清除 Mind+ 缓存并准备重新导入

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "wzRobot 扩展库清理工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mind+ 扩展缓存路径
$MindPlusCachePath = "$env:LOCALAPPDATA\DFScratch\extensions\fan-wzrobot-thirdex"

Write-Host "检查 Mind+ 缓存目录..." -ForegroundColor Yellow
Write-Host "路径：$MindPlusCachePath" -ForegroundColor Gray
Write-Host ""

if (Test-Path $MindPlusCachePath) {
    Write-Host "发现旧版本缓存，开始清除..." -ForegroundColor Yellow
    
    try {
        Remove-Item -Path $MindPlusCachePath -Recurse -Force
        Write-Host "[OK] 缓存清除成功！" -ForegroundColor Green
    }
    catch {
        Write-Host "[ERROR] 清除失败，请手动删除该目录" -ForegroundColor Red
        Write-Host "错误信息：$_" -ForegroundColor Red
    }
}
else {
    Write-Host "[INFO] 未发现缓存目录（这是正常的）" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 打开 Mind+ 软件" -ForegroundColor White
Write-Host "2. 进入【扩展库】→【用户库】→【本地导入】" -ForegroundColor White
Write-Host "3. 选择项目目录中的：" -ForegroundColor White
Write-Host "   wzRobot-V0.3.6.mpext" -ForegroundColor Green
Write-Host "4. 确认安装" -ForegroundColor White
Write-Host ""
Write-Host "验证下拉菜单：" -ForegroundColor Cyan
Write-Host "- 拖动'五路循迹 [CHANNEL] 检测到 [COLOR]'积木" -ForegroundColor White
Write-Host "  ✓ CHANNEL 应显示：第 1 路、第 2 路、...、第 5 路" -ForegroundColor Green
Write-Host "  ✓ COLOR 应显示：黑色、白色" -ForegroundColor Green
Write-Host ""
Write-Host "- 拖动'五路循迹 状态 [CH1] [CH2] [CH3] [CH4] [CH5]'积木" -ForegroundColor White
Write-Host "  ✓ CH1~CH5 都应显示：白线、黑线" -ForegroundColor Green
Write-Host ""
Write-Host "如果还有问题，请检查：" -ForegroundColor Yellow
Write-Host "1. Mind+ 是否为最新版本" -ForegroundColor White
Write-Host "2. 是否完全关闭了 Mind+ 后重新打开" -ForegroundColor White
Write-Host "3. 查看错误提示的详细信息" -ForegroundColor White
Write-Host ""
