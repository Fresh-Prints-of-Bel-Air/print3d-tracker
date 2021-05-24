import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import JobQuantityForm from './JobQuantityForm';
import { connect } from 'react-redux';
import { addJob } from '../../actions/jobActions';
import { updateUser } from '../../actions/authActions';
import M from 'materialize-css';

// DB methods: POST (add build), GET (load last request)

const RequestJobModal = ({ job: { lastCreatedJobID }, user: { user }, addJob, updateUser }) => {
    useEffect(() => {
        console.log("User is: ");
        console.log(user);
        M.AutoInit();
    }, []);


    const [jobForm, setJobForm] = useState({
        projectName: '',
        dateNeeded: '',
        folderLocation: '',
        material: '',
        resolution: '',
        priority: '2', // needs to match the default value
        deliverTo: '',
        notes: '',
        requestedParts: [],
    });

    const {projectName, dateNeeded, folderLocation, material, resolution, priority, deliverTo, notes, requestedParts} = jobForm;

    const prioritySelectOptions = [
        {value: '1', label: "Priority 1"},
        {value: '2', label: "Priority 2"},
        {value: '3', label: "Priority 3"},
    ];

    const onPriorityChange = (option) => {
        setJobForm({
            ...jobForm,
            priority: option.value
        })
    }

    const onChange = (e) => {
        if(e.target.name === 'files'){
            setJobForm({
                ...jobForm,
                // take file list and map to new array containing objects with quantities
                requestedParts: [...e.target.files].map((file) => ({ 
                    name: file.name,
                    // make sure to do error checking on the submit to make sure the quantity values are integers > 0 
                    quantity: '',
                    building: '',
                })
                )
            })
        }
        else {
            setJobForm({
                ...jobForm,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleQuantityChange = (e) => { 
        let copyArray = requestedParts.map((partData) => ({...partData}));
        // e.target.name is the index given to the component as a name. RequestedPartsList is an array of objects.
        copyArray[e.target.name].quantity = e.target.value;
        copyArray[e.target.name].remaining = e.target.value; 
        copyArray[e.target.name].building = 0; //defaults to zero 
        
        // Can't edit one index of a useState array. Must completely overwrite array 
        setJobForm({ 
            ...jobForm,
            requestedParts: copyArray
        });
    }

    const clearForm = () => {
        setJobForm({
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

    // Redux & Back-end updates
    const formSubmit = (e) => { 
        //e.preventDefault();
        console.log("Jobform is: ");
        console.log(jobForm);
        addJob({ ...jobForm, requester: user.name, requesterId: user._id, status: "Requested" }, {...user, lastJobRequest: jobForm}); 
        console.log('requestJobModal formsubmit');
        console.log(user.lastJobRequest);
        console.log("formSubmit call");
    }

    return (
        <div>
            <div id="jobModal" className="modal modal-fixed-footer ">
                <div className="modal-content">
                    <h4 className="center">Create Print Job Request</h4>
                    <div className='row'>
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
                    </div>
                    {requestedParts.map((part, index) => <JobQuantityForm key={index} part={part} index={index} handleQuantityChange={handleQuantityChange}/>)}
                    <div className='row'>
                        <div className='col s12'>
                            <div className="input-field">
                                <input
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
                                    className="materialize-textarea"
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
                <div className='modal-footer'>
                    <button style={{margin: '10px'}} className="btn blue" type="reset" name="clear" onClick={clearForm}>
                        Clear<i className="material-icons right">clear</i>
                    </button>
                    {user.lastJobRequest && 
                        <button style={{margin: '10px'}} className="btn blue" 
                                onClick={() => {  setJobForm(user.lastJobRequest) }}>
                            Refill<i className="material-icons right">format_color_fill</i>
                        </button>
                    }
                    <button type='submit' style={{margin: '10px'}} className="btn blue modal-close" onClick={formSubmit}>
                        Submit<i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
    )
}
 
const mapStateToProps = (state) => ({
    user: state.user,
    job: state.job,
});

export default connect(mapStateToProps, {addJob, updateUser})(RequestJobModal);