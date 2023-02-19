import React,{useState, useEffect} from 'react'

const ClickCount = ()=> {    
    const [counter,setCounter] = useState(0)    

    useEffect(()=>{
        if(counter === 5){
            alert(`You reached ${counter} time(s)`)
           }
            },[counter])
    return(
        <div>
            <h1>You clicked me {counter} time(s)</h1>
            <button onClick={() => setCounter(counter + 1)}>Click me</button>
        </div>
    )
}
export default ClickCount