#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""修复 main.ts 中的重复枚举定义"""
import os

file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'arduinoC', 'main.ts')

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 找到重复枚举定义的范围（从第 685 行到第 808 行）
# 行号从 1 开始，列表索引从 0 开始
start_idx = 684  # 第 685 行
end_idx = 808    # 第 808 行

# 删除重复的行
new_lines = lines[:start_idx] + lines[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f'[OK] 已删除重复枚举定义')
print(f'     文件从 {len(lines)} 行缩减到 {len(new_lines)} 行')
