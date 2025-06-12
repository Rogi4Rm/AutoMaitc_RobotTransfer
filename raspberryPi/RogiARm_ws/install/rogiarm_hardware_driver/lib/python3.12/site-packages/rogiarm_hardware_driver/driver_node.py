import rclpy
from rclpy.node import Node
from std_msgs.msg import String

import time
import busio
from board import SCL, SDA
from adafruit_pca9685 import PCA9685

class DriverNode(Node):
    def __init__(self):
        super().__init__('driver_node')
        self.subscription = self.create_subscription(
            String,
            'arm_command',
            self.listener_callback,
            10
        )
        self.get_logger().info('✅ DriverNode Ready')

        # I2C 및 PCA9685 초기화
        i2c = busio.I2C(SCL, SDA)
        self.pca = PCA9685(i2c)
        self.pca.frequency = 50  # 서보 모터는 50Hz

        # 조인트별 현재 위치 (라디안 기준)
        self.joint_positions = [0.0] * 6  # Joint 1~6

        # 조인트 → PCA9685 채널 매핑
        self.joint_to_channel = {
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
        }

    def listener_callback(self, msg):
        key = msg.data
        self.get_logger().info(f'⌨️ Received key input: {key}')

        key_map = {
            'a': (1, 0.1), 'd': (1, -0.1),
            'w': (2, 0.1), 's': (2, -0.1),
            'e': (3, 0.1), 'q': (3, -0.1),
            'r': (4, 0.1), 'f': (4, -0.1),
            't': (5, 0.1), 'g': (5, -0.1),
            'y': (6, 0.1), 'h': (6, -0.1),
        }

        if key in key_map:
            joint_id, delta = key_map[key]
            self.move_joint(joint_id, delta)
        else:
            self.get_logger().warn(f'❗ Unknown key: {key}')

    def move_joint(self, joint_id, delta):
        idx = joint_id - 1
        self.joint_positions[idx] += delta

        # 라디안 제한 범위 적용 (예: -1.57 ~ 1.57 라디안 ≈ -90 ~ 90도)
        self.joint_positions[idx] = max(-1.57, min(1.57, self.joint_positions[idx]))

        # 각도 변환 (degree)
        angle_deg = self.joint_positions[idx] * (180.0 / 3.141592)
        angle_deg = max(0, min(180, angle_deg + 90))  # 0~180 범위로 변환

        # 서보로 전달할 PWM 펄스 계산
        pulse_min = 1000  # 1ms
        pulse_max = 2000  # 2ms
        pulse = int(pulse_min + (angle_deg / 180.0) * (pulse_max - pulse_min))
        duty_cycle = int(pulse * 65535 / 20000)  # 20ms 주기 기준

        channel = self.joint_to_channel[joint_id]
        self.pca.channels[channel].duty_cycle = duty_cycle

        self.get_logger().info(
            f'🦾 Joint {joint_id} → {angle_deg:.1f}° | PWM: {pulse}μs'
        )

def main(args=None):
    rclpy.init(args=args)
    node = DriverNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
