import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import InfoDashboard from "./components/Layout";
import NavBar from "./components/navbar/NavBar";
import { RootState } from "./redux/store";
import { Route, Routes } from "react-router-dom";
import MapLayer from "./components/map/MapLayer";
import MapBasic from "./components/map/MapBasic";

export default function App() {
  const classes = useStyles();

  const users = useSelector((state: RootState) => state.users.usersList);
  console.log(users);
  // if(users.length === 0) {
  //   return <div>NO USER FOUND</div>
  // }
  return (
    <>
      <div className={classes.navbar}>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<InfoDashboard />} />
        <Route path="/info_Dashbaord" element={<InfoDashboard />} />
        <Route path="/map" element={<MapLayer />} />
        {/* <Route path="/map" element={<MapBasic />} /> */}
      </Routes>
    </>
  );
}

const useStyles = makeStyles({
  navbar: {
    display: "flex",
    justifyItems: "center",
    justifyContent: "center",
  },
});
