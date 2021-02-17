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
    const [completionDate, setCompletionDate] = useState();
    const [folderLocation, setFolderLocation] = useState();
    const [material, setMaterial] = useState();
    const [resolution, setResolution] = useState();
    const [priority, setPriority] = useState();
    const [deliverTo, setDeliverTo] = useState();
    // const [status, setStatus] = useState();
    const [notes, setNotes] = useState();
    const [requestedParts, setRequestedParts] = useState();
    const [builds, setBuilds] = useState();

    const newJob = {
        requester,
        projectName,
        // dateRequested,
        dateNeeded,
        completionDate,
        folderLocation,
        material,
        resolution,
        priority,
        deliverTo,
        // status,
        notes,
        requestedParts,
        // builds
    }

    return (
        <div>
            
      
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4 className="black-text">Create Job</h4>
                        <div className='row'>
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
                <div className='row'>
                    <div className="input-field">
                        <input 
                            type='text'     
                            name='message' 
                            value={priority} 
                            onChange={e => setPriority(e.target.value)} 
                        />  
                        <label htmlFor="message" className="active">
                            Priority
                        </label> 
                    </div>     
                </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </div>
        
        
    )
}

export default RequestJobModal;