import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import M from 'materialize-css';

const RequestHistorySearch = ({ getJobs, formDimensions }) => {
  //formDimensions for 1080p
  // height: '20vh',
  // formMarginBtm: '8.5vh',
  // buttonHeight: '4vh',
  // buttonWidth: '7vw',
  // listSize: '73.2vh'
  const [requestSearchFormData, setRequestSearchFormData] = useState({
    job_number: '',
    requester: '',
    projectName: '', 
    dateRequestedLowerBound: '',
    dateRequestedUpperBound: '',
    jobStatus: ''
  });
  const { job_number, requester, projectName, dateRequestedLowerBound, dateRequestedUpperBound, jobStatus } = requestSearchFormData;

  useEffect(() => {
    M.AutoInit();
    console.log("UseEffect called, state is: ");
    //pull builds from API with current filter values
  },[jobStatus]);

  const requestSearchOnSubmit = (e) => {
      e.preventDefault();
      getJobs(requestSearchFormData);
    }

  const requestSearchOnChange = (e) => {
    setRequestSearchFormData({
      ...requestSearchFormData,
      [e.target.name]: e.target.value,
    })
  }

  const clearRequestSearch = (e) => {
    setRequestSearchFormData({
      job_number: '',
      requester: '',
      projectName: '', 
      dateRequestedLowerBound: '',
      dateRequestedUpperBound: '',
      jobStatus: ''
    });
  }

  const labelFontSize = '1.3vh';

  return (
    <div>
      <div style={{width: '100%', height: formDimensions.height }}>
        <div
          className='grey lighten-2'
          style={{ position: 'fixed', width: '100%', height: formDimensions.height, zIndex: '1' }} //keeps filter options displayed on page
        >
          <div className='row' style={{ marginBottom: formDimensions.formMarginBtm }}>
            <div className='col s1'>
                <label htmlFor='job_number' style={{fontSize: labelFontSize}}>Job Number:</label>
                <input name='job_number' placeholder="#" id="job_number" type="number" value={job_number} onChange={requestSearchOnChange}/>
            </div>
            <div className='col s2'>
              <label htmlFor='jobStatus' style={{fontSize: labelFontSize}}>Status:</label>
              <select 
                name='jobStatus' 
                value={jobStatus} 
                onChange={requestSearchOnChange}
              >
                <option value='' disabled selected>Select</option>
                <option value='Accepted'>Accepted</option>
                <option value='Requested'>Requested</option>
                <option value='Complete'>Complete</option>
                <option value='Cancelled'>Cancelled</option>
              </select>
            </div>
            <div className='col s2'>
              <label htmlFor='dateRequestedLowerBound' style={{fontSize: labelFontSize}}>Request Date From: </label>
              <input
                name='dateRequestedLowerBound'
                id='dateRequestedLowerBound'
                type='date'
                onChange={requestSearchOnChange}
                value={dateRequestedLowerBound}
              />
            </div>
            <div className='col s2'>
              <label htmlFor='dateRequestedUpperBound' style={{fontSize: labelFontSize}}>...To:</label>
              <input 
                name='dateRequestedUpperBound' 
                id='dateRequestedUpperBound' type='date' 
                value={dateRequestedUpperBound} 
                onChange={requestSearchOnChange} 
              />
            </div>
            <div className='col s1'>
                <label htmlFor='requester' style={{fontSize: labelFontSize}}>Job Requester:</label>
                <input name='requester' placeholder="requester" id="requester" type="text" value={requester} onChange={requestSearchOnChange}/>
            </div>
            <div className='col s1'>
                <label htmlFor='projectName' style={{fontSize: labelFontSize}}>Project Name:</label>
                <input placeholder="" type="text" id="projectName" name='projectName' value={projectName} onChange={requestSearchOnChange}/>
            </div>
          </div>
          <div className="row" style={{marginBottom: '0px'}}>
            <button style={{margin: '1vh', height: formDimensions.buttonHeight, width: formDimensions.buttonWidth, fontSize: "1.3vh"}} className="btn waves-effect waves-light blue" type="submit" name="submit" onClick={requestSearchOnSubmit}>Submit
                <i className="material-icons right" style={{fontSize: "1.2vh"}}>send</i>
            </button>
            <button style={{margin: '1vh', height: formDimensions.buttonHeight, width: formDimensions.buttonWidth, fontSize: "1.3vh"}} className="btn waves-effect waves-light blue" type="reset" name="clear" onClick={clearRequestSearch}>Clear
                <i className="material-icons right" style={{fontSize: "1.2vh"}}>clear</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
  ); // style={{"font-weight": "bold", "color" : "black" }}
};

const mapStateToProps = (state) => ({
  build: state.build
});

export default connect(mapStateToProps, { getJobs })(RequestHistorySearch);
