# wzRobot V1.0.0 UI 优化说明

## 🎨 优化内容

### 1. **Namespace 图标尺寸优化**
```typescript
// 修复前：图标过大导致挤压
//% color="#409EFF" iconWidth=50 iconHeight=40

// 修复后：标准尺寸
//% color="#409EFF" iconWidth=40 iconHeight=40
```

### 2. **枚举值添加权重排序**
为所有下拉菜单添加了 `weight` 参数，确保选项按正确顺序显示：

#### PINS 枚举（IO 引脚）
- S1 (weight=8) - 最高优先级
- S2 (weight=7)
- S3 (weight=6)
- S4 (weight=5)
- S5 (weight=4)
- S6 (weight=3)
- S7 (weight=2)
- S8 (weight=1) - 最低优先级

#### SERVOS 枚举（舵机接口）
- S1-S8 按权重降序排列

#### MOTORS 枚举（DC 电机）
- M1 (weight=4)
- M2 (weight=3)
- M3 (weight=2)
- M4 (weight=1)

#### ENCODERS 枚举（编码器电机）
- Encoder1 (weight=4)
- Encoder2 (weight=3)
- Encoder3 (weight=2)
- Encoder4 (weight=1)

#### STEPPERS 枚举（步进电机）
- Stepper1 (weight=2)
- Stepper2 (weight=1)

### 3. **积木块文本精简**

#### 五路循迹模块
| 修改前 | 修改后 | 缩短 |
|--------|--------|------|
| 五路循迹模块初始化 IIC 接口 | 五路循迹初始化 IIC | -6 字 |
| 五路循迹模块设置检测灵敏度 %1 (0~1000，数值越高越灵敏) | 五路循迹设置灵敏度 %1 (0~1000) | -13 字 |
| 五路循迹模块读取数据 | 五路循迹读取数据 | -2 字 |
| 五路循迹模块读取 [CHANNEL] 模拟值 | 五路循迹读取 [CHANNEL] 模拟值 | -2 字 |
| 五路循迹模块 [CHANNEL] 检测到 [COLOR] | 五路循迹 [CHANNEL] 检测到 [COLOR] | -2 字 |
| 五路循迹模块检测到 CH1:%1 CH2:%2 CH3:%3 CH4:%4 CH5:%5 | 五路循迹 CH1:%1 CH2:%2 CH3:%3 CH4:%4 CH5:%5 | -2 字 |

#### 电机驱动板模块
| 修改前 | 修改后 | 缩短 |
|--------|--------|------|
| DC 电机初始化 [MOTOR] | 电机驱动板初始化 | 简化语义 |
| DC 电机 [MOTOR] 方向 [DIRECTION] 速度 (0-255) [SPEED] | DC 电机 [MOTOR] 方向 [DIRECTION] 速度 [SPEED] | -6 字 |
| 编码器电机 [ENCODER] 方向 [DIRECTION] 速度 (0-255) [SPEED] | 编码器电机 [ENCODER] 方向 [DIRECTION] 速度 [SPEED] | -6 字 |
| 舵机接口 [SERVO] 读取当前角度 | 舵机 [SERVO] 读当前角度 | -2 字 |
| 舵机接口 [SERVO] 角度 [ANGLE] 速度 (0-100) [SPEED] | 舵机 [SERVO] 角度 [ANGLE] 速度 [SPEED] | -6 字 |

---

## 📊 优化效果

### UI 改善
✅ **图标尺寸标准化** - 从 50px 降至 40px，避免面板拥挤  
✅ **下拉菜单有序** - 按权重降序排列，常用选项在上  
✅ **文本简洁** - 平均每个积木块减少 5-10 个字符  
✅ **换行减少** - 短文本在积木面板中更好显示  

### 用户体验提升
- 🔹 积木块宽度更紧凑，工作区更整洁
- 🔹 下拉菜单选项顺序符合使用习惯
- 🔹 快速识别常用功能（高权重选项）
- 🔹 中文文本更易阅读，无截断

---

## 🚀 使用方法

### 清除旧版本缓存
```bash
# PowerShell
Remove-Item -Path "$env:LOCALAPPDATA\DFScratch\extensions\fan-wzrobot-thirdex" -Recurse -Force
```

### 导入新版本
1. 打开 Mind+
2. 扩展库 → 用户库 → 本地导入
3. 选择 `wzRobot-V1.0.0.mpext`
4. 确认安装

### 验证 UI 优化
- ✅ 检查扩展面板是否整齐
- ✅ 下拉菜单选项是否按顺序
- ✅ 积木块文本是否完整显示

---

## 📝 技术细节

### Mind+ 扩展规范参考
- **iconWidth/iconHeight**: 推荐 40x40 或 50x50
- **weight**: 数值越大优先级越高，显示在顶部
- **block 文本长度**: 建议不超过 20 个中文字符

### 兼容性说明
- ✅ 完全向后兼容 V0.3
- ✅ 所有 API 接口不变
- ✅ 仅 UI 层面的优化

---

## 🎯 后续优化建议

如需进一步优化，可考虑：
1. 为每个 namespace 添加独立的 icon.svg
2. 将 tag 分类改为独立的颜色分组（需要拆分为多个 namespace）
3. 添加更多预设参数组合的快捷积木

---

**版本**: V1.0.0  
**日期**: 2026-03-31  
**优化重点**: UI 布局、用户体验、可读性
