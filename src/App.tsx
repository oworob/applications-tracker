import "styles/base.scss";
import { Routes, Route } from "react-router-dom";
import routes from "assets/routes";
import Nav from "components/nav/Nav";

import SnackBar from "components/snackbar/SnackBar";

function App() {
  return (
    <div id="App">
      <Nav />

      <Routes>
        {/* <Route path="/" element={<Navigate to="/applications" replace />} /> */}
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>

      <SnackBar />
    </div>
  );
}

export default App;
