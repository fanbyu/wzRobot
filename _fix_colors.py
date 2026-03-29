import re

with open('arduinoC/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all namespace start positions
ns_pattern = r'namespace (five_tracker_V3|motor_driver|sentry2)'
ns_positions = []
for m in re.finditer(ns_pattern, content):
    ns_positions.append((m.start(), m.group(1)))

# Determine color for each namespace
color_map = {
    'five_tracker_V3': '#409EFF',
    'motor_driver': '#E6A23C',
    'sentry2': '#F56C6C',
}

# For each namespace, find its block range
for i, (start_pos, ns_name) in enumerate(ns_positions):
    color = color_map[ns_name]
    
    # End position is the start of the next namespace or end of file
    if i + 1 < len(ns_positions):
        end_pos = ns_positions[i + 1][0]
    else:
        end_pos = len(content)
    
    ns_block = content[start_pos:end_pos]
    
    # Add color to blockType lines that don't have color=
    pattern = r'(    //% block="[^"]*"\s+)blockType='
    
    def add_color(match, c=color):
        return match.group(1) + 'color="' + c + '" blockType='
    
    new_block = re.sub(pattern, add_color, ns_block)
    
    # Check if anything changed
    if new_block != ns_block:
        added = len(re.findall(r'color="' + color + '"', new_block)) - len(re.findall(r'color="' + color + '"', ns_block))
        print('Namespace ' + ns_name + ': +' + str(added) + ' colored blocks')
    
    content = content[:start_pos] + new_block + content[end_pos:]

with open('arduinoC/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)

total_colored = len(re.findall(r'color="#[0-9A-Fa-f]+" blockType=', content))
print('Total colored blocks: ' + str(total_colored))
