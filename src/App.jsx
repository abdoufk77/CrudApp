import { useRef } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState([]);

  const InputNom = useRef();
  const InputPrenom = useRef();
  const InputAge = useRef();

  const handelClickButton = (event) => {
    const btn = event.target.id;

    switch (btn) {
      case "add":
        setIsVisible(true);
        break;
      case "deleteAll":
        console.log("btn deleteAll users");
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

    setIsVisible(false);
  };

  const handelClickLignBtn = (index, event) => {
    const btn = event.target.id;

    switch (btn) {
      case "updateOne":
        alert("update user " + index);
        break;
      case "deleteOne":
        alert("delete user " + index);
        break;
      default:
        console.log("error");
        break;
    }
  };

  const handelCheckbox = (e) => {
    const checkbox = e.target;
    const checkboxes = document.querySelectorAll(
      'tbody input[type="checkbox"]'
    );

    if (checkbox.checked && checkbox.id === "checkAll") {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });
    } else {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  };

  return (
    <>
      <button id="add" onClick={handelClickButton} className="btn">
        add user
      </button>
      <button id="deleteAll" onClick={handelClickButton} className="btn">
        delete users
      </button>
      <h1>Users</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="checkAll" onChange={handelCheckbox} />
            </th>
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
              <td colSpan={6}>table empty</td>
            </tr>
          ) : (
            formData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" onChange={handelCheckbox} />
                  </td>
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
      {isVisible && (
        <div id="model">
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
      )}
    </>
  );
}

export default App;
