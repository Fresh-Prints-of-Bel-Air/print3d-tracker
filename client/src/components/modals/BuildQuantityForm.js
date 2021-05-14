import React, { useState } from 'react'

const BuildQuantityForm = ({job, handleQuantityChange}) => {
  const [partQuantities, setPartQuantities] = useState(job.requestedParts.map((job) => 0));
  
  const onChange = (e) => {
    let quantityChange = e.target.value - partQuantities[e.target.id]; // new value minus old
    let quantityArr = [...partQuantities];
    quantityArr[e.target.id] = e.target.value;
    setPartQuantities(quantityArr);
    // if(isIncluded) 
    handleQuantityChange(job._id, e.target.name, quantityChange);
  }
  return (
    <div className="row" style={{overflow: 'auto', height: '20vh'}}>
      <div className="row">Parts for job# {job.job_number} from requester {job.requester}: </div>
      {job.requestedParts.filter((part) => part.remaining > 0).map((part, index) => 
          <div className="row" id={index}>
            <label htmlFor="partQuantity">{`Quantity for ${part.name} (${part.remaining} remaining): `}</label>
            <input className="input-field" type="number" name={part.name} id="partQuantity" jobID={job._id} min="0" max={part.remaining} onChange={onChange}/> {/*add value field? */}
          </div>
        )
      }
    </div>
  )
}


export default BuildQuantityForm;