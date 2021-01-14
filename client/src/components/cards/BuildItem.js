import { urlencoded } from 'express';
import React from 'react'
import background_mountain from '../../images/blue_mountain_background.jpg';
//style={{backgroundImage: `url(${background_mountain})`}}
export const BuildItem = ( build ) => {
    const { build_number, buildFileName, dateStarted, status, projects, associatedJobs, material, resolution, estPrintTime, operators, buildFilePath, dateDelivered, partsBuilding } = build;
    return (
        <div style={{backgroundImage: `url(${background_mountain})`}}>
            <ul class="collapsible">
                <li>
                <div class="collapsible-header">
                    <i class="material-icons">filter_drama</i>
                    {build_number}
                </div>
                <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
            </ul>
        </div>
    )
}

export default BuildItem;