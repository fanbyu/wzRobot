"""
wzRobot 扩展可移植性检查和修复工具
确保所有库文件完整，可以在任何 Mind+ 环境中直接使用
"""
import os
import shutil
import json

WZROBOT_DIR = os.path.dirname(os.path.abspath(__file__))
LIBRARIES_DIR = os.path.join(WZROBOT_DIR, 'arduinoC', 'libraries')

# 需要的库列表及其必需文件
REQUIRED_LIBRARIES = {
    'InfraredTracking': {
        'files': ['InfraredTracking.h', 'InfraredTracking.cpp', 'library.properties'],
        'source_dirs': [
            os.path.join(LIBRARIES_DIR, 'line_tracker_V3'),
            os.path.join(LIBRARIES_DIR, 'InfraredTracking', 'src')
        ]
    },
    'RgbUltrasonic': {
        'files': ['RgbUltrasonic.h', 'RgbUltrasonic.cpp', 'library.properties'],
        'source_dirs': [
            os.path.join(LIBRARIES_DIR, 'rgb_ultrasound'),
            os.path.join(LIBRARIES_DIR, 'RgbUltrasonic', 'src')
        ]
    },
    'RGB_LED': {
        'files': ['RGBLed.h', 'RGBLed.cpp', 'library.properties'],
        'source_dirs': [
            os.path.join(LIBRARIES_DIR, 'RGB_LED')
        ]
    },
    'Emakefun_MotorDriver': {
        'files': ['Emakefun_MotorDriver.h', 'Emakefun_MotorDriver.cpp', 'library.properties'],
        'source_dirs': [
            os.path.join(LIBRARIES_DIR, 'Emakefun_MotorDriver'),
            os.path.join(LIBRARIES_DIR, 'motordriverboard')
        ]
    },
    'Sentry-Arduino': {
        'files': ['Sentry.h', 'SentryFactory.cpp', 'sentry_i2c.cpp', 'sentry_uart.cpp', 'library.properties'],
        'source_dirs': [
            os.path.join(LIBRARIES_DIR, 'Sentry-Arduino')
        ]
    }
}


def check_library_completeness(lib_name, lib_info):
    """检查库文件是否完整"""
    lib_dir = os.path.join(LIBRARIES_DIR, lib_name)
    
    print(f"\n{'='*60}")
    print(f"检查库: {lib_name}")
    print(f"{'='*60}")
    
    if not os.path.exists(lib_dir):
        print(f"❌ 库目录不存在: {lib_dir}")
        return False
    
    missing_files = []
    for required_file in lib_info['files']:
        # 检查根目录
        file_path = os.path.join(lib_dir, required_file)
        # 检查 src 子目录
        src_file_path = os.path.join(lib_dir, 'src', required_file)
        
        if os.path.exists(file_path):
            print(f"✅ {required_file} (根目录)")
        elif os.path.exists(src_file_path):
            print(f"⚠️  {required_file} (src/子目录)")
        else:
            print(f"❌ {required_file} 缺失")
            missing_files.append(required_file)
    
    if missing_files:
        print(f"\n⚠️  缺失文件: {', '.join(missing_files)}")
        return False
    else:
        print(f"✅ 所有必需文件都存在")
        return True


def create_library_properties(lib_name, lib_info):
    """创建或更新 library.properties 文件"""
    lib_dir = os.path.join(LIBRARIES_DIR, lib_name)
    prop_file = os.path.join(lib_dir, 'library.properties')
    
    # 如果已存在，跳过
    if os.path.exists(prop_file):
        print(f"ℹ️  library.properties 已存在")
        return
    
    # 根据库名生成配置
    configs = {
        'InfraredTracking': {
            'name': 'InfraredTracking',
            'version': '1.0.0',
            'author': 'fan',
            'maintainer': 'fff1969@foxmail.com',
            'sentence': 'Five-channel infrared line tracking sensor driver for I2C',
            'paragraph': 'Provides easy-to-use API for reading analog and digital values from 5-channel infrared line tracking sensors via I2C protocol.',
            'category': 'Sensors',
            'url': 'https://github.com/fan/wzRobot',
            'architectures': '*',
            'includes': 'InfraredTracking.h'
        },
        'RgbUltrasonic': {
            'name': 'RgbUltrasonic',
            'version': '1.0.0',
            'author': 'fan',
            'maintainer': 'fan',
            'sentence': 'RGB Ultrasonic sensor with LED control',
            'paragraph': 'Drive RGB ultrasonic module with distance measurement and RGB LED control.',
            'category': 'Sensors',
            'url': 'https://github.com/fan/wzRobot',
            'architectures': '*',
            'includes': 'RgbUltrasonic.h'
        },
        'RGB_LED': {
            'name': 'RGB_LED',
            'version': '1.0.0',
            'author': 'fan',
            'maintainer': 'fan',
            'sentence': 'RGB LED control library',
            'paragraph': 'Control RGB LED strips and individual LEDs with various effects.',
            'category': 'Display',
            'url': 'https://github.com/fan/wzRobot',
            'architectures': '*',
            'includes': 'RGBLed.h'
        },
        'Emakefun_MotorDriver': {
            'name': 'Emakefun_MotorDriver',
            'version': '1.0.0',
            'author': 'fan',
            'maintainer': 'fan',
            'sentence': 'Motor driver library for wzRobot',
            'paragraph': 'Control DC motors, servos, stepper motors and encoders.',
            'category': 'Device Control',
            'url': 'https://github.com/fan/wzRobot',
            'architectures': '*',
            'includes': 'Emakefun_MotorDriver.h'
        },
        'Sentry-Arduino': {
            'name': 'Sentry-Arduino',
            'version': '1.0.0',
            'author': 'fan',
            'maintainer': 'fan',
            'sentence': 'DFRobot Sentry2 vision sensor library',
            'paragraph': 'Drive DFRobot Sentry2 AI vision sensor with multiple vision algorithms.',
            'category': 'Sensors',
            'url': 'https://github.com/fan/wzRobot',
            'architectures': '*',
            'includes': 'Sentry.h'
        }
    }
    
    config = configs.get(lib_name)
    if not config:
        print(f"⚠️  未知库: {lib_name}，使用默认配置")
        config = {
            'name': lib_name,
            'version': '1.0.0',
            'author': 'fan',
            'sentence': f'{lib_name} library',
            'paragraph': f'Drive {lib_name} module.',
            'category': 'Other',
            'url': 'https://github.com/fan/wzRobot',
            'architectures': '*',
            'includes': f'{lib_name}.h'
        }
    
    # 写入文件（使用Windows换行符）
    lines = []
    for key, value in config.items():
        lines.append(f"{key}={value}")
    
    content = '\r\n'.join(lines) + '\r\n'
    
    with open(prop_file, 'w', encoding='ascii', newline='') as f:
        f.write(content)
    
    print(f"✅ 已创建 library.properties")


def ensure_cpp_files(lib_name, lib_info):
    """确保 .cpp 文件存在（从源目录复制）"""
    lib_dir = os.path.join(LIBRARIES_DIR, lib_name)
    
    # 检查是否需要复制 .cpp 文件
    cpp_needed = [f for f in lib_info['files'] if f.endswith('.cpp')]
    
    for cpp_file in cpp_needed:
        # 检查根目录
        if os.path.exists(os.path.join(lib_dir, cpp_file)):
            continue
        
        # 尝试从源目录复制
        copied = False
        for source_dir in lib_info['source_dirs']:
            source_file = os.path.join(source_dir, cpp_file)
            if os.path.exists(source_file):
                shutil.copy2(source_file, os.path.join(lib_dir, cpp_file))
                print(f"✅ 已从 {source_dir} 复制 {cpp_file}")
                copied = True
                break
        
        if not copied:
            print(f"❌ 无法找到 {cpp_file} 的源文件")


def flatten_library_structure(lib_name):
    """将 src/ 子目录的文件扁平化到根目录"""
    lib_dir = os.path.join(LIBRARIES_DIR, lib_name)
    src_dir = os.path.join(lib_dir, 'src')
    
    if not os.path.exists(src_dir):
        return
    
    print(f"📁 展平 {lib_name}/src/ 目录...")
    
    # 复制 src/ 中的所有文件到根目录
    for file in os.listdir(src_dir):
        src_file = os.path.join(src_dir, file)
        dst_file = os.path.join(lib_dir, file)
        
        if os.path.isfile(src_file):
            if not os.path.exists(dst_file):
                shutil.copy2(src_file, dst_file)
                print(f"  ✅ 复制 {file} 到根目录")
            else:
                print(f"  ℹ️  {file} 已存在，跳过")


def main():
    print("=" * 60)
    print("wzRobot 扩展可移植性检查和修复工具")
    print("=" * 60)
    
    all_ok = True
    
    for lib_name, lib_info in REQUIRED_LIBRARIES.items():
        print(f"\n{'='*60}")
        print(f"处理库: {lib_name}")
        print(f"{'='*60}")
        
        # 1. 展平目录结构
        flatten_library_structure(lib_name)
        
        # 2. 确保 .cpp 文件存在
        ensure_cpp_files(lib_name, lib_info)
        
        # 3. 创建 library.properties
        create_library_properties(lib_name, lib_info)
        
        # 4. 检查完整性
        if not check_library_completeness(lib_name, lib_info):
            all_ok = False
    
    print(f"\n{'='*60}")
    if all_ok:
        print("✅ 所有库文件完整，扩展具有完全可移植性！")
    else:
        print("⚠️  部分库文件不完整，请手动修复")
    print(f"{'='*60}")
    
    # 生成报告
    generate_report()


def generate_report():
    """生成可移植性报告"""
    report_file = os.path.join(WZROBOT_DIR, '可移植性检查报告.md')
    
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("# wzRobot 扩展可移植性检查报告\n\n")
        f.write(f"生成时间: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        f.write("## 📋 检查项目\n\n")
        f.write("| 检查项 | 状态 | 说明 |\n")
        f.write("|--------|------|------|\n")
        
        # 检查 libraries.zip
        zip_exists = os.path.exists(os.path.join(LIBRARIES_DIR, 'libraries.zip'))
        f.write(f"| libraries.zip 存在 | {'✅' if zip_exists else '❌'} | 用于自动解压库文件 |\n")
        
        # 检查每个库
        for lib_name in REQUIRED_LIBRARIES.keys():
            lib_dir = os.path.join(LIBRARIES_DIR, lib_name)
            has_props = os.path.exists(os.path.join(lib_dir, 'library.properties'))
            f.write(f"| {lib_name}/library.properties | {'✅' if has_props else '❌'} | 库元数据配置 |\n")
        
        f.write("\n## 🔧 修复建议\n\n")
        f.write("1. 确保所有库都有 `library.properties` 文件\n")
        f.write("2. 确保 .h 和 .cpp 文件在同一目录（不要放在 src/ 子目录）\n")
        f.write("3. 保持 `libraries.zip` 最新，包含所有库文件\n")
        f.write("4. 每次修改库文件后重新运行此脚本\n")
        
        f.write("\n## 📦 打包前检查清单\n\n")
        f.write("- [ ] 所有库文件完整（.h + .cpp + library.properties）\n")
        f.write("- [ ] libraries.zip 已更新\n")
        f.write("- [ ] 运行 build.py 重新打包\n")
        f.write("- [ ] 在干净的 Mind+ 环境中测试导入\n")
    
    print(f"\n📄 报告已生成: {report_file}")


if __name__ == '__main__':
    main()
