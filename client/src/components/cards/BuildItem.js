import React from 'react'

export const BuildItem = ({ build }) => {
    const { build_number, buildFileName, dateStarted, status, projects, associatedJobs, material, resolution, estPrintTime, operators, buildFilePath, dateDelivered, partsBuilding } = build;
    return (
        <div>
            <ul class="collapsible" style={{ margin: '0px'}}>
                <li>
                <div class="collapsible-header" style={{opacity: '.9'}}>
                    <i class="material-icons">filter_drama</i>
                    {build_number}
                    <i class="material-icons" style={{marginTop: '25'}}>insert_drive_file</i> 
                    {buildFileName}
                </div>
                <div class="collapsible-body" style={{ backgroundColor: 'white', opacity: '.7'}}><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
            </ul>
        </div>
    )
}

export default BuildItem;