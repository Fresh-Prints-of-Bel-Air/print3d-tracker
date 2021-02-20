import React from 'react';

export const QuantityFields = ( { requestedPartsList }) => {
    console.log("quantityFields");
    console.log(requestedPartsList);
    return (
        requestedPartsList ? 
        [...requestedPartsList.files].map((file, index) => (
            <div className="row" key={index}>
                <div className="col s11">
                    {file.name} {index}
                </div>
            </div>
        ))
        : ''
    )
}

export default QuantityFields;