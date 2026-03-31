"""
wzRobot 综合驱动库打包脚本
将项目目录内容打包为 .mpext 扩展包
"""
import json
import os
import shutil
import zipfile

WZROBOT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(WZROBOT_DIR, 'build')


def collect_files():
    """从 config.json 收集文件列表并复制到 build 目录"""
    config_path = os.path.join(WZROBOT_DIR, 'config.json')
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)

    # 复制 config.json
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    shutil.copy2(config_path, os.path.join(OUTPUT_DIR, 'config.json'))

    # 复制所有文件
    files = config['asset']['arduinoC'].get('files', [])
    copied = []
    if files:
        # 使用 files 列表
        for file_path in files:
            src = os.path.join(WZROBOT_DIR, 'arduinoC', file_path)
            dst = os.path.join(OUTPUT_DIR, 'arduinoC', file_path)
            if os.path.exists(src):
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(src, dst)
                copied.append(file_path)
            else:
                print(f'  [WARN] 文件不存在: {file_path}')
    else:
        # 复制整个 arduinoC 目录
        src_dir = os.path.join(WZROBOT_DIR, 'arduinoC')
        dst_dir = os.path.join(OUTPUT_DIR, 'arduinoC')
        for root, dirs, filenames in os.walk(src_dir):
            for filename in filenames:
                src = os.path.join(root, filename)
                rel_path = os.path.relpath(src, src_dir)
                dst = os.path.join(dst_dir, rel_path)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(src, dst)
                copied.append(rel_path)

    # 复制 main.ts（不在 files 列表中但需要）
    main_ts_src = os.path.join(WZROBOT_DIR, 'arduinoC', 'main.ts')
    main_ts_dst = os.path.join(OUTPUT_DIR, 'arduinoC', 'main.ts')
    shutil.copy2(main_ts_src, main_ts_dst)

    print(f'[OK] 已复制 {len(copied)} 个资源文件 + main.ts')
    return config


def pack_mpext(config):
    """打包为 .mpext（zip 格式）"""
    version = config.get('version', 'unknown')
    output_name = f'wzRobot-V{version}.mpext'
    output_file = os.path.join(WZROBOT_DIR, output_name)

    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(OUTPUT_DIR):
            for file in files:
                abs_path = os.path.join(root, file)
                arcname = os.path.relpath(abs_path, OUTPUT_DIR).replace('\\', '/')
                zf.write(abs_path, arcname)

    size_kb = os.path.getsize(output_file) / 1024
    print(f'[OK] 打包完成: {output_name} ({size_kb:.1f} KB)')


def clean_tmp():
    """清理临时 build 目录"""
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)


def main():
    print('=' * 50)
    print('wzRobot 综合驱动库打包工具')
    print('=' * 50)
    print()

    clean_tmp()
    config = collect_files()
    pack_mpext(config)
    clean_tmp()

    print()
    print('打包完成！')


if __name__ == '__main__':
    main()
