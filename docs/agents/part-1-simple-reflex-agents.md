---
title: Part 1 – Simple Reflex Agents
sidebar_label: Part 1 – Simple Reflex Agents
---

# Part 1 – Simple Reflex Agents

Simple reflex agents are the most basic type of AI agent that operate based on the current percept (sensor input) without considering the history of percepts. They follow a condition-action rule: "if condition, then action."

## What Simple Reflex Agents Are

Simple reflex agents operate based on the principle that the current situation is all that matters for deciding what action to take. They use a lookup table or rule-based system to map percepts directly to actions.

Key characteristics:
- **No memory**: They don't consider past percepts
- **Fast response**: Direct mapping from percept to action
- **Limited intelligence**: Can only respond to current situation
- **Predictable behavior**: Same percept always produces same action

## How Simple Reflex Agents Work

The operation of a simple reflex agent follows these steps:
1. Sense the environment through sensors
2. Match the current percept against a set of condition-action rules
3. Execute the action associated with the matching condition
4. Repeat the process

The agent function can be expressed as: action = f(percept)

## Implementation Example: Obstacle Avoidance Robot

A simple example of a reflex agent is an obstacle avoidance robot:

```
IF front_sensor detects obstacle THEN
    turn_right()
ELSE
    move_forward()
```

This agent only considers the current reading from the front sensor and responds accordingly.

## Advantages and Limitabilities

### Advantages:
- Simple to implement and understand
- Fast response time
- Deterministic behavior
- Low computational requirements

### Limitabilities:
- Cannot handle complex environments
- May get stuck in loops
- No ability to plan ahead
- Cannot learn from experience

## When to Use Simple Reflex Agents

Simple reflex agents are appropriate when:
- The environment is predictable
- The agent has sufficient sensors to determine correct action
- Response time is critical
- The task is simple and well-defined

## Example: Line Following Robot

A classic example of a simple reflex agent is a line-following robot:

```
IF left_sensor detects line AND right_sensor detects line THEN
    move_forward()
ELSE IF left_sensor detects line THEN
    turn_left()
ELSE IF right_sensor detects line THEN
    turn_right()
ELSE
    stop()  // Lost the line
```

This agent only needs to know the current state of its sensors to determine the appropriate action.

## Diagram: Simple Reflex Agent Architecture
[Diagram showing sensors connecting directly to condition-action rules that output to actuators]

## Summary

- Simple reflex agents map current percepts directly to actions
- They have no memory of past percepts
- They work well in predictable environments
- They are fast but limited in capability
- Best suited for simple, well-defined tasks