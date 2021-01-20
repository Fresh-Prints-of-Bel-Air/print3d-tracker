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
            <ul class="collapsible" style={{ margin: '0px'}}>
                <li>
                <div class="collapsible-header row" style={{opacity: '.9', marginBottom: '0px'}}>
                    <p class="col s2" style={{fontSize: 'large'}}>#{build_number}</p>   
                        <i 
                            class="material-icons tooltipped col s1" 
                            data-position="top" 
                            data-tooltip="Project Name"
                            style={{marginLeft: '30px'}}
                        > build </i>
                        <p class="col s2">{projectsString}</p>

                        <i  
                            class="material-icons tooltipped col s1"
                            data-position="top" 
                            data-tooltip="Build Filename"
                            style={{marginLeft: '30px'}}
                        > insert_drive_file </i> 
                        {buildFileName}  
        
                        <i 
                            class="material-icons tooltipped col s1" 
                            data-position="top" 
                            data-tooltip="Date Started"
                            style={{marginLeft: '30px'}}
                        > event </i> 
                        {dateStarted.split('T')[0]}

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
                        {status}

                </div>
                <div class="collapsible-body" style={{ backgroundColor: 'white', opacity: '.7', marginBottom: '0px'}}>
                    <div class="row">
                        <div className="col s2">
                            <a class='dropdown-trigger btn blue' href='#' data-target='dropdown1'>Drop Me!</a>
                            <ul id='dropdown1' class='dropdown-content'>
                                <li><a href="#!">one</a></li>
                                <li><a href="#!">two</a></li>
                                <li class="divider" tabindex="-1"></li>
                                <li><a href="#!">three</a></li>
                                <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                                <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                            </ul>
                        </div>
                        <div className="col s1">
                            <i class="material-icons tooltipped" data-position="top" data-tooltip="Build File Path">folder</i>
                        </div>
                        <div className="col s2">              
                            {buildFilePath}
                        </div>
                        <div className="col s1">
                            <i className="material-icons tooltipped" data-position="top" data-tooltip="Material">layers</i>
                        </div>
                        <div className="col s2">
                            {material}
                        </div>
                        <div className="col s1">
                            <i className="material-icons tooltipped" data-position="top" data-tooltip="Resolution">line_weight</i>
                        </div>
                        <div className="col s2">
                            {resolution}
                        </div>
                    </div>
                    <div class="row">
                        <div className="col s2">
                            <a class='dropdown-trigger btn blue' href='#' data-target='dropdown1'>Drop Me!</a>
                            <ul id='dropdown1' class='dropdown-content'>
                                <li><a href="#!">one</a></li>
                                <li><a href="#!">two</a></li>
                                <li class="divider" tabindex="-1"></li>
                                <li><a href="#!">three</a></li>
                                <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                                <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                            </ul>
                        </div>
                        <div className="col s1">
                            <i class="material-icons tooltipped" data-position="top" data-tooltip="Estimated Print Time">access_time</i>
                        </div>
                        <div className="col s2">              
                            {estPrintTime}
                        </div>
                        <div className="col s1">
                            <i className="material-icons tooltipped" data-position="top" data-tooltip="Date Delivered">local_shipping</i>
                        </div>
                        <div className="col s2">
                            {dateDelivered.split('T')[0]}
                        </div>
                    </div>
                </div>
                </li>
            </ul>
        </div>
    )
}

export default BuildItem;