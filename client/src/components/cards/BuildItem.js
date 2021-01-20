import React from 'react'

<<<<<<< HEAD
export const BuildItem = ({ build }) => {
=======
export const BuildItem = ( { build } ) => {
>>>>>>> 615c1acb34b114fc5f7caff9a8f86cc0471ad37e
    const { build_number, buildFileName, dateStarted, status, projects, associatedJobs, material, resolution, estPrintTime, operators, buildFilePath, dateDelivered, partsBuilding } = build;

    // building a comma separated string of the projects associated with a build, of at most length 3
    let projectsString = '';
    projects.forEach((project, i) => {
        if (i < 3) projectsString += projects[i] + ", ";
    });
    projectsString = projectsString.substring(0, projectsString.length-2);

    return (
        <div>
            <ul class="collapsible" style={{ margin: '0px'}}>
                <li>
                <div class="collapsible-header" style={{opacity: '.9'}}>
<<<<<<< HEAD
                    <i class="material-icons">filter_drama</i>
                    {build_number}
                    <i class="material-icons" style={{marginTop: '25'}}>insert_drive_file</i> 
                    {buildFileName}
=======
                    
                        # 
                        {build_number}
                    
                        <i 
                            class="material-icons tooltipped" 
                            data-position="top" 
                            data-tooltip="Project Name"
                            style={{marginLeft: '30px'}}
                        > build </i>
                        {projectsString}

                        <i  
                            class="material-icons tooltipped"
                            data-position="top" 
                            data-tooltip="Build Filename"
                            style={{marginLeft: '30px'}}
                        > insert_drive_file </i> 
                        {buildFileName}  
        
                        <i 
                            class="material-icons tooltipped" 
                            data-position="top" 
                            data-tooltip="Date Started"
                            style={{marginLeft: '30px'}}
                        > event </i> 
                        {dateStarted.split('T')[0]}

                        {status === 'Build Delivered' ? 
                                <i class="material-icons tooltipped" 
                                    data-position="top" 
                                    data-tooltip="Status"
                                    style={{marginLeft: '30px'}}
                                >done</i> 
                            : 
                                <i class="material-icons tooltipped" 
                                    data-position="top" 
                                    data-tooltip="Status"
                                    style={{marginLeft: '30px'}}
                                >hourglass_full</i>
                        }
                        {status}

>>>>>>> 615c1acb34b114fc5f7caff9a8f86cc0471ad37e
                </div>
                <div class="collapsible-body" style={{ backgroundColor: 'white', opacity: '.7'}}><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
            </ul>
        </div>
    )
}

export default BuildItem;