import { useState } from "react";

const AddUserForm = (props) => {
  const initialFormState = { id: "", title: "", body: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.id || !user.title) return; // Ensure both fields are filled
        props.addUser(user);
        setUser(initialFormState);
      }}
    >
      <label>ID</label>
      <input
        type="text"
        onChange={handleInputChange}
        name="id"
        value={user.id}
      />
      <label>Title</label>
      <input
        type="text"
        onChange={handleInputChange}
        name="title"
        value={user.title}
      />
      <label>Body</label>
      <input
        type="text"
        onChange={handleInputChange}
        name="body"
        value={user.body}
      />
      <button>Add </button>
    </form>
  );
};

export default AddUserForm;
