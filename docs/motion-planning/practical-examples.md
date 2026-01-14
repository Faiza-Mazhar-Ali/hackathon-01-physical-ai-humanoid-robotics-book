---
title: Practical Examples and Code - Motion Planning and Locomotion
---

# Practical Examples and Code - Motion Planning and Locomotion

## Example 1: A* Path Planning Algorithm

Here's an implementation of the A* path planning algorithm:

```python
import heapq
import numpy as np
from typing import List, Tuple, Optional


class AStarPlanner:
    def __init__(self, grid: np.ndarray):
        """
        Initialize the A* planner with a grid
        :param grid: 2D numpy array where 0 is free space and 1 is obstacle
        """
        self.grid = grid
        self.rows, self.cols = grid.shape
    
    def heuristic(self, a: Tuple[int, int], b: Tuple[int, int]) -> float:
        """Calculate the heuristic distance between two points (Manhattan distance)"""
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
    
    def get_neighbors(self, pos: Tuple[int, int]) -> List[Tuple[int, int]]:
        """Get valid neighbors of a position"""
        neighbors = []
        directions = [
            (-1, 0),  # Up
            (1, 0),   # Down
            (0, -1),  # Left
            (0, 1),   # Right
            (-1, -1), # Up-Left
            (-1, 1),  # Up-Right
            (1, -1),  # Down-Left
            (1, 1)    # Down-Right
        ]
        
        for dx, dy in directions:
            new_row, new_col = pos[0] + dx, pos[1] + dy
            
            # Check if the new position is within bounds and not an obstacle
            if (0 <= new_row < self.rows and 
                0 <= new_col < self.cols and 
                self.grid[new_row][new_col] == 0):
                neighbors.append((new_row, new_col))
        
        return neighbors
    
    def plan_path(self, start: Tuple[int, int], goal: Tuple[int, int]) -> Optional[List[Tuple[int, int]]]:
        """
        Plan a path from start to goal using A* algorithm
        :param start: Starting position (row, col)
        :param goal: Goal position (row, col)
        :return: List of positions representing the path, or None if no path exists
        """
        # Priority queue: (f_score, g_score, position)
        open_set = [(0, 0, start)]
        heapq.heapify(open_set)
        
        # Keep track of visited nodes and their g_scores
        g_score = {start: 0}
        came_from = {}
        
        while open_set:
            _, current_g, current = heapq.heappop(open_set)
            
            # If we reached the goal, reconstruct the path
            if current == goal:
                path = []
                while current in came_from:
                    path.append(current)
                    current = came_from[current]
                path.append(start)
                return path[::-1]  # Return reversed path
            
            # Skip if we've already found a better path to this node
            if current_g > g_score.get(current, float('inf')):
                continue
            
            # Explore neighbors
            for neighbor in self.get_neighbors(current):
                tentative_g = g_score[current] + 1  # Assuming uniform cost
                
                # If this path to neighbor is better than any previous one
                if tentative_g < g_score.get(neighbor, float('inf')):
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score = tentative_g + self.heuristic(neighbor, goal)
                    heapq.heappush(open_set, (f_score, tentative_g, neighbor))
        
        # No path found
        return None


# Example usage
if __name__ == "__main__":
    # Create a simple grid (0 = free space, 1 = obstacle)
    grid = np.array([
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
    
    planner = AStarPlanner(grid)
    start = (0, 0)
    goal = (9, 9)
    
    path = planner.plan_path(start, goal)
    
    if path:
        print(f"Path found with {len(path)} steps:")
        for i, pos in enumerate(path):
            print(f"Step {i}: {pos}")
    else:
        print("No path found!")
```

## Example 2: Simple Bipedal Locomotion Controller

```python
import numpy as np
from typing import Tuple


class BipedalController:
    """
    A simple controller for bipedal locomotion based on inverted pendulum model
    """
    
    def __init__(self, robot_height: float = 0.8, gravity: float = 9.81):
        self.robot_height = robot_height  # Height of the center of mass
        self.gravity = gravity
        self.step_length = 0.3  # Desired step length in meters
        self.step_height = 0.1  # Maximum step height
        self.step_duration = 1.0  # Time for each step in seconds
        
        # State variables
        self.left_foot_pos = np.array([0.0, -0.1])  # x, y position
        self.right_foot_pos = np.array([0.0, 0.1])
        self.com_pos = np.array([0.0, 0.0])  # Center of mass position
        self.com_vel = np.array([0.0, 0.0])  # Center of mass velocity
        
        # Walking gait parameters
        self.stance_foot = "left"  # Which foot is currently supporting weight
        self.swing_foot = "right"
        self.gait_phase = 0.0  # Phase of the current step (0.0 to 1.0)
    
    def calculate_zmp(self) -> np.ndarray:
        """
        Calculate the Zero Moment Point (ZMP) for balance
        """
        # For a simple inverted pendulum model:
        # ZMP_x = CoM_x - (CoM_height / gravity) * CoM_acc_x
        # ZMP_y = CoM_y - (CoM_height / gravity) * CoM_acc_y
        
        # For this simple example, we'll return the current CoM position
        # In a real implementation, this would consider acceleration
        return self.com_pos.copy()
    
    def is_balanced(self) -> bool:
        """
        Check if the robot is currently balanced
        """
        zmp = self.calculate_zmp()
        
        # Check if ZMP is within the support polygon (area under stance foot)
        if self.stance_foot == "left":
            support_polygon_x = [self.left_foot_pos[0] - 0.05, self.left_foot_pos[0] + 0.05]
            support_polygon_y = [self.left_foot_pos[1] - 0.05, self.left_foot_pos[1] + 0.05]
        else:
            support_polygon_x = [self.right_foot_pos[0] - 0.05, self.right_foot_pos[0] + 0.05]
            support_polygon_y = [self.right_foot_pos[1] - 0.05, self.right_foot_pos[1] + 0.05]
        
        return (support_polygon_x[0] <= zmp[0] <= support_polygon_x[1] and
                support_polygon_y[0] <= zmp[1] <= support_polygon_y[1])
    
    def step_forward(self) -> Tuple[np.ndarray, np.ndarray]:
        """
        Execute one step forward
        Returns: (new_left_foot_pos, new_right_foot_pos)
        """
        # Determine which foot is swing foot and calculate its trajectory
        if self.stance_foot == "left":
            stance_foot_pos = self.left_foot_pos
            swing_foot_pos = self.right_foot_pos
        else:
            stance_foot_pos = self.right_foot_pos
            swing_foot_pos = self.left_foot_pos
        
        # Calculate swing foot trajectory (simple parabolic trajectory)
        phase = self.gait_phase
        target_x = stance_foot_pos[0] + self.step_length
        
        # Parabolic trajectory for step
        swing_x = stance_foot_pos[0] + phase * self.step_length
        swing_y = stance_foot_pos[1]  # Keep same y for now
        swing_z = self.step_height * np.sin(np.pi * phase)  # Lift foot in z direction
        
        # Update positions based on phase
        if self.stance_foot == "left":
            new_right_foot_pos = np.array([swing_x, swing_y])
            new_left_foot_pos = self.left_foot_pos  # Stance foot stays in place
        else:
            new_left_foot_pos = np.array([swing_x, swing_y])
            new_right_foot_pos = self.right_foot_pos  # Stance foot stays in place
        
        # Update gait phase
        self.gait_phase += 0.02  # Increment phase (assuming 50 steps per second)
        
        # Switch stance and swing feet when phase completes
        if self.gait_phase >= 1.0:
            self.gait_phase = 0.0
            self.stance_foot, self.swing_foot = self.swing_foot, self.stance_foot
        
        # Update center of mass position (simplified)
        self.com_pos[0] += self.step_length / (self.step_duration * 50)  # Move CoM forward
        
        return new_left_foot_pos, new_right_foot_pos
    
    def walk_forward(self, steps: int) -> List[Tuple[np.ndarray, np.ndarray]]:
        """
        Generate a sequence of steps for forward walking
        """
        step_sequence = []
        
        for _ in range(steps):
            left_pos, right_pos = self.step_forward()
            step_sequence.append((left_pos.copy(), right_pos.copy()))
        
        return step_sequence


# Example usage
if __name__ == "__main__":
    controller = BipedalController()
    
    print("Walking forward for 5 steps:")
    steps = controller.walk_forward(5)
    
    for i, (left_pos, right_pos) in enumerate(steps):
        print(f"Step {i+1}: Left foot at {left_pos}, Right foot at {right_pos}")
        print(f"  Balance status: {'Balanced' if controller.is_balanced() else 'Unbalanced'}")
```

## Example 3: Trajectory Planning with Velocity and Acceleration

```python
import numpy as np
from typing import List, Tuple


class TrajectoryPlanner:
    """
    Plan smooth trajectories with velocity and acceleration constraints
    """
    
    def __init__(self, max_velocity: float = 1.0, max_acceleration: float = 2.0):
        self.max_velocity = max_velocity
        self.max_acceleration = max_acceleration
    
    def plan_minimal_jerk_trajectory(
        self, 
        start_pos: float, 
        end_pos: float, 
        duration: float, 
        num_points: int = 100
    ) -> Tuple[List[float], List[float], List[float], List[float]]:
        """
        Plan a minimal jerk trajectory between two points
        Returns: (time_points, positions, velocities, accelerations)
        """
        # Time vector
        t = np.linspace(0, duration, num_points)
        
        # Coefficients for minimal jerk trajectory
        # Position: s(t) = a0 + a1*t + a2*t^2 + a3*t^3 + a4*t^4 + a5*t^5
        a0 = start_pos
        a1 = 0  # Start with zero velocity
        a2 = 0  # Start with zero acceleration
        a3 = (20 * (end_pos - start_pos)) / (2 * duration**3)
        a4 = (-30 * (end_pos - start_pos)) / (2 * duration**4)
        a5 = (12 * (end_pos - start_pos)) / (2 * duration**5)
        
        # Calculate trajectory
        positions = a0 + a1*t + a2*(t**2) + a3*(t**3) + a4*(t**4) + a5*(t**5)
        velocities = a1 + 2*a2*t + 3*a3*(t**2) + 4*a4*(t**3) + 5*a5*(t**4)
        accelerations = 2*a2 + 6*a3*t + 12*a4*(t**2) + 20*a5*(t**3)
        
        return t.tolist(), positions.tolist(), velocities.tolist(), accelerations.tolist()
    
    def plan_trapezoidal_trajectory(
        self, 
        start_pos: float, 
        end_pos: float, 
        duration: float
    ) -> Tuple[List[float], List[float], List[float], List[float]]:
        """
        Plan a trapezoidal velocity profile trajectory
        Returns: (time_points, positions, velocities, accelerations)
        """
        distance = abs(end_pos - start_pos)
        direction = 1 if end_pos > start_pos else -1
        
        # Calculate time for acceleration, constant velocity, and deceleration phases
        # For simplicity, assume equal acceleration and deceleration times
        # and that max velocity is reached
        max_vel = self.max_velocity
        acc_time = max_vel / self.max_acceleration
        acc_dist = 0.5 * max_vel * acc_time
        
        if 2 * acc_dist >= distance:
            # Triangle profile: never reach max velocity
            acc_time = np.sqrt(distance / self.max_acceleration)
            acc_dist = 0.5 * self.max_acceleration * acc_time**2
            max_vel = self.max_acceleration * acc_time
            const_time = 0
        else:
            # Trapezoidal profile
            const_dist = distance - 2 * acc_dist
            const_time = const_dist / max_vel
        
        total_profile_time = 2 * acc_time + const_time
        
        # Create time vector
        num_points = 100
        t = np.linspace(0, duration, num_points)
        
        positions = []
        velocities = []
        accelerations = []
        
        for time in t:
            # Scale time to profile time
            scaled_time = (time / duration) * total_profile_time
            
            if scaled_time <= acc_time:
                # Acceleration phase
                vel = self.max_acceleration * scaled_time
                pos = 0.5 * self.max_acceleration * scaled_time**2
                acc = self.max_acceleration
            elif scaled_time <= acc_time + const_time:
                # Constant velocity phase
                vel = max_vel
                pos = acc_dist + max_vel * (scaled_time - acc_time)
                acc = 0
            elif scaled_time <= 2 * acc_time + const_time:
                # Deceleration phase
                dec_time = scaled_time - (acc_time + const_time)
                vel = max_vel - self.max_acceleration * dec_time
                pos = acc_dist + max_vel * const_time + max_vel * dec_time - 0.5 * self.max_acceleration * dec_time**2
                acc = -self.max_acceleration
            else:
                # End of trajectory
                vel = 0
                pos = distance
                acc = 0
            
            # Apply direction and offset
            positions.append(start_pos + direction * pos)
            velocities.append(direction * vel)
            accelerations.append(direction * acc)
        
        return t.tolist(), positions.tolist(), velocities.tolist(), accelerations.tolist()


# Example usage
if __name__ == "__main__":
    planner = TrajectoryPlanner(max_velocity=0.5, max_acceleration=1.0)
    
    # Plan a minimal jerk trajectory
    print("Minimal Jerk Trajectory:")
    times, positions, velocities, accelerations = planner.plan_minimal_jerk_trajectory(
        start_pos=0.0, end_pos=1.0, duration=2.0
    )
    
    print(f"Duration: {times[-1]:.2f}s")
    print(f"Start pos: {positions[0]:.2f}m, End pos: {positions[-1]:.2f}m")
    print(f"Max velocity: {max(velocities):.2f}m/s")
    print(f"Max acceleration: {max(accelerations):.2f}m/s²")
    
    # Plan a trapezoidal trajectory
    print("\nTrapezoidal Trajectory:")
    times2, positions2, velocities2, accelerations2 = planner.plan_trapezoidal_trajectory(
        start_pos=0.0, end_pos=1.0, duration=2.0
    )
    
    print(f"Duration: {times2[-1]:.2f}s")
    print(f"Start pos: {positions2[0]:.2f}m, End pos: {positions2[-1]:.2f}m")
    print(f"Max velocity: {max(velocities2):.2f}m/s")
    print(f"Max acceleration: {max(accelerations2):.2f}m/s²")
```

These examples demonstrate key concepts in motion planning and locomotion:
- Path planning algorithms like A*
- Bipedal locomotion control strategies
- Trajectory planning with dynamic constraints