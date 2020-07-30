import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "new-list",
      title: newTech,
      techs: ["React Native", "React", "Node", "Adonis"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewTech("");
  }

  async function handleAddLike(id) {
    const response = await api.post(`repositories/${id}/like`);

    const newRepositories = repositories.map((repository) =>
      repository.id !== id ? repository : response.data
    );

    setRepositories(newRepositories);
  }

  async function handleRemoveRepository(id) {
    const repositoriesListCopy = repositories.filter(
      (repository) => repository.id !== id
    );

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
          onChange={(text) => setNewTech(text.target.value)}
          value={newTech}
        />
        <button type="submit" onClick={handleAddRepository}>
          Adicionar
        </button>
      </div>

      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <div className="repository" key={repository.id}>
            <li className="title">
              <span>{repository.title}</span>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            <div className="techs">
              <button
                onClick={() => handleAddLike(repository.id)}
                className="likes"
              >
                Likes {repository.likes}
              </button>
              {repository.techs[3] ? <span>{repository.techs[0]}</span> : ""}
              {repository.techs[3] ? <span>{repository.techs[1]}</span> : ""}
              {repository.techs[3] ? <span>{repository.techs[2]}</span> : ""}
              {repository.techs[3] ? <span>{repository.techs[3]}</span> : ""}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
