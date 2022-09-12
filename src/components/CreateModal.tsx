import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";

const CreateModal = ({ open, handleClose, userList, setUserList }: any) => {
  const [user, setUserName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "user") {
      setUserName(value);
    } else {
      setEmail(value);
    }
  };

  const createNewUser = async () => {
    let newUser = {
      user,
      email,
    };

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };

    const res = await fetch("https://reqres.in/api/users", options);
    const data = await res.json();
    // console.log(data);
    handleClose();
    setUserList([...userList, { first_name: data.user, email, id: data.id }]);
    setUserName("");
    setEmail("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <FormLabel
          sx={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
        >
          {" "}
          Name :
        </FormLabel>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ margin: "10px" }}
          name="user"
          value={user}
          onChange={handleOnChange}
        />
        <br />
        <FormLabel
          sx={{
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
            margin: "5px",
          }}
        >
          {" "}
          Email :
        </FormLabel>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleOnChange}
          name="email"
          value={email}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={createNewUser}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;
