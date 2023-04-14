import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';
const Shimmer = () => {
  return (
<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'730px',backgroundColor:'rgb(26 32 43)'}}>
<div>
<ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
<div>
<p style={{color:' rgb(148, 148, 149)',textAlign:'center'}}>Please Wait .......</p>
</div>
          </div>
         
        </div>
  )
}

export default Shimmer