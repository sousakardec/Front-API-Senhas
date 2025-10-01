// exemplo usando state - memoria dentro do componente

// importando usestate
import { useState } from "react";
import React, { useEffect } from "react";

function AtendimentoPainel({ cor }) {
  // 1 parametro nome do estado, 2 parametro função que vai atualizar o estado texto, ininializa metodo useState() com um valor padrão
  const [IDsenhaAtual, setIDSenhaAtual] = useState("");
  const [senhaAtual, setSenhaAtual] = useState({ id: 0, senha: 0, status: "" });
  const [atendentes, setAtendentes] = useState([]);
  const [atendenteSelecionado, setAtendenteSelecionado] = useState();
  const [guiches, setGuiches] = useState([]);
  const [guicheSelecionado, setGuicheSelecionado] = useState();

  /* posso iniciar um useState com objetos prenchidos
   const [senhaAtual, setSenhaAtual] = useState([
    { id: 0, senha: 0 }, 
    { id: 0, senha: 0 }
  ]);*/

  const [inputText, setInputText] = useState("");

  function BuscarCEP() {
    fetch("https://cdn.apicep.com/file/apicep/06233-030.json")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
      });
  }

  function ConsultaAtendentesGuiches() {
    const resposta1 = fetch("http://localhost:8081/atendentes")
      .then((Response) => Response.json())
      .then((data) => {
        console.log("consulta atendentes e guiches");
        console.log(data);
        setAtendentes(data);
      });

    const resposta2 = fetch("http://localhost:8081/guiches")
      .then((Response) => Response.json())
      .then((data) => {
        console.log("consulta atendentes e guiches");
        console.log(data);
        setGuiches(data);
      });
  }

  // executa consulta função atendentesGuiches ao carregar a pagina
  useEffect(() => {
    ConsultaAtendentesGuiches();
  }, []);

  function RequisitaProximaSenha() {
    /*
    const resposta2 = fetch("http://localhost:8081/fila/update/requisitar")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
      });*/

    const resposta = fetch("http://localhost:8081/fila/update/requisitar", {
      method: "POST", // Specify the HTTP method as POST
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // Indicate that the body is JSON
      },
      body: JSON.stringify({
        guiche: guicheSelecionado,
        atendente: atendenteSelecionado,
        status: "R",
      }), // Convert the JavaScript object to a JSON string
    })
      .then((Response) => Response.json())
      .then((data) => {
        if (data.id_fila != 0) {
          console.log(data);
          setIDSenhaAtual(data.id_fila);
          setSenhaAtual(data.senha);
        } else {
          console.log(data);
          alert(data.msg);
        }
      });

    console.log(IDsenhaAtual);
    console.log(senhaAtual);
  }

  function IniciarAtendimentoSenha() {
    // console.log(senhaAtual.status);
    // validação local
    if (IDsenhaAtual != "") {
      const resposta = fetch("http://localhost:8081/fila/update/inicia", {
        method: "PATCH", // Specify the HTTP method as POST
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Indicate that the body is JSON
        },
        body: JSON.stringify({
          id: IDsenhaAtual,
          status: "I",
        }), // Convert the JavaScript object to a JSON string
      })
        .then((Response) => Response.json())
        .then((data) => {
          console.log("retorno update");
          console.log(data);

          const resposta2 = fetch(
            "http://localhost:8081/fila/consultasenha/" +
              guicheSelecionado +
              "/" +
              atendenteSelecionado
          )
            .then((Response) => Response.json())
            .then((data) => {
              setIDSenhaAtual(data.id_fila);
              setSenhaAtual(data.senha);

              console.log(senhaAtual);
              console.log(data);
              console.log("ID " + IDsenhaAtual);
            });
        });
    } else {
      alert("Nenhuma senha requisitada para iniciar");
    }
  }

  function FinalizaAtendimentoSenha() {
    if (IDsenhaAtual != "") {
      const resposta = fetch("http://localhost:8081/fila/update/finaliza", {
        method: "PATCH", // Specify the HTTP method as POST
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Indicate that the body is JSON
        },
        body: JSON.stringify({
          id: IDsenhaAtual,
          status: "F",
        }), // Convert the JavaScript object to a JSON string
      })
        .then((Response) => Response.json())
        .then((data) => {
          setIDSenhaAtual("");
          setSenhaAtual({ id: 0, senha: 0, status: "" });
          console.log("senha atual finalizada");
          console.log(data);
        });
    } else {
      alert("Nenhuma senha requisitada para finalizar");
    }
  }

  const handleSelecionar = (event) => {
    setAtendenteSelecionado(event.target.value);

    console.log(atendenteSelecionado);
  };

  const handleSelecionarGuiche = (event) => {
    setGuicheSelecionado(event.target.value);

    console.log(guicheSelecionado);
  };

  return (
    <div className="">
      <select onChange={handleSelecionar}>
        <option value={atendenteSelecionado}>Selecione um atendente</option>
        {atendentes.map((atendente, index) => (
          <option key={index} value={atendente.id}>
            {atendente.id} - {atendente.nome}
          </option>
        ))}
      </select>

      <select className="pl-2" onChange={handleSelecionarGuiche}>
        <option value={guicheSelecionado}>Selecione o guiche</option>
        {guiches.map((guiche, index) => (
          <option key={index} value={guiche.id}>
            {guiche.id} - {guiche.nome}
          </option>
        ))}
      </select>

      <h3 style={{ color: cor }}>
        Senha em atendimento: <b>{senhaAtual.senha}</b>
      </h3>

      <button
        className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:bg-blue-100  active:bg-blue-700 hover:bg-blue-700  disabled:pointer-events-none disabled:opacity-50  mr-2"
        onClick={RequisitaProximaSenha}
        type="button"
        disabled={senhaAtual.status === "R" || senhaAtual.status === "I"}
      >
        Solicitar Proxima Senha
      </button>

      <button
        className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:bg-green-900  active:bg-blue-700 hover:bg-blue-700  disabled:pointer-events-none disabled:opacity-50  m-2"
        onClick={IniciarAtendimentoSenha}
        disabled={senhaAtual.senha === 0 || senhaAtual.status === "I"}
      >
        Iniciar Atendimento
      </button>
      <button
        className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:bg-red-900   active:bg-blue-700 hover:bg-blue-700  disabled:pointer-events-none disabled:opacity-50  m-2"
        onClick={FinalizaAtendimentoSenha}
        disabled={senhaAtual.senha === 0}
      >
        Finalizar Atendimento
      </button>
    </div>
  );

  // variavel texto recebe valor passado
}

export default AtendimentoPainel;
