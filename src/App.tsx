import { RouterProvider } from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundaries/ErrorBoundaries"
import router from "./routes/PageRoutes"
import './App.css'

function App() {

  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  )
}

export default App
