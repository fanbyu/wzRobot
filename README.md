# wzRobot 综合驱动库

Sentry2视觉传感器 + 五路循迹传感器 + 电机驱动板

## 组成模块

| 模块 | 来源 | 说明 |
|------|------|------|
| Sentry2 | [AITosee/ext-sentry](https://github.com/AITosee/ext-sentry) | 视觉传感器（颜色/线条/Blob/卡片/二维码/人脸等） |
| EM_five_tracker_v3 | emakefun | 五路循迹传感器 V3 |
| MotorDriverBoard | emakefun | 电机驱动板（DC/编码器/步进/舵机） |

## 积木分类标签

由于 Mind+ 中单个 `.mpext` 扩展包只能使用一种分类颜色，三类积木通过 `blockType="tag"` 在每个 namespace 开头添加了分类标签，在积木面板中以文字标签形式视觉分隔：

| 分类标签 | namespace | 颜色 |
|----------|-----------|------|
| 五路循迹V3 | `five_tracker_V3` | `#409EFF` 蓝色 |
| 电机驱动板 | `motor_driver` | `#E6A23C` 橙色 |
| Sentry2 视觉 | `sentry2` | `#F56C6C` 红色 |

> 需要 Mind+ 1.8.0 RC3.0 及以上版本支持 `blockType="tag"`（category label）。

备忘：
 Mind+ 不支持在单个 main.ts 中使用多个命名空间进行代码生成 — 只有第一个命名空间（five_tracker_V3）的代码生成器被正确注册。

解决方案：将三个模块合并到一个命名空间下，用 blockType="tag" 做视觉分组

## 打包

运行以下命令打包为 `wzRobot-V0.0.3.mpext`：

```bash
python build.py
```
commit 89c153e
fix: 修复电机驱动和Sentry2编译问题

- 电机驱动: 使用addInclude+addObject分离代码生成
- Sentry2: 所有函数添加#include <Sentry.h>
- 库打包: 使用libraries.zip统一打包所有库
- 添加.gitignore排除样例目录
- 添加repack_libs.py精简打包脚本

## 许可证

MIT
