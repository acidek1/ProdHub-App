import { HashRouter, Routes, Route, Link } from "react-router-dom";

function Todo() {
  return <h2>📝 TODOLIST</h2>;
}
function Timer() {
  return <h2>⏱️ Freelance Timer</h2>;
}
function Notes() {
  return <h2>📝 Notes</h2>;
}
function Habits() {
  return <h2>☑️ Habits</h2>;
}
function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h3>Nawigacja</h3>
        <ul style={{listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px"}}>
          <li><Link to="/">Todo</Link></li>
          <li><Link to="/timer">Timer</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/habits">Habits</Link></li>
        </ul>
      </nav>
      <main style={{padding: "20px", flex: 1}}>

        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/habits" element={<Habits />} />
        </Routes>

      </main>

      </div>
    </HashRouter>
  );
}
export default App;