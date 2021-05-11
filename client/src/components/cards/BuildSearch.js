import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {getBuilds} from '../../actions/buildActions';
import M from 'materialize-css';

const BuildSearch= ({build: {builds}, getBuilds}) => {
  const [userFormData, setUserFormData] = useState({
    status: '',
    startedFrom: '',
    startedTo: '',
    deliveredFrom: '',
    deliveredTo: '',
    operator: '',
    project: '',
  });
  const { status, startedFrom, startedTo, deliveredFrom, deliveredTo, project, operator } = userFormData;

  useEffect(() => {
    M.AutoInit();
    console.log("UseEffect called, state is: ");
    //pull builds from API with current filter values
  },[status]);

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log("onSubmit called");
    //console.log(userFormData);
    getBuilds(userFormData);
  }
  const onChange = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  // copies the contents of the builds state into a table on the clipboard
  // separated by tabs and newlines
  const copyHistory = () => {
    let billingSheet = "";
    // each row will have the format
    // buildFileName  dateStarted material  projects
    builds.forEach((build) => {
      billingSheet += build.buildFileName 
        + '\t' + build.dateStarted.split('T')[0]
        + '\t' + build.material
        + '\t' + build.projects + '\n';
    });
    navigator.clipboard.writeText(billingSheet);
  }
  const clearSearch = (e) => {
    setUserFormData({
      ...userFormData,
      status: '',
      startedFrom: '',
      startedTo: '',
      deliveredFrom: '',
      deliveredTo: '',
      operator: '',
      project: '',
    });
  }

  const labelFontSize = '1.8vh';
  const inputFontSize = '2vh';
  return (
    <div>
      <div style={{width: '100%', height: '23vh' }}>
        <div
          className='grey lighten-2'
          style={{ position: 'fixed', width: '100%', height: '23vh', zIndex: '1' }} //keeps filter options displayed on page
        >
          <div className='row' style={{ marginBottom: '3.5vh' }}>
            <div className='col s2'>
              <label htmlFor='status' style={{fontSize: labelFontSize}}>Status:</label>
              <select 
                name='status' 
                value={status} 
                onChange={onChange}
                style={{fontSize: inputFontSize}}
              >
                <option value='' disabled selected>Select</option>
                <option value='Build File Ready'>Build File Ready</option>
                <option value='Build Started'>Build Started</option>
                <option value='Build Complete'>Build Complete</option>
                <option value='Build Post-Processed'>Build Post-Processed</option>
                <option value='Build Delivered'>Build Delivered</option>
              </select>
            </div>
            <div className='col s2' >
              <label htmlFor='startedFrom' style={{fontSize: labelFontSize}}>Builds Started From: </label>
              <input
                name='startedFrom'
                id='startedFrom'
                type='date'
                onChange={onChange}
                value={startedFrom}
                style={{fontSize: inputFontSize}}
              />
            </div>
            <div className='col s2'>
              <label htmlFor='startedTo' style={{fontSize: labelFontSize}}>...To:</label>
              <input name='startedTo' id='startedTo' type='date' value={startedTo} onChange={onChange} style={{fontSize: inputFontSize}}/>
            </div>
            <div className='col s2'>
            <label htmlFor='deliveredFrom' style={{fontSize: labelFontSize}}>Builds Delivered From: </label>
              <input
                name='deliveredFrom'
                id='deliveredFrom'
                type='date'
                onChange={onChange}
                value={deliveredFrom}
                style={{fontSize: inputFontSize}}
              />
            </div>
            <div className='col s2'>
              <label htmlFor='deliveredTo' style={{fontSize: labelFontSize}}>...To:</label>
              <input name='deliveredTo' id='deliveredTo' type='date' value={deliveredTo} onChange={onChange} style={{fontSize: inputFontSize}}/>
            </div>
            <div className='col s1'>
                <label htmlFor='operatorName' style={{fontSize: labelFontSize}}>Operator Name:</label>
                <input name='operator' placeholder="First/Last" id="operatorName" type="text" value={operator} onChange={onChange} style={{fontSize: inputFontSize}}/>
            </div>
            <div className='col s1'>
                <label htmlFor='projectName' style={{fontSize: labelFontSize}}>Project Name:</label>
                <input placeholder="" type="text" id="project" name='project' value={project} onChange={onChange} style={{fontSize: inputFontSize}}/>
            </div>
          </div>

          <div className="row">
            <button style={{margin: '1vh', height: '5.5vh', width: "16vh", fontSize: "1.9vh"}} className="btn waves-effect waves-light blue" type="submit" name="submit" onClick={onSubmit}>Submit
                <i className="material-icons right" style={{fontSize: "1.6vh"}}>send</i>
            </button>
            <button style={{margin: '1vh', height: '5.5vh', width: "16vh", fontSize: "1.9vh"}} className="btn waves-effect waves-light blue" type="submit" name="copy" onClick={copyHistory}>Copy
                <i className="material-icons right" style={{fontSize: "1.6vh"}}>content_copy</i>
            </button>
            <button style={{margin: '1vh', height: '5.5vh', width: "16vh", fontSize: "1.9vh"}} className="btn waves-effect waves-light blue" type="reset" name="clear" onClick={clearSearch}>Clear
                <i className="material-icons right" style={{fontSize: "1.6vh"}}>clear</i>
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

export default connect(mapStateToProps, {getBuilds})(BuildSearch);
