import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import M from 'materialize-css';

const RequestHistorySearch = ({ getJobs }) => {
  const [requestSearchFormData, setRequestSearchFormData] = useState({
    job_number: '',
    requester: '',
    projectName: '', 
    dateRequestedLowerBound: '',
    dateRequestedUpperBound: '',
    jobStatus: ''
  });
  const { job_number, requester, projectName, dateRequestedLowerBound, dateRequestedUpperBound, jobStatus } = requestSearchFormData;
  // const [userFormData, setUserFormData] = useState({
  //   status: '',
  //   startedFrom: '',
  //   startedTo: '',
  //   deliveredFrom: '',
  //   deliveredTo: '',
  //   operator: '',
  //   project: '',
  // });
  // const { status, startedFrom, startedTo, deliveredFrom, deliveredTo, project, operator } = userFormData;

  useEffect(() => {
    M.AutoInit();
    console.log("UseEffect called, state is: ");
    //pull builds from API with current filter values
  },[jobStatus]);

  const requestSearchOnSubmit = (e) => {
      e.preventDefault();
      //console.log("onSubmit called");
      //console.log(userFormData);
      getJobs(requestSearchFormData);
    }
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   //console.log("onSubmit called");
  //   //console.log(userFormData);
  //   getBuilds(userFormData);
  // }

  const requestSearchOnChange = (e) => {
    setRequestSearchFormData({
      ...requestSearchFormData,
      [e.target.name]: e.target.value,
    })
  }
  // const onChange = (e) => {
  //   setUserFormData({
  //     ...userFormData,
  //     [e.target.name]: e.target.value,
  //   });
  //   console.log(e.target.value);
  // };

  

  // copies the contents of the builds state into a table on the clipboard
  // separated by tabs and newlines
//   const copyHistory = () => {
//     let billingSheet = "";
//     // each row will have the format
//     // buildFileName  dateStarted material  projects
//     builds.forEach((build) => {
//       billingSheet += build.buildFileName 
//         + '\t' + build.dateStarted.split('T')[0]
//         + '\t' + build.material
//         + '\t' + build.projects + '\n';
//     });
//     navigator.clipboard.writeText(billingSheet);
//   }
  // const clearSearch = (e) => {
  //   setUserFormData({
  //     ...userFormData,
  //     status: '',
  //     startedFrom: '',
  //     startedTo: '',
  //     deliveredFrom: '',
  //     deliveredTo: '',
  //     operator: '',
  //     project: '',
  //   });
  // }

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

  return (
    <div>
      <div style={{width: '100%', height: '12vh' }}>
        <div
          className='grey lighten-2'
          style={{ position: 'fixed', width: '100%', height: '12vh', zIndex: '1' }} //keeps filter options displayed on page
        >
          <div className='row' style={{marginBottom: '0px'}}>
          <div className='col s1'>
                <label htmlFor='job_number'>Job Number:</label>
                <input name='job_number' placeholder="#" id="job_number" type="number" value={job_number} onChange={requestSearchOnChange}/>
            </div>
            <div className='col s2'>
              <label htmlFor='jobStatus'>Status:</label>
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
              <label htmlFor='dateRequestedLowerBound'>Request Date From: </label>
              <input
                name='dateRequestedLowerBound'
                id='dateRequestedLowerBound'
                type='date'
                onChange={requestSearchOnChange}
                value={dateRequestedLowerBound}
              />
            </div>
            <div className='col s2'>
              <label htmlFor='dateRequestedUpperBound'>...To:</label>
              <input 
                name='dateRequestedUpperBound' 
                id='dateRequestedUpperBound' type='date' 
                value={dateRequestedUpperBound} 
                onChange={requestSearchOnChange} 
              />
            </div>
            {/* <div className='col s2'>
            <label htmlFor='deliveredFrom'>Builds Delivered From: </label>
              <input
                name='deliveredFrom'
                id='deliveredFrom'
                type='date'
                onChange={requestSearchOnChange}
                value={deliveredFrom}
              />
            </div>
            <div className='col s2'>
              <label htmlFor='deliveredTo'>...To:</label>
              <input name='deliveredTo' id='deliveredTo' type='date' value={deliveredTo} onChange={requestSearchOnChange} />
            </div> */}
            <div className='col s1'>
                <label htmlFor='requester'>Job Requester:</label>
                <input name='requester' placeholder="requester" id="requester" type="text" value={requester} onChange={requestSearchOnChange}/>
            </div>
            <div className='col s1'>
                <label htmlFor='projectName'>Project Name:</label>
                <input placeholder="" type="text" id="projectName" name='projectName' value={projectName} onChange={requestSearchOnChange}/>
            </div>
          </div>
          <div className="row" style={{marginBottom: '0px'}}>
            <button style={{'margin': '20px'}} className="btn waves-effect waves-light blue" type="submit" name="submit" onClick={requestSearchOnSubmit}>Submit
                <i className="material-icons right">send</i>
            </button>
            {/* <button style={{'margin': '20px'}} className="btn waves-effect waves-light blue" type="submit" name="copy" onClick={copyHistory}>Copy
                <i className="material-icons right">content_copy</i>
            </button> */}
            <button style={{'margin': '20px'}} className="btn waves-effect waves-light blue" type="reset" name="clear" onClick={clearRequestSearch}>Clear
                <i className="material-icons right">clear</i>
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
