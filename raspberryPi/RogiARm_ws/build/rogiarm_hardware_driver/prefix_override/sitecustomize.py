import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/rogi4rm/RogiARm_ws/install/rogiarm_hardware_driver'
