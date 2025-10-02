import react, {useState} from 'react'
function Counter(){
    const [counter,setcounter]=useState(0)
    
    const increment = ()=>{
        setcounter(counter+1)
    }
    const decrement = ()=>{
        setcounter(counter-1)
    }
    const reset = ()=>{
        setcounter(0)
    }
    return(
        <div className='counter-container' style={{marginTop:200}}>
            <p className='counter-display'>count:{counter}</p>
            <button className='counter-button' onClick={increment}>increase</button>
            <button className='counter-button' onClick={reset}>Reset</button>
            <button className='counter-button' onClick={decrement}>Decrease</button>
        </div>);
}
export default Counter