import { useEffect, useState } from "react";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props.currentUser]); // Use props.currentUser to avoid unnecessary updates

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.id || !user.title) return; // Ensure both fields are filled
        props.updateUser(user.id, user);
      }}
    >
      <label>ID</label>
      <input
        type="text"
        onChange={handleInputChange}
        name="id"
        value={user.id}
        disabled // ID is typically not editable
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
      <button>Update </button>
      <button
        className="button muted-button"
        onClick={(e) => {
          e.preventDefault(); // Prevent form submission on cancel
          props.setEditing(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
