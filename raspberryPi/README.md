# 🛠️ RogiArm 프로젝트 - Raspberry Pi
전반적인 ROS 2 시스템 환경 구축

## 📦 사용 라이브러리
- ROS 2 : ROS 2 노드 및 메시지 통신
    * rclpy, std_msgs.msg.String
- 하드웨어 제어 : I2C 기반 PWM 서보 모터 제어
    * busio, board, adafruit_pca9685
- 입력 처리 : 터미널 키보드 입력 처리 (raw mode)
    * sys, tty, termios
- 런치/URDF : ROS 2 노드 실행 및 로봇 상태 퍼블리셔 설정
    * launch, launch_ros, xacro, ament_index_python.packages

## ⚙️ 주요 기능
- 키보드 입력 -> ROS2 Topic 송신 (Keyboard_control)
- 서보 제어용 PCA9685 PWM 출력 (driver_node)
- Joint 별 라디안 기반 위치 제어 (Joint 1~6)
- PWM duty cycle 변환 및 제한 각도 처리
- xacro 기반 URDF 로봇 설명 및 상태 퍼블리싱

## 💡 기술 포인트
- ROS 2 기반 키 입력 → 서보 모터 제어까지 전체 제어 파이프라인 구성
- PCA9685를 통해 6 DOF 로봇팔을 정밀하게 제어
- xacro + robot_state_publisher 연동으로 시각화 준비 완료
- I2C 에러 재시도 로직 (BlockingIOError 대응) 구현

## 🧱 어려웠던 점 및 해결 방법
- PCA9685 I2C 연결 실패
for 반복으로 최대 5회 재시도 및 오류 로그 출력 추가
- 키보드 입력이 ROS 2 노드와 병렬로 동작하지 않음
read_input() → spin_once() 루프로 직접 처리
- PWM 신호 계산 정확도
라디안 → degree 변환 후 12ms 범위 내에서 0180도 매핑
- 외부 전원과 라즈베리파이 GND 미연결로 동작 불량
DC 잭 GND를 Raspberry Pi GND에 공유하여 해결

## 📅 날짜별 현황
차후 추가