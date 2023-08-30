"use client";
import { FormEvent, useEffect, useState } from "react";
import { database } from "../../services/firebase";

type Contato = {
  chave: string;
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
};

export default function Home() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [contatos, setContatos] = useState<Contato[]>();

  const [buscaContato, setBuscaContato] = useState<Contato[]>();

  const [estadoDeBusca, setEstadoDeBusca] = useState(false);

  useEffect(() => {
    const refContatos = database.ref("contatos");

    refContatos.on("value", (resultado) => {
      const resultContatos = Object.entries<Contato>(resultado.val() ?? {}).map(
        ([chave, valor]) => {
          return {
            chave: chave,
            nome: valor.nome,
            email: valor.email,
            telefone: valor.telefone,
            mensagem: valor.mensagem,
          };
        }
      );

      setContatos(resultContatos);
    });
  }, []);

  function recordInputs(event: FormEvent) {
    event.preventDefault();

    const refDB = database.ref("contatos");

    const dados = {
      nome,
      email,
      telefone,
      mensagem,
    };
    refDB.push(dados);

    setNome("");
    setEmail("");
    setTelefone("");
    setMensagem("");
  }

  function deleteContact(ref: string){
    const referencia = database.ref(`contatos/${ref}`).remove()
  }

  

  function buscarContato(event: FormEvent){
    const palavra = event.target.value
    if(palavra.length > 0){
      setEstadoDeBusca(true)

    const dados = new Array;

    contatos?.map(contato =>{
      const regra = new RegExp(event.target.value, 'gi')
      if(regra.test(contato.nome)){
        dados.push(contato)
      }
    })
    setBuscaContato(dados)
    }else{
      setEstadoDeBusca(false);
    }
  }

  return (
    <>
      <div className="absolute ml-72 mt-24">
        <h1>Adicionar Contatos</h1>
      </div>

      <div className="absolute ml-[940px] mt-24">
        <h1>Meus Contatos</h1>
      </div>
      <div className="flex justify-center items-center h-[100vh]">
        <form
          onSubmit={recordInputs}
          className="w-[560px] mr-[1rem] text-center"
        >
          <input
            className="w-[90%] p-[1rem] border border-black m-[0.5rem] mt-5"
            type="text"
            placeholder="Nome*"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            autoFocus
            required
          ></input>
          <input
            className="w-[90%] p-[1rem] border border-black m-[0.5rem]"
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          ></input>
          <input
            className="w-[90%] p-[1rem] border border-black m-[0.5rem]"
            type="tel"
            placeholder="Telefone"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
          ></input>
          <textarea
            className="resize-none w-[90%] p-[1rem] border border-black m-[0.5rem]"
            placeholder="Observação"
            value={mensagem}
            onChange={(event) => setMensagem(event.target.value)}
          ></textarea>
          <button
            className="mb-6 mt-10zzzzzz rounded-lg font-bold px-2 py-1 border border-6 w-60 bg-lime-300 cursor-pointer hover:bg-lime-600"
            type="submit"
          >
            Salvar
          </button>
        </form>
        <div className="w-[500px] p-[1rem] bg-teal-400 h-[400px] text-center ml-[5rem] overflow-auto">
          <input
            className="w-[458px] h-[40px] p-[1rem] border border-1 m-[0.4rem] rounded-lg text-center"
            type="text"
            placeholder="Buscar"
            onChange={buscarContato}
          ></input>

          {estadoDeBusca ? 
            buscaContato?.map(contato => {
              return(
              <div
                className="bg-teal-200 rounded-lg text-left max-h-[200px] box-content"
                key={contato.chave}
              >
                <div className="flex justify-between items-center">
                  <p className="text-[1.5rem] text-left p-[0.1rem] font-bold m-2">
                    {contato.nome}
                  </p>
                  <div>
                    <a className="m-2 text-red-600 cursor-pointer hover:font-bold">
                      Editar
                    </a>
                    <a className="m-2 text-red-600 cursor-pointer hover:font-bold" onClick={()=> deleteContact(contato.chave)}>
                      Excluir
                    </a>
                  </div>
                </div>
                <div className="p-2">
                  <p>{contato.email}</p>
                  <p>{contato.telefone}</p>
                  <p>{contato.mensagem}</p>
                </div>
              </div>
              ) 
          }) :  contatos?.map(contato => {
            return(
            <div
              className="bg-teal-200 rounded-lg text-left max-h-[200px] box-content"
              key={contato.chave}
            >
              <div className="flex justify-between items-center">
                <p className="text-[1.5rem] text-left p-[0.1rem] font-bold m-2">
                  {contato.nome}
                </p>
                <div>
                  <a className="m-2 text-red-600 cursor-pointer hover:font-bold">
                    Editar
                  </a>
                  <a className="m-2 text-red-600 cursor-pointer hover:font-bold" onClick={()=> deleteContact(contato.chave)}>
                    Excluir
                  </a>
                </div>
              </div>
              <div className="p-2">
                <p>{contato.email}</p>
                <p>{contato.telefone}</p>
                <p>{contato.mensagem}</p>
              </div>
            </div>
            ) 
        }) 
      }
        </div>
      </div>
    </>
  );
}
