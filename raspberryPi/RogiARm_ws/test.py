import board
import busio
from adafruit_pca9685 import PCA9685

try:
    i2c = busio.I2C(board.SCL, board.SDA)
    pca = PCA9685(i2c)
    pca.frequency = 50
    pca.channels[0].duty_cycle = 0x7FFF
    print("✅ PCA9685 연결 성공, PWM 전송 완료")
except Exception as e:
    print(f"❌ 연결 실패: {e}")
