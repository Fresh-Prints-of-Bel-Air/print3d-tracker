// import React, { useState } from 'react'

// const BuildQuantityForm = ({job, idx, handleQuantityChange}) => {

//   const [partQuantities, setPartQuantities] = useState(job.requestParts.map((job) => 0));
  


//   const onChange = async (e) => {
//     if(isIncluded)
//       handleQuantityChange(job._id, e.target.name, e.target.value);
//   }
//   return (
//     <div className="row" style={{overflow: 'auto', height: '50vh'}}>
//       <div className="row">Parts for job# {job.job_number} from requester {job.requester}: </div>
//       {job.requestedParts.filter((part) => part.remaining > 0).map((part, index) => {
//         {}
//         <div className="row">
//           <label htmlFor="partQuantity">{`Quantity for ${part.name} (${part.remaining} remaining): `}</label>
//           <input className="input-field" type="number" name={part.name} id="partQuantity" jobID={job._id} min="0" max={part.remaining} onChange={onChange} /> {/*add value field? */}
//         </div>})
//       }
//     </div>
//   )
// }


// export default BuildQuantityForm;