import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useState } from 'react';
import { useIssues } from '../hooks';
import { Loading } from '../../shared/components/Loading';
import { State } from '../interface';



export const ListView = () => {

const [selectedLabels,setSelectedLabels]=useState<Array<string>>([])
const [state,setState]=useState<State>()
const {queryIssue,page,nextPage,previousPage}=useIssues({state,labels:selectedLabels})

const handleOnClick=(labelName:string)=>{
  (selectedLabels.includes(labelName))?setSelectedLabels(selectedLabels.filter(label=>label!==labelName)):setSelectedLabels([...selectedLabels,labelName])
}

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {queryIssue.isLoading?<Loading/>:<IssueList state={state} handleActive={(state:State|any)=>setState(state)} issuesList={queryIssue.data || []} />}
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button className='btn btn-outline-primary' disabled={queryIssue.isFetching} onClick={previousPage}>Prev</button>
          <span>{page}</span>
          <button className='btn btn-outline-primary' disabled={queryIssue.isFetching} onClick={nextPage}>Next</button>
        </div>
      </div>
      
      <div className="col-4">
        <LabelPicker selectLabel={selectedLabels} onChange={handleOnClick}/>
      </div>
    </div>
  )
}
