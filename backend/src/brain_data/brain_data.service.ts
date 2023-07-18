import { Injectable } from '@nestjs/common';
import { FilterBrainData, Categories } from './dto/filter_brain_data.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SummaryBrainData } from './dto/summary_brain_data.dto';
import { std, mean, round } from 'mathjs';


@Injectable()
export class BrainDataService {

  constructor(private prisma: PrismaService) {}

  async getSummary(filter: FilterBrainData){
    
    // building filter for "categories"
    const cat: any[] = filter.categories?  Object.keys(filter.categories)?.map(key =>{
      return ( { [key] : { in : filter.categories[key]}}); 
    }) : [];

    // building filter for filter with number[] type
    const conditions: any[] = Object.keys(filter)?.map(key => {
      const objKey = key as keyof FilterBrainData;
      if(objKey !== 'categories' && Array.isArray(filter[objKey]) && filter[objKey].every(it => typeof it === 'number')){
        return { [key] : { gte: filter[objKey][0], lte: filter[objKey][1]}}
      }
    }).filter((element) => element !== undefined);
    
    const queryFilter: any[] | undefined = conditions.concat(cat);
    
    const summaryArr:SummaryBrainData[] = [new SummaryBrainData("-"), new SummaryBrainData("Male"), new SummaryBrainData("Female")];
    const filteredData = await this.prisma.brain_data.findMany({
      where:{
        AND: queryFilter
      },
      include:{
        participants: {
          select: {
            mri_count: true,
            dvoice_count: true,
            gender: true,
            edu_core2: true,
            edu_core8: true
          }
        }
      }
    });
    // const sexes = [0,1,2];
    // for(const field of Object.keys(new SummaryBrainData(""))){
    //   for(const sex of sexes){
    //     console.log(summaryArr[sex][field] );//
    //   }
    // }

    const avg_death_arr: number[][] = [[],[],[]];
    filteredData.forEach(data => {
        if(!data.sex){
        }else{
          summaryArr[data.sex].total++;
          summaryArr[0].total++;

          avg_death_arr[data.sex].push(Number(data.age_death)); // need to assume that data will have age of death here
          avg_death_arr[0].push(Number(data.age_death)); // need to assume that data will have age of death here
          
          data.smoking_ever ? (data.smoking_ever > 0 ? (summaryArr[data.sex].smoking_ever++) : summaryArr[data.sex].smoking_ever) : (summaryArr[data.sex].smoking_ever);
          data.demrv046 ? (data.demrv046 > 0 ? summaryArr[data.sex].overall_dementia_probe++ : summaryArr[data.sex].overall_dementia_probe) : (summaryArr[data.sex].overall_dementia_probe);
          data.hrx_ever ? (data.hrx_ever > 0 ? summaryArr[data.sex].hypertension_ever++ : summaryArr[data.sex].hypertension_ever) : (summaryArr[data.sex].hypertension_ever);
          data.dmrx_ever ? (data.dmrx_ever > 0 ? summaryArr[data.sex].diabetic_ever++ : summaryArr[data.sex].diabetic_ever) : (summaryArr[data.sex].diabetic_ever);
          data.liprx_ever ? (data.liprx_ever > 0 ? summaryArr[data.sex].hyperlipidemia_ever++ : summaryArr[data.sex].hyperlipidemia_ever) : (summaryArr[data.sex].hyperlipidemia_ever);

          data.smoking_ever ? (data.smoking_ever > 0 ? summaryArr[0].smoking_ever++ : summaryArr[0].smoking_ever) : (summaryArr[0].smoking_ever);
          data.demrv046 ? (data.demrv046 > 0 ? summaryArr[0].overall_dementia_probe++ : summaryArr[0].overall_dementia_probe) : (summaryArr[0].overall_dementia_probe);
          data.hrx_ever ? (data.hrx_ever > 0 ? summaryArr[0].hypertension_ever++ : summaryArr[0].hypertension_ever) : (summaryArr[0].hypertension_ever);
          data.dmrx_ever ? (data.dmrx_ever > 0 ? summaryArr[0].diabetic_ever++ : summaryArr[0].diabetic_ever) : (summaryArr[0].diabetic_ever);
          data.liprx_ever ? (data.liprx_ever > 0 ? summaryArr[0].hyperlipidemia_ever++ : summaryArr[0].hyperlipidemia_ever) : (summaryArr[0].hyperlipidemia_ever);

          if(data.participants.edu_core2){
            if(data.participants.edu_core2 >= 12){
              summaryArr[data.sex].hs_grad++;
              summaryArr[0].hs_grad++;
            }
            if(data.participants.edu_core2 >= 16){
              summaryArr[data.sex].college_grad++;
              summaryArr[0].college_grad++;
            }
          }
          
          if(data.participants.mri_count >= 3){
            summaryArr[data.sex].mri_3++;
            summaryArr[0].mri_3++;
          }
          if(data.participants.mri_count >= 2){
            summaryArr[data.sex].mri_2++;
            summaryArr[0].mri_2++;
          } 
          if(data.participants.mri_count >= 1){
            summaryArr[data.sex].mri_1++;
            summaryArr[0].mri_1++;
          }

          if(data.participants.dvoice_count >= 3){
            summaryArr[data.sex].dvoice_3++;
            summaryArr[0].dvoice_3++;
          }
          if(data.participants.dvoice_count >= 2){
            summaryArr[data.sex].dvoice_2++;
            summaryArr[0].dvoice_2++;
          }
          if(data.participants.dvoice_count >= 1){
            summaryArr[data.sex].dvoice_1++;
            summaryArr[0].dvoice_1++;
          }

        }
    });

    for(const i in avg_death_arr){
      if(avg_death_arr[i].length === 0){
        continue;
      }
      const mean_calc = round(mean(avg_death_arr[i]),3);
      const stdDeviation = round(std(avg_death_arr[i]),3);
      const avgStr = `${mean_calc} ± ${stdDeviation}`;
      summaryArr[i].average_age_at_death = avgStr;
    }
    return summaryArr;
  }
}
