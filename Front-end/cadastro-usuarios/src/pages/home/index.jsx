import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

import Trash from '../../assets/16qg.svg'
import './style.css'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers (usersFromApi.data)
  }
  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }
  async function createUsers(){
   await api.post('/usuarios', {
    name: inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
   })
  getUsers()
  }
  useEffect(() => {
    getUsers()
  }, [])
  


  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome"name='nome' type='text' ref={inputName}/>
        <input placeholder='Idade' name='idade' type='text' ref={inputAge}/>
        <input placeholder='Email' name='email' type='text' ref={inputEmail}/>
        <button onClick={createUsers}type='button'>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <button onClick={() =>deleteUsers(user.id)}>
              <img src={Trash} />
            </button>

          </div>
        </div>

      ))}
    </div>
  )
}

export default Home
