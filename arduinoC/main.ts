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

//% color="#0099CC" iconWidth=50 iconHeight=40
namespace wzRobot_five_tracker {

    //% block="五路循迹V3设置 [INDEX] 高阈值 [LINENUMBER]" blockType="command"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    //% LINENUMBER.shadow="range" LINENUMBER.params.min=1 LINENUMBER.params.max=1023 LINENUMBER.defl=200
    export function setSensorHighThresholdValue(parameter: any, block: any) {
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        let index = parameter.INDEX.code;
        let lieNumber = parameter.LINENUMBER.code;
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode(`line_tracker_v3.HighThreshold(${index}, ${lieNumber});`);
    }

    //% block="五路循迹V3设置 [INDEX] 低阈值 [LINENUMBER]" blockType="command"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    //% LINENUMBER.shadow="range" LINENUMBER.params.min=1 LINENUMBER.params.max=1023 LINENUMBER.defl=200
    export function setSensorLowThresholdValue(parameter: any, block: any) {
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        let index = parameter.INDEX.code;
        let lieNumber = parameter.LINENUMBER.code;
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode(`line_tracker_v3.LowThreshold(${index}, ${lieNumber});`);
    }

    //% block="五路循迹V3获取 [INDEX] 传感器值" blockType="reporter"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    export function getSingleSensorValueV3(parameter: any, block: any) {
        let index = parameter.INDEX.code;
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode(`line_tracker_v3.AnalogValue(${index})`);
    }

    //% block="五路循迹获取 [INDEX] 传感器状态" blockType="boolean"
    //% INDEX.shadow="dropdown" INDEX.options="INDEXPROBE" INDEX.defl="INDEXPROBE.0"
    export function getSingleSensorState(parameter: any, block: any) {
        let index = parameter.INDEX.code;
        Generator.addInclude(`fiveTrackerInitV3`, `#include <five_line_tracker_v3.h>\nemakefun::FiveLineTracker  line_tracker_v3;`);
        Generator.addSetup(`line_tracker_setup_v3`, `Wire.begin();\n  line_tracker_v3.Initialize();`);
        Generator.addCode(`line_tracker_v3.DigitalValue(${index})`);
    }
}

//% color="#66A569" iconWidth=50 iconHeight=40
namespace wzRobot_motor {

    //% block="电机驱动板初始化" blockType="command"
    export function init(parameter: any, block: any) {
        Generator.addInclude('Emakefun_MotorDriver', '#include<Emakefun_MotorDriver.h>', true);
        Generator.addObject('mMotorDriver', 'Emakefun_MotorDriver', 'mMotorDriver = Emakefun_MotorDriver(0x60);', true);
        Generator.addSetupMainTop('Serial.begin', 'Serial.begin(9600);', true);
    }

    //% block="设置IO频率 [FREQ]" blockType="command"
    //% FREQ.shadow="range" FREQ.params.min=1 FREQ.params.max=1600 FREQ.defl=1000
    export function setIOFrequency(parameter: any, block: any) {
        let freq = parameter.FREQ.code;
        Generator.addSetup('mMotorDriver.begin', `mMotorDriver.begin(${freq});`, true);
    }

    //% block="设置IO [PIN] 输出 [LEVEL]" blockType="command"
    //% PIN.shadow="dropdown" PIN.options="PINS" PIN.defl="PINS.S1"
    //% LEVEL.shadow="dropdown" LEVEL.options="LEVELS" LEVEL.defl="LEVELS.HIGH"
    export function setIOPinLevel(parameter: any, block: any) {
        let pin = parameter.PIN.code;
        let level = parameter.LEVEL.code;
        Generator.addCode(`mMotorDriver.setPin(${pin}, ${level});`);
    }

    //% block="设置IO [PIN] PWM值(0-4096) [PWM]" blockType="command"
    //% PIN.shadow="dropdown" PIN.options="PINS" PIN.defl="PINS.S1"
    //% PWM.shadow="range" PWM.params.min=0 PWM.params.max=4096 PWM.defl=1024
    export function setIOPinPwm(parameter: any, block: any) {
        let pin = parameter.PIN.code;
        let pwm = parameter.PWM.code;
        Generator.addCode( `mMotorDriver.setPWM(${pin}, ${pwm});`);
    }

    //% block="DC电机初始化 [MOTOR]" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    export function initDCMotor(parameter: any, block: any) {
        let motorValue = MOTORS[parameter.MOTOR.code];
        Generator.addObject(`mMotorDriver.DCmotor_${motorValue}`, 'Emakefun_DCMotor', `*DCmotor_${motorValue} = mMotorDriver.getMotor(${motorValue});`, true);
        Generator.addSetup(`mMotorDriver.begin`, `mMotorDriver.begin(150);`, true);
    }

    //% block="DC电机 [MOTOR] 方向 [DIRECTION] 速度(0-255) [SPEED]" blockType="command"
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

    //% block="停止DC电机 [MOTOR]" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    export function stopDCMotor(parameter: any, block: any) {
        let motorValue = MOTORS[parameter.MOTOR.code];
        Generator.addCode(`DCmotor_${motorValue}->run(BRAKE);`);
    }

    //% block="编码器电机初始化 [ENCODER]" blockType="command"
    //% ENCODER.shadow="dropdown" ENCODER.options="ENCODERS" ENCODER.defl="ENCODERS.Encoder1"
    export function initEncoderMotor(parameter: any, block: any) {
        let encoderValue = ENCODERS[parameter.ENCODER.code];
        Generator.addObject(`mMotorDriver.EncodeMotor_${encoderValue}`, 'Emakefun_EncoderMotor', `*EncodeMotor_${encoderValue} = mMotorDriver.getEncoderMotor(E${encoderValue});`, true);
    }

    //% block="编码器电机 [ENCODER] 方向 [DIRECTION] 速度(0-255) [SPEED]" blockType="command"
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

    //% block="停止编码器电机 [ENCODER]" blockType="command"
    //% ENCODER.shadow="dropdown" ENCODER.options="ENCODERS" ENCODER.defl="ENCODERS.Encoder1"
    export function stopEncoderMotor(parameter: any, block: any) {
        let encoderValue = ENCODERS[parameter.ENCODER.code];
        Generator.addCode(`EncodeMotor_${encoderValue}->run(BRAKE);`);
    }

    //% block="步进电机初始化 [STEPPER] 每圈步数 [STEP] 每分钟转速 [LAP]" blockType="command"
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

    //% block="步进电机 [STEPPER] 方向 [DIRECTION] 模式 [MODE] 步数 [STEP]" blockType="command"
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

    //% block="停止步进电机 [STEPPER]" blockType="command"
    //% STEPPER.shadow="dropdown" STEPPER.options="STEPPERS" STEPPER.defl="STEPPERS.Stepper1"
    export function stopStepperMotor(parameter: any, block: any) {
        let stepperValue = STEPPERS[parameter.STEPPER.code];
        Generator.addCode(`StepperMotor_${stepperValue}->release();`);
    }

    //% block="舵机初始化接口 [SERVO]" blockType="command"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    export function initServoMotor(parameter: any, block: any) {
        let servoValue = SERVOS[parameter.SERVO.code];
        Generator.addObject(`mMotorDriver.servo${servoValue}`, 'Emakefun_Servo', `*servo${servoValue} = mMotorDriver.getServo(${servoValue});`, true);
        Generator.addSetup(`mMotorDriver.begin`, `mMotorDriver.begin(50);`, true);
    }

    //% block="舵机接口 [SERVO] 读取当前角度" blockType="reporter"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    export function readServoMotorAngle(parameter: any, block: any) {
        let servoValue = SERVOS[parameter.SERVO.code];
        Generator.addCode(`servo${servoValue}->readDegrees();`);
    }

    //% block="舵机接口 [SERVO] 角度 [ANGLE] 速度(0-100) [SPEED]" blockType="command"
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
