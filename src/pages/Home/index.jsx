import React, { useState, useEffect } from 'react'; /*useState é um Hook onde State é o nome dele */
import './styles.css';
import { Card } from '../../components/Card';


function Home() {
  const [studentName, setStudentName] = useState(''); /*apenas um nome inicial que vai ser trocado ao digitar*/
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  function handleAddStudent() {
    if (studentName.trim() === '') {
      alert('Por favor, insira um nome de estudante.');
      return;  // Sai da função se o campo estiver vazio
    }
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]); 
    setStudentName(''); // Limpa o campo de entrada após adicionar um estudante
  }

  useEffect(() => {
    /*o useEffect é renderizado automaticamente ao iniciar a página */
    fetch('https://api.github.com/users/epannunzio')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, []);

  return (
    <> 
    <div className='container'>
      <header>
        <h1>Lista de presença com React </h1>
        <img src="/src/images/react.png" alt='React logo' />

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='Minha foto' />
        </div>
      </header>
      
      <input 
        type="text"
        placeholder="Digite o nome..."
        value={studentName}
        onChange={e => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => 
        <Card
          key={student.time}  /*quando temos componentes gerados a partir de uma repetição precisamos usar uma key prop */
          name={student.name}
          time={student.time} 
        />)
      }
      
    </div>
    </>
  )
}

export default Home;
