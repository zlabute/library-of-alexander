import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <h1>Library of Alexander</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </button>
        <p>Click the button to increment the counter</p>
      </div>
    </div>
  )
}

export default App

