import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    });
  }, [repositories]);

  async function handleAddRepository() {
    if (newTech) {
      const response = await api.post('repositories', {
        url: "new-list",
        title: newTech,
        techs: [
          "React Native",
          "React",
          "Node",
          "Adonis"
        ]
      });
  
      const repository = response.data;
  
      setRepositories([...repositories, repository]);
      setNewTech('');
    } else {
      alert('Adicione um titulo!');
    }
  }


  async function handleAddLike(id) {
    await api.post(`repositories/${id}/like`);
  }


  async function handleRemoveRepository(id) {
    const repositoriesListCopy = repositories.filter(repository => repository.id !== id);
    
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositoriesListCopy);
  }

  return (
    <div>
        <div className="rowInput">
          <input
            placeholder="Nome do repositório"
            className="addRepository"
            type="text"
            onChange={text => setNewTech(text.target.value)}
            value={newTech}
          />
          <button type="submit" onClick={handleAddRepository}>Adicionar</button>
        </div>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <div className="repository" key={repository.id}>
            <li className="title">
                <span>{repository.title}</span>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
            </li>
            <div className="techs">
              <button onClick={() => handleAddLike(repository.id)} className="likes">Likes {repository.likes}</button>
              <span>{repository.techs[1]}</span>
              <span>{repository.techs[2]}</span>
              <span>{repository.techs[3]}</span>
            </div>
        </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
