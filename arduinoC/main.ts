enum INDEXPROBE {
    //% block="0"
    0,
    //% block="1"
    1,
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4
}

enum PINS {
    //% block="S1"
    S1,
    //% block="S2"
    S2,
    //% block="S3"
    S3,
    //% block="S4"
    S4,
    //% block="S5"
    S5,
    //% block="S6"
    S6,
    //% block="S7"
    S7,
    //% block="S8"
    S8
}

enum SERVOS {
    //% block="S1"
    S1 = 1,
    //% block="S2"
    S2,
    //% block="S3"
    S3,
    //% block="S4"
    S4,
    //% block="S5"
    S5,
    //% block="S6"
    S6,
    //% block="S7"
    S7,
    //% block="S8"
    S8
}

enum LEVELS {
    //% block="HIGH"
    HIGH,
    //% block="LOW"
    LOW
}

enum MOTORS {
    //% block="M1"
    M1 = 1,
    //% block="M2"
    M2,
    //% block="M3"
    M3,
    //% block="M4"
    M4
}

enum DIRECTIONS {
    //% block="FORWARD"
    FORWARD,
    //% block="BACKWARD"
    BACKWARD,
    //% block="BRAKE"
    BRAKE,
    //% block="RELEASE"
    RELEASE
}

enum STEPPER_DIRECTIONS {
    //% block="FORWARD"
    FORWARD,
    //% block="BACKWARD"
    BACKWARD
}

enum ENCODERS {
    //% block="Encoder1"
    Encoder1 = 1,
    //% block="Encoder2"
    Encoder2,
    //% block="Encoder3"
    Encoder3,
    //% block="Encoder4"
    Encoder4
}

enum STEPPERS {
    //% block="Stepper1"
    Stepper1 = 1,
    //% block="Stepper2"
    Stepper2
}

enum MODES {
    //% block="DOUBLE"
    DOUBLE = 1,
    //% block="SINGLE"
    SINGLE,
    //% block="INTERLEAVE"
    INTERLEAVE
}

enum PIN_IO {
    //% block="1"
    PIN_1,
    //% block="2"
    PIN_2,
    //% block="3"
    PIN_3,
    //% block="4"
    PIN_4,
    //% block="5"
    PIN_5,
    //% block="6"
    PIN_6,
    //% block="7"
    PIN_7,
    //% block="8"
    PIN_8,
    //% block="9"
    PIN_9,
    //% block="10"
    PIN_10,
    //% block="11"
    PIN_11,
    //% block="12"
    PIN_12,
    //% block="13"
    PIN_13,
    //% block="A0"
    PIN_A0,
    //% block="A1"
    PIN_A1,
    //% block="A2"
    PIN_A2,
    //% block="A3"
    PIN_A3,
    //% block="A4"
    PIN_A4,
    //% block="A5"
    PIN_A5
}

enum PIN_RGB {
    //% block="1"
    PIN_1,
    //% block="2"
    PIN_2,
    //% block="3"
    PIN_3,
    //% block="4"
    PIN_4,
    //% block="5"
    PIN_5,
    //% block="6"
    PIN_6,
    //% block="7"
    PIN_7,
    //% block="8"
    PIN_8,
    //% block="9"
    PIN_9,
    //% block="10"
    PIN_10,
    //% block="11"
    PIN_11,
    //% block="12"
    PIN_12,
    //% block="13"
    PIN_13,
    //% block="A0"
    PIN_A0,
    //% block="A1"
    PIN_A1,
    //% block="A2"
    PIN_A2,
    //% block="A3"
    PIN_A3,
    //% block="A4"
    PIN_A4,
    //% block="A5"
    PIN_A5
}

enum RGB_POSITION {
    //% block="全部"
    ALL = 0,
    //% block="左边"
    LEFT = 1,
    //% block="右边"
    RIGHT = 2
}

enum RGB_COLOR {
    //% block="红色"
    RED = 0xFF0000,
    //% block="绿色"
    GREEN = 0x00FF00,
    //% block="蓝色"
    BLUE = 0x0000FF,
    //% block="黄色"
    YELLOW = 0xFFFF00,
    //% block="紫色"
    PURPLE = 0xFF00FF,
    //% block="橙色"
    ORANGE = 0xFFA500,
    //% block="靛蓝色"
    INDIGO = 0x4B0082,
    //% block="紫罗兰"
    VIOLET = 0x8A2BE2,
    //% block="白色"
    WHITE = 0xFFFFFF,
    //% block="熄灭"
    BLACK = 0x000000
}

//% color="#409EFF" iconWidth=50 iconHeight=40
namespace wzRobot {

    // ===== 五路循迹V3 =====

    //% block="五路循迹V3" blockType="tag"
    export function fiveTrackerLabel() {}

    //% color="#409EFF" block="五路循迹V3设置 [INDEX] 高阈值 [LINENUMBER]" blockType="command"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    //% LINENUMBER.shadow="range" LINENUMBER.params.min=1 LINENUMBER.params.max=1023 LINENUMBER.defl=200
    export function setSensorHighThresholdValue(parameter: any, block: any) {
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        let index = parameter.INDEX.code;
        let lieNumber = parameter.LINENUMBER.code;
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode(`line_tracker_v3.HighThreshold(${index}, ${lieNumber});`);
    }

    //% color="#409EFF" block="五路循迹V3设置 [INDEX] 低阈值 [LINENUMBER]" blockType="command"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    //% LINENUMBER.shadow="range" LINENUMBER.params.min=1 LINENUMBER.params.max=1023 LINENUMBER.defl=200
    export function setSensorLowThresholdValue(parameter: any, block: any) {
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        let index = parameter.INDEX.code;
        let lieNumber = parameter.LINENUMBER.code;
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode(`line_tracker_v3.LowThreshold(${index}, ${lieNumber});`);
    }

    //% color="#409EFF" block="五路循迹V3获取 [INDEX] 传感器值" blockType="reporter"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    export function getSingleSensorValueV3(parameter: any, block: any) {
        let index = parameter.INDEX.code;
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode([`line_tracker_v3.AnalogValue(${index})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#409EFF" block="五路循迹获取 [INDEX] 传感器状态" blockType="boolean"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    export function getSingleSensorState(parameter: any, block: any) {
        let index = parameter.INDEX.code;
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode([`line_tracker_v3.DigitalValue(${index})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    // ===== 电机驱动板 =====

    //% block="电机驱动板" blockType="tag"
    export function motorDriverLabel() {}

    //% color="#E6A23C" block="电机驱动板初始化" blockType="command"
    export function motorInit(parameter: any, block: any) {
        Generator.addInclude('Emakefun_MotorDriver', '#include <Emakefun_MotorDriver.h>', true);
        Generator.addObject('mMotorDriver', 'Emakefun_MotorDriver', 'mMotorDriver = Emakefun_MotorDriver(0x60);', true);
        Generator.addSetupMainTop('Serial.begin', 'Serial.begin(9600);', true);
    }

    //% color="#E6A23C" block="设置IO频率 [FREQ]" blockType="command"
    //% FREQ.shadow="range" FREQ.params.min=1 FREQ.params.max=1600 FREQ.defl=1000
    export function setIOFrequency(parameter: any, block: any) {
        let freq = parameter.FREQ.code;
        Generator.addSetup('mMotorDriver.begin', `mMotorDriver.begin(${freq});`, true);
    }

    //% color="#E6A23C" block="设置IO [PIN] 输出 [LEVEL]" blockType="command"
    //% PIN.shadow="dropdown" PIN.options="PINS" PIN.defl="PINS.S1"
    //% LEVEL.shadow="dropdown" LEVEL.options="LEVELS" LEVEL.defl="LEVELS.HIGH"
    export function setIOPinLevel(parameter: any, block: any) {
        let pin = parameter.PIN.code;
        let level = parameter.LEVEL.code;
        Generator.addCode(`mMotorDriver.setPin(${pin}, ${level});`);
    }

    //% color="#E6A23C" block="设置IO [PIN] PWM值(0-4096) [PWM]" blockType="command"
    //% PIN.shadow="dropdown" PIN.options="PINS" PIN.defl="PINS.S1"
    //% PWM.shadow="range" PWM.params.min=0 PWM.params.max=4096 PWM.defl=1024
    export function setIOPinPwm(parameter: any, block: any) {
        let pin = parameter.PIN.code;
        let pwm = parameter.PWM.code;
        Generator.addCode(`mMotorDriver.setPWM(${pin}, ${pwm});`);
    }

    //% color="#E6A23C" block="DC电机初始化 [MOTOR]" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    export function initDCMotor(parameter: any, block: any) {
        let motorValue = MOTORS[parameter.MOTOR.code];
        Generator.addObject(`mMotorDriver.DCmotor_${motorValue}`, 'Emakefun_DCMotor', `*DCmotor_${motorValue} = mMotorDriver.getMotor(${motorValue});`, true);
        Generator.addSetup('mMotorDriver.begin', `mMotorDriver.begin(150);`, true);
    }

    //% color="#E6A23C" block="DC电机 [MOTOR] 方向 [DIRECTION] 速度(0-255) [SPEED]" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    //% DIRECTION.shadow="dropdown" DIRECTION.options="DIRECTIONS" DIRECTION.defl="DIRECTIONS.FORWARD"
    //% SPEED.shadow="range" SPEED.params.min=0 SPEED.params.max=255 SPEED.defl=0
    export function controlDCMotor(parameter: any, block: any) {
        let motorValue = MOTORS[parameter.MOTOR.code];
        let direction = parameter.DIRECTION.code;
        let speed = parameter.SPEED.code;
        Generator.addCode(`DCmotor_${motorValue}->setSpeed(${speed});`);
        Generator.addCode(`DCmotor_${motorValue}->run(${direction});`);
    }

    //% color="#E6A23C" block="停止DC电机 [MOTOR]" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    export function stopDCMotor(parameter: any, block: any) {
        let motorValue = MOTORS[parameter.MOTOR.code];
        Generator.addCode(`DCmotor_${motorValue}->run(BRAKE);`);
    }

    //% color="#E6A23C" block="编码器电机初始化 [ENCODER]" blockType="command"
    //% ENCODER.shadow="dropdown" ENCODER.options="ENCODERS" ENCODER.defl="ENCODERS.Encoder1"
    export function initEncoderMotor(parameter: any, block: any) {
        let encoderValue = ENCODERS[parameter.ENCODER.code];
        Generator.addObject(`mMotorDriver.EncodeMotor_${encoderValue}`, 'Emakefun_EncoderMotor', `*EncodeMotor_${encoderValue} = mMotorDriver.getEncoderMotor(E${encoderValue});`, true);
    }

    //% color="#E6A23C" block="编码器电机 [ENCODER] 方向 [DIRECTION] 速度(0-255) [SPEED]" blockType="command"
    //% ENCODER.shadow="dropdown" ENCODER.options="ENCODERS" ENCODER.defl="ENCODERS.Encoder1"
    //% DIRECTION.shadow="dropdown" DIRECTION.options="DIRECTIONS" DIRECTION.defl="DIRECTIONS.FORWARD"
    //% SPEED.shadow="range" SPEED.params.min=0 SPEED.params.max=255 SPEED.defl=0
    export function controlEncoderMotor(parameter: any, block: any) {
        let encoderValue = ENCODERS[parameter.ENCODER.code];
        let direction = parameter.DIRECTION.code;
        let speed = parameter.SPEED.code;
        Generator.addSetup('mMotorDriver.begin', `mMotorDriver.begin(50);`, true);
        Generator.addSetup(`EncodeMotor_${encoderValue}.init`, `EncodeMotor_${encoderValue}->init(encoder${encoderValue});`, true);
        Generator.addObject(`mMotorDriver.encoder${encoderValue}`, 'static void', `encoder${encoderValue}(void) {
  if(digitalRead(EncodeMotor_${encoderValue}->ENCODER2pin) == LOW) {
        EncodeMotor_${encoderValue}->EncoderPulse++;
  } else {
        EncodeMotor_${encoderValue}->EncoderPulse--;
  }
}`, true);
        Generator.addCode(`EncodeMotor_${encoderValue}->setSpeed(${speed});`);
        Generator.addCode(`EncodeMotor_${encoderValue}->run(${direction});`);
    }

    //% color="#E6A23C" block="停止编码器电机 [ENCODER]" blockType="command"
    //% ENCODER.shadow="dropdown" ENCODER.options="ENCODERS" ENCODER.defl="ENCODERS.Encoder1"
    export function stopEncoderMotor(parameter: any, block: any) {
        let encoderValue = ENCODERS[parameter.ENCODER.code];
        Generator.addCode(`EncodeMotor_${encoderValue}->run(BRAKE);`);
    }

    //% color="#E6A23C" block="步进电机初始化 [STEPPER] 每圈步数 [STEP] 每分钟转速 [LAP]" blockType="command"
    //% STEPPER.shadow="dropdown" STEPPER.options="STEPPERS" STEPPER.defl="STEPPERS.Stepper1"
    //% STEP.shadow="range" STEP.params.min=0 STEP.params.max=255 STEP.defl=100
    //% LAP.shadow="range" LAP.params.min=0 LAP.params.max=255 LAP.defl=200
    export function initStepperMotor(parameter: any, block: any) {
        let stepperValue = STEPPERS[parameter.STEPPER.code];
        let step = parameter.STEP.code;
        let lap = parameter.LAP.code;
        Generator.addObject(`mMotorDriver.StepperMotor_${stepperValue}`, 'Emakefun_StepperMotor', `*StepperMotor_${stepperValue} = mMotorDriver.getStepper(${stepperValue}, ${step});`, true);
        Generator.addCode(`StepperMotor_${stepperValue}->setSpeed(${lap});`);
    }

    //% color="#E6A23C" block="步进电机 [STEPPER] 方向 [DIRECTION] 模式 [MODE] 步数 [STEP]" blockType="command"
    //% STEPPER.shadow="dropdown" STEPPER.options="STEPPERS" STEPPER.defl="STEPPERS.Stepper1"
    //% DIRECTION.shadow="dropdown" DIRECTION.options="STEPPER_DIRECTIONS" DIRECTION.defl="STEPPER_DIRECTIONS.FORWARD"
    //% MODE.shadow="dropdown" MODE.options="MODES" MODE.defl="MODES.DOUBLE"
    //% STEP.shadow="range" STEP.params.min=0 STEP.params.max=255 STEP.defl=100
    export function controlStepperMotor(parameter: any, block: any) {
        let stepperValue = STEPPERS[parameter.STEPPER.code];
        let direction = parameter.DIRECTION.code;
        let mode = parameter.MODE.code;
        let step = parameter.STEP.code;
        Generator.addCode(`StepperMotor_${stepperValue}->step(${step}, ${direction}, ${mode});`);
    }

    //% color="#E6A23C" block="停止步进电机 [STEPPER]" blockType="command"
    //% STEPPER.shadow="dropdown" STEPPER.options="STEPPERS" STEPPER.defl="STEPPERS.Stepper1"
    export function stopStepperMotor(parameter: any, block: any) {
        let stepperValue = STEPPERS[parameter.STEPPER.code];
        Generator.addCode(`StepperMotor_${stepperValue}->release();`);
    }

    //% color="#E6A23C" block="舵机初始化接口 [SERVO]" blockType="command"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    export function initServoMotor(parameter: any, block: any) {
        let servoValue = SERVOS[parameter.SERVO.code];
        Generator.addObject(`mMotorDriver.servo${servoValue}`, 'Emakefun_Servo', `*servo${servoValue} = mMotorDriver.getServo(${servoValue});`, true);
        Generator.addSetup('mMotorDriver.begin', `mMotorDriver.begin(50);`, true);
    }

    //% color="#E6A23C" block="舵机接口 [SERVO] 读取当前角度" blockType="reporter"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    export function readServoMotorAngle(parameter: any, block: any) {
        let servoValue = SERVOS[parameter.SERVO.code];
        Generator.addCode([`servo${servoValue}->readDegrees()`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#E6A23C" block="舵机接口 [SERVO] 角度 [ANGLE] 速度(0-100) [SPEED]" blockType="command"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    //% ANGLE.shadow="range" ANGLE.params.min=0 ANGLE.params.max=180 ANGLE.defl=90
    //% SPEED.shadow="range" SPEED.params.min=0 SPEED.params.max=10 SPEED.defl=10
    export function controlServoMotor(parameter: any, block: any) {
        let servoValue = SERVOS[parameter.SERVO.code];
        let angle = parameter.ANGLE.code;
        let speed = parameter.SPEED.code;
        Generator.addCode(`servo${servoValue}->writeServo(${angle}, ${speed});`);
    }

    // ===== Sentry2 视觉 =====

    //% block="Sentry2 视觉" blockType="tag"
    export function sentry2Label() {}

    //% block="初始化 Sentry2 端口 [MODE] 地址 [ADDR]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    //% ADDR.shadow="dropdown" ADDR.options="SENTRY"
    export function sentry2Begin(parameter: any) {
        let mode = parameter.MODE.code;
        let addr = parameter.ADDR.code;

        Generator.addInclude("ArduinoInclude", "#include <Arduino.h>");
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");

        Generator.addObject(`sentry.Object`, "Sentry2", `sentry(${addr});`);

        if (mode == 'Wire') {
            Generator.addInclude("WireInclude", "#include <Wire.h>");
            Generator.addSetupMainTop("Wire.begin", `Wire.begin();`);
        }

        Generator.addCode(`while (SENTRY_OK != sentry.begin(&${mode})) {yield();}`);
    }

    //% block="设置 Sentry2 白平衡模式 [AWB]" blockType="command"
    //% AWB.shadow="dropdown" AWB.options="AWB"
    export function CameraSetAwb(parameter: any) {
        let awb = parameter.AWB.code;
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        Generator.addCode(`sentry.CameraSetAwb(${awb});`);
    }

    //% block="设置 Sentry2 [VISION_STA] 算法 [VISION_TYPE]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"
    export function VisionSet(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;
        if (vision_sta == "ON") {
            Generator.addCode(`sentry.VisionBegin(${vision_type});`);
        } else {
            Generator.addCode(`sentry.VisionEnd(${vision_type});`);
        }
    }

    //% block="设置 Sentry2 算法[VISION_TYPE] [NUM] 组参数" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_NUM" VISION_TYPE.defl="Sentry2::kVisionColor"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry.SetParamNum(${vision_type},(int)${num});`);
    }

    //% block="设置 Sentry2 颜色算法 x坐标[XVALUE] y坐标[YVALUE] 宽度[WIDTH] 高度[HIGHT] 参数组[NUM]"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=50
    //% YVALUE.shadow="number"   YVALUE.defl=50
    //% WIDTH.shadow="number"   WIDTH.defl=3
    //% HIGHT.shadow="number"   HIGHT.defl=4
    export function SetColorParam(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let x = parameter.XVALUE.code;
        let y = parameter.YVALUE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.x_value = ${x};`);
        Generator.addCode(`param.y_value = ${y};`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`sentry.SetParam(Sentry2::kVisionColor,&param,(int)${num});`);
    }
    //% block="设置 Sentry2 色块算法 最小宽度[WIDTH] 最小高度[HIGHT] 颜色[COLOR_LABLE] 参数组[NUM]" blockType="command"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% WIDTH.shadow="number"   WIDTH.defl=3
    //% HIGHT.shadow="number"   HIGHT.defl=4
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let l = parameter.COLOR_LABLE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sentry.SetParam(Sentry2::kVisionBlob,&param,(int)${num});`);
    }


    //% block="设置 Sentry2 算法[VISION_TYPE] 参数1[XVALUE] 参数2[YVALUE] 参数3[WIDTH] 参数4[HIGHT] 参数5[COLOR_LABLE] 参数组[NUM]"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=0
    //% YVALUE.shadow="number"   YVALUE.defl=0
    //% WIDTH.shadow="number"   WIDTH.defl=0
    //% HIGHT.shadow="number"   HIGHT.defl=0
    //% COLOR_LABLE.shadow="number"   COLOR_LABLE.defl=0
    export function SetVisionParam(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let x = parameter.XVALUE.code;
        let y = parameter.YVALUE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;
        let l = parameter.COLOR_LABLE.code;

        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.x_value = ${x};`);
        Generator.addCode(`param.y_value = ${y};`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sentry.SetParam(${vision_type},&param,(int)${num});`);
    }

    //% block="Sentry2 算法[VISION_TYPE] 检测结果个数" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"
    export function GetVisionResult(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry.GetValue(${vision_type}, kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }


    //% block="Sentry2 颜色算法 [OBJ_INFO] 第[NUM]个结果" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_COLOR"
    export function GetColorValue(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionColor,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 算法[VISION_TYPE] [OBJ_INFO] 第[NUM]个结果" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_VALUE"
    //% NUM.shadow="number"  NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"
    export function GetValue(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 巡线算法 [OBJ_INFO] 第[NUM]个结果" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_LINE"
    export function GetLineValue(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionLine,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 二维码算法 [OBJ_INFO] 第[NUM]个结果" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_QR"
    export function GetQrCodeValue(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionQrCode,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 二维码算法 解码结果字符串" blockType="reporter"
    export function GetQrCodeValueStr(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        Generator.addCode([`String(sentry.GetQrCodeValue())`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 自定义算法[VISION_TYPE] [OBJ_INFO] 第[NUM]个结果" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM"
    //% NUM.shadow="number"  NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_CUSTOM"
    export function GetCustomValue(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 颜色算法 识别到 [COLOR_LABLE] 第[NUM]个结果" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function GetColorLable(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionColor,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 色块算法 检测到 [COLOR_LABLE] 第[NUM]个结果" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function GetColorBlob(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionBlob,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 卡片算法 识别到 [CARD_LABLE] 第[NUM]个结果" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"
    export function GetCardLable(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionCard,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 20类算法 识别到 [Class20_LABLE] 第[NUM]个结果" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"
    export function GetClass20Lable(parameter: any) {
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVision20Classes,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    // ===== RGB超声波模块 =====

    enum RGB_POSITION {
        //% block="全部"
        ALL = 0,
        //% block="左边"
        LEFT = 1,
        //% block="右边"
        RIGHT = 2
    }

    enum RGB_COLOR {
        //% block="红色"
        RED = 0xFF0000,
        //% block="绿色"
        GREEN = 0x00FF00,
        //% block="蓝色"
        BLUE = 0x0000FF,
        //% block="黄色"
        YELLOW = 0xFFFF00,
        //% block="紫色"
        PURPLE = 0xFF00FF,
        //% block="橙色"
        ORANGE = 0xFFA500,
        //% block="靛蓝色"
        INDIGO = 0x4B0082,
        //% block="紫罗兰"
        VIOLET = 0x8A2BE2,
        //% block="白色"
        WHITE = 0xFFFFFF,
        //% block="熄灭"
        BLACK = 0x000000
    }

    enum RGB_EFFECT {
        //% block="无"
        NO_EFFECT = 0,
        //% block="呼吸"
        BREATHING = 1,
        //% block="旋转"
        ROTATE = 2,
        //% block="闪烁"
        FLASH = 3
    }

    //% block="RGB超声波模块" blockType="tag"
    export function rgbUltrasoundLabel() {}
}


//% color="#71BE1E" iconWidth=50 iconHeight=40
namespace wzRobot {

    //% block="RGB超声波模块引脚初始化 IO[IO] RGB[RGB]" blockType="command"
    //% IO.shadow="dropdown" IO.options="PIN_IO" IO.defl="PIN_IO.PIN_3"
    //% RGB.shadow="dropdown" RGB.options="PIN_RGB" RGB.defl="PIN_RGB.PIN_4"
    export function initRgbUltrasound(parameter: any, block: any) {
        let io = parameter.IO.code;
        let rgb = parameter.RGB.code;
        
        Generator.addInclude("rgb_ultrasound_include", `#include "RgbUltrasonic.h"`);
        Generator.addObject("rgb_ultrasound_object", "RgbUltrasonic", `mRgbUltrasonic(${io}, ${rgb})`);
    }

    //% block="RGB超声波模块[POSITION]灯亮颜色[COLOR]样式[EFFECT]" blockType="command"
    //% POSITION.shadow="dropdown" POSITION.options="RGB_POSITION" POSITION.defl="RGB_POSITION.ALL"
    //% COLOR.shadow="colorPicker" COLOR.defl="#ff0000"
    //% EFFECT.shadow="dropdown" EFFECT.options="RGB_EFFECT" EFFECT.defl="RGB_EFFECT.NO_EFFECT"
    export function setRgbUltrasoundColor(parameter: any, block: any) {
        let position = parameter.POSITION.code;
        let color = parameter.COLOR.code;
        let effect = parameter.EFFECT.code;
        
        Generator.addInclude("rgb_ultrasound_include", `#include "RgbUltrasonic.h"`);
        Generator.addObject("rgb_ultrasound_object", "RgbUltrasonic", `mRgbUltrasonic(3, 4)`);
        
        let colorCode = color.replace("#", "0x");
        Generator.addCode(`mRgbUltrasonic.SetRgbEffect(${position}, ${colorCode}, ${effect});`);
    }

    //% block="RGB超声波模块读取超声波距离" blockType="reporter"
    export function readRgbUltrasoundDistance(parameter: any, block: any) {
        Generator.addInclude("rgb_ultrasound_include", `#include "RgbUltrasonic.h"`);
        Generator.addObject("rgb_ultrasound_object", "RgbUltrasonic", `mRgbUltrasonic(3, 4)`);
        
        Generator.addCode([`mRgbUltrasonic.GetUltrasonicDistance()`, Blockly.Arduino.ORDER_ATOMIC]);
    }
}
