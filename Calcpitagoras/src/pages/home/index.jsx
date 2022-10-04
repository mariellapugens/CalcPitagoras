import { useState } from 'react'
import './styles.css'


function Home() {

  const [resultadoCalculo, setResultadoCalculo] = useState('')

  const [result, setResult] = useState(0)

  const initialValuesState = {
    catetoAdjacente: {value: '', isX: false},
    catetoOposto: {value: '', isX: false},
    hipotenusa: {value: '', isX: false},
  }

  const [values, setValues] = useState(initialValuesState)

  const inputCheck = (input) => {
    if (typeof input === 'string' && input === 'x' || input === 'X') {
     
       return input.toLowerCase()
     }else if (Number(input)) {
       return input
     }else {
 
       setValues(initialValuesState)
       alert("Insira um valor númerico ou x")
     }
   }
 
  const handleCatetoAdjacenteInputChange = (event) => {
    const newValue = inputCheck(event.target.value)

    if( (values.catetoOposto.isX || values.hipotenusa.isX) && newValue === 'x' ){
    alert('Você só poder ter um X da questão')
   } else {
    setValues((prevState) => {      
      const newIsX = newValue === 'x' ? !prevState.catetoAdjacente.isX : prevState.catetoAdjacente.isX      
    return({
    ...prevState,
    catetoAdjacente: {...prevState.catetoAdjacente, value: newValue, isX: newIsX},
  })})
   }
  }

  const handleCatetoOpostoInputChange = (event) => {
    const newValue = inputCheck(event.target.value)

    if( (values.catetoAdjacente.isX || values.hipotenusa.isX) && newValue === 'x' ){
      alert('Você só poder ter um X da questão')
    } else {
      setValues((prevState) => {      
        const newIsX = newValue === 'x' ? !prevState.catetoOposto.isX : prevState.catetoOposto.isX      
      return({
      ...prevState,
      catetoOposto: {...prevState.catetoOposto, value: newValue, isX: newIsX},
    })})
    }

    
  }

  const handleHipotenusaInputChange = (event) => {
    const newValue = inputCheck(event.target.value)

    if( (values.catetoOposto.isX || values.catetoAdjacente.isX) && newValue === 'x' ){
      alert('Você só poder ter um X da questão')
    } else {
      setValues((prevState) => {      
        const newIsX = newValue === 'x' ? !prevState.hipotenusa.isX : prevState.hipotenusa.isX      
      return({
      ...prevState,
      hipotenusa: {...prevState.hipotenusa, value: newValue, isX: newIsX},
    })})
    }

    
  }

  


  

  function limpaInputs() {
      setValues(initialValuesState)

      alert("Não foi possível efetuar o cálculo, insira os valores novamente")
  }



  const onSubmitHandler = (event) => {
    event.preventDefault()

    console.log('values.catetoOposto.isX', values.catetoOposto.isX)
    console.log('values.catetoAdjacente.isX', values.catetoAdjacente.isX)
    console.log('values.hipotenusa.isX', values.hipotenusa.isX)


    

    const catetoOposto = inputCheck(values.catetoOposto.value) 
    const catetoAdjacente = inputCheck(values.catetoAdjacente.value)
    const hipotenusa = inputCheck(values.hipotenusa.value)

     
      calc(catetoOposto, catetoAdjacente, hipotenusa)

      setValues(initialValuesState)    
  }
  
function calc(catetoOposto, catetoAdjacente, hipotenusa) {



  if (hipotenusa === 'x') {
    var hipotenusaTratada = "0"
    var hipotenusaTratada = Math.hypot(catetoAdjacente,catetoOposto)
    setResultadoCalculo("O valor da hipotenusa é")
    setResult(hipotenusaTratada)
  } else if (catetoAdjacente === 'x') {
    var catetoAdjacenteTratado = "0"
    var catetoAdjacenteTratado = Math.pow(hipotenusa,2) - Math.pow(catetoOposto,2)
    var ladoA = Math.pow(catetoAdjacenteTratado,0.5)
    setResultadoCalculo("O valor do cateto adjacente é") 
    setResult(ladoA)
  } else if ('x' === catetoOposto) {
    var catetoOpostoTratado = "0"
    var catetoOpostoTratado = Math.pow(hipotenusa,2) - Math.pow(catetoAdjacente,2)
    var ladoB = Math.pow(catetoOpostoTratado,0.5)
    setResultadoCalculo('O valor do cateto oposto é')
    setResult(ladoB)
  }else{
    limpaInputs()
  }
}


  return (
    <div className="container">
      <h1>Calculadora Pitágoras</h1>
      {result === 0 && <form onSubmit={onSubmitHandler} className="form" id="form">
        <input onChange={handleCatetoOpostoInputChange} className="co" id="co" placeholder="Valor do cateto oposto" min='1'  value={values.catetoOposto.value}/>
        <input onChange={handleCatetoAdjacenteInputChange} className="ca" id="ca" placeholder="Valor do cateto adjacente" min='1' value={values.catetoAdjacente.value} />
        <input onChange={handleHipotenusaInputChange} className="hipotenusa" id="hp" placeholder="Valor da hipotenusa"   min='1'  value={values.hipotenusa.value}/>
        <button type='submit'>Calcular</button>
     </form>}
      {result !== 0 &&
      <div className='resultado'>
        <p>{resultadoCalculo} {result}</p>
          <button onClick={() => (setResult(0), setValues(initialValuesState))}>Calcular novamente</button>
      </div>
      }

    </div>
  )
}

export default Home
