import React,{useEffect} from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import "./App.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './features/dataSlice';

const styles = {
  main_header: {
    backgroundColor: "white",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 2px 0px",
  },

  header: {
    padding: "0.6rem",
    width: "85rem",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },

  navbar: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },

  nav_link: {
    textDecoration: "none",
    color: "white",
    background: "rgb(239, 83, 102)",
    fontSize: "1.2rem",
    padding: "0.3rem 1.6rem",
    margin: "5px",
    border: "1px solid white",
    borderRadius: "0.3rem",
  },
};

const App = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  console.log("🚀 ~ App ~ data:", data)
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <div style={styles.main_header}>
        <div style={styles.header}>
          <div style={styles.navbar}>
            <Link to="/" style={styles.nav_link}>
              Home
            </Link>
            <Link to="/about" style={styles.nav_link}>
              About
            </Link>
          </div>
        </div>
      </div>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  );
};

export default App;
