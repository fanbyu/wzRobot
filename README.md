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

## 打包

运行以下命令打包为 `wzRobot-V0.0.3.mpext`：

```bash
python build.py
```

## 许可证

MIT
