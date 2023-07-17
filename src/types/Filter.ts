export type Filter = {
  name: string;
  variableName: string;
  type: 'slider' | 'option';
  npCategory: boolean;
  max?: number;
  min?: number;
  step?: number;
  minDistance?: number;
  optionType?: 'checkbox' | 'radio' | 'select';
  options?: any;
};

export const brainDataFilters: Filter[] = [
  { name: 'nppmih_hours', variableName: 'Postmortem Interval (Hours)', type: 'slider', npCategory: false, max: 160, min: 0 },
  { name: 'age_death', variableName: 'Age of Death', type: 'slider', npCategory: false, max: 100, min: 0 },
  { name: 'nprin', variableName: 'RNA Integrity Number', type: 'slider', npCategory: false, max: 100, min: 0 },
  { name: 'npfrotispre', variableName: 'Frozen tissue present', type: 'option', npCategory: true, optionType: 'radio', options: { Right: 1, Left: 2, NA: 3 } },
  { name: 'npfix', variableName: 'Fixative', type: 'option', npCategory: true, optionType: 'radio', options: { Formalin: 1, Paraformaldehyde: 2, Other: 7 } },
  {
    name: 'npinf',
    variableName: 'Observed infarcts',
    type: 'option',
    npCategory: true,
    optionType: 'radio',
    options: {
      No: 0,
      Yes: 1
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  {
    name: 'nphipscl',
    variableName: 'Hippocampal Sclerosis',
    type: 'option',
    npCategory: true,
    optionType: 'select',
    options: {
      None: 0,
      Unilateral: 1,
      Bilateral: 2,
      Present: 3,
      'Missing/Unknown': 9
    }
  }
];
