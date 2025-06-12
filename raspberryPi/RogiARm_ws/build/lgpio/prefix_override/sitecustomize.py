import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/rogi4rm/git/AutoMaitc_RobotTransfer/raspberryPi/RogiARm_ws/install/lgpio'
