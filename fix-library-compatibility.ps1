# 修复InfraredTracking库兼容性
# 添加 ir_track1-5 引用变量以兼容旧代码

$libPath = "E:\Program Files (x86)\Mind+\Arduino\libraries\InfraredTracking"
$headerFile = "$libPath\InfraredTracking.h"

Write-Host "正在修复 InfraredTracking.h..." -ForegroundColor Yellow

# 读取文件内容
$content = Get-Content $headerFile -Raw

# 检查是否已经修复
if ($content -match "uint16_t& ir_track1") {
    Write-Host "[OK] 库文件已经包含兼容性代码" -ForegroundColor Green
    exit 0
}

# 查找并替换
$oldPattern = "  /\*\*\r?\n   \* @brief 各通道模拟值\r?\n   \*/\r?\n  uint16_t ir_track\[6\]; // index 1~5\r?\n\};"

$newContent = @"
  /**
   * @brief 各通道模拟值（数组方式）
   */
  uint16_t ir_track[6]; // index 1~5
  
  /**
   * @brief 各通道模拟值（单独变量，兼容旧代码）
   */
  uint16_t& ir_track1 = ir_track[1];
  uint16_t& ir_track2 = ir_track[2];
  uint16_t& ir_track3 = ir_track[3];
  uint16_t& ir_track4 = ir_track[4];
  uint16_t& ir_track5 = ir_track[5];
};
"@

if ($content -match $oldPattern) {
    $content = $content -replace $oldPattern, $newContent
    Set-Content -Path $headerFile -Value $content -NoNewline
    Write-Host "[OK] 库文件修复成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "已添加以下兼容变量：" -ForegroundColor Cyan
    Write-Host "  - ir_track1 (引用 ir_track[1])" -ForegroundColor Gray
    Write-Host "  - ir_track2 (引用 ir_track[2])" -ForegroundColor Gray
    Write-Host "  - ir_track3 (引用 ir_track[3])" -ForegroundColor Gray
    Write-Host "  - ir_track4 (引用 ir_track[4])" -ForegroundColor Gray
    Write-Host "  - ir_track5 (引用 ir_track[5])" -ForegroundColor Gray
    Write-Host ""
    Write-Host "现在可以使用两种方式访问：" -ForegroundColor Cyan
    Write-Host "  - _5line_track.ir_track[1]  (数组方式)" -ForegroundColor Gray
    Write-Host "  - _5line_track.ir_track1    (变量方式)" -ForegroundColor Gray
} else {
    Write-Host "[ERROR] 无法找到要替换的模式" -ForegroundColor Red
    Write-Host "请手动编辑文件: $headerFile" -ForegroundColor Yellow
    exit 1
}
