import React, { useEffect, useState, componentDidMount } from 'react';
import M from 'materialize-css';

export const BuildItem = ( { build } ) => {
    useEffect(() => {
        M.AutoInit();
        console.log("useEffect log " + collapseState.activeClass);
    });

    const { build_number, buildFileName, dateStarted, status, projects, associatedJobs, material, resolution, estPrintTime, operators, buildFilePath, dateDelivered, partsBuilding } = build;

    const [collapseState, setCollapseState] = useState({ activeClass: "" });

    // building a comma separated string of the projects associated with a build, of at most length 3
    let projectsString = '';
    projects.forEach((project, i) => {
        if (i < 3) projectsString += projects[i] + ", ";
    });
    projectsString = projectsString.substring(0, projectsString.length-2);

    const collapsibleClicked = (e) => {
        console.log("collapsible clicked");
        console.log("activeClass was " + collapseState.activeClass);
        if (collapseState.activeClass === ""){
            setCollapseState({ activeClass: "active" });
            M.Dropdown.init([e.target]);
        } else if (collapseState.activeClass === "active"){
            setCollapseState({ activeClass: "" });
        }
    }   

    // for scalability (after modification)
    // const COLUMNS = 5;
    // const partTable = [[]];
    // let i = 0;
    // while(i < partsBuilding.length && i < COLUMNS){
    //     partTable[0].push(partsBuilding[i]);
    //     i++;
    // }
    // const remaining = partsBuilding.length - COLUMNS;
    // if(remaining > 0){
    //     let j = 0;
    //     while(j < remaining && j < COLUMNS){
    //         partTable[1].push(partsBuilding[j+i]);
    //         j++;
    //     }
    // }
    
    const partsRow1 = [];
    const partsRow2 = [];
    const MAX_TABLE_SIZE = 10;
    let i = 0;
    while(i < partsBuilding.length && i < MAX_TABLE_SIZE){
        if(i < MAX_TABLE_SIZE / 2)
            partsRow1.push(<td>{partsBuilding[i].name}</td>);
        else
            partsRow2.push(<td>{partsBuilding[i].name}</td>);
        i++;
    }

    return (
        <div><strong>
            <ul class="collapsible" style={{ margin: '0px'}}>
                <li className={collapseState.activeClass}>
                    <div class="collapsible-header row" style={{opacity: '.9', marginBottom: '0px'}} onClick={collapsibleClicked}>
                        <p class="col s2" style={{fontSize: 'large', marginLeft: '0px'}}>#{build_number}</p>   
                        <i 
                            class="material-icons tooltipped col s1" 
                            data-position="top" 
                            data-tooltip="Project Name"
                            style={{marginLeft: '30px'}}
                        > build </i>
                        <div className="col s2">
                            {projectsString}
                        </div>
                        <i  
                            class="material-icons tooltipped col s1"
                            data-position="top" 
                            data-tooltip="Build Filename"
                            style={{marginLeft: '30px'}}
                        > insert_drive_file </i> 
                        <div className="col s2">
                            {buildFileName}
                        </div>                        
                        <i 
                            class="material-icons tooltipped col s1" 
                            data-position="top" 
                            data-tooltip="Date Started"
                            style={{marginLeft: '30px'}}
                        > event </i> 
                        <div className="col s2">
                            {dateStarted.split('T')[0]}
                        </div>
                        {status === 'Build Delivered' ? 
                                <i class="material-icons tooltipped col s1" 
                                    data-position="top" 
                                    data-tooltip="Status"
                                    style={{marginLeft: '30px'}}
                                >done</i> 
                            : 
                                <i class="material-icons tooltipped col s1" 
                                    data-position="top" 
                                    data-tooltip="Status"
                                    style={{marginLeft: '30px'}}
                                >hourglass_full</i>
                        }
                        <div className="col s2">
                            {status}
                        </div>
                        
                    </div>
                    <div class="collapsible-body" style={{ backgroundColor: 'white', opacity: '.7', marginBottom: '0px'}}>
                        <div class="row">  
                            <div className="col s1" style={{marginLeft: '50px'}}>

                            </div>
                            <div className="col s1">
                                <i class="material-icons tooltipped" data-position="top" data-tooltip="Build File Path">folder</i>
                            </div>
                            <div className="col s2">              
                                <strong>{buildFilePath}</strong>
                            </div>
                            <div className="col s1">
                                <i className="material-icons tooltipped" style={{marginLeft: '30px'}} data-position="top" data-tooltip="Material">layers</i>
                            </div>
                            <div className="col s2">
                                {material}
                            </div>
                            <div className="col s1">
                                <i className="material-icons tooltipped" style={{marginLeft: '30px'}} data-position="top" data-tooltip="Resolution">line_weight</i>
                            </div>
                            <div className="col s2">
                                {resolution}
                            </div>
                        </div>
                        <div class="row">
                            <div className="col s1" style={{marginLeft: '50px'}}>
                               
                            </div>
                            <div className="col s1">
                                <i class="material-icons tooltipped" data-position="top" data-tooltip="Estimated Print Time">access_time</i>
                            </div>
                            <div className="col s2">              
                                {estPrintTime}
                            </div>
                            <div className="col s1">
                                <i className="material-icons tooltipped" style={{marginLeft: '30px'}} data-position="top" data-tooltip="Date Delivered">local_shipping</i>
                            </div>
                            <div className="col s2">
                                {dateDelivered.split('T')[0]}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s1" style={{marginLeft: '50px'}}>
                                
                            </div>
                            <div className="col s5">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Parts</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            {partsRow1}
                                        </tr>
                                        <tr>
                                            {partsRow2}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col s5">
                                <p>Operators</p>
                                {operators.map((operator) => <div class="chip">{operator}</div>)}
                            </div>

                        </div>
                    </div>
                </li>
            </ul>
            </strong></div>
    )
}

export default BuildItem;