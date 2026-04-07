# Qwen3.6 Plus Preview 模型配置指南

## 📋 模型信息

- **模型名称**: Qwen3.6 Plus Preview
- **模型ID**: `qwen/qwen3.6-plus-preview:free`
- **提供商**: OpenRouter (阿里云通义千问)
- **Base URL**: `https://openrouter.ai/api/v1`
- **状态**: ✅ 限时免费（截至2026年4月3日）

## 🚀 核心特性

- ✅ **100万token上下文窗口** - 可处理超大型代码库或文档
- ✅ **强制思维链推理** - 提升复杂问题准确性
- ✅ **原生工具调用** - 支持函数调用、代码执行等
- ✅ **全栈代码能力** - 前端到后端的完整支持
- ✅ **结构化输出** - 支持JSON等格式输出
- ✅ **最大输出32,000 tokens**

## ⚙️ 配置步骤

### 第一步：获取OpenRouter API密钥

1. 访问 [OpenRouter官网](https://openrouter.ai/)
2. 注册/登录账号（支持GitHub/Google快捷登录）
3. 点击右上角头像 → 选择 "Keys"
4. 点击 "Create Key" 创建新密钥
5. **复制并保存密钥**（⚠️ 只显示一次！）

### 第二步：在Lingma IDE中配置

#### 方法A：通过IDE界面配置（推荐）

1. 打开Lingma IDE
2. 在聊天视图中找到**模型选择器**
3. 点击 **"Manage Models"** 或 **"添加自定义模型"**
4. 选择 **"BYOK (Bring Your Own Key)"** 入口
5. 填写以下信息：
   ```
   提供商名称: OpenRouter
   Base URL: https://openrouter.ai/api/v1
   API Key: [您的OpenRouter密钥]
   模型ID: qwen/qwen3.6-plus-preview:free
   显示名称: Qwen3.6 Plus Preview
   ```
6. 保存配置

#### 方法B：使用配置文件

本项目已创建配置文件 `.lingma/models.json`，您只需：

1. 确保已在系统环境变量中设置API密钥：
   ```powershell
   # Windows PowerShell
   $env:OPENROUTER_API_KEY="sk-or-v1-your-key-here"
   ```

2. 或在项目根目录的 `.env` 文件中设置（已创建）

3. 重启Lingma IDE使配置生效

### 第三步：验证配置

1. 打开Lingma聊天面板
2. 在模型选择器中选择 "Qwen3.6 Plus Preview"
3. 发送测试消息："你好，请介绍一下你自己"
4. 确认能正常收到回复

## 💡 使用建议

### 适用场景

- 📝 **大型代码库分析** - 利用100万token上下文
- 🔧 **复杂编程任务** - 全栈开发、架构设计
- 🐛 **深度调试** - 长上下文错误追踪
- 📚 **文档生成** - 基于大量代码生成文档
- 🤖 **Agent工作流** - 需要工具调用的场景

### 注意事项

⚠️ **重要提醒**：
1. **数据安全**：OpenRouter会收集prompts和completions用于模型改进，请勿上传敏感数据
2. **时效性**：免费体验截止到2026年4月3日，之后可能转为付费模式
3. **API密钥安全**：切勿将API密钥提交到Git仓库
4. **速率限制**：虽然是免费模型，但可能有调用频率限制

### 性能优化

- 对于简单任务，可使用更轻量的模型以节省配额
- 利用超长上下文优势，一次性提供完整代码库
- 启用工具调用功能以获得更好的编码辅助

## 🔧 故障排查

### 问题1：模型未出现在选择器中

**解决方案**：
- 检查配置文件路径是否正确：`.lingma/models.json`
- 确认JSON格式无误
- 重启Lingma IDE

### 问题2：API调用失败

**解决方案**：
- 验证API密钥是否正确
- 检查网络连接（可能需要科学上网访问OpenRouter）
- 确认Base URL为 `https://openrouter.ai/api/v1`（不要加 `/chat/completions`）

### 问题3：返回404错误

**解决方案**：
- 确保模型ID完全正确：`qwen/qwen3.6-plus-preview:free`
- 注意必须包含 `:free` 后缀

## 📊 与其他平台对比

| 特性 | OpenRouter | 阿里云百炼 |
|------|-----------|----------|
| 价格 | ✅ 限时免费 | 有免费版 |
| 需要信用卡 | ❌ 不需要 | ✅ 需要 |
| 中文支持 | ✅ 优秀 | ✅ 优秀 |
| 访问速度 | ✅ 快 | ✅ 快 |
| 配置复杂度 | ⭐ 简单 | ⭐⭐ 中等 |

## 🔗 相关链接

- [OpenRouter官网](https://openrouter.ai/)
- [Qwen3.6 Plus预览版页面](https://openrouter.ai/qwen/qwen3.6-plus-preview:free)
- [通义千问官方文档](https://help.aliyun.com/zh/lingma/)

## 📝 更新日志

- **2026-04-06**: 创建配置指南，添加models.json配置文件
- 模型免费期至2026年4月3日（可能已过期，请确认当前状态）

---

**提示**：如果您发现免费期已结束，可以考虑：
1. 等待阿里云的下一个免费活动
2. 使用其他免费模型（如MiMo V2、Gemini Flash等）
3. 付费使用Qwen3.6 Plus（原价4元/百万输入tokens）
