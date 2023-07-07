import React, { useEffect, useState } from 'react'

const ComingSoonComponent = ({text}) => {
    const loadingString = text;
    const [string, setString] = useState('');

    useEffect(()=>{
        const loadingTxt = () =>{
            let loadStr='';
          for(let i=0;i<loadingString.length;i++){
            setTimeout(()=>{
                loadStr+=loadingString[i]
                setString(loadStr)
            },i*50)
          }
        }
        loadingTxt();
    },[])

  return (
    <div style={{display:'flex',height:'85vh', rowGap:'30px', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    <img src="/logo.svg" className="w-[70px] md:w-[70px]" />
    <h1 style={{fontSize:'40px'}}>{string}</h1>

    </div>
  )
}

export default ComingSoonComponent