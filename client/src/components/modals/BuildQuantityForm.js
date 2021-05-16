import React, { useState } from 'react';
import { Fragment } from 'react';
import Select from 'react-select';

const BuildQuantityForm = ({job, handleQuantityChange}) => {
  const [partQuantities, setPartQuantities] = useState(job.requestedParts.map((job) => 0));
  
  const onChange = (option, index, partName) => {
    console.log(option);
    console.log(index);
    let quantityChange = option.value - partQuantities[index]; // new value minus old
    let quantityArr = [...partQuantities];
    console.log("QuantityArr");
    console.log(quantityArr);
    quantityArr[index] = option.value;
    setPartQuantities(quantityArr);
    // if(isIncluded) 
    handleQuantityChange(job._id, partName, quantityChange);
  }
  return (
    <Fragment>
    <div className="row">Parts for job# {job.job_number} from requester {job.requester}: </div>
    <div className="row" style={{overflow: 'auto', height: '22vh'}}>
      {job.requestedParts.filter((part) => part.remaining > 0).map((part, index) => 
          <div className="row" id={index}>
            <div className="col s3">
              <label htmlFor="partQuantity">{`Quantity for ${part.name} (${part.remaining} remaining): `}</label>
            </div>
            <div className="col s3 offset-s2">
              <Select
                options={[...Array(part.remaining * 2).keys()].map((value) => ({value: value.toString(), label: value.toString()}))}
                onChange={(option) => onChange(option, index, part.name)}
              />
            </div>
          </div>
        )
      }
    </div>
    </Fragment>
    
  )
}


export default BuildQuantityForm;