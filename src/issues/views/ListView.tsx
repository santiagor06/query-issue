import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useState } from 'react';
import { useIssues } from '../hooks';



export const ListView = () => {
const query=useIssues()
const [selectedLabels,setSelectedLabels]=useState<Array<string>>([])
const handleOnClick=(labelName:string)=>{
  (selectedLabels.includes(labelName))?setSelectedLabels(selectedLabels.filter(label=>label!==labelName)):setSelectedLabels([...selectedLabels,labelName])
}

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        <IssueList />
      </div>
      
      <div className="col-4">
        <LabelPicker selectLabel={selectedLabels} onChange={handleOnClick}/>
      </div>
    </div>
  )
}
