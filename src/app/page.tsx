import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className='absolute ml-72 mt-24'>
        <h1>Adicionar Contatos</h1>
      </div>

      <div className='absolute ml-[940px] mt-24'>
        <h1>Meus Contatos</h1>
      </div>
      <div className='flex justify-center items-center h-[100vh]'>
        <form className='w-[560px] mr-[1rem] text-center'>
            <input className='w-[90%] p-[1rem] border border-black m-[0.5rem] mt-5' type='text' placeholder='Nome*' autoFocus required></input>
            <input className='w-[90%] p-[1rem] border border-black m-[0.5rem]' type='email' placeholder='Email*' required></input>
            <input className='w-[90%] p-[1rem] border border-black m-[0.5rem]' type='tel' placeholder='Telefone'></input>
            <textarea className='resize-none w-[90%] p-[1rem] border border-black m-[0.5rem]' placeholder='Observação'></textarea>
            <button className='mb-6 mt-10 rounded-lg font-bold px-2 py-1 border border-6 w-60 bg-lime-300 cursor-pointer hover:bg-lime-600' type='submit'>Salvar</button>
        </form>
        <div className='w-[500px] p-[1rem] bg-teal-400 h-[400px] text-center ml-[5rem] overflow-auto'>
          <input className='w-[458px] h-[40px] p-[1rem] border border-1 m-[0.4rem] rounded-lg text-center' type='text' placeholder='Buscar'></input>

          <div className='bg-teal-200 rounded-lg text-left max-h-[200px] box-content'>
            <div className='flex justify-between items-center'>
                <p className='text-[1.5rem] text-left p-[0.1rem] font-bold m-2'>Lucas Aires Ferrer</p>
              <div>
                <a className='m-2 text-red-600 cursor-pointer hover:font-bold'>Editar</a>
                <a className='m-2 text-red-600 cursor-pointer hover:font-bold'>Excluir</a>
              </div>
            </div>
            <div className='p-2'>
              <p>lcsairesdev@gmail.com</p>
              <p>85989292374</p>
              <p>Desenvolvedor FullStack</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}