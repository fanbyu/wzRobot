//% color="#409EFF" iconWidth=50 iconHeight=40
namespace wzRobot {

    //% block="五路循迹" blockType="tag" weight=100
    export function fiveTrackerTag(parameter: any) {
    }

    //% block="五路循迹初始化 IIC" blockType="command"
    export function fiveTrackerInit(parameter: any) {
        Generator.addCode(`_5line_track.Init();`);
    }

    //% block="五路循迹读取数据" blockType="command"
    export function fiveTrackerReadData(parameter: any) {
        Generator.addCode(`_5line_track.GetRawDat();`);
    }

    //% block="五路循迹设置灵敏度 [NUM]" blockType="command"
    //% NUM.shadow="range" NUM.params.min=0 NUM.params.max=1000 NUM.defl=500
    export function fiveTrackerSetSensitivity(parameter: any) {
        let num = parameter.NUM.code;
        Generator.addCode(`_5line_track.Sensitivity(${num});`);
    }

    //% block="五路循迹读取 [CHANNEL] 模拟值" blockType="reporter"
    //% CHANNEL.shadow="dropdown" CHANNEL.options="CHANNEL" CHANNEL.defl="1"
    export function fiveTrackerReadAnalog(parameter: any) {
        let ch = parameter.CHANNEL.code;
        Generator.addCode([`_5line_track.ir_track${ch}`, Generator.ORDER_ATOMIC]);
    }

    //% block="五路循迹 [CHANNEL] 检测到 [COLOR]" blockType="boolean"
    //% CHANNEL.shadow="dropdown" CHANNEL.options="CHANNEL" CHANNEL.defl="1"
    //% COLOR.shadow="dropdown" COLOR.options="COLORS" COLOR.defl="0"
    export function fiveTrackerReadDigital(parameter: any) {
        let ch = parameter.CHANNEL.code;
        let color = parameter.COLOR.code;
        let chIndex = parseInt(ch) - 1;
        Generator.addCode([`(((_5line_track.GetState() >> ${chIndex}) & 1) == ${color})`, Generator.ORDER_ATOMIC]);
    }

    //% block="五路循迹 状态 [CH1] [CH2] [CH3] [CH4] [CH5]" blockType="boolean"
    //% CH1.shadow="dropdown" CH1.options="WIRE_COLOR" CH1.defl="WIRE_COLOR.白线"
    //% CH2.shadow="dropdown" CH2.options="WIRE_COLOR" CH2.defl="WIRE_COLOR.白线"
    //% CH3.shadow="dropdown" CH3.options="WIRE_COLOR" CH3.defl="WIRE_COLOR.白线"
    //% CH4.shadow="dropdown" CH4.options="WIRE_COLOR" CH4.defl="WIRE_COLOR.白线"
    //% CH5.shadow="dropdown" CH5.options="WIRE_COLOR" CH5.defl="WIRE_COLOR.白线"
    export function fiveTrackerReadMultiDigital(parameter: any) {
        let ch1 = parseInt(parameter.CH1.code);
        let ch2 = parseInt(parameter.CH2.code);
        let ch3 = parseInt(parameter.CH3.code);
        let ch4 = parseInt(parameter.CH4.code);
        let ch5 = parseInt(parameter.CH5.code);
        let value = ch1 + (ch2 * 2) + (ch3 * 4) + (ch4 * 8) + (ch5 * 16);
        Generator.addCode([`(_5line_track.GetState() == ${value})`, Generator.ORDER_ATOMIC]);
    }

    //% block="电机驱动板" blockType="tag" weight=90
    export function motorDriverTag(parameter: any) {
    }

    //% block="电机驱动初始化" blockType="command"
    export function motorInit(parameter: any) {
        Generator.addInclude('Emakefun_MotorDriver', '#include <Emakefun_MotorDriver.h>', true);
        Generator.addObject('mMotorDriver', 'Emakefun_MotorDriver', 'mMotorDriver = Emakefun_MotorDriver(0x60);', true);
        Generator.addSetupMainTop('Serial.begin', 'Serial.begin(9600);', true);
        Generator.addSetup('mMotorDriver.begin', 'mMotorDriver.begin(1000);', true);
    }

    //% block="设置 IO 频率 [FREQ]" blockType="command"
    //% FREQ.shadow="range" FREQ.params.min=1 FREQ.params.max=1600 FREQ.defl=1000
    export function setIOFrequency(parameter: any) {
        let freq = parameter.FREQ.code;
        Generator.addSetup('mMotorDriver.begin', `mMotorDriver.begin(${freq});`, true);
    }

    //% block="设置 IO [PIN] 输出 [LEVEL]" blockType="command"
    //% PIN.shadow="dropdown" PIN.options="PINS" PIN.defl="PINS.S1"
    //% LEVEL.shadow="dropdown" LEVEL.options="LEVELS" LEVEL.defl="LEVELS.HIGH"
    export function setIOPinLevel(parameter: any) {
        let pin = parameter.PIN.code;
        let level = parameter.LEVEL.code;
        Generator.addCode(`mMotorDriver.setPin(${pin}, ${level});`);
    }

    //% block="设置 IO [PIN] PWM 值 (0-4096) [PWM]" blockType="command"
    //% PIN.shadow="dropdown" PIN.options="PINS" PIN.defl="PINS.S1"
    //% PWM.shadow="range" PWM.params.min=0 PWM.params.max=4096 PWM.defl=1024
    export function setIOPinPwm(parameter: any) {
        let pin = parameter.PIN.code;
        let pwm = parameter.PWM.code;
        Generator.addCode(`mMotorDriver.setPWM(${pin}, ${pwm});`);
    }

    //% block="DC 电机 [MOTOR] 初始化" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    export function initDCMotor(parameter: any) {
        let motorValue = parameter.MOTOR.code;
        Generator.addObject(`mMotorDriver.DCmotor_${motorValue}`, 'Emakefun_DCMotor', `*DCmotor_${motorValue} = mMotorDriver.getMotor(${motorValue});`, true);
    }

    //% block="DC 电机 [MOTOR] 方向 [DIRECTION] 速度 [SPEED]" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    //% DIRECTION.shadow="dropdown" DIRECTION.options="DIRECTIONS" DIRECTION.defl="DIRECTIONS.FORWARD"
    //% SPEED.shadow="range" SPEED.params.min=0 SPEED.params.max=255 SPEED.defl=0
    export function controlDCMotor(parameter: any) {
        let motorValue = parameter.MOTOR.code;
        let direction = parameter.DIRECTION.code;
        let speed = parameter.SPEED.code;
        Generator.addCode(`DCmotor_${motorValue}->setSpeed(${speed});`);
        Generator.addCode(`DCmotor_${motorValue}->run(${direction});`);
    }

    //% block="停止 DC 电机 [MOTOR]" blockType="command"
    //% MOTOR.shadow="dropdown" MOTOR.options="MOTORS" MOTOR.defl="MOTORS.M1"
    export function stopDCMotor(parameter: any) {
        let motorValue = parameter.MOTOR.code;
        Generator.addCode(`DCmotor_${motorValue}->run(RELEASE);`);
    }

    //% block="编码器电机 [ENCODER] 初始化" blockType="command"
    //% ENCODER.shadow="dropdown" ENCODER.options="ENCODERS" ENCODER.defl="ENCODERS.Encoder1"
    export function initEncoderMotor(parameter: any) {
        let encoderValue = parameter.ENCODER.code;
        Generator.addObject(`mMotorDriver.EncodeMotor_${encoderValue}`, 'Emakefun_EncoderMotor', `*EncodeMotor_${encoderValue} = mMotorDriver.getEncoderMotor(${encoderValue});`, true);
    }

    //% block="编码器电机 [ENCODER] 方向 [DIRECTION] 速度 [SPEED]" blockType="command"
    //% ENCODER.shadow="dropdown" ENCODER.options="ENCODERS" ENCODER.defl="ENCODERS.Encoder1"
    //% DIRECTION.shadow="dropdown" DIRECTION.options="DIRECTIONS" DIRECTION.defl="DIRECTIONS.FORWARD"
    //% SPEED.shadow="range" SPEED.params.min=0 SPEED.params.max=255 SPEED.defl=0
    export function controlEncoderMotor(parameter: any) {
        let encoderValue = parameter.ENCODER.code;
        let direction = parameter.DIRECTION.code;
        let speed = parameter.SPEED.code;
        Generator.addCode(`EncodeMotor_${encoderValue}->setSpeed(${speed});`);
        Generator.addCode(`EncodeMotor_${encoderValue}->run(${direction});`);
    }

    //% block="停止编码器电机 [ENCODER]" blockType="command"
    //% ENCODER.shadow="dropdown" ENCODER.options="ENCODERS" ENCODER.defl="ENCODERS.Encoder1"
    export function stopEncoderMotor(parameter: any) {
        let encoderValue = parameter.ENCODER.code;
        Generator.addCode(`EncodeMotor_${encoderValue}->run(RELEASE);`);
    }

    //% block="步进电机 [STEPPER] 初始化 每圈步数 [STEP] 每分钟转速 [LAP]" blockType="command"
    //% STEPPER.shadow="dropdown" STEPPER.options="STEPPERS" STEPPER.defl="STEPPERS.Stepper1"
    //% STEP.shadow="range" STEP.params.min=0 STEP.params.max=255 STEP.defl=100
    //% LAP.shadow="range" LAP.params.min=0 LAP.params.max=255 LAP.defl=200
    export function initStepperMotor(parameter: any) {
        let stepperValue = parameter.STEPPER.code;
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
    export function controlStepperMotor(parameter: any) {
        let stepperValue = parameter.STEPPER.code;
        let direction = parameter.DIRECTION.code;
        let mode = parameter.MODE.code;
        let step = parameter.STEP.code;
        Generator.addCode(`StepperMotor_${stepperValue}->step(${step}, ${direction}, ${mode});`);
    }

    //% block="停止步进电机 [STEPPER]" blockType="command"
    //% STEPPER.shadow="dropdown" STEPPER.options="STEPPERS" STEPPER.defl="STEPPERS.Stepper1"
    export function stopStepperMotor(parameter: any) {
        let stepperValue = parameter.STEPPER.code;
        Generator.addCode(`StepperMotor_${stepperValue}->release();`);
    }

    //% block="舵机 [SERVO] 初始化 角度 [ANGLE]" blockType="command"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    //% ANGLE.shadow="range" ANGLE.params.min=0 ANGLE.params.max=180 ANGLE.defl=90
    export function initServoMotor(parameter: any) {
        let servoValue = parameter.SERVO.code;
        let angle = parameter.ANGLE.code;
        Generator.addObject(`mMotorDriver.Servo_${servoValue}`, 'Emakefun_Servo', `*Servo_${servoValue} = mMotorDriver.getServo(${servoValue});`, true);
        Generator.addCode(`Servo_${servoValue}->writeServo(${angle});`);
    }

    //% block="设置舵机 [SERVO] 角度 [ANGLE]" blockType="command"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    //% ANGLE.shadow="range" ANGLE.params.min=0 ANGLE.params.max=180 ANGLE.defl=90
    export function setServoAngle(parameter: any) {
        let servoValue = parameter.SERVO.code;
        let angle = parameter.ANGLE.code;
        Generator.addCode(`Servo_${servoValue}->writeServo(${angle});`);
    }

    //% block="控制舵机 [SERVO] 角度 [ANGLE] 速度 [SPEED]" blockType="command"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    //% ANGLE.shadow="range" ANGLE.params.min=0 ANGLE.params.max=180 ANGLE.defl=90
    //% SPEED.shadow="range" SPEED.params.min=0 SPEED.params.max=10 SPEED.defl=10
    export function controlServoMotor(parameter: any) {
        let servoValue = parameter.SERVO.code;
        let angle = parameter.ANGLE.code;
        let speed = parameter.SPEED.code;
        Generator.addCode(`Servo_${servoValue}->writeServo(${angle}, ${speed});`);
    }

    //% block="释放舵机 [SERVO]" blockType="command"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    export function releaseServoMotor(parameter: any) {
        let servoValue = parameter.SERVO.code;
        Generator.addCode(`Servo_${servoValue}->releaseServo();`);
    }

    //% block="读取舵机 [SERVO] 角度" blockType="reporter"
    //% SERVO.shadow="dropdown" SERVO.options="SERVOS" SERVO.defl="SERVOS.S1"
    export function readServoMotorAngle(parameter: any) {
        let servoValue = parameter.SERVO.code;
        Generator.addCode([`Servo_${servoValue}->readDegrees()`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 视觉" blockType="tag" weight=80
    export function sentry2Tag(parameter: any) {
    }

    //% block="Sentry2 初始化 模式 [MODE]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE" MODE.defl="MODE.I2C"
    export function sentry2Init(parameter: any) {
        let mode = parameter.MODE.code;
        Generator.addInclude('Sentry2_include', '#include <Sentry.h>', true);
        Generator.addObject('Sentry2_object', 'Sentry2', 'sentry2;', true);
        Generator.addSetup('Sentry2_begin', `sentry2.begin(${mode});`, true);
    }

    //% block="Sentry2 设置白平衡 [AWB]" blockType="command"
    //% AWB.shadow="dropdown" AWB.options="AWB" AWB.defl="AWB.Auto"
    export function sentry2SetAwb(parameter: any) {
        let awb = parameter.AWB.code;
        Generator.addCode(`sentry2.CameraSetAwb(${awb});`);
    }

    //% block="Sentry2 设置算法 [ALGORITHM]" blockType="command"
    //% ALGORITHM.shadow="dropdown" ALGORITHM.options="VISION_TYPE_ALL" ALGORITHM.defl="VISION_TYPE_ALL.Color"
    export function sentry2SetAlgorithm(parameter: any) {
        let algorithm = parameter.ALGORITHM.code;
        Generator.addCode(`sentry2.VisionBegin(${algorithm});`);
    }

    //% block="Sentry2 [VISION_STA] 算法 [VISION_TYPE]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL" VISION_TYPE.defl="VISION_TYPE_ALL.Color"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA" VISION_STA.defl="VISION_STA.run"
    export function sentry2VisionSet(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;
        if (vision_sta == "ON") {
            Generator.addCode(`sentry2.VisionBegin(${vision_type});`);
        } else {
            Generator.addCode(`sentry2.VisionEnd(${vision_type});`);
        }
    }

    //% block="Sentry2 设置 [VISION_TYPE] 参数组数 [NUM]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_NUM" VISION_TYPE.defl="VISION_TYPE_NUM.Color"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2SetParamNum(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry2.SetParamNum(${vision_type}, (int)${num});`);
    }

    //% block="Sentry2 设置颜色参数 X [X] Y [Y] 宽度 [W] 高度 [H] 参数组 [NUM]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=320 X.defl=50
    //% Y.shadow="range" Y.params.min=0 Y.params.max=240 Y.defl=50
    //% W.shadow="range" W.params.min=0 W.params.max=100 W.defl=3
    //% H.shadow="range" H.params.min=0 H.params.max=100 H.defl=4
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2SetColorParam(parameter: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let w = parameter.W.code;
        let h = parameter.H.code;
        let num = parameter.NUM.code;
        Generator.addObject('sentry2_param', 'sentry_object_t', 'sentry2_param;');
        Generator.addCode(`sentry2_param.x_value = ${x};`);
        Generator.addCode(`sentry2_param.y_value = ${y};`);
        Generator.addCode(`sentry2_param.width = ${w};`);
        Generator.addCode(`sentry2_param.height = ${h};`);
        Generator.addCode(`sentry2.SetParam(Sentry2::kVisionColor, &sentry2_param, (int)${num});`);
    }

    //% block="Sentry2 设置Blob参数 最小宽度 [W] 最小高度 [H] 颜色 [COLOR] 参数组 [NUM]" blockType="command"
    //% W.shadow="range" W.params.min=0 W.params.max=100 W.defl=3
    //% H.shadow="range" H.params.min=0 H.params.max=100 H.defl=4
    //% COLOR.shadow="dropdown" COLOR.options="COLOR_LABLE" COLOR.defl="COLOR_LABLE.Red"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2SetBlobParam(parameter: any) {
        let w = parameter.W.code;
        let h = parameter.H.code;
        let color = parameter.COLOR.code;
        let num = parameter.NUM.code;
        Generator.addObject('sentry2_param', 'sentry_object_t', 'sentry2_param;');
        Generator.addCode(`sentry2_param.width = ${w};`);
        Generator.addCode(`sentry2_param.height = ${h};`);
        Generator.addCode(`sentry2_param.label = ${color};`);
        Generator.addCode(`sentry2.SetParam(Sentry2::kVisionBlob, &sentry2_param, (int)${num});`);
    }

    //% block="Sentry2 检测到 [COLOR] 颜色" blockType="boolean"
    //% COLOR.shadow="dropdown" COLOR.options="COLOR_LABLE" COLOR.defl="COLOR_LABLE.Red"
    export function sentry2DetectedColor(parameter: any) {
        let color = parameter.COLOR.code;
        Generator.addCode([`sentry2.GetValue(kColorLabel, ${color})`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 检测到 [COLOR] Blob 结果 [NUM]" blockType="boolean"
    //% COLOR.shadow="dropdown" COLOR.options="COLOR_LABLE" COLOR.defl="COLOR_LABLE.Red"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2DetectedBlob(parameter: any) {
        let color = parameter.COLOR.code;
        let num = parameter.NUM.code;
        Generator.addCode([`sentry2.GetValue(Sentry2::kVisionBlob, kLabel, (int)${num}) == ${color}`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 识别到 [CARD] 卡片 结果 [NUM]" blockType="boolean"
    //% CARD.shadow="dropdown" CARD.options="CARD_LABLE" CARD.defl="CARD_LABLE.Forward"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2DetectedCard(parameter: any) {
        let card = parameter.CARD.code;
        let num = parameter.NUM.code;
        Generator.addCode([`sentry2.GetValue(Sentry2::kVisionCard, kLabel, (int)${num}) == ${card}`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 识别到 [CLASS] 物体 结果 [NUM]" blockType="boolean"
    //% CLASS.shadow="dropdown" CLASS.options="Class20_LABLE" CLASS.defl="Class20_LABLE.Person"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2DetectedClass(parameter: any) {
        let cls = parameter.CLASS.code;
        let num = parameter.NUM.code;
        Generator.addCode([`sentry2.GetValue(Sentry2::kVision20Classes, kLabel, (int)${num}) == ${cls}`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取颜色标签" blockType="reporter"
    export function sentry2GetColorLabel(parameter: any) {
        Generator.addCode([`sentry2.GetValue(kColorLabel)`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取颜色 [INFO] 坐标" blockType="reporter"
    //% INFO.shadow="dropdown" INFO.options="OBJ_INFO" INFO.defl="OBJ_INFO.x-coord"
    export function sentry2GetColorPosition(parameter: any) {
        let info = parameter.INFO.code;
        Generator.addCode([`sentry2.GetValue(kColor${info})`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取颜色宽度" blockType="reporter"
    export function sentry2GetColorWidth(parameter: any) {
        Generator.addCode([`sentry2.GetValue(kColorWValue)`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取颜色高度" blockType="reporter"
    export function sentry2GetColorHeight(parameter: any) {
        Generator.addCode([`sentry2.GetValue(kColorHValue)`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 [VISION_TYPE] 检测结果数量" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL" VISION_TYPE.defl="VISION_TYPE_ALL.Color"
    export function sentry2GetVisionResult(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry2.GetValue(${vision_type}, kStatus)`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取颜色 [OBJ_INFO] 结果 [NUM]" blockType="reporter"
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_COLOR" OBJ_INFO.defl="OBJ_INFO_COLOR.label"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2GetColorValue(parameter: any) {
        let obj = parameter.OBJ_INFO.code;
        let num = parameter.NUM.code;
        Generator.addCode([`sentry2.GetValue(Sentry2::kVisionColor, ${obj}, (int)${num})`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取 [VISION_TYPE] [OBJ_INFO] 结果 [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_VALUE" VISION_TYPE.defl="VISION_TYPE_VALUE.Blob"
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO" OBJ_INFO.defl="OBJ_INFO.x-coord"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2GetValue(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let obj = parameter.OBJ_INFO.code;
        let num = parameter.NUM.code;
        Generator.addCode([`sentry2.GetValue(${vision_type}, ${obj}, (int)${num})`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取线条 [OBJ_INFO] 结果 [NUM]" blockType="reporter"
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_LINE" OBJ_INFO.defl="OBJ_INFO_LINE.x-coord of ending point"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2GetLineValue(parameter: any) {
        let obj = parameter.OBJ_INFO.code;
        let num = parameter.NUM.code;
        Generator.addCode([`sentry2.GetValue(Sentry2::kVisionLine, ${obj}, (int)${num})`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取二维码 [OBJ_INFO] 结果 [NUM]" blockType="reporter"
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_QR" OBJ_INFO.defl="OBJ_INFO_QR.x-coord"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2GetQrCodeValue(parameter: any) {
        let obj = parameter.OBJ_INFO.code;
        let num = parameter.NUM.code;
        Generator.addCode([`sentry2.GetValue(Sentry2::kVisionQrCode, ${obj}, (int)${num})`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取二维码字符串" blockType="reporter"
    export function sentry2GetQrCodeValueStr(parameter: any) {
        Generator.addCode([`String(sentry2.GetQrCodeValue())`, Generator.ORDER_ATOMIC]);
    }

    //% block="Sentry2 获取自定义 [VISION_TYPE] [OBJ_INFO] 结果 [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM" VISION_TYPE.defl="VISION_TYPE_CUSTOM.Color"
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_CUSTOM" OBJ_INFO.defl="OBJ_INFO_CUSTOM.returnValue1"
    //% NUM.shadow="range" NUM.params.min=1 NUM.params.max=25 NUM.defl=1
    export function sentry2GetCustomValue(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let obj = parameter.OBJ_INFO.code;
        let num = parameter.NUM.code;
        Generator.addCode([`sentry2.GetValue(${vision_type}, ${obj}, (int)${num})`, Generator.ORDER_ATOMIC]);
    }

    //% block="RGB 超声波" blockType="tag" weight=70
    export function rgbUltrasoundTag(parameter: any) {
    }

    //% block="RGB超声波 初始化 引脚 [PIN]" blockType="command"
    //% PIN.shadow="dropdown" PIN.options="PIN_RGB" PIN.defl="PIN_RGB.1"
    export function rgbUltrasoundInit(parameter: any) {
        let pin = parameter.PIN.code;
        Generator.addInclude('RgbUltrasonic_include', '#include <RgbUltrasonic.h>', true);
        Generator.addObject('rgbUltrasonic_object', 'RgbUltrasonic', `rgbUltrasonic(${pin});`, true);
    }

    //% block="RGB超声波 获取距离 (cm)" blockType="reporter"
    export function rgbUltrasoundGetDistance(parameter: any) {
        Generator.addCode([`rgbUltrasonic.GetUltrasonicDistance()`, Generator.ORDER_ATOMIC]);
    }

    //% block="RGB超声波 设置颜色 [R] [G] [B]" blockType="command"
    //% R.shadow="range" R.params.min=0 R.params.max=255 R.defl=255
    //% G.shadow="range" G.params.min=0 G.params.max=255 G.defl=0
    //% B.shadow="range" B.params.min=0 B.params.max=255 B.defl=0
    export function rgbUltrasoundSetColor(parameter: any) {
        let r = parameter.R.code;
        let g = parameter.G.code;
        let b = parameter.B.code;
        Generator.addCode(`rgbUltrasonic.SetRgbColor(${r}, ${g}, ${b});`);
    }

    //% block="RGB超声波 设置灯效 [EFFECT]" blockType="command"
    //% EFFECT.shadow="dropdown" EFFECT.options="RGB_EFFECT" EFFECT.defl="RGB_EFFECT.无"
    export function rgbUltrasoundSetEffect(parameter: any) {
        let effect = parameter.EFFECT.code;
        Generator.addCode(`rgbUltrasonic.SetRgbEffect(${effect});`);
    }

    //% block="RGB超声波 关闭灯光" blockType="command"
    export function rgbUltrasoundOff(parameter: any) {
        Generator.addCode(`rgbUltrasonic.RgbOff();`);
    }
}
