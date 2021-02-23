import React from 'react';

const QuantityForm = ({part, index, handleQuantityChange}) => {
  return (
  <div className="row">
    <div className="col s6">
        {part.name}
    </div>
    <div className="col s1">
        <div className="input-field">
            <input 
                type='text'
                name={index} 
                onChange={handleQuantityChange}
            />
            <label htmlFor={index} className="active">
                Quantity
            </label>
        </div>
    </div>
  </div>
      )
}

export default QuantityForm;