# wzRobot V0.3.9 发布说明

**发布日期**: 2026-04-06  
**分支**: yiqichuangv0.3.9  
**仓库**: https://github.com/fanbyu/wzRobot/tree/yiqichuangv0.3.9

---

## 🎯 主要更新

### 1. 修复库结构问题

#### Sentry-Arduino 库
- ✅ 保持 `src/` 目录结构（不可展平）
- ✅ 生成全部 6 个预编译 .o 文件
- ✅ 解决 `hardware/hw_conf.h` 找不到问题

**预编译文件列表**:
```
Sentry-Arduino/src/debug/debug_tool.cpp.o
Sentry-Arduino/src/hardware/hw_sentry_i2c.cpp.o
Sentry-Arduino/src/hardware/hw_sentry_uart.cpp.o
Sentry-Arduino/src/protoc/protocol_analysis.cpp.o
Sentry-Arduino/src/sentry_i2c.cpp.o
Sentry-Arduino/src/sentry_uart.cpp.o
```

#### Emakefun_MotorDriver 库
- ✅ 补全缺失的 3 个预编译文件
- ✅ 总共 4 个预编译文件

**预编译文件列表**:
```
Emakefun_MotorDriver/Emakefun_MotorDriver.cpp.o
Emakefun_MotorDriver/Emakefun_MS_PWMServoDriver.cpp.o
Emakefun_MotorDriver/MsTimer2.cpp.o
Emakefun_MotorDriver/PID_v1.cpp.o
```

### 2. 工具链改进

#### generate_precompiled.py
- ✅ 支持多文件编译
- ✅ 添加 Emakefun_MotorDriver 配置
- ✅ 自动化预编译文件生成流程

#### 新增辅助脚本
- ✅ `check_portability.py` - 可移植性检查工具
- ✅ `fix-infrared-tracking.ps1` - InfraredTracking库修复脚本
- ✅ `fix-library-compatibility.ps1` - 库兼容性修复脚本

### 3. 文档完善

#### 新增文档
- ✅ `GitHub上传指南.md` - 详细的GitHub上传步骤
- ✅ `wzRobot扩展开发完全指南.md` - 完整的扩展开发文档
- ✅ `文档索引.md` - 所有文档的索引和导航
- ✅ `项目使用指南.md` - 项目使用说明

#### 更新文档
- ✅ `README.md` - 更新版本信息和功能说明
- ✅ `Mind+扩展开发避坑指南.md` - 补充常见问题

### 4. 示例程序

新增4个Mind+示例程序：
- ✅ `examples/rgb超声波测试.mp`
- ✅ `examples/sentry2测试.mp`
- ✅ `examples/电机驱动板测试.mp`
- ✅ `examples/轨迹板测试.mp`

---

## 📊 预编译文件统计

| 库名称 | .o 文件数量 | 总大小 |
|--------|-----------|--------|
| InfraredTracking | 1 | ~20 KB |
| RgbUltrasonic | 1 | ~24 KB |
| RGB_LED | 1 | ~28 KB |
| Sentry-Arduino | 6 | ~214 KB |
| Emakefun_MotorDriver | 4 | ~109 KB |
| **总计** | **13** | **~395 KB** |

---

## 🔧 技术细节

### 库文件组织结构

```
arduinoC/libraries/
├── InfraredTracking/           # 五路循迹传感器
│   ├── src/
│   │   └── InfraredTracking.h
│   ├── InfraredTracking.cpp
│   └── library.properties
│
├── RgbUltrasonic/              # RGB超声波模块
│   ├── src/
│   │   ├── RgbUltrasonic.cpp
│   │   └── RgbUltrasonic.h
│   └── library.properties
│
├── RGB_LED/                    # RGB LED控制
│   ├── RGBLed.cpp
│   ├── RGBLed.h
│   └── library.properties
│
├── Sentry-Arduino/             # Sentry2视觉传感器
│   ├── src/                    # ⚠️ 必须保持此目录结构
│   │   ├── debug/
│   │   ├── hardware/
│   │   ├── protoc/
│   │   └── *.cpp/*.h
│   ├── examples/
│   └── library.properties
│
└── Emakefun_MotorDriver/       # 电机驱动板
    ├── Emakefun_MotorDriver.cpp
    ├── Emakefun_MS_PWMServoDriver.cpp
    ├── MsTimer2.cpp
    ├── PID_v1.cpp
    └── library.properties
```

### 关键修复点

1. **Sentry-Arduino 目录结构**
   - ❌ 错误：将 src/ 目录下的文件展平到根目录
   - ✅ 正确：保持 src/ 目录及其子目录结构

2. **预编译文件路径**
   - 预编译文件必须与源文件路径对应
   - 例如：`src/hardware/hw_sentry_i2c.cpp` → `src/hardware/hw_sentry_i2c.cpp.o`

3. **头文件包含路径**
   - 确保 `#include` 路径与目录结构匹配
   - 使用相对路径或正确的包含路径

---

## 📥 安装方法

### 方法 1: Mind+ 直接安装

1. 下载扩展包：
   ```
   https://github.com/fanbyu/wzRobot/raw/yiqichuangv0.3.9/wzRobot-V0.3.9.mpext
   ```

2. 在 Mind+ 中：
   - 点击左下角"扩展"
   - 选择"上传第三方扩展"
   - 选择下载的 `.mpext` 文件

### 方法 2: 从源码构建

```bash
# 克隆仓库
git clone https://github.com/fanbyu/wzRobot.git
cd wzRobot
git checkout yiqichuangv0.3.9

# 构建扩展包
python build.py

# 生成的文件：wzRobot-V0.3.9.mpext
```

---

## ✅ 验证清单

- [x] config.json 版本号为 0.3.9
- [x] 所有库文件结构正确
- [x] 13个预编译 .o 文件完整
- [x] 文档完整且准确
- [x] 示例程序可用
- [x] 成功推送到 GitHub
- [x] 可通过 HTTPS 访问

---

## 🔗 相关链接

- **GitHub 仓库**: https://github.com/fanbyu/wzRobot
- **V0.3.9 分支**: https://github.com/fanbyu/wzRobot/tree/yiqichuangv0.3.9
- **下载扩展包**: https://github.com/fanbyu/wzRobot/raw/yiqichuangv0.3.9/wzRobot-V0.3.9.mpext
- **问题反馈**: https://github.com/fanbyu/wzRobot/issues

---

## 📝 更新日志

### V0.3.9 (2026-04-06)
- 修复 Sentry-Arduino 库结构问题
- 补全 Emakefun_MotorDriver 预编译文件
- 更新 generate_precompiled.py 支持多文件编译
- 添加完善的文档体系
- 新增4个示例程序

### V0.3.8 (2026-04-05)
- 更新 Sentry-Arduino 库支持物体跟踪
- 修复 Mind+ 编译链接问题
- 优化库文件结构

### V0.3.7 (2026-04-05)
- 更新 RGB 超声波模块为官方完整版本
- 更新 Sentry2 库到 MakerPro5 v1.6.6

### V0.3.6 (2026-03-31)
- 修复 UI 拥挤问题
- 修复代码生成问题
- 添加分类标签

---

**祝您使用愉快！** 🚀

如有问题，请查看文档或在 GitHub 上提交 Issue。
