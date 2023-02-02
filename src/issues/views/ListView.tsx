import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useState } from 'react';
import { useIssues } from '../hooks';
import { Loading } from '../../shared/components/Loading';
import { State } from '../interface';



export const ListView = () => {

const [selectedLabels,setSelectedLabels]=useState<Array<string>>([])
const [state,setState]=useState<State>()
const query=useIssues({state,selectedLabels})

const handleOnClick=(labelName:string)=>{
  (selectedLabels.includes(labelName))?setSelectedLabels(selectedLabels.filter(label=>label!==labelName)):setSelectedLabels([...selectedLabels,labelName])
}

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {query.isLoading?<Loading/>:<IssueList state={state} handleActive={(state:State|any)=>setState(state)} issuesList={query.data || []} />}
        
      </div>
      
      <div className="col-4">
        <LabelPicker selectLabel={selectedLabels} onChange={handleOnClick}/>
      </div>
    </div>
  )
}
