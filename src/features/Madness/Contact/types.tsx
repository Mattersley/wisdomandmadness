export type Inputs = {
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

export const SERVICES = [
  'Web Design',
  'Web Development',
  'E-commerce',
  'SEO & Marketing',
  'Maintenance',
  'Consulting'
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