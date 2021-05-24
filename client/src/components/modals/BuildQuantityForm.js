import React, { useState } from 'react';
import { Fragment } from 'react';
import Select from 'react-select';

const BuildQuantityForm = ({job, handleQuantityChange}) => {
  const [partQuantities, setPartQuantities] = useState({
    quantities: job.requestedParts.map((part) => 0),
    partName: "",
    quantityChange: null,
  });

  useEffect(() => {
    
    handleQuantityChange(job._id, partQuantities.partName, partQuantities.quantityChange);

  }, [partQuantities]);
  
  const onChange = (option, index, partName) => {
    console.log(option);
    console.log(index);
    let quantityChange = option.value - partQuantities.quantities[index]; // new value minus old
    console.log("quantityChange");
    console.log(quantityChange);
    let quantityArr = [...partQuantities.quantities];
    console.log("QuantityArr");
    console.log(quantityArr);
    quantityArr[index] = option.value;
    setPartQuantities({ quantities: quantityArr, partName: partName, quantityChange: quantityChange });
    // if(isIncluded) 
    
  }
  return (
    <Fragment>
    <div className="row">Parts for job# {job.job_number} from requester {job.requester}: </div>
    <div className="row" style={{overflow: 'auto', maxHeight: '22vh'}}>
      {job.requestedParts.filter((part) => part.remaining > 0).map((part, index) => 
          <div className="row" key={index}>
            <div className="col s3">
              <label htmlFor="partQuantity">{`Quantity for ${part.name} (${part.remaining} remaining): `}</label>
            </div>
            <div className="col s3 offset-s2">
              <Select
                options={[...Array(part.remaining * 2 + 1).keys()].map((value) => ({value: value.toString(), label: value.toString()}))}
                onChange={(option) => onChange(option, index, part.name)}
                defaultValue={{value: '0', label: '0'}}
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