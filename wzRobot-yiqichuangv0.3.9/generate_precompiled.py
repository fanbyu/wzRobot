"""
Mind+ 库预编译文件生成工具
为指定的 Arduino 库生成 .o 预编译文件，用于 Mind+ 扩展
"""
import os
import subprocess
import sys

# Mind+ 安装路径（根据实际情况修改）
MIND_PLUS_DIR = r"E:\Program Files (x86)\Mind+\Arduino"
AVR_GCC = os.path.join(MIND_PLUS_DIR, "hardware", "tools", "avr", "bin", "avr-gcc.exe")
STATIC_LIB_DIR = os.path.join(MIND_PLUS_DIR, "static", "libraries")
LIBRARIES_DIR = os.path.join(MIND_PLUS_DIR, "libraries")

# 编译参数
COMPILE_FLAGS = [
    "-c", "-g", "-Os", "-w", "-std=gnu++11", "-fpermissive",
    "-fno-exceptions", "-ffunction-sections", "-fdata-sections",
    "-fno-threadsafe-statics", "-MMD", "-flto",
    "-mmcu=atmega328p",
    "-DF_CPU=16000000L",
    "-DARDUINO=10804",
    "-DARDUINO_AVR_UNO",
    "-DARDUINO_ARCH_AVR"
]

# Include 路径
INCLUDE_PATHS = [
    os.path.join(MIND_PLUS_DIR, "hardware", "arduino", "avr", "cores", "arduino"),
    os.path.join(MIND_PLUS_DIR, "hardware", "arduino", "avr", "variants", "standard"),
    os.path.join(MIND_PLUS_DIR, "hardware", "arduino", "avr", "libraries", "Wire")
]


def compile_library(lib_name, cpp_files=None, extra_include_dirs=None):
    """
    为指定库生成预编译 .o 文件
    
    参数:
        lib_name: 库名称（文件夹名）
        cpp_files: .cpp 文件名列表（默认为 [lib_name.cpp]）
        extra_include_dirs: 额外的 include 目录列表
    """
    print(f"\n{'='*60}")
    print(f"Processing library: {lib_name}")
    print(f"{'='*60}")
    
    # 确定源文件列表
    if cpp_files is None:
        cpp_files = [f"{lib_name}.cpp"]
    elif isinstance(cpp_files, str):
        cpp_files = [cpp_files]
    
    lib_dir = os.path.join(LIBRARIES_DIR, lib_name)
    static_dir = os.path.join(STATIC_LIB_DIR, lib_name, "uno")
    
    # 创建输出目录
    os.makedirs(static_dir, exist_ok=True)
    
    success_count = 0
    total_files = len(cpp_files)
    
    for cpp_file in cpp_files:
        src_file = os.path.join(lib_dir, cpp_file)
        output_file = os.path.join(static_dir, f"{cpp_file}.o")
        
        if not os.path.exists(src_file):
            print(f"❌ Source file not found: {src_file}")
            continue
        
        # 构建编译命令
        cmd = [AVR_GCC] + COMPILE_FLAGS
        
        # 添加 include 路径
        for inc_path in INCLUDE_PATHS:
            cmd.extend(["-I", inc_path])
        
        # 添加库目录
        cmd.extend(["-I", lib_dir])
        
        # 添加额外依赖库的 include 路径
        if extra_include_dirs:
            for extra_dir in extra_include_dirs:
                cmd.extend(["-I", extra_dir])
        
        # 添加源文件和输出文件
        cmd.extend([src_file, "-o", output_file])
        
        # 执行编译
        try:
            result = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=30
            )
            
            if result.returncode == 0 and os.path.exists(output_file):
                file_size = os.path.getsize(output_file)
                print(f"✅ {cpp_file} ({file_size:,} bytes)")
                success_count += 1
            else:
                print(f"❌ {cpp_file} - Compilation failed")
                if result.stderr:
                    print(f"   Error: {result.stderr.decode('utf-8', errors='ignore')[:200]}")
        except Exception as e:
            print(f"❌ {cpp_file} - Exception: {str(e)}")
    
    print(f"\nResult: {success_count}/{total_files} files compiled")
    return success_count == total_files
    
    src_file = os.path.join(LIBRARIES_DIR, lib_name, cpp_file)
    
    if not os.path.exists(src_file):
        print(f"❌ Source file not found: {src_file}")
        return False
    
    # 创建输出目录
    output_dir = os.path.join(STATIC_LIB_DIR, lib_name, "uno")
    os.makedirs(output_dir, exist_ok=True)
    
    # 输出文件
    output_file = os.path.join(output_dir, cpp_file.replace('.cpp', '.cpp.o'))
    
    # 构建编译命令
    cmd = [AVR_GCC] + COMPILE_FLAGS
    
    # 添加 include 路径
    for inc_path in INCLUDE_PATHS:
        cmd.extend(["-I", inc_path])
    
    # 添加库目录
    cmd.extend(["-I", os.path.join(LIBRARIES_DIR, lib_name)])
    
    # 添加额外的 include 目录
    if extra_include_dirs:
        for extra_dir in extra_include_dirs:
            cmd.extend(["-I", extra_dir])
    
    # 源文件和输出文件
    cmd.extend([src_file, "-o", output_file])
    
    print(f"Source: {src_file}")
    print(f"Output: {output_file}")
    print(f"\nCompiling...")
    
    try:
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding='utf-8',
            errors='ignore'
        )
        
        if result.returncode == 0:
            if os.path.exists(output_file):
                size = os.path.getsize(output_file)
                print(f"✅ Success! Generated: {output_file}")
                print(f"   Size: {size:,} bytes")
                return True
            else:
                print(f"❌ Output file not created")
                return False
        else:
            print(f"❌ Compilation failed!")
            print(f"Error: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False


def main():
    """主函数"""
    print("="*60)
    print("Mind+ Library Precompilation Tool")
    print("="*60)
    
    # 检查 avr-gcc 是否存在
    if not os.path.exists(AVR_GCC):
        print(f"❌ avr-gcc not found: {AVR_GCC}")
        print("Please check your Mind+ installation path.")
        sys.exit(1)
    
    # 定义需要编译的库
    libraries = {
        'InfraredTracking': {
            'cpp_files': ['InfraredTracking.cpp'],
            'extra_includes': []
        },
        'RgbUltrasonic': {
            'cpp_files': ['RgbUltrasonic.cpp'],
            'extra_includes': [
                os.path.join(LIBRARIES_DIR, 'RGB_LED')  # 依赖 RGB_LED
            ]
        },
        'RGB_LED': {
            'cpp_files': ['RGBLed.cpp'],
            'extra_includes': []
        },
        'Emakefun_MotorDriver': {
            'cpp_files': [
                'Emakefun_MotorDriver.cpp',
                'Emakefun_MS_PWMServoDriver.cpp',
                'MsTimer2.cpp',
                'PID_v1.cpp'
            ],
            'extra_includes': [
                os.path.join(MIND_PLUS_DIR, 'hardware', 'arduino', 'avr', 'libraries', 'Servo')
            ]
        }
    }
    
    success_count = 0
    total_count = len(libraries)
    
    for lib_name, config in libraries.items():
        if compile_library(
            lib_name,
            cpp_files=config['cpp_files'],
            extra_include_dirs=config['extra_includes']
        ):
            success_count += 1
    
    # 总结
    print(f"\n{'='*60}")
    print(f"Summary: {success_count}/{total_count} libraries compiled successfully")
    print(f"{'='*60}")
    
    if success_count == total_count:
        print("\n✅ All libraries compiled successfully!")
    else:
        print(f"\n⚠️  {total_count - success_count} library/libraries failed to compile.")
        sys.exit(1)


if __name__ == '__main__':
    main()
