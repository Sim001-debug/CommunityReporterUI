import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../Landing.css"; 
import potholeIcon from "../image/pothole.png";
import electricityIcon from "../image/electricity.png";
import policeIcon from "../image/police.png";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="glass-card">
        <motion.h1 className="title" initial={{ y: -20 }} animate={{ y: 0 }}>
          Welcome to the Community Reporter
        </motion.h1>

        <motion.div
          className="btn-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn"
            onClick={() => navigate("/login")}
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn register"
            onClick={() => navigate("/register")}
          >
            Register
          </motion.button>
        </motion.div>

        <div className="card-container">
          <motion.div className="card" whileHover={{ scale: 1.08 }}>
            <img src={potholeIcon} alt="Potholes" />
            <p>Potholes</p>
          </motion.div>

          <motion.div className="card" whileHover={{ scale: 1.08 }}>
            <img src={electricityIcon} alt="Electricity Faults" />
            <p>Electricity Faults</p>
          </motion.div>

          <motion.div className="card" whileHover={{ scale: 1.08 }}>
            <img src={policeIcon} alt="Crimes" />
            <p>Crimes</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
