import React from "react"
import { Popup } from "reactjs-popup"
import 'reactjs-popup/dist/index.css'


export const errorBuscador() => (
    <Popup trigger = {<button> Trigger</button>} position = "top center">
        <div> necessita introcir mas de dos caracteres para su busqueda </div>
    </Popup>
);