import { useState, useEffect } from "react";
import AddUserForm from "./forms/AddUserForm";
import UserTable from "./tables/UserTable";
import EditUserForm from "./forms/EditUserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);

  const initialFormState = { id: "", title: "", body: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      // Transform data to include only id and title
      const transformedData = data.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body
      }));
      setUsers(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setEditing(false);
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (id, updatedUser) => {
    // Remove the old user by filtering out the original id
    const updatedUsers = users.map((user) => (user.id === id ? updatedUser : user));
    setUsers(updatedUsers);
    setEditing(false);
  };
  

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit User</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View Users</h2>
          <UserTable editRow={editRow} deleteUser={deleteUser} users={users} />
        </div>
      </div>
    </div>
  );
}

export default App;
