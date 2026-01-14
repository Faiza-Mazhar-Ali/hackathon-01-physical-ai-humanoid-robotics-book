---
title: Practical Examples and Code - Humanoid Robot Architecture
---

# Practical Examples and Code - Humanoid Robot Architecture

## Example 1: Basic Humanoid Robot Model

Here's a basic representation of a humanoid robot model in Python:

```python
class HumanoidRobot:
    def __init__(self):
        # Physical structure
        self.head = Head()
        self.torso = Torso()
        self.left_arm = Arm("left")
        self.right_arm = Arm("right")
        self.left_leg = Leg("left")
        self.right_leg = Leg("right")
        
        # Control systems
        self.motion_planner = MotionPlanner()
        self.balance_controller = BalanceController()
        self.task_planner = TaskPlanner()
        
        # Sensors
        self.cameras = [Camera(), Camera()]  # Stereo vision
        self.imus = [IMU(), IMU(), IMU()]   # In head, torso, and pelvis
        self.force_sensors = [ForceSensor(), ForceSensor()]  # In feet
    
    def move_to_position(self, target_position):
        """Plan and execute movement to a target position"""
        # Plan the motion
        motion_plan = self.motion_planner.plan_motion(
            current_pos=self.get_current_position(),
            target_pos=target_position
        )
        
        # Execute with balance control
        for step in motion_plan:
            self.balance_controller.adjust_for_step(step)
            self.execute_step(step)
    
    def get_current_position(self):
        """Get the current position of the robot"""
        # Implementation would query joint encoders and IMUs
        return self.torso.position

class Head:
    def __init__(self):
        self.cameras = [Camera(), Camera()]
        self.microphones = [Microphone(), Microphone()]
        self.joints = {"neck_yaw": 0, "neck_pitch": 0}

class Arm:
    def __init__(self, side):
        self.side = side
        self.joints = {
            "shoulder_pitch": 0,
            "shoulder_roll": 0,
            "elbow": 0,
            "wrist_yaw": 0,
            "wrist_pitch": 0
        }
        self.hand = Hand()

class Leg:
    def __init__(self, side):
        self.side = side
        self.joints = {
            "hip_yaw": 0,
            "hip_roll": 0,
            "hip_pitch": 0,
            "knee": 0,
            "ankle_pitch": 0,
            "ankle_roll": 0
        }

class Hand:
    def __init__(self):
        self.fingers = [Finger() for _ in range(5)]
        self.palm_sensor = TactileSensor()

class Torso:
    def __init__(self):
        self.position = (0, 0, 0)  # x, y, z
        self.orientation = (0, 0, 0)  # roll, pitch, yaw
        self.processing_unit = ProcessingUnit()
        self.power_system = PowerSystem()
```

## Example 2: Balance Control Algorithm

```python
import numpy as np

class BalanceController:
    def __init__(self):
        self.com = np.array([0.0, 0.0, 0.0])  # Center of mass
        self.support_polygon = []  # Convex hull of support points
        self.kp = 1.0  # Proportional gain
        self.kd = 0.2  # Derivative gain
    
    def update_balance(self, current_com, target_com, current_com_vel):
        """
        Update balance based on center of mass position
        """
        # Calculate error
        error = target_com - current_com
        error_derivative = -current_com_vel  # Negative because we want to reduce error
        
        # Calculate corrective force using PD controller
        corrective_force = self.kp * error + self.kd * error_derivative
        
        return corrective_force
    
    def calculate_zmp(self, com_pos, com_vel, com_acc, gravity=9.81):
        """
        Calculate Zero Moment Point (ZMP) for balance
        """
        # ZMP = (x, y) position where moment is zero
        # Simplified calculation
        zmp_x = com_pos[0] - (com_acc[0] / gravity) * com_pos[2]
        zmp_y = com_pos[1] - (com_acc[1] / gravity) * com_pos[2]
        
        return np.array([zmp_x, zmp_y, 0])
    
    def is_stable(self, zmp, support_polygon):
        """
        Check if the ZMP is within the support polygon
        """
        # Simplified check - in reality, this would use geometric algorithms
        # to determine if a point is inside a polygon
        return True  # Placeholder implementation
```

## Example 3: Motion Planning for Walking

```python
import numpy as np

class MotionPlanner:
    def __init__(self):
        self.step_length = 0.3  # meters
        self.step_height = 0.05  # meters
        self.step_duration = 1.0  # seconds
    
    def plan_walking_motion(self, steps_count, direction="forward"):
        """
        Plan a sequence of steps for bipedal walking
        """
        steps = []
        
        for i in range(steps_count):
            # Calculate step position based on direction
            if direction == "forward":
                step_pos = np.array([i * self.step_length, 0, 0])
            elif direction == "backward":
                step_pos = np.array([-i * self.step_length, 0, 0])
            elif direction == "left":
                step_pos = np.array([0, i * self.step_length, 0])
            elif direction == "right":
                step_pos = np.array([0, -i * self.step_length, 0])
            else:
                step_pos = np.array([0, 0, 0])  # No movement
            
            # Create step trajectory (simplified)
            step_trajectory = self.create_step_trajectory(step_pos)
            steps.append(step_trajectory)
        
        return steps
    
    def create_step_trajectory(self, target_pos):
        """
        Create a trajectory for a single step
        """
        # Simplified trajectory - in reality, this would be more complex
        # and consider dynamics, balance, etc.
        trajectory = []
        
        # Lift foot
        lift_pos = target_pos + np.array([0, 0, self.step_height])
        trajectory.append(("lift", lift_pos, self.step_duration/3))
        
        # Move foot to target
        trajectory.append(("move", target_pos, self.step_duration/3))
        
        # Place foot down
        place_pos = target_pos + np.array([0, 0, 0])
        trajectory.append(("place", place_pos, self.step_duration/3))
        
        return trajectory

# Example usage
robot = HumanoidRobot()
planner = MotionPlanner()

# Plan a 3-step walk forward
walking_plan = planner.plan_walking_motion(3, "forward")

print(f"Planned {len(walking_plan)} steps for walking forward")
for i, step in enumerate(walking_plan):
    print(f"Step {i+1}: {len(step)} trajectory points")
```

## Example 4: Manipulation Control

```python
class ManipulationController:
    def __init__(self):
        self.arm_joints = 7  # Typical for humanoid arms
        self.jacobian = np.zeros((6, self.arm_joints))  # 6 DOF (pos + orientation)
    
    def inverse_kinematics(self, target_pose):
        """
        Calculate joint angles to reach a target pose
        """
        # Simplified inverse kinematics - in reality, this would use
        # more sophisticated algorithms like Jacobian transpose,
        # pseudoinverse, or optimization methods
        joint_angles = np.zeros(self.arm_joints)
        
        # This is a placeholder - real implementation would be complex
        # and depend on the specific robot kinematics
        return joint_angles
    
    def grasp_object(self, object_info):
        """
        Plan and execute a grasp
        """
        # Move hand to object position
        target_pos = object_info['position']
        target_orientation = object_info['orientation']
        
        # Calculate grasp configuration based on object properties
        grasp_config = self.calculate_grasp_configuration(object_info)
        
        # Execute the grasp
        self.move_to_grasp_position(target_pos, target_orientation)
        self.close_fingers(grasp_config['finger_positions'])
        
        # Verify grasp success
        if self.verify_grasp():
            print("Grasp successful!")
            return True
        else:
            print("Grasp failed!")
            return False
    
    def calculate_grasp_configuration(self, object_info):
        """
        Calculate optimal finger positions for grasping
        """
        # Simplified grasp planning
        # In reality, this would consider object shape, weight, friction, etc.
        return {
            'finger_positions': [45, 45, 45, 45, 45],  # Degrees
            'grip_force': 10.0  # Newtons
        }
    
    def move_to_grasp_position(self, pos, orientation):
        """Move the hand to the grasp position"""
        # Implementation would use inverse kinematics
        pass
    
    def close_fingers(self, positions):
        """Close fingers to the specified positions"""
        # Implementation would control individual finger joints
        pass
    
    def verify_grasp(self):
        """Verify that the object is successfully grasped"""
        # Check tactile sensors, force sensors, etc.
        return True  # Placeholder

# Example usage
manipulator = ManipulationController()
object_info = {
    'position': np.array([0.5, 0.2, 0.1]),
    'orientation': np.array([0, 0, 0]),
    'shape': 'cylinder',
    'weight': 0.5  # kg
}

success = manipulator.grasp_object(object_info)
```

These examples demonstrate key concepts in humanoid robot architecture:
- The modular structure with different subsystems
- Balance control algorithms for maintaining stability
- Motion planning for locomotion
- Manipulation control for object interaction