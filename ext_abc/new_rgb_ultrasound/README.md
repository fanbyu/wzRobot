# RGB 超声波模块 - Mind+ 用户库

## 简介

这是将 ext_rgb_ultrasound（自带库格式）迁移到用户库格式的版本。

超声波发射器向某一方向发射超声波，在发射时刻的同时计时器开始计时，途中碰到障碍物面阻挡就立即反射回来。

## 文件结构

```
new_rgb_ultrasound/
├── config.json                      # 扩展库配置
├── README.md                        # 说明文档
└── arduinoC/
    ├── main.ts                      # 积木定义与代码生成
    ├── _locales/
    │   └── zh-cn.json              # 中文翻译
    ├── _menus/
    │   └── arduino.json            # Arduino下拉菜单
    ├── _images/                     # 图标资源
    └── libraries/
        └── libraries.zip           # C++库文件
```

## 支持的积木

1. **引脚初始化** - RGB超声波模块引脚初始化 IO和RGB引脚设置
2. **设置颜色** - 设置RGB灯颜色和显示效果（呼吸、旋转、闪烁等）
3. **读取距离** - RGB超声波模块读取超声波距离

## 支持的硬件

- Arduino Uno
- Arduino Nano
- Arduino Mega2560
- ESP32

## 使用方法

1. 打开 Mind+ 软件
2. 点击"扩展"
3. 选择"用户库"
4. 点击"从本地导入"
5. 选择 `config.json` 文件
6. 积木将出现在"用户库"分类下

## 库说明

本库需要依赖 RgbUltrasonic.h 库文件，已打包在 libraries.zip 中。

## 版本信息

- 版本：1.0.0
- 迁移日期：2026-03-31
- 原库：ext_rgb_ultrasound
- 新格式：Mind+ 用户库 (.mpext)

## 注意事项

如需导出分享，可在 Mind+ 中右键扩展库选择"导出用户库"。
