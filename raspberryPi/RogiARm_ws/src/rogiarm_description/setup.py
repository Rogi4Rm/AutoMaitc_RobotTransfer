from setuptools import find_packages, setup
from glob import glob
import os  # ← 이 줄을 추가하세요

package_name = 'rogiarm_description'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'urdf'), glob('urdf/*.xacro')),  # ✅ 이 줄 추가
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='rogi4rm',
    maintainer_email='rogi4rm@todo.todo',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
        ],
    },
)
