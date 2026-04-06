# GitHub 上传指南 - V0.3.9

**版本**: V0.3.9  
**分支**: yiqichuangv0.3.9  
**仓库**: https://github.com/fanbyu/wzRobot

---

## 📋 上传前准备

### 需要上传的文件和目录

```
wzRobot-yiqichuangv0.3.6/
├── config.json                          # ✅ 扩展配置（版本 0.3.9）
├── build.py                             # ✅ 打包脚本
├── check_portability.py                 # ✅ 可移植性检查工具
├── generate_precompiled.py              # ✅ 预编译文件生成工具
├── wzRobot-V0.3.9.mpext                # ✅ 生成的扩展包 (534.1 KB)
│
├── *.md                                 # ✅ 所有文档
│   ├── README.md
│   ├── wzRobot扩展开发完全指南.md
│   ├── Mind+扩展开发避坑指南.md
│   ├── 项目使用指南.md
│   └── 文档索引.md
│
└── arduinoC/                            # ✅ 扩展源码目录
    ├── main.ts                          # 积木定义和代码生成
    ├── _menus/                          # 下拉菜单配置
    │   └── arduino.json
    ├── _locales/                        # 多语言支持
    │   └── zh-cn.json
    ├── _images/                         # 图标文件
    │   ├── icon.svg
    │   └── featured.png
    └── libraries/                       # Arduino 库文件
        ├── InfraredTracking/            # 五路循迹传感器
        ├── RgbUltrasonic/               # RGB超声波模块
        ├── RGB_LED/                     # RGB LED控制
        ├── Sentry-Arduino/              # Sentry2视觉传感器
        └── Emakefun_MotorDriver/        # 电机驱动板
```

**总大小**: ~5 MB

---

## 🔧 上传方法（3种选择）

### 方法 1: 使用 GitHub Desktop（推荐）⭐

#### 步骤：

1. **下载并安装 GitHub Desktop**
   - 访问: https://desktop.github.com/
   - 安装后登录 GitHub 账号

2. **克隆仓库**
   ```
   File → Clone repository
   URL: https://github.com/fanbyu/wzRobot
   Local path: 选择本地路径
   ```

3. **复制文件**
   - 将 `wzRobot-yiqichuangv0.3.6/` 中的所有文件复制到克隆的仓库目录
   - 覆盖现有文件

4. **提交更改**
   ```
   Summary: "Update to V0.3.9 - Fix precompiled files and library structure"
   Description: 
   - Fixed Sentry-Arduino library structure (keep src/ directory)
   - Added missing Emakefun_MotorDriver .o files (3 files)
   - Updated generate_precompiled.py to support multi-file compilation
   - Total 13 precompiled .o files now complete
   - Updated documentation
   ```

5. **推送到 GitHub**
   ```
   Click "Push origin"
   ```

6. **创建新分支**（如果需要）
   ```
   Branch → New branch
   Name: yiqichuangv0.3.9
   Publish branch
   ```

---

### 方法 2: 使用 Git 命令行

#### 前提条件
需要先安装 Git: https://git-scm.com/download/win

#### 步骤：

```bash
# 1. 进入项目目录
cd e:\03实验室\wzRobot\wzRobot

# 2. 初始化 Git（如果还没有）
git init

# 3. 添加远程仓库
git remote add origin https://github.com/fanbyu/wzRobot.git

# 4. 创建并切换到新分支
git checkout -b yiqichuangv0.3.9

# 5. 添加所有文件
git add .

# 6. 提交更改
git commit -m "Update to V0.3.9 - Fix precompiled files and library structure

- Fixed Sentry-Arduino library structure (keep src/ directory)
- Added missing Emakefun_MotorDriver .o files (3 files)
- Updated generate_precompiled.py to support multi-file compilation
- Total 13 precompiled .o files now complete
- Updated documentation
- Version: 0.3.9"

# 7. 推送到 GitHub
git push -u origin yiqichuangv0.3.9
```

---

### 方法 3: 通过 GitHub Web 界面（最简单但较慢）

#### 步骤：

1. **访问仓库**
   - 打开: https://github.com/fanbyu/wzRobot

2. **创建新分支**
   ```
   Click "master" or "main" branch dropdown
   Type: yiqichuangv0.3.9
   Click "Create branch: yiqichuangv0.3.9"
   ```

3. **上传文件**
   ```
   Click "Add file" → "Upload files"
   Drag and drop all files from wzRobot-yiqichuangv0.3.6/
   Wait for upload to complete
   ```

4. **提交更改**
   ```
   Commit message: "Update to V0.3.9"
   Description: Fix precompiled files and library structure
   Click "Commit changes"
   ```

**注意**: Web 界面上传大文件可能较慢，建议使用方法 1 或 2。

---

## ✅ 上传后验证

### 1. 检查文件结构

访问: https://github.com/fanbyu/wzRobot/tree/yiqichuangv0.3.9

确认以下文件存在：
- ✅ config.json（version: 0.3.9）
- ✅ wzRobot-V0.3.9.mpext
- ✅ arduinoC/main.ts
- ✅ arduinoC/libraries/（包含5个库）
- ✅ 所有 .md 文档

### 2. 检查版本号

打开 `config.json`，确认：
```json
{
  "version": "0.3.9",
  "asset": {
    "arduinoC": {
      "version": "0.3.9"
    }
  }
}
```

### 3. 测试下载

```bash
# 下载扩展包
curl -L -o wzRobot-V0.3.9.mpext \
  https://github.com/fanbyu/wzRobot/raw/yiqichuangv0.3.9/wzRobot-V0.3.9.mpext

# 验证文件大小
ls -lh wzRobot-V0.3.9.mpext  # 应该约 534 KB
```

---

## 📝 V0.3.9 更新说明

### 主要修复

1. **Sentry-Arduino 库**
   - ✅ 保持 `src/` 目录结构（不可展平）
   - ✅ 生成全部 6 个预编译 .o 文件
   - ✅ 解决 `hardware/hw_conf.h` 找不到问题

2. **Emakefun_MotorDriver 库**
   - ✅ 补全缺失的 3 个预编译文件
   - ✅ Emakefun_MS_PWMServoDriver.cpp.o
   - ✅ MsTimer2.cpp.o
   - ✅ PID_v1.cpp.o

3. **工具链改进**
   - ✅ 更新 `generate_precompiled.py` 支持多文件编译
   - ✅ 添加 Emakefun_MotorDriver 配置
   - ✅ 完善文档说明

### 预编译文件统计

| 库名称 | .o 文件数量 | 总大小 |
|--------|-----------|--------|
| InfraredTracking | 1 | ~20 KB |
| RgbUltrasonic | 1 | ~24 KB |
| RGB_LED | 1 | ~28 KB |
| Sentry-Arduino | 6 | ~214 KB |
| Emakefun_MotorDriver | 4 | ~109 KB |
| **总计** | **13** | **~395 KB** |

---

## 🚀 快速命令参考

### 如果使用 Git 命令行

```bash
# 查看当前分支
git branch

# 查看所有更改
git status

# 查看差异
git diff

# 撤销暂存
git reset HEAD <file>

# 强制推送（谨慎使用）
git push -f origin yiqichuangv0.3.9
```

### 如果使用 GitHub Desktop

```
Repository → Show in Explorer    # 在文件管理器中打开
Repository → Open in Terminal    # 在终端中打开
Branch → Compare on GitHub       # 在浏览器中比较
```

---

## ⚠️ 注意事项

1. **不要上传敏感信息**
   - ❌ 不要上传 `.env` 文件
   - ❌ 不要上传 API keys
   - ❌ 不要上传个人配置文件

2. **检查 .gitignore**
   确保以下文件被忽略：
   ```
   build/
   cache/
   *.tmp
   Thumbs.db
   ```

3. **大文件处理**
   - `wzRobot-V0.3.9.mpext` (534 KB) - 可以正常上传
   - 如果单个文件超过 100 MB，需要使用 Git LFS

4. **分支命名**
   - 分支名: `yiqichuangv0.3.9`
   - 遵循语义化版本: `yiqichuang + 版本号`

---

## 📞 遇到问题？

### 常见问题

**Q: 推送失败，提示权限错误**
```
A: 检查 GitHub 账号是否已登录
   检查是否有仓库写入权限
   尝试重新认证: git credential-manager configure
```

**Q: 冲突错误**
```
A: 先拉取最新代码: git pull origin yiqichuangv0.3.9
   解决冲突后再次推送
```

**Q: 文件太大无法上传**
```
A: 使用 Git LFS: git lfs install
   跟踪大文件: git lfs track "*.mpext"
```

---

## 🎯 完成检查清单

- [ ] 所有文件已复制到仓库目录
- [ ] config.json 版本号为 0.3.9
- [ ] 提交了更改并添加了描述
- [ ] 推送到 yiqichuangv0.3.9 分支
- [ ] 在 GitHub 上验证文件完整性
- [ ] 测试下载扩展包
- [ ] 更新 README 中的版本信息（如果需要）

---

**祝上传顺利！** 🚀

如有问题，请查看 GitHub 文档: https://docs.github.com/en/repositories
