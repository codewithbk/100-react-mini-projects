import React, { useRef, useState } from 'react'
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineMotionPhotosAuto } from "react-icons/md";
import './Counter.css'

const Counter = () => {

    const [counter, setCounter] = useState(0);
    const interval =  useRef(null);
    const remberState = useRef('inc');
    const [isauto, setauto] = useState(false);

    const handleAuto = () => {
        if(interval.current) {
            clearInterval(interval.current);
            setauto(false)
            interval.current = null;
        }else{
            interval.current = setInterval(() => {
                if(remberState.current == 'inc'){
                    setCounter((counter) => counter + 1)
                } else if (remberState.current == 'dec') {
                    setCounter((counter) => counter - 1)
                }
         }, 1000);
             setauto(true)
        }
        
    }

    const handleCounter = (param) => {
        if(interval.current){
            clearInterval(interval.current);
            setauto(false)
            interval.current = null;
        }
        if(param === 'inc'){
             setCounter((counter) => counter + 1)
             remberState.current = 'inc'
        } else if(param === 'dec'){
             setCounter((counter) => counter - 1)
             remberState.current = 'dec'
        } else if(param === 'res'){
             remberState.current = 'inc'
             setCounter((counter) => 0)
        } 
    }

  return (
    <div className="container">
        <div className="card">
            <div className="counter-display">
                <h1>{counter}</h1>
            </div>

            <div className="bottomSection">
                <div className="top counter-buttons">
                    <button onClick={()=>{handleCounter('dec')}} className='btn dec'><CiCircleMinus /></button>
                    <button  onClick={()=>{handleCounter('res')}} className='btn res'><GrPowerReset /></button>
                    <button  onClick={()=>{handleCounter('inc')}} className='btn inc'><CiCirclePlus /></button>
                </div>
                <div className="bottom counter-buttons">
                    <button  onClick={handleAuto} className='bigBtn'><MdOutlineMotionPhotosAuto /> {(isauto) ? 'Stop Auto' : 'Start Auto'} </button>
                </div>
            </div>
        </div>

        <div style={{position:'absolute', bottom:'5%'}} className="button">
            <a style={{textDecoration:'none',color:'#111', fontWeight:900, padding:'10px',border:'1px solid #111', borderRadius:'10px',backgroundColor:'Background'}} href="https://codewithbk.github.io/100-react-mini-projects/" > Contine to Main Site </a>
        </div>
    </div>
)
}

export default Counter