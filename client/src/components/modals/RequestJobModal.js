import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import QuantityForm from './QuantityForm';
import { addJob } from '../../actions/jobActions';
import { updateUser } from '../../actions/authActions';
import M from 'materialize-css';

//DB methods: POST (add build), GET (load last request)
//Redux
const RequestJobModal = ({user}) => {

  const onPriorityChange = (name, event) => {
      setJobForm({
          ...jobForm,
          priority: event.value
      })
  }


  const prioritySelectOptions = [
      { label: "Priority 1", value: "1"},
      { label: "Priority 2", value: "2"},
      { label: "Priority 3", value: "3"}
  ]

  const [jobForm, setJobForm] = useState({
    projectName: '',
    dateNeeded: '',
    folderLocation: '',
    material: '',
    resolution: '',
    priority: '2', //needs to match the default value
    deliverTo: '',
    notes: '',
    requestedPartsList: [],
  });

  const clearJobForm = () => {
      setJobForm({
        ...jobForm,
        projectName: '',
        dateNeeded: '',
        folderLocation: '',
        material: '',
        resolution: '',
        priority: '2', //needs to match the default value
        deliverTo: '',
        notes: '',
        requestedPartsList: [],
      })
  }


  const {projectName, dateNeeded, folderLocation, material, resolution, priority, deliverTo, notes, requestedPartsList} = jobForm;
  
  useEffect(() => {
      M.AutoInit();
  }, []);

  const formSubmit = (e) => { //Redux & Back-end updates
      //e.preventDefault();
      console.log("Jobform is: ");
      console.log(jobForm);
      addJob(jobForm);
      updateUser({...user, lastJobRequest: jobForm});
      console.log("formSubmit call");
  }

  const refillForm = () => {

  }

  const onChange = (e) => {
        if(e.target.name === 'files'){
          setJobForm({
            ...jobForm,
            requestedPartsList: [...e.target.files].map((file) => //take file list and map to new array containing objects with quantities
              ({
                name: file.name,
                quantity: 0
              })
            )
          })
        }
        else{
            setJobForm({
            ...jobForm,
            [e.target.name]: e.target.value
            });
        }
    }

  const handleQuantityChange = (e) => { 
      let copyArray = requestedPartsList;
      copyArray[e.target.name].quantity = e.target.value; //e.target.name is the index given to the component as a name. RequestedPartsList is an array of objects. 
      setJobForm({ //Can't edit one index of a useState array. Must completely overwrite array
        ...jobForm,
        requestedPartsList: copyArray
      });
  }

  return (
      <div>
          <div id="modal1" className="modal modal-fixed-footer ">
              <div className="modal-content">
                  <h4 className="center">Create Print Job Request</h4>
                  <div className='row'>
                      <div className='col s12'>
                          <div className="file-field input-field">
                              <div className="btn waves-effect blue" name="Select Files">
                                  <span>Select Files</span>
                                  <input type="file" name="files" multiple
                                      onChange={onChange}/>
                              </div>
                              <div className="file-path-wrapper">
                                  <input 
                                      className="file-path validate"
                                      type="text"
                                      placeholder="Upload one or more files"
                                      value={requestedPartsList.length === 0 ? '' : 'error'} // error should never happen, in fact all I need to do is say value='' but just to make it clear we're clearing the field when clearJobForm sets the parts list to empty
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
                  {requestedPartsList.map((part, index) => <QuantityForm key={index} part={part} index={index} handleQuantityChange={handleQuantityChange}/>)}
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
                            {/* <label htmlFor='priority'>Status:</label>
                              <select 
                                  name='priority' 
                                  value={priority} 
                                  onChange={onChange}
                              >
                                  <option value='' disabled selected>Priority 2</option>
                                  <option value='1'>Priority 1</option>
                                  <option value='3'>Priority 3</option>
                              </select> */}
                              <Select 
                                name="priority"
                                options={prioritySelectOptions} 
                                value={priority} 
                                
                                onChange={event => onPriorityChange("priority", event)}
                              />
                          
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
                  <button style={{margin: '10px'}} className="btn waves-effect waves-light blue" type="reset" name="clear" onClick={clearJobForm}>
                      Clear<i className="material-icons right">clear</i>
                  </button>
                  <button style={{margin: '10px'}} className="btn waves-effect waves-light blue" type="reset" name="clear" onClick={() => { setJobForm(user.lastJobRequest) }}>
                      Refill<i className="material-icons right">format_color_fill</i>
                  </button>
                  <button type='submit' style={{margin: '10px'}} className="waves-effect btn blue" onClick={formSubmit}>
                      Submit<i className="material-icons right">send</i>
                  </button>
              </div>
          </div>
      </div>
  )
}

export default RequestJobModal;
