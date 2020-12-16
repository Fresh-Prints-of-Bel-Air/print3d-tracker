import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {getBuilds} from '../../actions/buildActions';
import M from 'materialize-css';

const BuildHistory = ({ build: {builds}, getBuilds }) => {
  useEffect(() => {
    M.AutoInit();
    //pull builds from API with current filter values
  });

  //const statusText = useRef('');

  const [userFormData, setUserFormData] = useState({
    status: null,
    startedFrom: null,
    startedTo: null,
    deliveredFrom: null,
    deliveredTo: null,
    operator: null,
    project: null,
  });
  const { status, startedFrom, startedTo, deliveredFrom, deliveredTo, project, operator } = userFormData;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit called");
    console.log(userFormData);
    getBuilds(userFormData);
  }
  const onChange = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  return (
    <div
      className='grey lighten-2'
      style={{ position: 'fixed', width: '100%' }} //keeps filter options displayed on page
    >
      <div className='row'>
        <div className='col s1'>
          <label htmlFor='status' style={{"font-weight": "bold", "color" : "black" }}>Status:</label>
          <select name='status' onChange={onChange}>
            <option value='' disabled>
              Select
            </option>
            <option value='Build File Ready'>Build File Ready</option>
            <option value='Build Started'>Build Started</option>
            <option value='Build Complete'>Build Complete</option>
            <option value='Build Post-Processed'>Build Post-Processed</option>
            <option value='Build Delivered'>Build Delivered</option>
          </select>
          
        </div>
        <div className='col s1'>
          <label htmlFor='startedFrom' style={{"font-weight": "bold", "color" : "black" }}>Builds Started From: </label>
          <input
            name='startedFrom'
            id='startedFrom'
            type='date'
            onChange={onChange}
          />
        </div>
        <div className='col s1'>
          <label htmlFor='startedTo' style={{"font-weight": "bold", "color" : "black" }}>...To:</label>
          <input name='startedTo' id='startedTo' type='date' onChange={onChange} />
        </div>
        <div className='col s1'>
        <label htmlFor='deliveredFrom' style={{"font-weight": "bold", "color" : "black" }}>Builds Delivered From: </label>
          <input
            name='deliveredFrom'
            id='deliveredFrom'
            type='date'
            onChange={onChange}
          />
        </div>
        <div className='col s1'>
          <label htmlFor='deliveredTo' style={{"font-weight": "bold", "color" : "black" }}>...To:</label>
          <input name='deliveredTo' id='deliveredTo' type='date' onChange={onChange} />
        </div>
        <div className='col s2'>
            <label htmlFor='operatorName' style={{"font-weight": "bold", "color" : "black" }}>Operator Name:</label>
            <input name='operator' placeholder="Enter the operator name" type="text" id="operatorName" onChange={onChange}/>
        </div>
        <div className='col s2'>
            <label name='project' htmlFor='projectName' style={{"font-weight": "bold", "color" : "black" }} onChange={onChange}>Project Name:</label>
            <input placeholder="Enter the project name" type="text" id="projectName" />
        </div>
        <div className="col s1">
        <button style={{'margin': '20px'}} className="btn waves-effect waves-light" type="submit" name="submit" onClick={onSubmit}>Submit
          <i className="material-icons right">send</i>
        </button>
        </div>
      </div>
    </div>
  );
};

//export default BuildHistory;

const mapStateToProps = (state) => ({
  build: state.build
});

export default connect(mapStateToProps, {getBuilds})(BuildHistory);
