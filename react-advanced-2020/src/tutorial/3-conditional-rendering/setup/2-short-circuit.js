import React, { useState } from 'react';
// short-circuit evaluation
// ternary operator

const ShortCircuit = () => {
  
  //state variables
  const [text,setText] = useState('');
  const [isError, setIsError] = useState(false);
  /* const firstValue = text || 'hello world';
  const secondValue = text && 'hello world'; */

  return <>
    {/* <h1>{firstValue}</h1>
    <h1>value: {secondValue}</h1> */}
    <h1>{text || 'John Doe'}</h1>
    <button className='btn' onClick={()=> setIsError(!isError)}>toggle error</button>
    {isError && <h1>Error...</h1>}
    {isError ? <p>there is an error...</p> : <div>
        <h2>No error from inside the div!</h2>
      </div>}
  </>;
};

export default ShortCircuit;
