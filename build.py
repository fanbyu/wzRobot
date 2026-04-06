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
    """从 config.json 收集文件并复制到 build 目录，模拟 Mind+ 自动扫描"""
    config_path = os.path.join(WZROBOT_DIR, 'config.json')
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)

    arduinoC_src = os.path.join(WZROBOT_DIR, 'arduinoC')
    arduinoC_dst = os.path.join(OUTPUT_DIR, 'arduinoC')

    # 复制 config.json
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    shutil.copy2(config_path, os.path.join(OUTPUT_DIR, 'config.json'))

    copied = []
    # 需要复制的子目录（与 Mind+ 自动扫描一致）
    asset_dirs = ['_menus', '_locales', '_images']
    for dirname in asset_dirs:
        src_dir = os.path.join(arduinoC_src, dirname)
        dst_dir = os.path.join(arduinoC_dst, dirname)
        if os.path.isdir(src_dir):
            shutil.copytree(src_dir, dst_dir, dirs_exist_ok=True)
            count = sum(len(files) for _, _, files in os.walk(dst_dir))
            copied.append(f'{dirname}/ ({count} files)')

    # 复制 libraries.zip 和解压后的库文件（确保 Mind+ 能找到）
    libraries_src = os.path.join(arduinoC_src, 'libraries')
    libraries_dst = os.path.join(arduinoC_dst, 'libraries')
    if os.path.isdir(libraries_src):
        # 复制整个 libraries 目录
        shutil.copytree(libraries_src, libraries_dst, dirs_exist_ok=True)
        
        # 如果存在 libraries.zip，也解压它
        libraries_zip = os.path.join(libraries_dst, 'libraries.zip')
        if os.path.exists(libraries_zip):
            try:
                import zipfile
                with zipfile.ZipFile(libraries_zip, 'r') as zip_ref:
                    zip_ref.extractall(libraries_dst)
                print('[OK] 已解压 libraries.zip')
            except Exception as e:
                print(f'[WARNING] 解压 libraries.zip 失败: {e}')
        
        copied.append('libraries/')

    # 复制 main.ts
    main_ts_src = os.path.join(arduinoC_src, 'main.ts')
    shutil.copy2(main_ts_src, os.path.join(arduinoC_dst, 'main.ts'))

    print(f'[OK] 已复制: main.ts, {", ".join(copied)}')
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
