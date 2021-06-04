import React from 'react';

const JobQuantityForm = ({part, index, handleQuantityChange}) => {
  return (
        <div className="row">
            <div className="col s6">
                {part.name}
            </div>
            <div className="col s1">
                <div className="input-field">
                    <input 
                        type='number'
                        name={index} 
                        onChange={handleQuantityChange}
                        value={part.quantity}
                    />
                    <label htmlFor={index} className="active">
                        Quantity
                    </label>
                </div>
            </div>
        </div>
    )
}

export default JobQuantityForm;