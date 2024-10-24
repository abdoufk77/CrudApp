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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000");
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const hadelClickAddUser = () => {
    openModel();
    InputSubmit.current.value = "ajouter user";
  };

  //create user
  const createUser = () => {
    let id = InputId.current.value;
    let nom = InputNom.current.value;
    let prenom = InputPrenom.current.value;
    let age = InputAge.current.value;
    //verfication des champs
    //...

    setFormData((perv) => [
      ...perv,
      {
        [InputId.current.id]: id,
        [InputNom.current.id]: nom,
        [InputPrenom.current.id]: prenom,
        [InputAge.current.id]: age,
      },
    ]);

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
  const updateUser = () => {
    let id = InputId.current.value;
    let nom = InputNom.current.value;
    let prenom = InputPrenom.current.value;
    let age = InputAge.current.value;

    setFormData(
      formData.map((user) =>
        user.id == id ? { ...user, nom: nom, prenom: prenom, age: age } : user
      )
    );

    reset(InputId, InputNom, InputPrenom, InputAge);
  };

  //delete user
  const deleteUser = (id) => {
    setFormData(formData.filter((user) => user.id !== id));
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
