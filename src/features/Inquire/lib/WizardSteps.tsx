import { WizardStep } from '@/features/Inquire/types'

export const WIZARD_STEPS: Record<string, WizardStep> = {
  START: {
    id: 'start',
    title: 'Select Your Blueprint',
    subtitle: 'What architectural marvel are we constructing?',
    type: 'select',
    options: [
      {
        label: 'Brand & Graphic Design',
        value: 'graphic',
        icon: '🎨',
        description: 'Visual systems, identity layouts, presentation decks.'
      },
      {
        label: 'Single Page / Landing Website',
        value: 'landing',
        icon: '⚡',
        description: 'High-conversion interactive experiences.'
      },
      {
        label: 'Enterprise Web Application',
        value: 'enterprise',
        icon: '🌌',
        description:
          'Scalable cloud infrastructure, complex dashboards, high security.'
      }
    ]
  },
  // GRAPHIC PATH
  GRAPHIC_SCOPE: {
    id: 'graphic_scope',
    title: 'Scope of Artistry',
    subtitle: 'What assets do you require designed?',
    type: 'select',
    options: [
      {
        label: 'Complete Brand Identity System',
        value: 'full_brand',
        icon: '💎'
      },
      { label: 'Marketing Assets & Decks', value: 'marketing', icon: '📊' },
      { label: 'UI/UX Visual Prototyping', value: 'ui_prototype', icon: '📐' }
    ]
  },
  // LANDING PATH
  LANDING_GOAL: {
    id: 'landing_goal',
    title: 'Primary Core Directive',
    subtitle: 'What is the ultimate target action of this landing page?',
    type: 'select',
    options: [
      {
        label: 'Product Launch & Waitlist Acquisition',
        value: 'launch',
        icon: '🚀'
      },
      {
        label: 'Portfolio Exhibition & Creative Showcase',
        value: 'showcase',
        icon: '👁'
      },
      {
        label: 'Direct High-Volume Lead Generation',
        value: 'leads',
        icon: '🎯'
      }
    ]
  },
  // ENTERPRISE PATH
  ENTERPRISE_TECH: {
    id: 'enterprise_tech',
    title: 'Core Infrastructure',
    subtitle: 'What heavy operational parameters are mandatory?',
    type: 'select',
    options: [
      {
        label: 'Real-Time Synchronized Data Matrices',
        value: 'realtime',
        icon: '🔄'
      },
      {
        label: 'Complex FinTech & Stripe Integrations',
        value: 'fintech',
        icon: '💳'
      },
      {
        label: 'Strict Custom RBAC & Multi-Tenant Architecture',
        value: 'security',
        icon: '🛡'
      }
    ]
  },
  // UNIFIED STAGES
  BUDGET: {
    id: 'budget',
    title: 'Financial Horizon',
    subtitle: 'Select an investment tier aligned with your vision.',
    type: 'select',
    options: [
      {
        label: '$2,500 – $5,000',
        value: 'tier_1',
        icon: '🌱',
        description: 'For standard rapid design & builds.'
      },
      {
        label: '$5,000 – $15,000',
        value: 'tier_2',
        icon: '🌲',
        description: 'For tailored animations, setups, & high custom logic.'
      },
      {
        label: '$15,000 – $50,000+',
        value: 'tier_3',
        icon: '🏛',
        description: 'For full enterprise design-to-deployment scaling.'
      }
    ]
  },
  DEBRIEF: {
    id: 'debrief',
    title: 'The Execution Debrief',
    subtitle: 'Synthesize your structural goals or missing parameters.',
    type: 'text'
  }
}
