import { useState } from 'react';
import './styles.css';


function Home() {

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
  if (hipotenusa === '1') {
    var hipotenusa = Math.hypot(catetoAdjacente,catetoOposto)
    setResult(hipotenusa)  
  } else if (catetoAdjacente === '1') {
    var ladoaaoquadrado = Math.pow(hipotenusa,2) - Math.pow(catetoOposto,2)
    var ladoa = Math.pow(ladoaaoquadrado,0.5) 
    setResult(ladoa)
  } else if (catetoOposto === '1') {
    var ladobaoquadrado = Math.pow(hipotenusa,2) - Math.pow(catetoAdjacente,2)
    var ladob = Math.pow(ladobaoquadrado,0.5) 
    setResult(ladob)
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
        <input onChange={handleCatetoOpostoInputChange} className="co" id="co" placeholder="Valor do cateto oposto" min='1' type="number" value={values.catetoOposto}/>
        <input onChange={handleCatetoAdjacenteInputChange} className="ca" id="ca" placeholder="Valor do cateto adjacente" min='1' type="number" value={values.catetoAdjacente} />
        <input onChange={handleHipotenusaInputChange} className="hipotenusa" id="hp" placeholder="Valor da hipotenusa"   min='1' type="number" value={values.hipotenusa}/>
        <button type='submit'>Calcular</button>
     </form>}
      {result !== 0 &&
      <div>
        <p>{result}</p>
          <button onClick={() => setResult(0)}>Calcular novamente</button>
      </div>
      }

    </div>
  )
}

export default Home
