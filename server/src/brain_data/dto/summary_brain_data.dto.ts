export class SummaryBrainData {
    [key: string]: string | number | undefined;
    type: string;
    total: number  = 0;
    average_age_at_death: string = "0.0";
    hs_grad: number = 0;
    college_grad: number = 0;
    mri_1: number = 0; // 1+ MRI count for a participant
    mri_2: number = 0; // 2+ MRI count for a participant
    mri_3: number = 0; // 3+ MRI count for a participant
    dvoice_1: number = 0;
    dvoice_2: number = 0;
    dvoice_3:number = 0;
    smoking_ever: number = 0;
    overall_dementia_probe: number = 0;
    hypertension_ever: number = 0;
    hyperlipidemia_ever: number = 0;
    diabetic_ever: number = 0;
    
    
    constructor(type:string){
        this.type = type;
    }

   
}