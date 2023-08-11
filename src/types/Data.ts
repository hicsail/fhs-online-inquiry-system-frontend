export type Data = {
  type: string;
  total: number;
  average_age_at_death?: number;
  hs_grad?: number;
  college_grad?: number;
  mri_1?: number;
  mri_2?: number;
  mri_3?: number;
  dvoice_1?: number;
  dvoice_2?: number;
  dvoice_3?: number;
  smoking_ever?: number;
  overall_dementia_probe?: number;
  hypertension_ever?: number;
  diabetic_ever?: number;
};

export type HeaderCell = {
  numeric: boolean;
  id: keyof Data;
  label: string;
  width: string;
};

export const permanentCells: readonly HeaderCell[] = [
  {
    numeric: false,
    id: 'type',
    label: 'type',
    width: '0%'
  },
  {
    numeric: true,
    id: 'total',
    label: 'total (N)',
    width: '0%'
  }
];

export const headerCells: readonly HeaderCell[] = [
  {
    numeric: true,
    id: 'average_age_at_death',
    label: 'Avg Age at Death',
    width: '0%'
  },
  {
    numeric: true,
    id: 'hs_grad',
    label: 'HS Grad',
    width: '0%'
  },
  {
    numeric: true,
    id: 'college_grad',
    label: 'College Grad',
    width: '0%'
  },
  {
    numeric: true,
    id: 'mri_1',
    label: '1+ MRIs',
    width: '0%'
  },
  {
    numeric: true,
    id: 'mri_2',
    label: '2+ MRIs',
    width: '0%'
  },
  {
    numeric: true,
    id: 'mri_3',
    label: '3+ MRIs',
    width: '0%'
  },
  {
    numeric: true,
    id: 'dvoice_1',
    label: '1+ Dvoice',
    width: '0%'
  },
  {
    numeric: true,
    id: 'dvoice_2',
    label: '2+ Dvoice',
    width: '0%'
  },
  {
    numeric: true,
    id: 'dvoice_3',
    label: '3+ Dvoice',
    width: '0%'
  },
  {
    numeric: true,
    id: 'smoking_ever',
    label: 'Smoker',
    width: '0%'
  },
  {
    numeric: true,
    id: 'overall_dementia_probe',
    label: 'Has dementia',
    width: '0%'
  },
  {
    numeric: true,
    id: 'hypertension_ever',
    label: 'Hypertensive',
    width: '0%'
  },
  {
    numeric: true,
    id: 'diabetic_ever',
    label: 'Diabetic',
    width: '0%'
  }
];
