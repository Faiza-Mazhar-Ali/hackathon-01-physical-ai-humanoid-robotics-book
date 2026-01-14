---
title: Practical Examples and Code - Sensors and Actuators
---

# Practical Examples and Code - Sensors and Actuators

## Example 1: Basic Sensor Interface

Here's a basic interface for different types of sensors:

```python
from abc import ABC, abstractmethod
import numpy as np
from typing import Dict, Any


class Sensor(ABC):
    """Abstract base class for all sensors"""
    
    def __init__(self, name: str):
        self.name = name
        self.is_active = False
    
    @abstractmethod
    def read(self) -> Dict[str, Any]:
        """Read sensor data and return as dictionary"""
        pass
    
    def activate(self):
        """Activate the sensor"""
        self.is_active = True
    
    def deactivate(self):
        """Deactivate the sensor"""
        self.is_active = False


class Camera(Sensor):
    """Camera sensor implementation"""
    
    def __init__(self, name: str, resolution: tuple = (640, 480)):
        super().__init__(name)
        self.resolution = resolution
        self.intrinsics = np.eye(3)  # Placeholder for camera intrinsics
    
    def read(self) -> Dict[str, Any]:
        """Simulate reading camera data"""
        if not self.is_active:
            raise RuntimeError(f"Sensor {self.name} is not active")
        
        # In a real implementation, this would capture an actual image
        # For simulation, we return placeholder data
        return {
            "timestamp": np.random.random(),
            "image": np.random.rand(self.resolution[0], self.resolution[1], 3),
            "resolution": self.resolution,
            "intrinsics": self.intrinsics
        }


class IMU(Sensor):
    """Inertial Measurement Unit implementation"""
    
    def __init__(self, name: str):
        super().__init__(name)
        self.bias = np.zeros(6)  # 3 for accelerometer, 3 for gyroscope
    
    def read(self) -> Dict[str, Any]:
        """Simulate reading IMU data"""
        if not self.is_active:
            raise RuntimeError(f"Sensor {self.name} is not active")
        
        # Simulate accelerometer and gyroscope readings with noise
        accelerometer_data = np.random.normal(0, 0.01, 3)  # m/s^2
        gyroscope_data = np.random.normal(0, 0.001, 3)     # rad/s
        
        return {
            "timestamp": np.random.random(),
            "accelerometer": accelerometer_data,
            "gyroscope": gyroscope_data,
            "magnetometer": np.random.normal(0, 0.1, 3)  # microtesla
        }


class ForceTorqueSensor(Sensor):
    """6-axis force/torque sensor implementation"""
    
    def __init__(self, name: str):
        super().__init__(name)
        self.bias = np.zeros(6)  # 3 forces + 3 torques
    
    def read(self) -> Dict[str, Any]:
        """Simulate reading force/torque data"""
        if not self.is_active:
            raise RuntimeError(f"Sensor {self.name} is not active")
        
        # Simulate force and torque readings
        forces = np.random.normal(0, 0.1, 3)    # Newtons
        torques = np.random.normal(0, 0.01, 3) # Newton-meters
        
        return {
            "timestamp": np.random.random(),
            "forces": forces,
            "torques": torques
        }


# Example usage
if __name__ == "__main__":
    # Create sensors
    camera = Camera("head_camera", resolution=(1280, 720))
    imu = IMU("torso_imu")
    ft_sensor = ForceTorqueSensor("wrist_sensor")
    
    # Activate sensors
    camera.activate()
    imu.activate()
    ft_sensor.activate()
    
    # Read data from sensors
    camera_data = camera.read()
    imu_data = imu.read()
    ft_data = ft_sensor.read()
    
    print(f"Camera resolution: {camera_data['resolution']}")
    print(f"IMU accelerometer: {imu_data['accelerometer']}")
    print(f"Force sensor forces: {ft_data['forces']}")
```

## Example 2: Actuator Control

```python
from abc import ABC, abstractmethod
import numpy as np
from typing import Dict, Any


class Actuator(ABC):
    """Abstract base class for all actuators"""
    
    def __init__(self, name: str):
        self.name = name
        self.is_active = False
        self.current_position = 0.0
        self.current_velocity = 0.0
        self.current_effort = 0.0
    
    @abstractmethod
    def set_command(self, command: float):
        """Set the command for the actuator"""
        pass
    
    @abstractmethod
    def get_state(self) -> Dict[str, Any]:
        """Get the current state of the actuator"""
        pass
    
    def activate(self):
        """Activate the actuator"""
        self.is_active = True
    
    def deactivate(self):
        """Deactivate the actuator"""
        self.is_active = False


class JointMotor(Actuator):
    """Joint motor actuator implementation"""
    
    def __init__(self, name: str, gear_ratio: float = 1.0, max_effort: float = 100.0):
        super().__init__(name)
        self.gear_ratio = gear_ratio
        self.max_effort = max_effort
        self.command = 0.0
        self.position_limits = (-np.pi, np.pi)  # Radians
    
    def set_command(self, command: float):
        """Set position, velocity, or effort command"""
        if not self.is_active:
            raise RuntimeError(f"Actuator {self.name} is not active")
        
        # In a real implementation, this would send the command to the hardware
        # For simulation, we update internal state
        self.command = np.clip(command, -self.max_effort, self.max_effort)
        
        # Simulate movement based on command
        self.current_velocity = self.command * 0.01  # Simplified dynamics
        self.current_position += self.current_velocity * 0.01  # dt = 0.01s
        
        # Apply position limits
        self.current_position = np.clip(
            self.current_position,
            self.position_limits[0],
            self.position_limits[1]
        )
    
    def get_state(self) -> Dict[str, Any]:
        """Get the current state of the joint motor"""
        return {
            "position": self.current_position,
            "velocity": self.current_velocity,
            "effort": self.current_effort,
            "command": self.command
        }


class LinearActuator(Actuator):
    """Linear actuator implementation"""
    
    def __init__(self, name: str, max_extension: float = 0.1, max_effort: float = 500.0):
        super().__init__(name)
        self.max_extension = max_extension
        self.max_effort = max_effort
        self.command = 0.0
        self.position_limits = (0.0, max_extension)
    
    def set_command(self, command: float):
        """Set position command for linear actuator"""
        if not self.is_active:
            raise RuntimeError(f"Actuator {self.name} is not active")
        
        self.command = np.clip(command, -self.max_effort, self.max_effort)
        
        # Simulate linear movement
        self.current_velocity = self.command * 0.001  # Simplified dynamics
        self.current_position += self.current_velocity * 0.01  # dt = 0.01s
        
        # Apply position limits
        self.current_position = np.clip(
            self.current_position,
            self.position_limits[0],
            self.position_limits[1]
        )
    
    def get_state(self) -> Dict[str, Any]:
        """Get the current state of the linear actuator"""
        return {
            "position": self.current_position,
            "velocity": self.current_velocity,
            "effort": self.current_effort,
            "command": self.command
        }


# Example usage
if __name__ == "__main__":
    # Create actuators
    joint1 = JointMotor("shoulder_pitch", max_effort=50.0)
    linear1 = LinearActuator("gripper_linear", max_extension=0.05)
    
    # Activate actuators
    joint1.activate()
    linear1.activate()
    
    # Command actuators
    joint1.set_command(1.57)  # Move to 90 degrees
    linear1.set_command(0.025)  # Move to halfway point
    
    # Get states
    joint_state = joint1.get_state()
    linear_state = linear1.get_state()
    
    print(f"Joint position: {joint_state['position']:.3f} rad")
    print(f"Linear position: {linear_state['position']:.3f} m")
```

## Example 3: Sensor Fusion

```python
import numpy as np
from typing import List


class SensorFusion:
    """Simple sensor fusion implementation using Kalman filter"""
    
    def __init__(self, dim_state: int):
        self.dim_state = dim_state
        self.state = np.zeros(dim_state)
        self.covariance = np.eye(dim_state) * 1000  # Initial uncertainty
    
    def predict(self, dt: float, control_input: np.ndarray = None):
        """Prediction step of the Kalman filter"""
        # State transition model (simplified - assumes constant velocity)
        F = np.eye(self.dim_state)
        if self.dim_state >= 2:
            F[0, 1] = dt  # Position changes with velocity
        
        # Process noise covariance
        Q = np.eye(self.dim_state) * 0.1
        
        # Predict state and covariance
        self.state = F @ self.state
        self.covariance = F @ self.covariance @ F.T + Q
    
    def update(self, measurement: np.ndarray, sensor_matrix: np.ndarray, 
               measurement_noise: np.ndarray):
        """Update step of the Kalman filter"""
        # Innovation
        innovation = measurement - sensor_matrix @ self.state
        
        # Innovation covariance
        innovation_cov = sensor_matrix @ self.covariance @ sensor_matrix.T + measurement_noise
        
        # Kalman gain
        kalman_gain = self.covariance @ sensor_matrix.T @ np.linalg.inv(innovation_cov)
        
        # Update state and covariance
        self.state = self.state + kalman_gain @ innovation
        self.covariance = (np.eye(self.dim_state) - kalman_gain @ sensor_matrix) @ self.covariance


class PositionEstimator:
    """Estimate position using multiple sensors"""
    
    def __init__(self):
        # State: [position, velocity]
        self.fusion = SensorFusion(dim_state=2)
        self.last_update_time = None
    
    def add_position_measurement(self, position: float, uncertainty: float, 
                                timestamp: float = None):
        """Add a position measurement from any sensor"""
        if self.last_update_time is not None and timestamp is not None:
            dt = timestamp - self.last_update_time
            self.fusion.predict(dt)
        
        # Measurement matrix (we're measuring position directly)
        H = np.array([[1.0, 0.0]])
        
        # Measurement and noise
        z = np.array([position])
        R = np.array([[uncertainty**2]])
        
        self.fusion.update(z, H, R)
        self.last_update_time = timestamp
    
    def get_estimated_state(self):
        """Get the current estimated state [position, velocity]"""
        return self.fusion.state


# Example usage with multiple sensors
if __name__ == "__main__":
    estimator = PositionEstimator()
    
    # Simulate measurements from different sensors
    # Camera provides position with high uncertainty
    estimator.add_position_measurement(position=1.0, uncertainty=0.5)
    
    # Encoders provide position with lower uncertainty
    estimator.add_position_measurement(position=1.1, uncertainty=0.1)
    
    # IMU provides velocity information (would need to be integrated)
    # For this example, we'll just add another position measurement
    estimator.add_position_measurement(position=1.05, uncertainty=0.2)
    
    estimated_state = estimator.get_estimated_state()
    print(f"Estimated position: {estimated_state[0]:.3f} m")
    print(f"Estimated velocity: {estimated_state[1]:.3f} m/s")
```

These examples demonstrate key concepts in sensors and actuators:
- The interface design for different sensor types
- Control strategies for actuators
- Sensor fusion techniques to combine information from multiple sensors