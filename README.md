# wzRobot 综合驱动库

Sentry2视觉传感器 + 五路循迹传感器 + 电机驱动板

## 组成模块

| 模块 | 来源 | 说明 |
|------|------|------|
| Sentry2 | [AITosee/ext-sentry](https://github.com/AITosee/ext-sentry) | 视觉传感器（颜色/线条/Blob/卡片/二维码/人脸等） |
| EM_five_tracker_v3 | emakefun | 五路循迹传感器 V3 |
| MotorDriverBoard | emakefun | 电机驱动板（DC/编码器/步进/舵机） |

## 打包

运行以下命令将三个模块合并为 `wzRobot-V0.0.2.mpext`：

```bash
python build.py
```

## 许可证

MIT
