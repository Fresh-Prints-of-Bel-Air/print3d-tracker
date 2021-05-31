import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import Select from 'react-select';

const BuildQuantityForm = ({job, handleQuantityChange}) => {
  const [partQuantities, setPartQuantities] = useState({
    quantities: job.requestedParts.map((part) => 0),
    partName: "",
    quantityChange: 0,
    firstUpdate: true
  });

  const[firstRender, setFirstRender] = useState(true); 
  
  //selectValues.values[index].option
  const[selectValues, setSelectValues] = useState({
    values: job.requestedParts.map((part) => ({
      option: {value: '0', label: '0'},
      partName: part.name,
    })),
    currentIndex: ''
  });

  useEffect(() => {
    // console.log("job requestedParts inside QuantityForm");
    // console.log(job.requestedParts);
    // console.log("SelectValues values inside QuantityForm");
    // console.log(selectValues.values);
  })

  /*
    When the job prop is changed, i.e when the entire buildQuantityModal form is successfully submitted, we need this form to be treated as a new form - reset the form fields via 
    setSelectValues, and set firstRender to true. Setting firstRender to true prevents that very form reset via setSelectValues from triggering the subsequent calculations and submission
    to the parent component - those should only happen when setSelectValues is triggered by form field changes by the user in onChange.
  */
  useEffect(() => {
    if(!firstRender){
      console.log("JOB STATE CHANGED OR FIRST RENDER FOR QUANTITY FORM");
      setSelectValues({
          values: job.requestedParts.map((part) => ({
            option: {value: '0', label: '0'},
            partName: part.name,
          })),
          currentIndex: ''
        });
      setFirstRender(true);
    }
  },[job]);

  /*
    Any time the firstRender state is set to true (we want the form to be treated as a new form and have the Select option reset), run this effect only.
    This ensures that subsequent changes to the form quantity fields do change the selectValues state, run calculations, and pass the results to the parent component.
  */
  useEffect(() => {
    if(firstRender){ 
      console.log("first Render of buildquantityform for job#" + job.job_number);
      setFirstRender(false);
    }
  },[firstRender]);

  /*
    Call handleQuantityChange when part quantity changes have been detected. Sends the calculated quantity changes to the parent component.
  */
  useEffect(() => { 
    if(!firstRender){
      handleQuantityChange(job._id, partQuantities.partName, partQuantities.quantityChange);
    }
  }, [partQuantities]);

  /*
    Calculate the correct quantity change to send to the parent component. Calls setPartQuantities once those values have been calculated.
  */
  useEffect(() => {
    if(!firstRender){
     
      const {option, partName} = selectValues.values[selectValues.currentIndex];
      let quantityChange = option.value - partQuantities.quantities[selectValues.currentIndex]; // new value minus old
      let quantityArr = [...partQuantities.quantities];
      quantityArr[selectValues.currentIndex] = option.value;
      setPartQuantities({ quantities: quantityArr, partName: partName, quantityChange: quantityChange });
    }

  },[selectValues]);
  
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
    setPartQuantities({ quantities: quantityArr, partName: partName, quantityChange: quantityChange, firstUpdate: false });
  }
  return (
    <Fragment>
    <div className="row">Parts for job# {job.job_number} from requester {job.requester}: </div>
    <div className="row">
      {job.requestedParts.map((part, index) => 
          <div className="row" key={index}>
            <div className="col s3">
              <label htmlFor="partQuantity">{`Quantity for ${part.name} (${part.remaining} remaining): `}</label>
            </div>
            <div className="col s3 offset-s2">
              {console.log(`Index is: ${index} and selectValues is:`)}
              {console.log(selectValues.values)}
              <Select
                options={[...Array(part.quantity * 2 + 1).keys()].map((value) => ({value: value.toString(), label: value.toString()}))}
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