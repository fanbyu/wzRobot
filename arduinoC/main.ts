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

//% color="#409EFF" iconWidth=50 iconHeight=40
namespace five_tracker_V3 {

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
        Generator.addCode(`line_tracker_v3.AnalogValue(${index})`);
    }

    //% color="#409EFF" block="五路循迹获取 [INDEX] 传感器状态" blockType="boolean"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    export function getSingleSensorState(parameter: any, block: any) {
        let index = parameter.INDEX.code;
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode(`line_tracker_v3.DigitalValue(${index})`);
    }
}

//% color="#E6A23C" iconWidth=50 iconHeight=40
namespace motor_driver {

    //% block="电机驱动板" blockType="tag"
    export function motorDriverLabel() {}

    //% color="#E6A23C" block="电机驱动板初始化" blockType="command"
    export function init(parameter: any, block: any) {
        Generator.addInclude('Emakefun_MotorDriver', '#include<Emakefun_MotorDriver.h>', true);
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
        Generator.addCode( `mMotorDriver.setPWM(${pin}, ${pwm});`);
    }

    //% color="#E6A23C" block="DC电机初始化 [MOTOR]" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    export function initDCMotor(parameter: any, block: any) {
        let motorValue = MOTORS[parameter.MOTOR.code];
        Generator.addObject(`mMotorDriver.DCmotor_${motorValue}`, 'Emakefun_DCMotor', `*DCmotor_${motorValue} = mMotorDriver.getMotor(${motorValue});`, true);
        Generator.addSetup(`mMotorDriver.begin`, `mMotorDriver.begin(150);`, true);
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
        Generator.addSetup(`mMotorDriver.begin`, `mMotorDriver.begin(50);`, true);
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
        Generator.addSetup(`mMotorDriver.begin`, `mMotorDriver.begin(50);`, true);
    }

    //% color="#E6A23C" block="舵机接口 [SERVO] 读取当前角度" blockType="reporter"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    export function readServoMotorAngle(parameter: any, block: any) {
        let servoValue = SERVOS[parameter.SERVO.code];
        Generator.addCode(`servo${servoValue}->readDegrees();`);
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

}

//% color="#F56C6C" iconWidth=50 iconHeight=40
namespace sentry2 {

    //% block="Sentry2 视觉" blockType="tag"
    export function sentry2Label() {}

    //% color="#F56C6C" block=" Initialize   Sentry2   port [MODE] addr [ADDR]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    //% ADDR.shadow="dropdown" ADDR.options="SENTRY"
    export function Begin(parameter: any, block: any) {
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

    //% color="#F56C6C" block=" Set   Sentry2   white balance mode [AWB]" blockType="command"
    //% AWB.shadow="dropdown" AWB.options="AWB" 
    export function CameraSetAwb(parameter: any, block: any) {
        let awb = parameter.AWB.code;
        Generator.addCode(`sentry.CameraSetAwb(${awb});`);
    }

    //% color="#F56C6C" block=" Set   Sentry2   [VISION_STA]   algo [VISION_TYPE]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"    
    export function VisionSet(parameter: any, block: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;
        if (vision_sta == "ON") {
            Generator.addCode(`sentry.VisionBegin(${vision_type});`);
        } else {
            Generator.addCode(`sentry.VisionEnd(${vision_type});`);
        }
    }

    //% color="#F56C6C" block=" Set   Sentry2   algo[VISION_TYPE]    [NUM] sets of params" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_NUM" VISION_TYPE.defl="Sentry2::kVisionColor"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any, block: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry.SetParamNum(${vision_type},(int)${num});`);
    }

    //% color="#F56C6C" block=" Set   Sentry2   algo Color   x-coord[XVALUE] y-coord [YVALUE] width[WIDTH] height[HIGHT] paramset[NUM]"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=50
    //% YVALUE.shadow="number"   YVALUE.defl=50
    //% WIDTH.shadow="number"   WIDTH.defl=3
    //% HIGHT.shadow="number"   HIGHT.defl=4
    export function SetColorParam(parameter: any, block: any) {
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

    //% color="#F56C6C" block=" Set   Sentry2   algo Blob   min-width[WIDTH] min-height[HIGHT] color [COLOR_LABLE] paramset[NUM]" blockType="command"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% WIDTH.shadow="number"   WIDTH.defl=3
    //% HIGHT.shadow="number"   HIGHT.defl=4
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any, block: any) {
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

    //% color="#F56C6C" block=" Set   Sentry2   algo [VISION_TYPE]   param1 [XVALUE] param2 [YVALUE] param3 [WIDTH] param4 [HIGHT] param5 [COLOR_LABLE] paramset[NUM]"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=0
    //% YVALUE.shadow="number"   YVALUE.defl=0
    //% WIDTH.shadow="number"   WIDTH.defl=0
    //% HIGHT.shadow="number"   HIGHT.defl=0
    //% COLOR_LABLE.shadow="number"   COLOR_LABLE.defl=0
    export function SetVisionParam(parameter: any, block: any) {
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

    //% color="#F56C6C" block="  Sentry2   algo[VISION_TYPE]   num of results" blockType="reporter" 
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"    
    export function GetVisionResult(parameter: any, block: any) {
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry.GetValue(${vision_type}, kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block="  Sentry2   algo Color   [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_COLOR"    
    export function GetColorValue(parameter: any, block: any) {
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionColor,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block="  Sentry2   algo[VISION_TYPE]    [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_VALUE"
    //% NUM.shadow="number"  NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any, block: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block="  Sentry2   algo Line    [OBJ_INFO] of result [NUM]" blockType="reporter"   
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_LINE"    
    export function GetLineValue(parameter: any, block: any) {
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionLine,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block="  Sentry2   algo QrCode    [OBJ_INFO] of result [NUM]" blockType="reporter"   
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_QR"    
    export function GetQrCodeValue(parameter: any, block: any) {
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionQrCode,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block="  Sentry2   algo QrCode   string of decoding result" blockType="reporter"
    export function GetQrCodeValueStr(parameter: any, block: any) {
        Generator.addCode([`String(sentry.GetQrCodeValue())`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block="  Sentry2   algo [VISION_TYPE]    [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM"
    //% NUM.shadow="number"  NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_CUSTOM"    
    export function GetCustomValue(parameter: any, block: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block=" Sentry2   algo Color   recognized [COLOR_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any, block: any) {
        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionColor,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block=" Sentry2   algo Blob   detected [COLOR_LABLE] blob result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorBlob(parameter: any, block: any) {
        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionBlob,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block=" Sentry2   algo Card   recognized [CARD_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any, block: any) {
        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionCard,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% color="#F56C6C" block=" Sentry2   algo 20Class   recognized [Class20_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"    
    export function GetClass20Lable(parameter: any, block: any) {
        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVision20Classes,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
