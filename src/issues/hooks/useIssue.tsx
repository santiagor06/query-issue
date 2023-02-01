import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interface';
const getIssue=async(issueNumber:string):Promise<Issue>=>{
    const {data}=await githubApi.get<Issue>(`/issues/${issueNumber}`)
    console.log(data)
    return data
}
const getIssueComments=async(issueNumber:string):Promise<Array<Issue>>=>{
    const {data}=await githubApi.get<Array<Issue>>(`/issues/${issueNumber}/comments`)
    console.log(data)
    return data
}


export const useIssue=(issueNumber:string)=>{
const queryIssue=useQuery(
    ["issue",issueNumber],
    ()=>getIssue(issueNumber)

)
const queryIssueComments=useQuery(
    ["issue",issueNumber,"comments"],
    ()=>getIssueComments(issueNumber)

)
return {queryIssue,queryIssueComments}
}