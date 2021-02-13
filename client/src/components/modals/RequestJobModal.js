import React, { useState } from 'react';

export const RequestJobModal = () => {

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
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Create Job</a>
      
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </div>
        
        
    )
}

export default RequestJobModal;