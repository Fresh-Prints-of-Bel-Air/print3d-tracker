import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

export const RequestJobModal = () => {

    useEffect(() => {
        M.AutoInit();
    }, [])

    const [requester, setRequester] = useState();
    const [projectName, setProjectName] = useState();
    // const [dateRequested, setDateRequested] = useState();
    const [dateNeeded, setDateNeeded] = useState();
    // const [completionDate, setCompletionDate] = useState();
    const [folderLocation, setFolderLocation] = useState();
    const [material, setMaterial] = useState();
    const [resolution, setResolution] = useState();
    const [priority, setPriority] = useState();
    const [deliverTo, setDeliverTo] = useState();
    const [status, setStatus] = useState();
    const [notes, setNotes] = useState();
    const [requestedParts, setRequestedParts] = useState();
    // const [builds, setBuilds] = useState();

    const newJob = {
        requester,
        projectName,
        // dateRequested,
        dateNeeded,
        // completionDate,
        folderLocation,
        material,
        resolution,
        priority,
        deliverTo,
        status,
        notes,
        requestedParts,
        // builds
    }

    return (
        <div>
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4 className="center">Create Print Job Request</h4>
                    <div className='row'>
                    <div className='col s12'>
                            <div className="input-field">
                                <input 
                                    type='text'     
                                    name='requestedParts' 
                                    value={requestedParts} 
                                    onChange={e => setRequestedParts(e.target.value)} 
                                />
                                <label htmlFor="requestedParts" className="active">
                                    Part Picker PlaceHolder
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s6'>
                            <div className="input-field">
                                <input 
                                    type='text'     
                                    name='folderLocation' 
                                    value={folderLocation} 
                                    onChange={e => setFolderLocation(e.target.value)} 
                                />
                                <label htmlFor="folderLocation" className="active">
                                Part Folder Location
                                </label>
                            </div>
                        </div>
                        <div className='col s6'>
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
                    </div>  
                    <div className='row'>
                        <div className='col s6'>
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
                        <div className='col s6'>
                            <div className="input-field">
                                <select 
                                    name='status' 
                                    value={status} 
                                    onChange={e => setPriority(e.target.value)}
                                >
                                    <option value='' disabled selected>Priority 2</option>
                                    <option value='1'>Priority 1</option>
                                    <option value='2'>Priority 2</option>
                                    <option value='3'>Priority 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col s6'>
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
                        <div className='col s6'>
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
                    </div>
                    <div className='row'>
                        <div className='col s6'>
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
                        <button style={{'margin': '9px'}} className="btn waves-effect waves-light blue left" type="reset" name="clear">
                            Clear<i className="material-icons right">clear</i>
                        </button>
                        <button style={{'margin': '9px'}} className="btn waves-effect waves-light blue center" type="reset" name="clear">
                            Refill<i className="material-icons right">format_color_fill</i>
                        </button>
                        <button style={{'margin': '9px'}} className="modal-close s1 waves-effect btn blue right">
                            Submit<i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestJobModal;