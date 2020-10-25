import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

const BuildLogs = ({ builds, ...rest }) => {
  useEffect(() => {
    M.AutoInit();
    //pull builds from API with current filter values
  });

  //const statusText = useRef('');

  const [userFormData, setUserFormData] = useState({
    status: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const { status, startDate, endDate } = userFormData;

  const onChange = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
    //const sampleDate = new Date(e.target.value.replace('-', '/'));
    //console.log(sampleDate);
  };
  return (
    <div
      className='grey lighten-2'
      style={{ position: 'fixed', width: '100%' }}
    >
      <div className='row'>
        <div className='input-field col s3'>
          <select name='status' value={status} onChange={onChange}>
            <option value='' disabled>
              Select
            </option>
            <option value='Build File Ready'>Build File Ready</option>
            <option value='Build Started'>Build Started</option>
            <option value='Build Complete'>Build Complete</option>
            <option value='Build Post-Processed'>Build Post-Processed</option>
            <option value='Build Delivered'>Build Delivered</option>
          </select>
          <label>Status</label>
        </div>
        <div className='col s2'>
          <label htmlFor='startDate'>From</label>
          <input
            name='startDate'
            id='startDate'
            type='date'
            onChange={onChange}
          />
        </div>
        <div className='col s2'>
          <label htmlFor='endDate'>To</label>
          <input name='endDate' id='endDate' type='date' onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default BuildLogs;

// const mapStateToProps = (state) => {
//   builds: state.builds;
// };

//export default connect(mapStateToProps, { getLogs })(BuildLogs);
