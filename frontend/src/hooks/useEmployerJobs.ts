import {useQuery} from '@tanstack/react-query';
import {getEmployerJobs} from '../api/employer';


export function useEmployerJobs() {
  return useQuery({
    queryKey: ['employer-jobs'],
    queryFn: getEmployerJobs,
   
  });
}