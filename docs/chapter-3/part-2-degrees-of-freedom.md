---
sidebar_position: 3
title: Part 2 - Degrees of Freedom & Kinematic Chains
---

# Part 2: Degrees of Freedom & Kinematic Chains

Degrees of Freedom (DOF) represent the number of independent parameters that define the configuration of a mechanical system. In humanoid robots, DOF determine the range of possible movements and significantly influence the robot's capabilities and complexity.

### Understanding Degrees of Freedom

Each joint in a humanoid robot contributes one or more degrees of freedom, depending on its type. A revolute joint allows rotation around a single axis (1 DOF), while a spherical joint permits rotation around multiple axes (typically 2-3 DOF). The total DOF of a humanoid robot is the sum of all individual joint DOFs, though the effective DOF may be lower due to constraints.

Humanoid robots typically have 20-30 DOF for basic functionality, with advanced systems reaching 50+ DOF. The distribution of DOF across the body affects the robot's dexterity and mobility. For example, a humanoid arm might have 7 DOF to achieve human-like manipulation capabilities.

### Serial vs Parallel Kinematic Chains

Kinematic chains connect joints and links to form functional units. Two primary architectures exist:

**Serial chains** consist of joints connected end-to-end in a linear sequence. Most humanoid robot arms and legs use serial kinematic chains, offering simplicity in design and control. However, serial chains accumulate positioning errors along the chain and may lack structural rigidity compared to parallel configurations.

**Parallel chains** feature multiple independent paths connecting the base to the end-effector. These systems offer greater stiffness and accuracy but increased complexity in design and control. Some humanoid robots incorporate parallel mechanisms in critical areas like wrists or ankles to improve performance.

### Redundancy in Humanoid Systems

Redundancy occurs when a humanoid robot has more DOF than minimally required to perform a task. For example, a 7-DOF arm can reach a target position and orientation in infinite ways, unlike a 6-DOF arm with a unique solution. Redundancy provides flexibility in motion planning and obstacle avoidance but increases computational complexity.

Redundant systems can optimize secondary objectives such as energy efficiency, joint limit avoidance, or obstacle clearance while achieving primary tasks. However, redundancy also introduces challenges in control and coordination, requiring sophisticated algorithms to manage the additional degrees of freedom effectively.

### Forward vs Inverse Kinematics

Forward kinematics calculates the position and orientation of the end-effector given joint angles. This computation is deterministic and straightforward, involving trigonometric relationships between joints.

Inverse kinematics determines the joint angles required to achieve a desired end-effector position and orientation. This problem often has multiple solutions or no solution within the robot's workspace, making it computationally challenging. The mechanical structure directly influences the complexity of inverse kinematics, with redundant systems offering multiple solutions and constrained systems potentially having no valid configuration.

### Real-World Examples

**Arms**: Humanoid arms typically have 7 DOF (3 in the shoulder, 1 in the elbow, 3 in the wrist) to match human dexterity. The kinematic chain follows a serial configuration from shoulder to hand, with redundancy allowing for comfortable reaching positions.

**Legs**: Humanoid legs usually have 6 DOF (3 in the hip, 1 in the knee, 2 in the ankle) to enable walking and balance. The kinematic chain supports both static stability and dynamic locomotion, with joint limits defining the robot's gait capabilities.

**Torso/Neck**: The torso and neck provide additional DOF for orientation and balance. A typical humanoid torso might have 3-6 DOF to enable upper body movement and head orientation, affecting perception and interaction capabilities.

### Key Takeaways

- DOF determine the range of possible movements and system complexity
- Serial chains offer simplicity, parallel chains provide rigidity
- Redundancy enables optimization but increases computational demands
- Kinematic structure directly affects control complexity and capabilities