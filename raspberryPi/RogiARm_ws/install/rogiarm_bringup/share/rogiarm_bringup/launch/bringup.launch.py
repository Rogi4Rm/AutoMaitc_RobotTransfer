from launch import LaunchDescription
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory
import os

# ✅ 중요: xacro 모듈 사용
import xacro
from launch_ros.parameter_descriptions import ParameterValue

def generate_launch_description():
    description_pkg = get_package_share_directory('rogiarm_description')
    xacro_file = os.path.join(description_pkg, 'urdf', 'rogiarm.urdf.xacro')

    # ✅ xacro 파일을 직접 파싱
    doc = xacro.process_file(xacro_file)
    robot_description = doc.toxml()

    return LaunchDescription([
        Node(
            package='robot_state_publisher',
            executable='robot_state_publisher',
            name='robot_state_publisher',
            output='screen',
            parameters=[{
                'robot_description': ParameterValue(robot_description, value_type=str)
            }]
        ),
        Node(
            package='rogiarm_hardware_driver',
            executable='driver_node',
            name='driver_node',
            output='screen'
        ),
    ])
