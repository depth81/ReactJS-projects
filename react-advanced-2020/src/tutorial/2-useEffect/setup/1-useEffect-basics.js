import React, { useState, useEffect } from 'react';
// by default runs after every re-render
// cleanup function
// second parameter
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);
  
  useEffect(()=>{
    console.log('call useEffect');
    if(value>=1){
      document.title = `New Messages(${value})`;
    }  
  },[value]); 
  //useEffect will only run on the component's initial render. [] = it is an array of dependencies.

  useEffect(()=>{
    console.log('Hello World')
  }, []) //it only runs on the initial render. This value [] is not in the dependency

  console.log('render component');
  return (
  <>
    <h1>{value}</h1>
    <button className='btn' onClick={()=> (setValue(value+1)) } >
      CLICK ME
    </button>
  </>
  )
};

export default UseEffectBasics;
