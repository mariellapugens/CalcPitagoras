import { useState } from 'react';
import './styles.css';


function Home() {

  const [resultadoCalculo, setResultadoCalculo] = useState('')

  const [result, setResult] = useState(0)

  const [values, setValues] = useState({
    catetoAdjacente: '',
    catetoOposto: '',
    hipotenusa: '',
  });
 
  const handleCatetoAdjacenteInputChange = (event) => {
    event.persist();
    setValues((prevState) => ({
      ...prevState,
      catetoAdjacente: event.target.value,
    }));
  };

  const handleCatetoOpostoInputChange = (event) => {
    event.persist();
    setValues((prevState) => ({
      ...prevState,
      catetoOposto: event.target.value,
    }));
  };

  const handleHipotenusaInputChange = (event) => {
    event.persist();
    setValues((prevState) => ({
      ...prevState,
      hipotenusa: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const catetoOposto = event.target.co.value
    const catetoAdjacente = event.target.ca.value
    const hipotenusa = event.target.hp.value
   
 
    calc(catetoOposto, catetoAdjacente, hipotenusa)

  }
  
function calc(catetoOposto, catetoAdjacente, hipotenusa) {


  if (hipotenusa === 'x') {
    var hipotenusa = Math.hypot(catetoAdjacente,catetoOposto)
    setResultadoCalculo("O resultado da hipotenusa é:") 
    setResult(hipotenusa)
    console.log(catetoAdjacente);
  } else if ('x' === catetoAdjacente && catetoOposto < hipotenusa) {
    var catetoAdjacente = 0
    var ladoAAoQuadrado = Math.pow(hipotenusa,2) - Math.pow(catetoOposto,2)
    var ladoA = Math.pow(ladoAAoQuadrado,0.5)
    setResultadoCalculo("O resultado do cateto adjacente é:") 
    setResult(ladoA)
    console.log(hipotenusa);
  } else if ('x' === catetoOposto && catetoAdjacente < hipotenusa) {
    var ladoBAoQuadrado = Math.pow(hipotenusa,2) - Math.pow(catetoAdjacente,2)
    var ladoB = Math.pow(ladoBAoQuadrado,0.5)
    setResultadoCalculo('O resultado do cateto oposto é:')
    setResult(ladoB)
    console.log(catetoAdjacente);
  }else{
      setValues({
        catetoOposto: '',
        catetoAdjacente: '',
        hipotenusa: ''
      });
      alert("Não foi possível efetuar o cálculo, insira os valores novamente");
  }
}


  return (
    <div className="container">
      <h1>Calculadora Pitágoras</h1>
      {result === 0 && <form onSubmit={onSubmitHandler} className="form" id="form">
        <input onChange={handleCatetoOpostoInputChange} className="co" id="co" placeholder="Valor do cateto oposto" min='1' type="text" value={values.catetoOposto}/>
        <input onChange={handleCatetoAdjacenteInputChange} className="ca" id="ca" placeholder="Valor do cateto adjacente" min='1' type="text" value={values.catetoAdjacente} />
        <input onChange={handleHipotenusaInputChange} className="hipotenusa" id="hp" placeholder="Valor da hipotenusa"   min='1' type="text" value={values.hipotenusa}/>
        <button type='submit'>Calcular</button>
     </form>}
      {result !== 0 &&
      <div>
        <p>{resultadoCalculo} {result}</p>
          <button onClick={() => setResult(0)}>Calcular novamente</button>
      </div>
      }

    </div>
  )
}

export default Home
