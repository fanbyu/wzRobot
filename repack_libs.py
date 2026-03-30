"""重新打包 libraries.zip，只包含必要的库文件"""
import zipfile
import os

libs_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'arduinoC', 'libraries')
zip_path = os.path.join(libs_dir, 'libraries.zip')

# 需要包含的库和文件
includes = {
    'line_tracker_V3': ['five_line_tracker_v3.h', 'five_line_tracker_v3.cpp'],
    'motordriverboard': [
        'Emakefun_MotorDriver.h', 'Emakefun_MotorDriver.cpp',
        'Emakefun_MS_PWMServoDriver.h', 'Emakefun_MS_PWMServoDriver.cpp',
        'MsTimer2.h', 'MsTimer2.cpp',
        'PID_v1.h', 'PID_v1.cpp',
        'PinChangeInt.h',
    ],
    'Sentry-Arduino': None,  # 整个 src 目录 + library.properties + keywords.txt
}

if os.path.exists(zip_path):
    os.remove(zip_path)

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for lib, files in includes.items():
        if files:
            for f in files:
                src = os.path.join(libs_dir, lib, f)
                arcname = f'{lib}/{f}'
                zf.write(src, arcname)
        else:
            # Sentry-Arduino: 只包含 src/ 目录和元数据文件
            src_dir = os.path.join(libs_dir, lib, 'src')
            for root, dirs, filenames in os.walk(src_dir):
                for fn in filenames:
                    full = os.path.join(root, fn)
                    rel = os.path.relpath(full, libs_dir).replace('\\', '/')
                    zf.write(full, rel)
            # library.properties
            zf.write(os.path.join(libs_dir, lib, 'library.properties'),
                     f'{lib}/library.properties')
            zf.write(os.path.join(libs_dir, lib, 'keywords.txt'),
                     f'{lib}/keywords.txt')

size_kb = os.path.getsize(zip_path) / 1024
print(f'[OK] libraries.zip 已重新打包 ({size_kb:.1f} KB)')
print(f'     包含 {sum(1 for _ in zipfile.ZipFile(zip_path).namelist())} 个文件')
