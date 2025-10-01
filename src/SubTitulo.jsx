// exemplo usando state - memoria dentro do componente

// importando usestate
import { useState } from "react";

function SubTitulo({ cor }) {
  // 1 parametro nome do estado, 2 parametro função que vai atualizar o estado texto, ininializa metodo useState() com um valor padrão
  const [texto, setTexto] = useState("um titulo inicial 2");
  const [inputText, setInputText] = useState("");

  function clicou() {
    setTexto(inputText);
  }

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <h1 style={{ color: cor }}>Sou {texto}</h1>
      <input value={inputText} onChange={handleChange} type="text" />
      <button onClick={clicou}>Mudar</button>
    </div>
  );

  // variavel texto recebe valor passado
}

export default SubTitulo;
