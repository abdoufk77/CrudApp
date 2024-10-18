import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState([]);

  const InputNom = useRef();
  const InputPrenom = useRef();
  const InputAge = useRef();
  const model = useRef();

  const handelClickButton = (event) => {
    const btn = event.target.id;

    switch (btn) {
      case "add":
        model.current.style.display = "block";
        break;
    }
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    setFormData((prevState) => [
      ...prevState,
      {
        [InputNom.current.id]: InputNom.current.value,
        [InputPrenom.current.id]: InputPrenom.current.value,
        [InputAge.current.id]: InputAge.current.value,
      },
    ]);

    model.current.style.display = "none";
  };

  const handelClickLignBtn = (index, event) => {
    const btn = event.target.id;

    switch (btn) {
      case "updateOne":
        alert("update user " + index);
        break;
      case "deleteOne":
        const newArr = formData.filter(
          (item) => item.nom !== formData[index].nom
        );
        setFormData(newArr);
        break;
      default:
        console.log("error");
        break;
    }
  };

  return (
    <div className="container">
      <button id="add" onClick={handelClickButton} className="btn">
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
                  <td>{index}</td>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.age}</td>
                  <td>
                    <button
                      id="updateOne"
                      onClick={(e) => handelClickLignBtn(index, e)}
                    >
                      update
                    </button>
                    <button
                      id="deleteOne"
                      onClick={(e) => handelClickLignBtn(index, e)}
                    >
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

          <input type="submit" value="send" />
        </form>
      </div>
    </div>
  );
}

export default App;
