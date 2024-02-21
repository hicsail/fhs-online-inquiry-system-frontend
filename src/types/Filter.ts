export type Data = {
  type: string;
  total: number;
  average_age_at_death: number;
  hs_grad: number;
  college_grad: number;
  mri_1: number;
  mri_2: number;
  mri_3: number;
  dvoice_1: number;
  dvoice_2: number;
  dvoice_3: number;
  smoking_ever: number;
  overall_dementia_probe: number;
  hypertension_ever: number;
  diabetic_ever: number;
};

export type Filter =
  | {
      type: 'slider';
      name: string;
      variableName: string;
      npCategory: boolean;
      max: number;
      min: number;
      step?: number;
      minDistance?: number;
      description: string;
    }
  | {
      type: 'option';
      name: string;
      variableName: string;
      npCategory: boolean;
      optionType: 'radio' | 'select' | 'checkbox';
      options: { [key: string]: number };
      description: string;
    };

export const brainDataFilters: Filter[] = [
  { name: 'nppmih_hours', variableName: 'Postmortem Interval (Hours)', type: 'slider', npCategory: false, max: 160, min: 0, description: 'Hours for Postmortem interval (PMI): time between death and brain removal' },
  { name: 'age_death', variableName: 'Age of Death', type: 'slider', npCategory: false, max: 120, min: 0, description: 'Age at death' },
  { name: 'nprin', variableName: 'RNA Integrity Number', type: 'slider', npCategory: false, max: 10, min: 0, description: 'RNA integrity number' },
  {
    name: 'npfrotispre',
    variableName: 'Frozen tissue present',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: { Right: 1, Left: 2, NA: 3 },
    description: 'Frozen Tissue Present'
  },
  {
    name: 'npfix',
    variableName: 'Fixative',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: { Formalin: 1, Paraformaldehyde: 2, Other: 7 },
    description: 'Fixative'
  },
  {
    name: 'npinf',
    variableName: 'Observed infarcts',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: {
      No: 0,
      Yes: 1
    },
    description: 'Presence of old infarcts, observed grossly'
  },
  {
    name: 'npftdt7',
    variableName: 'Chronic traumatic encephalopathy (CTE)',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: {
      No: 0,
      Yes: 1
    },
    description: 'Chronic traumatic encephalopathy (CTE)'
  },
  {
    name: 'npavas',
    variableName: 'Atherosclerosis severity',
    type: 'option',
    npCategory: true,
    optionType: 'select',
    options: {
      None: 0,
      Mild: 1,
      Moderate: 2,
      Severe: 3,
      'Not Assessed': 8,
      'Missing/Unknown': 9
    },
    description: 'Presence and severity of atherosclerosis'
  },
  {
    name: 'pathmnd',
    variableName: 'ALS/Motor neuron disease',
    type: 'option',
    npCategory: true,
    optionType: 'select',
    options: {
      No: 0,
      'Yes (TDP43)': 1,
      'Yes (FUS)': 2,
      'Yes (SOD1)': 3,
      'Yes (other)': 4,
      'Not Assessed': 8,
      'Missing/Unknown': 9
    },
    description: 'Neuropathological presence of ALS/Motor neuron disease'
  },
  {
    name: 'pathad',
    variableName: 'Derived AD dementia',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: {
      No: 0,
      Yes: 1
    },
    description: 'Neuropathological presence of Alzheimers disease'
  },
  {
    name: 'relatauo',
    variableName: 'Age-related tauopathy',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: {
      No: 0,
      Yes: 1
    },
    description: 'Primary age-related tauopathy (PART; requires NFTs present with Braak stage <= IV, usually III or lower)'
  },
  {
    name: 'npftdtau',
    variableName: 'FTLD with Tau pathology',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: {
      No: 0,
      Yes: 1
    },
    description: 'FTLD with tau pathology (FTLD-tau) or other tauopathy'
  },
  {
    name: 'npftdtdp',
    variableName: 'FTLD with TDP-43',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: {
      No: 0,
      Yes: 1
    },
    description: 'FTLD with TDP-43 pathology (FTLD-TDP)'
  },
  {
    name: 'nphipscl',
    variableName: 'Hippocampal Sclerosis',
    type: 'option',
    npCategory: true,
    optionType: 'checkbox',
    options: {
      None: 0,
      Unilateral: 1,
      Bilateral: 2,
      Present: 3,
      'Missing/Unknown': 9
    },
    description: 'Hippocampal sclerosis (CA1 and/or subiculum'
  }
];
