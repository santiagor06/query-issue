import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interface/Label";

const getLabel=async():Promise<Array<Label>>=>{
    const {data}=await githubApi.get<Array<Label>>("/labels")

    console.log(data);
    
    return data
  }
  export const useLabel=()=>{
    const queryLabel=useQuery(
        ["label"],
        (getLabel),
        {staleTime:1000*60*60}
      )
    return queryLabel
  }
