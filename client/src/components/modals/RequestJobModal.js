import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

export const RequestJobModal = () => {

    useEffect(() => {
        M.AutoInit();
    }, [])

    const [requestJobFormData, setRequestJobFormData] = useState({

    });

    const [partsQuantityFormsJSX, setPartsQuantityFormsJSX]  = useState(); // JSX object
    const [partsQuantityForm, setPartsQuantityForm] = useState([{
        name: '',
        quantity: ''
    }]);

    //const [requester, setRequester] = useState();
    const [projectName, setProjectName] = useState();
    // const [dateRequested, setDateRequested] = useState();
    const [dateNeeded, setDateNeeded] = useState();
    // const [completionDate, setCompletionDate] = useState();
    const [folderLocation, setFolderLocation] = useState();
    const [material, setMaterial] = useState();
    const [resolution, setResolution] = useState();
    const [priority, setPriority] = useState();
    const [deliverTo, setDeliverTo] = useState();
    //const [status, setStatus] = useState();
    const [notes, setNotes] = useState();
    const [requestedPartsList, setRequestedPartsList] = useState();
    // const [builds, setBuilds] = useState();

    const newJob = {
        // requester,
        projectName,
        // dateRequested,
        dateNeeded,
        // completionDate,
        folderLocation,
        material,
        resolution,
        priority,
        deliverTo,
        // status,
        notes,
        // requestedParts,
        // builds
    }

    const partsFormOnChange = (e) => {
        setRequestedPartsList(e.target.files);
        console.log(e.target.value);
        [...e.target.files].forEach((file, index) => {
            setPartsQuantityForm([...partsQuantityForm, { partName: file.name, quantity: 0 }]);
            
            //console.log(e.target.files);
        })
        console.log(partsQuantityForm);

        setPartsQuantityFormsJSX(
            [...e.target.files].map((file, index) => (
                <div className="row" key={index}>
                    <div className="col s11">
                        {file.name} {index}
                    </div>
                    <div className="col s1 right">
                        <div className="input-field">
                            <input 
                                type='text'
                                name={`quantity-${index}`} 
                                value={partsQuantityForm[index]}
                                onChange= { 
                                    (e) => {
                                        const newArr = [...partsQuantityForm];
                                        newArr[0].quantity = e.target.value;
                                        setPartsQuantityForm(newArr);
                                    }
                                }
                            />
                            <label htmlFor={`quantity-${index}`} className="active">
                                Quantity
                            </label>
                        </div>
                    </div>
                </div>
            ))
        )

    }

    return (
        <div>
            <div id="modal1" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4 className="center">Create Print Job Request</h4>
                    <div className='row'>
                        <div className='col s12'>
                            <div className="file-field input-field">
                                <div className="btn waves-effect blue" name="Select Files">
                                    <span>Select Files</span>
                                    <input type="file" multiple
                                        onChange={partsFormOnChange}/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input 
                                        className="file-path validate"
                                        type="text"
                                        placeholder="Upload one or more files"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {partsQuantityFormsJSX}
                    <div className='row'>
                        <div className='col s12'>
                            <div className="input-field">
                                <input
                                    type='text'
                                    name='folderLocation'
                                    value={folderLocation}
                                    onChange={e => setFolderLocation(e.target.value)}
                                />
                                <label htmlFor="folderLocation" className="active">
                                    Part Folder Location (File Path)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s4'>
                            <div className="input-field">
                                <input 
                                    type='date'     
                                    name='dateNeeded' 
                                    value={dateNeeded} 
                                    onChange={e => setDateNeeded(e.target.value)} 
                                />  
                                <label htmlFor="dateNeeded" className="active">
                                    Date Needed
                                </label>
                            </div>
                        </div>
                        <div className='col s4'>
                            <div className="input-field">
                                <select 
                                    name='priority' 
                                    value={priority} 
                                    onChange={e => setPriority(e.target.value)}
                                >
                                    <option value='1'>Priority 1</option>
                                    <option value='2' selected>Priority 2</option>
                                    <option value='3'>Priority 3</option>
                                </select>
                            </div>
                        </div>
                        <div className='col s4'>
                            <div className="input-field">
                                <input 
                                    type='text'
                                    name='deliverTo'
                                    value={deliverTo} 
                                    onChange={e => setDeliverTo(e.target.value)} 
                                />
                                <label htmlFor="deliverTo" className="active">
                                Deliver To
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s4'>
                            <div className="input-field">
                                <input 
                                    type='text'     
                                    name='projectName' 
                                    value={projectName} 
                                    onChange={e => setProjectName(e.target.value)} 
                                />
                                <label htmlFor="projectName" className="active">
                                    Project Name
                                </label>
                            </div>
                        </div>
                        <div className='col s4'>
                            <div className="input-field">
                                <input 
                                    type='text'     
                                    name='material' 
                                    value={material} 
                                    onChange={e => setMaterial(e.target.value)} 
                                />
                                <label htmlFor="material" className="active">
                                Material
                                </label>
                            </div>
                        </div>  
                        <div className='col s4'>
                            <div className="input-field">
                                <input 
                                    type='text'     
                                    name='resolution' 
                                    value={resolution} 
                                    onChange={e => setResolution(e.target.value)} 
                                />
                                <label htmlFor="resolution" className="active">
                                    Resolution
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col s12'>
                            <div className="input-field">
                                <textarea 
                                    id="notes" 
                                    name="notes"
                                    className="materialize-textarea"
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)} 
                                ></textarea>
                                <label htmlFor="notes" className="active">
                                    Notes
                                </label>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className='modal-footer'>
                    <button style={{margin: '10px'}} className="btn waves-effect waves-light blue" type="reset" name="clear">
                        Clear<i className="material-icons right">clear</i>
                    </button>
                    <button style={{margin: '10px'}} className="btn waves-effect waves-light blue" type="reset" name="clear">
                        Refill<i className="material-icons right">format_color_fill</i>
                    </button>
                    <button style={{margin: '10px'}} className="modal-close waves-effect btn blue">
                        Submit<i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RequestJobModal;