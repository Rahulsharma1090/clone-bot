import { useState } from "react";

function ColourPicker(){
    const [colour,setcolour]=useState("#ffffff")
    function handlecolor(event){
        setcolour(event.target.value)
    }
    return(
        <div className="color-container">
            <div className="color-display" style={{backgroundColor:colour}}></div>
            <input className="color-control" onChange={handlecolor} type="color" value={colour}></input>
        </div>
    );
}
export default ColourPicker