export type FormInputs = {
  name: string;
  email: string;
  company: string;
  notes: string;
  services: string[];
  budget: string;
  timeline: string;
  projectStatus: string;
  goals: string;
  targetAudience: string;
  inspiration: { url: string }[];
  additionalInfo: string;
  petName: string;
  petBio: string;
  petImage: FileList;
};

import {
  Globe,
  Code2,
  ShoppingBag,
  TrendingUp,
  Wrench,
  Lightbulb,
  PlusCircle
} from 'lucide-react'

export interface BranchingSubField {
  id: string;
  label: string;
  type: 'select' | 'input';
  placeholder?: string;
  options?: string[];
  hasOtherOption?: boolean; // Triggers dynamic text write-in
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  subFields: BranchingSubField[];
}

export const SERVICES_BRANCH_META: ServiceItem[] = [
  {
    id: 'Web Design',
    title: 'Web Design',
    description:
      'Bespoke UI/UX architectures, spatial layout mapping, and sensory conversion paths.',
    icon: Globe,
    subFields: [
      {
        id: 'designSystem',
        label: 'Requires Brand Design System?',
        type: 'select',
        options: [
          'Yes - From Scratch',
          'Yes - Overhaul Existing',
          'No - Use Current Brand Guide',
          'Other'
        ],
        hasOtherOption: true
      },
      {
        id: 'targetStyle',
        label: 'Primary Aesthetic Direction',
        type: 'select',
        options: [
          'Brutalist / High-Type',
          'Clean / Corporate Minimalist',
          'Creative / Fluid WebGL Animation',
          'Other'
        ],
        hasOtherOption: true
      }
    ]
  },
  {
    id: 'Web Development',
    title: 'Web Development',
    description:
      'Production-ready React infrastructure, high-fidelity responsive styling, and custom pipelines.',
    icon: Code2,
    subFields: [
      {
        id: 'cmsPreference',
        label: 'Content Management Integration',
        type: 'select',
        options: [
          'Headless (Sanity/Strapi)',
          'Decoupled WordPress',
          'Static Payload (Markdown)',
          'Other'
        ],
        hasOtherOption: true
      },
      {
        id: 'apiIntegrations',
        label: 'Third-Party Pipeline Connectors',
        type: 'input',
        placeholder: 'HubSpot, Salesforce, Custom Internal REST API...'
      }
    ]
  },
  {
    id: 'E-commerce',
    title: 'E-commerce',
    description:
      'Custom commerce engine integrations, processing architectures, and automated inventory logistics.',
    icon: ShoppingBag,
    subFields: [
      {
        id: 'platformTech',
        label: 'Engine Ecosystem Preference',
        type: 'select',
        options: [
          'Shopify Headless (Hydrogen)',
          'Stripe API + Custom checkout',
          'Standard Shopify Theme Template',
          'Other'
        ],
        hasOtherOption: true
      },
      {
        id: 'productCount',
        label: 'Approximate SKU Volume',
        type: 'select',
        options: [
          '1 - 50 Products',
          '51 - 500 Products',
          '500+ Advanced Inventory Matrix'
        ]
      }
    ]
  },
  {
    id: 'SEO & Marketing',
    title: 'SEO & Marketing',
    description:
      'Technical programmatic data indexing, core web vitals optimization, and structural visibility engineering.',
    icon: TrendingUp,
    subFields: [
      {
        id: 'seoScope',
        label: 'Primary Optimization Target',
        type: 'select',
        options: [
          'Local Visibility Discovery',
          'Global Competitive Ranking',
          'Technical / Migration Health Audit',
          'Other'
        ],
        hasOtherOption: true
      }
    ]
  },
  {
    id: 'Maintenance',
    title: 'Maintenance',
    description:
      'Continuous runtime dependency audits, automated regression scanning, and hot-patch updates.',
    icon: Wrench,
    subFields: [
      {
        id: 'slaTier',
        label: 'Support SLA Threshold Required',
        type: 'select',
        options: [
          '24/7 Critical System Monitoring',
          'Next-Business-Day Discretionary Response',
          'Ad-hoc Developer Hourly Support Blocks',
          'Other'
        ],
        hasOtherOption: true
      }
    ]
  },
  {
    id: 'Consulting',
    title: 'Consulting',
    description:
      'Technological mapping sessions, structural growth blueprints, and architectural validation audits.',
    icon: Lightbulb,
    subFields: [
      {
        id: 'consultationFormat',
        label: 'Engagement Structural Mapping',
        type: 'select',
        options: [
          '1-on-1 Discovery Workshop',
          'Infrastructure Code Audit',
          'Ongoing Advisory Board Placement',
          'Other'
        ],
        hasOtherOption: true
      }
    ]
  },
  {
    id: 'Other',
    title: 'Other Scope',
    description:
      'Do you have unique business workflows, special feature extensions, or technical constraints?',
    icon: PlusCircle,
    subFields: [
      {
        id: 'customDetails',
        label: 'Describe Custom Requirements',
        type: 'input',
        placeholder: 'Mobile App, AI automation, Custom WebGL, etc...'
      }
    ]
  }
]

export const TIMELINES = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-3m', label: '1-3 Months' },
  { value: '3m+', label: '3+ Months' },
  { value: 'no', label: 'No restraints' }
]

export const PROJECT_STATUSES = [
  { value: 'new', label: 'New Project' },
  { value: 'redesign', label: 'Redesign' },
  { value: 'ongoing', label: 'Ongoing Support' }
]

export interface WizardStep {
  id: string;
  title: string;
  subtitle: string;
  type: 'select' | 'budget' | 'text';
  // Notice the question mark (?) making this field optional for text fields
  options?: {
    label: string;
    value: string;
    icon: string;
    description?: string;
  }[];
}

export interface InspirationItem {
  url: string;
}

// 1. Explicitly type the branching key options matrix
export interface NestedServiceSpecs {
  [fieldId: string]: string | undefined; // Captures dropdown selections and dynamically named custom fields like 'designSystem_custom'
}

export interface ServiceDetailsMap {
  [serviceId: string]: NestedServiceSpecs | undefined; // Maps custom service categories (e.g. 'Web Design', 'Web Development')
}

// 2. Attach the nested properties directly to your primary form data definition model
export interface Inputs {
  // Stage 1 Fields
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  website_confirm_field?: string;

  // Stage 2 Fields
  services: string[];
  serviceDetails?: ServiceDetailsMap; // FIXED: Added nested mapping shape parameter right here

  // Stage 3 Fields
  budget: string;
  timeline: string;

  // Stage 4 Fields
  projectStatus: 'new' | 'migration' | 'facelift';
  goals?: string;
  targetAudience?: string;
  additionalInfo?: string;
  visionDetails?: string;

  // Stage 5 Fields
  inspiration: InspirationItem[];

  // Stage 6 Fields (Manager Approval Optional Segment)
  petName?: string;
  petImage?: FileList;
  petBio?: string;
}
