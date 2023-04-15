
import './base.css';
import './App.css';
import { Outlet, Link } from 'react-router-dom';
function App() {
  return (

    <div>
      {/* <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
        <Link to="/">home</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/list">list</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/register">register</Link>&nbsp;&nbsp;&nbsp;
      </nav> */}
      <Outlet />
    </div>
  );
}

export default App;
