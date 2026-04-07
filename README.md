# wzRobot 综合驱动库

> Mind+ 第三方扩展库 - Sentry2视觉传感器 + 五路循迹传感器 + 电机驱动板 + RGB超声波模块

## 📦 最新版本

### V0.4.1 (2026-04-07) ⭐ **最新**
- **🔧 修复电机驱动PWM频率问题**：根据官方库对比，添加正确的PWM频率设置
- **DC电机频率**：初始化为150Hz（之前1000Hz导致电机不工作）
- **舵机频率**：初始化为50Hz（标准舵机PWM频率）
- **编码器电机频率**：初始化为50Hz
- **修复对象声明和指针语法**：解决变量重定义和类型错误
- **添加详细文档**：《与官方库对比分析.md》

### V0.3.8 (2026-04-05)
- **更新 Sentry-Arduino 库**：升级到支持 `kVisionObjTrack`（物体跟踪）功能
- **完善 Emakefun_MotorDriver 库**：添加完整的预编译文件生成流程
- **修复 Mind+ 编译链接问题**：解决库文件找不到和链接失败的问题
- **添加详细技术文档**：《Mind+扩展库编译与链接问题排查备忘》
- **优化库文件结构**：Sentry-Arduino 按源文件目录结构组织预编译文件

### V0.3.7 (2026-04-05)
- 更新 RGB 超声波模块为官方完整版本（包含 RGBLed 依赖）
- 更新 Sentry2 视觉传感器库到 MakerPro5 v1.6.6 版本
- 扩展包大小优化至 572.6 KB

## 版本历史

### V0.3.6 (2026-03-31)
- **修复 UI 拥挤问题**：通过逐个函数添加的方式，精确定位并修复了导致 Mind+ 积木面板拥挤的问题
- **修复代码生成问题**：将所有 `Blockly.Arduino.ORDER_ATOMIC` 替换为 `Generator.ORDER_ATOMIC`，修复 reporter/boolean 积木无法生成代码的问题
- **添加分类标签**：为四个模块添加 `blockType="tag"` 分类标签，实现视觉分隔
- **函数增量添加**：采用逐个添加、逐个测试的方式，成功添加 40+ 个函数

## 组成模块

| 模块 | 函数数量 | 说明 |
|------|---------|------|
| 五路循迹模块 | 7个 | 五路红外循线，支持灵敏度设置、单通道/多通道白线黑线检测 |
| 电机驱动板 | 17个 | DC电机、编码器电机、步进电机、舵机、IO控制 |
| Sentry2 视觉 | 11个 | 颜色/线条/Blob/卡片/二维码/人脸/20类物体等视觉识别 |
| RGB超声波模块 | 5个 | RGB LED灯效（呼吸/旋转/闪烁）+ 超声波测距 |
| 分类标签 | 4个 | 四个模块的分类标签 |
| **总计** | **44个** | |

## 积木分类标签

由于 Mind+ 中单个 `.mpext` 扩展包只能使用一种分类颜色，四类积木通过 `blockType="tag"` 在每个 namespace 开头添加了分类标签，在积木面板中以文字标签形式视觉分隔：

| 分类标签 | 颜色 |
|----------|------|
| 五路循迹 | `#409EFF` 蓝色 |
| 电机驱动板 | `#E6A23C` 橙色 |
| Sentry2 视觉 | `#F56C6C` 红色 |
| RGB 超声波 | `#71BE1E` 绿色 |

## 默认地址

| 模块 | I2C 地址 |
|------|---------|
| 五路循迹 | `0x50` |
| 电机驱动板 | `0x60` |
| Sentry2 | `0x63` |

## 🔧 常见问题

### 编译错误：xxx.h: No such file or directory

**原因**：Mind+ 需要从全局 Arduino 库目录加载库文件

**解决方案**：
```powershell
# 复制库到全局目录
Copy-Item "项目源\库名" "C:\Program Files (x86)\Mind+\Arduino\libraries\库名" -Recurse -Force
```

### 链接错误：xxx.cpp.o: No such file or directory

**原因**：缺少预编译的 `.o` 文件

**解决方案**：使用 avr-gcc 编译生成预编译文件
```powershell
$avrGcc = "C:\Program Files (x86)\Mind+\Arduino\hardware\tools\avr\bin\avr-gcc.exe"
& $avrGcc -c -g -Os -w -std=gnu++11 -mmcu=atmega328p ... src.cpp -o src.cpp.o
```

**详细文档**：查看 [Mind+扩展库编译与链接问题排查备忘.md](./Mind+扩展库编译与链接问题排查备忘.md)

### 清理缓存

每次修改库文件后，必须清理 Mind+ 缓存：
```powershell
Remove-Item "$env:LOCALAPPDATA\DFScratch\cache\*" -Force
Remove-Item "$env:LOCALAPPDATA\DFScratch\build\*" -Recurse -Force
```

然后完全关闭并重新打开 Mind+。

## 📦 打包与部署

### 构建扩展包

```bash
python build.py         # 打包 wzRobot-V0.3.8.mpext
```

### 安装到 Mind+

1. **自动安装**（推荐）：
   ```powershell
   # 删除旧扩展
   Remove-Item "$env:LOCALAPPDATA\DFScratch\extensions\fan-wzrobot-thirdex" -Recurse -Force
   
   # 解压新扩展
   Add-Type -AssemblyName System.IO.Compression.FileSystem
   [System.IO.Compression.ZipFile]::ExtractToDirectory("wzRobot-V0.3.8.mpext", "$env:LOCALAPPDATA\DFScratch\extensions\fan-wzrobot-thirdex")
   ```

2. **手动安装**：
   - 将 `wzRobot-V0.3.8.mpext` 复制到 `%LOCALAPPDATA%\DFScratch\extensions\`
   - 解压到 `fan-wzrobot-thirdex` 目录

### 安装依赖库到全局目录

Mind+ 编译时需要从全局 Arduino 库目录加载库文件：

```powershell
# Emakefun_MotorDriver
Copy-Item "arduinoC\libraries\motordriverboard\*" "C:\Program Files (x86)\Mind+\Arduino\libraries\Emakefun_MotorDriver\" -Recurse -Force

# Sentry-Arduino
Copy-Item "arduinoC\libraries\Sentry-Arduino" "C:\Program Files (x86)\Mind+\Arduino\libraries\Sentry-Arduino" -Recurse -Force

# 生成预编译文件（见详细文档）
```

### 提交到 GitHub

```bash
git add -A
git commit -m "v0.3.8: 更新说明"
git push origin main:yiqichuangv0.3.6
```

## 许可证

MIT
