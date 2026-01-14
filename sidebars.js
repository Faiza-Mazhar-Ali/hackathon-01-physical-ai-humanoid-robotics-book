// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Chapter 1 – Foundations of Physical AI & Humanoid Robotics',
      items: [
        'chapter-1/intro',
        'chapter-1/part-1-physical-ai-fundamentals',
        'chapter-1/part-2-embodied-intelligence',
        'chapter-1/part-3-humanoid-robot-architecture'
      ],
    },
    {
      type: 'category',
      label: 'Chapter 2 – Sensors, Actuators, and Control Systems',
      items: [
        'chapter-2/intro',
        'chapter-2/part-1-sensors',
        'chapter-2/part-2-actuators',
        'chapter-2/part-3-control-systems'
      ],
    },
    {
      type: 'category',
      label: 'Chapter 3 – Mechanical & Structural Design of Humanoid Robots',
      items: [
        'chapter-3/intro',
        'chapter-3/part-1-mechanical-systems',
        'chapter-3/part-2-degrees-of-freedom',
        'chapter-3/part-3-joint-design',
        'chapter-3/part-4-mass-distribution',
        'chapter-3/part-5-structural-trade-offs'
      ],
    },
    {
      type: 'category',
      label: 'Chapter 4 – Motion Planning & Locomotion in Humanoid Robots',
      items: [
        'chapter-4/intro',
        'chapter-4/part-1-motion-intelligence',
        'chapter-4/part-2-configuration-space',
        'chapter-4/part-3-locomotion-fundamentals',
        'chapter-4/part-4-balance-stability',
        'chapter-4/part-5-motion-planning-approaches'
      ],
    },
    {
      type: 'category',
      label: 'Chapter 5 – Learning, Adaptation & Embodied Intelligence in Humanoid Robots',
      items: [
        'chapter-5/intro',
        'chapter-5/part-1-introduction-embodied-learning',
        'chapter-5/part-2-learning-physical-interaction',
        'chapter-5/part-3-adaptive-control',
        'chapter-5/part-4-multimodal-learning',
        'chapter-5/part-5-practical-examples'
      ],
    },
  ],
};

module.exports = sidebars;
