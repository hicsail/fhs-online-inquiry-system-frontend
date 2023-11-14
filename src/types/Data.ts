export type Data = {
  type: string;
  total: number;
  average_age_at_death?: number;
  hs_grad?: number;
  college_grad?: number;
  smoking_ever?: number;
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
    label: 'Sex',
    width: '0%'
  },
  {
    numeric: true,
    id: 'total',
    label: 'Estimated Sample (N)',
    width: '0%'
  }
];

export const headerCells: readonly HeaderCell[] = [
  {
    numeric: true,
    id: 'average_age_at_death',
    label: 'Average Age at Death',
    width: '0%'
  },
  {
    numeric: true,
    id: 'hs_grad',
    label: 'High-school Graduate and below',
    width: '0%'
  },
  {
    numeric: true,
    id: 'college_grad',
    label: 'College Grade and above',
    width: '0%'
  },
  {
    numeric: true,
    id: 'smoking_ever',
    label: 'Ever-smoker',
    width: '0%'
  },
  {
    numeric: true,
    id: 'hypertension_ever',
    label: 'History of Hypertension',
    width: '0%'
  },
  {
    numeric: true,
    id: 'diabetic_ever',
    label: 'History of Diabetics',
    width: '0%'
  }
];
