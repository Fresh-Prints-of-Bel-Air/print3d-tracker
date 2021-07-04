import React, { useEffect, useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import EditBuildModal from '../modals/EditBuildModal';
import DeleteBuildModal from '../modals/DeleteBuildModal';
import { updateJob } from '../../actions/jobActions';
// import 

const MyBuildItem = ({user: { user }, build, updateUser }) => {
    const [acceptedState, setAcceptedState] = useState({
      accepted: false,
    });

    useEffect(() => {
        M.AutoInit();
        console.log("MyBuildItem build");
        console.log(build);
        // console.log(`build.associatedJobs for build number ${build.build_number}`);
        // console.log(build.associatedJobs);
      }, []);
    // const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = job;

    const { build_number, operators, projects, dateStarted, estPrintTime, completionDate, buildFilePath, buildFileName, material, resolution, associatedJobs, status, log, partsBuilding, builds, deliverTo, notes } = build;

    // const acceptJob = () => {
    //   setAcceptedState({...acceptedState, accepted: true});
    //   updateUser({...user, jobQueue: [...user.jobQueue, job._id]});
    //   //updatejob, adding the user to the job's operators list
    //   updateJob({...job, acceptingOperators: [...job.acceptingOperators, user._id]});
    // }

    const colors = {
        blueD7: ["#00003E", "#080836", "#0F0F2E"],
        blueD6: ["#000065", "#0D0D59", "#1A1A4D"],
        blueD5: ["#043085", '#153575',"#243A65"],
        blueD4: ['#0d47a1', "#204C8D", "#324F7B"],
        blueD3: ['#1565c0', "#2B67AB", "#406896"],
        blueD2: ['#1976d2', '#3075BB', "#4875A3"],
        blueD1: ['#1e88e5', "#3887CC", "#5185B3"],
        tealD4: ['#004d40', "#0A4339", "#133933"],
        tealD3: ['#00695c', "#0D5E54", "#1B504A"],
        cyanD4: ["#006064", "#0D5759", "#1A4B4D"],
        cyanD3: ["#00838f", "#12747D", "#24656B"],
        cyanD2: ["#0097a7", "#158793", "#2A767E"],
        cyanD1: ["#00acc1", "#1899AA", "#308691"]
      }
      
      const { blueD7, blueD6, blueD5, blueD4, blueD3, blueD2, blueD1, tealD4, tealD3, cyanD4, cyanD3, cyanD2, cyanD1 } = colors;
  
      // enum set up so saturation value lines up with array index of color properties of colors
      const satEnum = Object.freeze({ FULL: 0, HIGH: 1, MEDIUM: 2 }); 
      const { FULL, HIGH, MEDIUM } = satEnum;  
      const SAT = MEDIUM; // sets level of saturation -- set by developer here
    
    return (
        <div className="card hoverable" style={{ backgroundColor: blueD6[SAT], marginTop: '0px', marginBottom: '15px'}}>
          <div className="card-content white-text" style={{ padding: 0 }}>
            <div className="row" style={{ margin: 0, backgroundColor: blueD5[SAT]}}>
              <div className="col s1" style={{ backgroundColor: blueD7[SAT]}}>
                #{build_number}
              </div>
              <div className="col s2 center" style={{ backgroundColor: blueD3[SAT]}}>
                {dateStarted && dateStarted.split('T')[0]}
              </div>
              <div className="col s6 center">
                Build for jobs: {(associatedJobs && (associatedJobs.length > 0) && associatedJobs[0] && associatedJobs[0].jobNumber) 
                  && associatedJobs.map((jobIDandNumObj) => jobIDandNumObj.jobNumber).join(", ")
                }
              </div>
              <div className="col s3 center" style={{ backgroundColor: blueD3[SAT]}}>
                STATUS: {status}
              </div>
            </div>

            <div className="row" style={{ backgroundColor: blueD5[SAT] }}>
              <div className="col s3 center truncate">
                {projects.join(", ")}
              </div>
              <div className="col s6 center" style={{ backgroundColor: blueD3[SAT]}}>
                {buildFilePath}\ {buildFileName}
              </div>
              <div className="col s3 center">
                ETA: {estPrintTime} hours
              </div>
            </div>

            <div className="row" style={{ margin: 0 }}>
              <div className="col s2"></div>
              <div className="col s4 align-left grey darken-4 truncate">Part</div>
              <div className="col s2 align-right grey darken-3 truncate">Building</div> 
              <div className="col s2 align-right grey darken-4 truncate">Job</div>
              <div className="col s2"></div>
            </div>
            {partsBuilding && partsBuilding.map((partEntry, index) => { return index % 2 ? ( 
                <div className="row" key={index} style={{ margin: 0 }}>
                  <div className="col s2"></div>
                  <div className="col s4 align-left grey darken-3 truncate">{partEntry.name}</div>
                  <div className="col s2 align-right grey darken-2">{partEntry.quantity}</div>
                  <div className="col s2 align-right grey darken-3">{partEntry.jobNumber}</div>
                  <div className="col s2"></div>
                </div>
              ) : (
                <div className="row" key={index} style={{ margin: 0 }}>
                  <div className="col s2"></div>
                  <div className="col s4 align-left grey darken-2 truncate">{partEntry.name}</div>
                  <div className="col s2 align-right grey darken-1">{partEntry.quantity}</div>
                  <div className="col s2 align-right grey darken-2">{partEntry.jobNumber}</div>
                  <div className="col s2"></div>
                </div>
              )
            })}

            <div className="row">
            </div>
          
            <div className="row" style={{ margin: 0, backgroundColor: tealD3[SAT] }}>
              <div className="col s1" style={{ padding: 2 }}>
              </div>
              <div className="col s3 center" style={{ backgroundColor: tealD4[SAT]}}>
                Material:
              </div>
              <div className="col s4 center">
                Date Started:
                {/* Deliver To: {deliverTo ? deliverTo : "Unknown"} */}
              </div>
              <div className="col s3 center" style={{ backgroundColor: tealD4[SAT]}}>
                Resolution:
              </div>
              <div className="col s1" style={{ padding: 2 }}>
                
              </div>
            </div>
            <div className="row" style={{ margin: 0, backgroundColor: tealD3[SAT] }}>
              <div className="col s1" style={{ padding: 2 }}>
                
              </div>
              <div className="col s3 center" style={{ backgroundColor: tealD4[SAT]}}>
                {material}
              </div>
              <div className="col s4 center">
                  {dateStarted && dateStarted.split('T')[0]}
              </div>
              <div className="col s3 center" style={{ backgroundColor: tealD4[SAT]}}>
                {resolution} 
              </div>
            </div>
          </div>
          <div className="card-action white-text" style={{marginBottom: '0px', padding: '8px'}}>
            <div className="row" style={{marginBottom: '0px'}}>
              <div className="row center" style={{marginBottom: '0px'}}>
                  <div className="col s4">
                      <EditBuildModal build={build}/>
                  </div>
                  <div className="col s4"></div>
                  <div className="col s4">
                      <DeleteBuildModal buildToDelete={build}/>
                  </div>
              </div>
            </div>
          </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateUser })(MyBuildItem);