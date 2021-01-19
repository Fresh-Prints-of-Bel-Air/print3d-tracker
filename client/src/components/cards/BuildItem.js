import React from 'react'

export const BuildItem = ( { build } ) => {
    const { build_number, buildFileName, dateStarted, status, projects, associatedJobs, material, resolution, estPrintTime, operators, buildFilePath, dateDelivered, partsBuilding } = build;

    // building a comma separated string of the projects associated with a build, of at most length 3
    let projectsString = '';
    projects.forEach((project, i) => {
        if (i < 3) projectsString += projects[i] + ", ";
    });
    projectsString = projectsString.substring(0, projectsString.length-2);

    return (
        <div>
            <ul class="collapsible" style={{ margin: '0'}}>
                <li>
                <div class="collapsible-header" style={{opacity: '.9'}}>
                    
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

                </div>
                <div class="collapsible-body" style={{ backgroundColor: 'white', opacity: '.7'}}><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
            </ul>
        </div>
    )
}

export default BuildItem;