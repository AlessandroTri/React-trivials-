import { useEffect, useState } from "react";

export default function Trivials() {
  const [trivia, settrivia] = useState([]);
  const [cantidadPreguntas, setCantidadPreguntas] = useState(50);
  const [variedadPreguntas, setVariedadPreguntas] = useState("easy");
  const [tipoRespuestas, setTipoRespuestas] = useState("multiple");
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);

  let opcionesCantidad = [];
  for (let i = 1; i <= 50; i++) {
    opcionesCantidad.push(i);
  }
  const handleCantidadChange = (event) => {
    setCantidadPreguntas(event.target.value);
    setRespuestasCorrectas(0);
  };

  const opcionesVariedad = {
    easy: "Fácil",
    medium: "Media",
    hard: "Difícil",
  };

  const handleVariedadChange = (event) => {
    setVariedadPreguntas(event.target.value);
    setRespuestasCorrectas(0);

  };

  const opcionesTipo = {
    multiple: "Multiple",
    boolean: "Boolean",
  };

  const handleTipoChange = (event) => {
    setTipoRespuestas(event.target.value);
    setRespuestasCorrectas(0);
  };

  const handleRespuestaClick = (respuesta, pregunta) => {
    if (respuesta === pregunta.correct_answer) {
      alert("¡Respuesta correcta!");
      setRespuestasCorrectas(respuestasCorrectas + 1);
    } else {
    alert("Respuesta incorrecta. La respuesta correcta es: " + pregunta.correct_answer);
    }
  };

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${cantidadPreguntas}&difficulty=${variedadPreguntas}&type=${tipoRespuestas}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log();
        settrivia(res.results);
      });
  }, [cantidadPreguntas, variedadPreguntas, tipoRespuestas]);

  return (
    <div className="container">
      <h1 className="title">TRIVIA</h1>

      <h3>Elige la cantidad de preguntas</h3>
      <select value={cantidadPreguntas} onChange={handleCantidadChange}>
        {opcionesCantidad.map((opcion, i) => (
          <option key={i} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      <h3>Elige la dificultad</h3>
      <select value={variedadPreguntas} onChange={handleVariedadChange}>
        {Object.keys(opcionesVariedad).map((opcion, i) => (
          <option key={i} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      <h3>Elige el tipo de respuesta</h3>
      <select value={tipoRespuestas} onChange={handleTipoChange}>
        {Object.keys(opcionesTipo).map((opcion, i) => (
          <option key={i} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      <div className="score">
        Respuestas correctas: {respuestasCorrectas}
      </div>

      {trivia.map((pregunta, i) => {
        const opcionesRespuesta = [pregunta.correct_answer, ...pregunta.incorrect_answers];
        opcionesRespuesta.sort(() => Math.random() - 0.5);

        return (
          <div key={i} className="pregunta">
            <p>{pregunta.question}</p>
            {opcionesRespuesta.map((opcion, i) => (
              <button onClick={() => handleRespuestaClick(opcion, pregunta)} key={i}>
                {opcion}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}
