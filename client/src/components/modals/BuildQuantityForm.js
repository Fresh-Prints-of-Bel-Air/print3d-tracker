import React from 'react'

const BuildQuantityForm = ({job, idx, handleQuantityChange}) => {

  const onChange = (e) => {
    handleQuantityChange(job._id, e.target.name, e.target.value);
  }
  return (
    <div className="row" style={{overflow: 'auto', height: '50vh'}}>
      <div className="row">Parts for {job.job_number}: </div>
      {job.requestedParts.filter((part) => part.remaining > 0).map((part, index) => {
        <div className="row">
          <label htmlFor="partQuantity">{`Quantity for ${part.name} (${part.remaining} remaining): `}</label>
          <input type="number" name={part.name} id="partQuantity" min="1" max={part.remaining} onChange={onChange} />
        </div>})
      }
    </div>
  )
}


export default BuildQuantityForm;