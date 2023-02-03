import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useState } from 'react';
import { useIssuesInfinite } from '../hooks';
import { Loading } from '../../shared/components/Loading';
import { State } from '../interface';



export const ListViewInfinite = () => {

const [selectedLabels,setSelectedLabels]=useState<Array<string>>([])
const [state,setState]=useState<State>()
const {queryInfinite}=useIssuesInfinite({state,labels:selectedLabels})

const handleOnClick=(labelName:string)=>{
  (selectedLabels.includes(labelName))?setSelectedLabels(selectedLabels.filter(label=>label!==labelName)):setSelectedLabels([...selectedLabels,labelName])
}

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {queryInfinite.isLoading?<Loading/>:<IssueList state={state} handleActive={(state:State|any)=>setState(state)} issuesList={queryInfinite.data?.pages.flat() || []} />}
      <button className='btn btn-outline-primary mt-2' disabled={!queryInfinite.hasNextPage} onClick={()=>queryInfinite.fetchNextPage()}>Load More..</button>
      </div>
      
      <div className="col-4">
        <LabelPicker selectLabel={selectedLabels} onChange={handleOnClick}/>
      </div>
    </div>
  )
}
