import React,  { useState } from "react";
import { useAlert } from "react-alert";
// import { object } from "yup";
import './crud.css'



export default function CrudApp() {
  const alert = useAlert();
    // basics states for getting values
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [address, setAdress] = useState("");
    // state for bind data of all
    const [users, setUser] = useState([]);
    // state for edit content
    const [edit, setEdit] = useState(false);
    // state for update content
    const [active, setActive] = useState(null);
  
    // Add Data
    const addUser = (e) => {
      e.preventDefault();
      if(name === ""){
        return alert.show("pls enter the name")
      }else if(mail === ""){
        return alert.show("pls enter the correct mail")
      }else if(address.length < 10 ){
        return alert.error("pls enter the address and length must greater than 10 chracters")
      }
      const user = {
        name ,
        mail,
        address,
      };
      setUser([...users, user]);
      setActive(true)
      // update user
      if (edit) {
        let copy = users;
        Object.assign(copy[active], user);
        setUser([...copy]);
        setEdit(false);
        setActive(null);
      } else {
        // add user
        setUser([...users, user]);
      }
      setName("");
      setMail("");
      setAdress("");
    };
    // Edit Data
    const onEditClick = (index) => {
      const edit = users[index];
      setName(edit.name);
      setMail(edit.mail);
      setAdress(edit.address);
      setEdit(true);
      setActive(index);
    };
    // Delete User
    const delHandle = (user) => {
      if (window.confirm("Are you sure you want to delete")) {
        let copy = users.filter((item) => item !== user);
        setUser([...copy]);
      }
    };
  return (
    <div className='p-5 bg-app'>
      <h1>React Crud App</h1>
      <hr />
      <div>
      <div className="container pt-5 py-3">
        <h2 className="bg-primary p-2 text-light rounded">Sir Jensen</h2>
        <div className="row">
          <div className="col">
            <form className="" onSubmit={addUser}>
              <div className="form-group">
                <h3>Name</h3>
                <input
                  type="text"
                  className="fonm-control border"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <h3>Email</h3>
                <input
                  type="email"
                  className="fonm-control border"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <h3>Aaddress</h3>
                <input
                  type="text"
                  className="fonm-control border"
                  value={address}
                  onChange={(e) => setAdress(e.target.value)}
                />
              </div>
              <button className="btn btn-primary form-control mt-3">
                {edit ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="pt-5 py-3 table-main">
        <table className="table table-bordered">
          <thead>
            <tr className="text-light bg-info rounded">
              <th>Name</th>
              <th>Email</th>
              <th>Adress</th>
              <th>Edit</th>
              <th>Delet</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.mail}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => onEditClick(index)}
                    >
                      Edit
                    </button>
                  </td>
              
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => delHandle(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
      </div>
  )
}
