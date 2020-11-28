import React, { useEffect } from 'react'
//import Job from '../../../../models/Job'
import M from 'materialize-css/dist/js/materialize.min.js';

export const JobCard = ({ job }) => {
    useEffect(() => {
        M.AutoInit();
        // var elem = document.querySelector('.collapsible.expandable');
        // var instance = M.Collapsible.init(elem, {
        //     accordion: false
        // });
    });

    return ( 
        <div class="row">
            <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Job Card 1</span>
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">

                        <ul class="collapsible">
                            <li>
                                <div class="collapsible-header"><i class="material-icons">widgets</i>Parts</div>
                                <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                        </ul>  

                        <ul class="collapsible">
                            <li>
                                <div class="collapsible-header"><i class="material-icons">note</i>Notes</div>
                                <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                        </ul>  
                    </div>
                </div>
            </div>              
        </div>
    )
}

export default JobCard;
