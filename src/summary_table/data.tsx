interface HeaderCell {
  disablePadding: boolean;
  numeric: boolean;
  id: keyof Data;
  label: string;
  //   Not sure what the best way is to make table less wide
  width: string;
}

const headerCells: readonly HeaderCell[] = [
  {
    disablePadding: true,
    numeric: false,
    id: 'type',
    label: 'type',
    width: '20%'
  },
  {
    disablePadding: true,
    numeric: true,
    id: 'total',
    label: 'total (N)',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'average_age_at_death',
    label: 'Avg Age at Death',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'hs_grad',
    label: 'HS Grad',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'college_grad',
    label: 'College Grad',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'mri_1',
    label: '1+ MRIs',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'mri_2',
    label: '2+ MRIs',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'mri_3',
    label: '3+ MRIs',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'dvoice_1',
    label: '1+ Dvoice',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'dvoice_2',
    label: '2+ Dvoice',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'dvoice_3',
    label: '3+ Dvoice',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'smoking_ever',
    label: 'Smoker',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'overall_dementia_probe',
    label: 'Has dementia',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'hypertension_ever',
    label: 'Hypertensive',
    width: '0%'
  },
  {
    disablePadding: false,
    numeric: true,
    id: 'diabetic_ever',
    label: 'Diabetic',
    width: '0%'
  }
];

interface Data {
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
}

const rows: Data[] = [
  {
    type: 'F',
    total: 5,
    average_age_at_death: 86.12,
    hs_grad: 3,
    college_grad: 5,
    mri_1: 2,
    mri_2: 5,
    mri_3: 7,
    dvoice_1: 1,
    dvoice_2: 2,
    dvoice_3: 3,
    smoking_ever: 3,
    overall_dementia_probe: 3,
    hypertension_ever: 3,
    diabetic_ever: 3
  },
  {
    type: 'M',
    total: 5,
    average_age_at_death: 86.12,
    hs_grad: 3,
    college_grad: 5,
    mri_1: 2,
    mri_2: 5,
    mri_3: 7,
    dvoice_1: 1,
    dvoice_2: 2,
    dvoice_3: 3,
    smoking_ever: 3,
    overall_dementia_probe: 3,
    hypertension_ever: 3,
    diabetic_ever: 3
  },
  {
    type: '-',
    total: 5,
    average_age_at_death: 86.12,
    hs_grad: 3,
    college_grad: 5,
    mri_1: 2,
    mri_2: 5,
    mri_3: 7,
    dvoice_1: 1,
    dvoice_2: 2,
    dvoice_3: 3,
    smoking_ever: 3,
    overall_dementia_probe: 3,
    hypertension_ever: 3,
    diabetic_ever: 3
  }
];

export { headerCells, rows };
export type { HeaderCell, Data };
