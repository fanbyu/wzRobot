# 五路循迹模块 - Mind+ 用户库

## 简介

这是将 ext_five_sensor（自带库格式）迁移到用户库格式的版本。

## 文件结构

```
five_new_sensor/
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

1. **初始化** - 五路循线模块初始化IIC接口
2. **设置灵敏度** - 设置检测灵敏度 (0~1000)
3. **读取数据** - 读取传感器数据
4. **读取模拟值** - 读取指定通道的模拟值
5. **检测数字值** - 检测指定通道是否检测到白线/黑线
6. **多通道检测** - 同时检测5个通道的状态

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

本库需要依赖 InfraredTracking.h 库文件，已打包在 libraries.zip 中。

## 版本信息

- 版本：1.0.0
- 迁移日期：2026-03-31
- 原库：ext_five_sensor
- 新格式：Mind+ 用户库 (.mpext)

## 注意事项

如需导出分享，可在 Mind+ 中右键扩展库选择"导出用户库"。
