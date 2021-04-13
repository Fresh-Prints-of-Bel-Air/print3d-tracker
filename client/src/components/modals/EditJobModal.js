import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import { updateJob } from '../../actions/jobActions';
import Select from 'react-select';
import M from 'materialize-css';

const EditJobModal = ({ user: { user }, jobData, jobNumber, jobID, updateUser, updateJob }) => {
    const [editJobForm, setEditJobForm] = useState({
        projectName: '',
        dateNeeded: '',
        folderLocation: '',
        material: '',
        resolution: '',
        priority: '2', // needs to match the default value
        deliverTo: '',
        notes: '',
    });

    useEffect(() => {
        console.log("User is: ");
        console.log(user);
        setEditJobForm(jobData);
        M.AutoInit();
    }, []);

    const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, 
        folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, 
        builds } = editJobForm;

        const prioritySelectOptions = [
            {value: '1', label: "Priority 1"},
            {value: '2', label: "Priority 2"},
            {value: '3', label: "Priority 3"},
        ];
    
        const onPriorityChange = (option) => {
            setEditJobForm({
                ...editJobForm,
                priority: option.value
            })
        }

        const onChange = (e) => {
            setEditJobForm({
                ...editJobForm,
                [e.target.name]: e.target.value
            });
        }

        const clearForm = () => {
            setEditJobForm({
                projectName: '',
                dateNeeded: '',
                folderLocation: '',
                material: '',
                resolution: '',
                priority: '2', //needs to match the default value
                deliverTo: '',
                notes: '',
                requestedParts: [],
            });
        }

        const editConfirm = (e) => { 
            //e.preventDefault();
            console.log("Jobform is: ");
            console.log(editJobForm);
            // TODO: add put-job requesting Action function
            updateJob({ ...editJobForm, id: jobID });
            //addJob({ ...jobForm, requester: user.name, requesterId: user._id, status: "Requested" }, {...user, lastJobRequest: jobForm}); 
            console.log('requestJobModal formsubmit');
            console.log(user.lastJobRequest);
            console.log("formSubmit call");
        }

    // const editJobHandler = () => {
    //     // handleCardButtonClick(jobID);
    //     // setSelectedJobID(jobID);
    //     console.log("delete button clicked");
    //     console.log("jobID is: ");
    //     console.log(jobID);
    //     deleteJob(jobID);
    //     updateUser({
    //       ...user, 
    //       requestedJobs: [
    //         ...user.requestedJobs.filter(requestedJobID => requestedJobID != jobID)
    //       ]
    //     })
    //   }

    return ( 
        <div>
            <a className="btn-small teal truncate modal-trigger" style={{margin: '5px'}} 
                href={`#myJobListEditModal${jobNumber}`}>
                <i class="small material-icons left">edit</i>Edit
            </a>
            <div id={`myJobListEditModal${jobNumber}`} className="modal">
                <div className="modal-content grey darken-3">
                <h4 className="">Edit Print Job Request #{jobNumber}</h4>
                    {/* <div className='row'>
                        <div className='col s12'>
                            <div className="file-field input-field">
                                <div className="btn blue" name="Select Files">
                                    <span>Select Files</span>
                                    <input type="file" name="files" multiple
                                        onChange={onChange}/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input 
                                        className="file-path validate"
                                        type="text"
                                        placeholder="Upload one or more files"
                                        value={(requestedParts === undefined || requestedParts.length === 0) ? '' : requestedParts.map((part) => part.name).join(', ')} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    
                    <div className='row'>
                        <div className='col s12'>
                            <div className="input-field">
                                <input
                                    className="white-text"
                                    type='text'
                                    name='folderLocation'
                                    value={folderLocation}
                                    onChange={onChange}
                                    required
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
                                    className="white-text"
                                    type='date'     
                                    name='dateNeeded' 
                                    value={dateNeeded} 
                                    onChange={onChange}
                                />  
                                <label htmlFor="dateNeeded" className="active">
                                    Date Needed
                                </label>
                            </div>
                        </div>
                        <div className='col s4'>
                            <Select options={prioritySelectOptions} onChange={onPriorityChange} value={{label: `Priority ${priority}`, value: priority}} isSearchable={false}/>
                        </div>
                        <div className='col s4'>
                            <div className="input-field">
                                <input 
                                    className="white-text"
                                    type='text'
                                    name='deliverTo'
                                    value={deliverTo} 
                                    onChange={onChange}
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
                                    className="white-text"
                                    type='text'     
                                    name='projectName' 
                                    value={projectName} 
                                    onChange={onChange}
                                />
                                <label htmlFor="projectName" className="active">
                                    Project Name
                                </label>
                            </div>
                        </div>
                        <div className='col s4'>
                            <div className="input-field">
                                <input 
                                    className="white-text"
                                    type='text'     
                                    name='material' 
                                    value={material} 
                                    onChange={onChange}
                                />
                                <label htmlFor="material" className="active">
                                Material
                                </label>
                            </div>
                        </div>  
                        <div className='col s4'>
                            <div className="input-field">
                                <input 
                                    className="white-text"
                                    type='text'     
                                    name='resolution' 
                                    value={resolution} 
                                    onChange={onChange}
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
                                    className="materialize-textarea white-text"
                                    value={notes}
                                    onChange={onChange} 
                                ></textarea>
                                <label htmlFor="notes" className="active">
                                    Notes
                                </label>
                            </div>
                        </div>  
                    </div>
                    
                    
                </div>
                <div className="modal-footer grey darken-3">
                    <a href="#!" className="modal-close green btn-flat" onClick={editConfirm}>Confirm</a>
                    <a href="#!" className="modal-close red btn-flat">Cancel Edit</a>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    job: state.job
});

export default connect(mapStateToProps, { updateUser, updateJob })(EditJobModal);

