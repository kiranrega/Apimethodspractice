import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";

const UpdateModel = ({
  open,
  handleClose,
  editedObj,
  setUserList,
  userList,
  editedUserEmail,
  editedUserName,
}: any) => {
  const [user, setUser] = React.useState(editedUserName);
  const [email, setEmail] = React.useState(editedUserEmail);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setUser(value);
    }
  };

  const updateUserData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const updatedUser = {
      first_name: user,
      email,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    };
    const res = await fetch("https://reqres.in/api/articles/1", requestOptions);
    const data = await res.json();
    // console.log(data);
    // let result = userList.filter((user: any) => user.id === editedObj.id);
    let result = userList.filter((user: any) => user.id === editedObj.id);
    result[0].first_name = data.first_name;
    result[0].email = data.email;

    console.log(result, "result");

    handleClose();
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
          User :
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
        <Button variant="contained" color="success" onClick={updateUserData}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModel;
