import React,{useEffect} from 'react'
const Conditions=()=>{
    // const [status,useStatus] = useState()
    // useStatus(window.outerHeight) 
    // let status = 0
    // useEffect(()=>{
    //     this.status = window.outerWidth
    // },[window.outerWidth])
    
    return(
        <div>
            {window.outerWidth > 750 && `You screen is less than ${window.outerWidth}`}
        </div>
    )
}
export default Conditions