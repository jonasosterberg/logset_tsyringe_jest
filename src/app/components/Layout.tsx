import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import React from "react";
import Form from "./form/Form";
import NavBar from "./navbar/NavBar";
import DataTable from "./table/DataTable";

export default function InfoDashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Form />
        <Divider flexItem={true} orientation={"vertical"} />
        <DataTable />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "block",
    height: "100vh",
  },
  navbar: {
    display: "flex",
    justifyItems: "center",
    justifyContent: "center",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "30px",
  },
});
