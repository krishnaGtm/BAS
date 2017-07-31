import React from 'react'
import {Link} from 'react-router'


/*Main Tile screen */
 const Tiles= () =>{
   
          return   <div className="tilesWrapper">
                <div>

                    <h1 className="paging">
                        <Link to="/main" title="BAS Application">
                            <img src="./img/bas-logo.png" alt="BAS Application"/>
                        </Link>
                        <span>Paging 1</span>
                    </h1>
                    <h1 className="scrolling">
                        <Link to="/scrolling" title="BAS Application">
                            <img src="./img/bas-logo.png" alt="BAS Application"/>
                        </Link>
                        <span>Scrolling</span>

                    </h1>

                </div>

                <h3>Please select the program you want to open below</h3>
                <ul>
                    <li><a href="#fieldBook" title="Fieldbook"><span className="fonticon icon-book"></span> Fieldbook </a></li>
                    <li><a href="#crossing" title="Crossing"><span className="fonticon icon-flow-cross"></span> Crossing </a></li>
                    <li><a href="#experiment" title="Experiments"><span className="fonticon icon-beaker"></span> Experiments </a></li>
                </ul>
              <p style={{font: 'normal 15px robotolight'}}> Please use <strong>Chrome browser</strong>. </p>
            </div>
       
}


export default Tiles