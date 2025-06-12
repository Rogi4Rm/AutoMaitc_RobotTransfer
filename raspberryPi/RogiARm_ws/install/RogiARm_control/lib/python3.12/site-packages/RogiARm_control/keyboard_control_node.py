import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class KeyboardControl(Node):
    def __init__(self):
        super().__init__('keyboard_control')  # launch와 이름 통일
        self.publisher_ = self.create_publisher(String, 'arm_command', 10)
        self.timer = self.create_timer(0.1, self.publish_command)
        self.get_logger().info('🧠 Keyboard Control Node Started')
        self.last_key = None

    def publish_command(self):
        if self.last_key:
            msg = String()
            msg.data = self.last_key
            self.publisher_.publish(msg)
            self.get_logger().info(f'📤 Sent: {msg.data}')
            self.last_key = None

    def read_input(self):
        try:
            import sys, tty, termios
            fd = sys.stdin.fileno()
            old_settings = termios.tcgetattr(fd)
            tty.setraw(fd)
            key = sys.stdin.read(1)
            termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
            self.last_key = key
        except Exception as e:
            self.get_logger().error(f'❌ Key input error: {e}')

def main(args=None):
    rclpy.init(args=args)
    node = KeyboardControl()

    try:
        while rclpy.ok():
            node.read_input()
            rclpy.spin_once(node, timeout_sec=0.1)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
