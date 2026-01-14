---
title: Part 2 – Model-Based Reflex Agents
sidebar_label: Part 2 – Model-Based Reflex Agents
---

# Part 2 – Model-Based Reflex Agents

Model-based reflex agents improve upon simple reflex agents by maintaining an internal state that depends on the percept history. This allows them to track aspects of the world that are not evident in the current percept, making them more effective in partially observable environments.

## What Model-Based Reflex Agents Are

Model-based reflex agents maintain an internal model of the world that helps them make better decisions. This model represents:
- The current state of the environment
- How the environment changes over time
- How the agent's actions affect the environment

Unlike simple reflex agents, model-based agents can handle situations where the current percept doesn't provide complete information about the environment.

## Components of Model-Based Agents

### State Representation
The internal state that captures the agent's understanding of the world based on percept history.

### Model of the World
Knowledge about how the environment works, including:
- How the state changes over time
- How the agent's actions affect the state

### Condition-Action Rules
Rules that determine actions based on the internal state rather than just the current percept.

### State Update Function
A function that updates the internal state based on the current percept and previous state.

## How Model-Based Reflex Agents Work

The operation of a model-based reflex agent follows these steps:
1. Sense the environment through sensors
2. Update the internal state based on the current percept and previous state
3. Use the internal state to select an action
4. Execute the action
5. Repeat the process

The agent function can be expressed as: action = f(internal_state)

## Implementation Example: Vacuum Cleaner Robot

A model-based reflex agent for a vacuum cleaner might work as follows:

```
// Internal state
current_location = "A"
has_cleaned_A = false
has_cleaned_B = false

// Update state based on percept
IF percept is "at location A" THEN
    current_location = "A"
IF percept is "dirty" at current_location THEN
    IF current_location is "A" THEN
        has_cleaned_A = false
    ELSE
        has_cleaned_B = false

// Action selection
IF has_cleaned_A is false AND current_location is "A" THEN
    clean()
    has_cleaned_A = true
ELSE IF has_cleaned_B is false AND current_location is "B" THEN
    clean()
    has_cleaned_B = true
ELSE
    move_to_other_location()
```

## Advantages Over Simple Reflex Agents

### Better Handling of Partial Observability
Model-based agents can maintain information about unobservable aspects of the environment.

### More Sophisticated Behavior
They can perform tasks that require memory of past events.

### Improved Performance
They make better decisions by considering the history of percepts.

## Example: Door Opening Robot

A robot that needs to open a door might use a model-based approach:

```
// Internal state
door_state = "unknown"  // closed, open, locked
arm_position = "down"

// Update state based on percepts
IF percept is "door appears closed" THEN
    door_state = "closed"
IF percept is "door handle turns" THEN
    door_state = "unlocked"

// Action selection
IF door_state is "closed" AND arm_position is "down" THEN
    raise_arm_to_handle()
    arm_position = "up"
ELSE IF door_state is "closed" AND arm_position is "up" THEN
    turn_handle()
ELSE IF door_state is "unlocked" THEN
    push_door_open()
```

This agent maintains a model of the door state and its own arm position to make appropriate decisions.

## Challenges with Model-Based Agents

### State Representation
Deciding what information to store in the internal state can be challenging.

### Model Accuracy
The internal model must accurately reflect the real environment.

### Computational Complexity
Maintaining and updating the internal state requires more computation.

## Diagram: Model-Based Reflex Agent Architecture
[Diagram showing sensors, state update function, world model, condition-action rules, and actuators]

## Summary

- Model-based reflex agents maintain an internal state based on percept history
- They can handle partially observable environments better than simple reflex agents
- They use a model of the world to inform their decisions
- They are more sophisticated but require more computational resources
- They are suitable for tasks requiring memory of past events