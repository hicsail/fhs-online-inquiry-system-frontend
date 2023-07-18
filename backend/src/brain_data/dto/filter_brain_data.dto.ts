import { IsInt, IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// need to have all mapping of the categories as well as subtype
export class Categories {
    [key: string]: string | number | undefined;
    npfrotispre?: number; // possbile values: [1,2,3]
    npfix?: number; // possible values: [1,2,7]
    npinf?: number; // possible values: [0,1]
    npftdt7?: number; // possible values: [0,1]
    npavas?: number; // possible vlaues: [0,1,2,3,8]
    pathmnd?: number; // possible values: [0,1,2,3,4]
    pathad?: number; // possible values: [0,1]
    relatauo?: number; // possible values: [0,1]
    npftdtau?: number; // possible values: [0,1]
    npftdtdp?: number; // possible values: [0,1]
    nphipscl?: number; // possible values: [0,1,2,3,9]

    
}


export class FilterBrainData {
    
    @ApiProperty({ type: [Number], example: [20,24], description: 'Type is an array of integers. Filters the age of participants'})
    @IsOptional()
    @IsInt({
        each: true,
    })
    age_core1: number[];
    
    @ApiProperty({ type: [Number], example: [25,51], description: 'Type is an array of integers. Filters BMI of participants'})
    @IsOptional()
    @IsInt({
        each: true
    })
    bmi: number[];
    
    @ApiProperty({ type: [Number], example: [25,51], description: 'Type is an array of integers. Filters postmortem hours of participants'})
    @IsOptional()
    @IsInt({
        each: true
    })
    nppmih_hours: number[];
    
    @ApiProperty({ type: [Number], example: [25,51], description: 'Type is an array of integers. Filters RNA integrity of participants'})
    @IsOptional()
    @IsInt({
        each: true
    })
    nprin: number[];
    
    @ApiProperty({ type: [Number], example: [25,51], description: 'Type is an array of integers. Filters age at death of participants'})
    @IsOptional()
    @IsInt({
        each: true
    })
    age_death: number[];
    
    @ApiProperty({ type: Categories, example: [{"npfrotispre": [1,2,3]}], description: 'Type is an array of enum Categories.'})
    @IsOptional()
    categories: Categories;
}