import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import CreateModal from "./CreateModal";
import UpdateModel from "./UpdateModel";

const ApiMethods = () => {
  const [open, setOpen] = React.useState(false);
  const [userList, setUserList] = useState<any[]>([]);
  const [openEditModel, setOpenEditModel] = useState<boolean>(false);
  const [editedUserName, setEditedUserName] = useState<any>([]);
  const [editedUserEmail, setEditedUserEmail] = useState<any>([]);
  const [editedObj, setEditedObj] = useState<any>([]);

  const getAllUsers = async () => {
    let response = await fetch("https://reqres.in/api/users?page=2");
    const data = await response.json();
    setUserList(data.data);
  };

  const deleteUser = async (id: number) => {
    let options = {
      method: "DELETE",
    };
    const res = await fetch(`https://reqres.in/api/users/${id}`, options);
    if (res.status === 204) {
      const deletedUsers = userList.filter((user) => user.id !== id);
      setUserList(deletedUsers);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditModelOpen = async (id: number) => {
    let res = await userList.filter((user) => user.id === id);
    // console.log(res[0]);
    setEditedUserName(res[0].first_name);
    setEditedUserEmail(res[0].email);
    setEditedObj(res[0]);

    // {
    //   setEditedObj(user);
    //   setEditedUserName(user.first_name);
    //   setEditedUserEmail(user.email);
    // }
    console.log(editedObj);

    setOpenEditModel(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditModelClose = () => {
    setOpenEditModel(false);
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Create New User
        </Button>
        <Button variant="contained" onClick={() => getAllUsers()}>
          Get All Users
        </Button>
      </div>
      <Grid container spacing={2}>
        {userList.map((user) => {
          return (
            <Grid
              item
              xs={12}
              key={user.id}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                border: "1px solid",
                margin: "25px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  handleEditModelOpen(user.id);
                }}
                sx={{ marginBottom: "10px" }}
              >
                Edit
              </Button>
              <Typography variant="h4" gutterBottom>
                {user.first_name}
              </Typography>
              <Button
                onClick={() => deleteUser(user.id)}
                variant="contained"
                sx={{ marginBottom: "10px" }}
                color="secondary"
              >
                Delete
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <CreateModal
        open={open}
        handleClose={handleClose}
        userList={userList}
        setUserList={setUserList}
      />
      <UpdateModel
        open={openEditModel}
        handleClose={handleEditModelClose}
        userList={userList}
        editedObj={editedObj}
        setUserList={setUserList}
        editedUserEmail={editedUserEmail}
        editedUserName={editedUserName}
      />
    </>
  );
};

export default ApiMethods;
