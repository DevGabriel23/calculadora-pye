import React,{useEffect, useState} from 'react';
import {DatosNoAgrupados, DatosAgrupados} from './InputDatos';
import FormData from './FormData';

export default function Main({setArray, setData, data, calculate}) {
  
  const [arrayNumber, setArrayNumber] = useState([]);
  const [arrayNumber2, setArrayNumber2] = useState([]);

  const onClick = () => {
    if(arrayNumber.length>0){
      calculate(arrayNumber);
    }else if(arrayNumber2.length>0){
      calculate(arrayNumber2);
    }
  }

  useEffect(() => {
    while(arrayNumber2.length>0){arrayNumber2.pop()}
    while(arrayNumber.length>0){arrayNumber.pop()}
  },[data.dataType]);

  return (
    <main>
      <FormData
        state = {data}
        setState={setData}
      />
      {data.dataType === "1" ? 
        <DatosAgrupados 
          arrayNumber = {arrayNumber2}
          setArrayNumber = {setArrayNumber2}
          onClick={onClick}
        />:( data.dataType === "2" ?
        <DatosNoAgrupados
          arrayNumber = {arrayNumber}
          setArrayNumber = {setArrayNumber}
          onClick = {onClick}
        />: null)}
    </main>
  );
}