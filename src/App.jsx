import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState([]);

  const InputId = useRef();
  const InputNom = useRef();
  const InputPrenom = useRef();
  const InputAge = useRef();
  const InputSubmit = useRef();
  const model = useRef();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des utilisateurs");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const hadelClickAddUser = () => {
    openModel();
    InputSubmit.current.value = "ajouter user";
    InputId.current.disabled = false;
  };

  //create user
  const createUser = async () => {
    const id = InputId.current.value;
    const nom = InputNom.current.value;
    const prenom = InputPrenom.current.value;
    const age = InputAge.current.value;

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nom, prenom, age }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'utilisateur");
      } else {
        setFormData((perv) => [
          ...perv,
          {
            [InputId.current.id]: id,
            [InputNom.current.id]: nom,
            [InputPrenom.current.id]: prenom,
            [InputAge.current.id]: age,
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }

    reset(InputId, InputNom, InputPrenom, InputAge);
  };

  //edit user
  const editUser = (user) => {
    openModel();
    InputSubmit.current.value = "update user";

    InputId.current.value = user.id;
    InputNom.current.value = user.nom;
    InputPrenom.current.value = user.prenom;
    InputAge.current.value = user.age;

    InputId.current.disabled = true;
  };

  //update user
  const updateUser = async () => {
    let id = InputId.current.value;
    let nom = InputNom.current.value;
    let prenom = InputPrenom.current.value;
    let age = InputAge.current.value;

    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, age }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'utilisateur");
      } else {
        setFormData(
          formData.map((user) =>
            user.id == id
              ? { ...user, nom: nom, prenom: prenom, age: age }
              : user
          )
        );
      }
    } catch (error) {
      console.error(error);
    }

    reset(InputId, InputNom, InputPrenom, InputAge);
  };

  //delete user
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la suppression d'utilisateur");
      } else {
        setFormData(formData.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  //submit
  const handelSubmit = (e) => {
    e.preventDefault();
    let InputSubmitValue = InputSubmit.current.value;

    switch (InputSubmitValue) {
      case "ajouter user":
        createUser();
        closeModel();
        break;
      case "update user":
        updateUser();
        closeModel();
        break;
      default:
        console.error("error!");
        break;
    }
  };

  //open model
  const openModel = () => {
    model.current.style.display = "block";
    InputId.current.focus();
  };
  //close model
  const closeModel = () => {
    model.current.style.display = "none";
  };

  //reset inputs
  const reset = (...Inputs) => {
    Inputs.forEach((item) => (item.current.value = ""));
  };

  //exit form model
  const hadelExitModel = () => {
    closeModel();
  };

  return (
    <div className="container">
      <button id="add" onClick={hadelClickAddUser}>
        add user
      </button>

      <h1>Users</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>nom</th>
            <th>prenom</th>
            <th>age</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {formData.length === 0 ? (
            <tr>
              <td colSpan={5}>table empty</td>
            </tr>
          ) : (
            formData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.age}</td>
                  <td>
                    <button id="updateOne" onClick={() => editUser(user)}>
                      update
                    </button>
                    <button id="deleteOne" onClick={() => deleteUser(user.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* model */}
      <div id="model" ref={model}>
        <div className="modelHead">
          <button onClick={hadelExitModel}>X</button>
        </div>
        <form onSubmit={handelSubmit}>
          <div>
            <label htmlFor="nom">Id:</label>
            <br />
            <input type="text" id="id" ref={InputId} />
          </div>
          <div>
            <label htmlFor="nom">Nom:</label>
            <br />
            <input type="text" id="nom" ref={InputNom} />
          </div>
          <div>
            <label htmlFor="prenom">Prenom:</label>
            <br />
            <input type="text" id="prenom" ref={InputPrenom} />
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <br />
            <input type="number" id="age" ref={InputAge} />
          </div>

          <input type="submit" value="send" ref={InputSubmit} />
        </form>
      </div>
    </div>
  );
}

export default App;
