import { useRoutes } from "react-router-dom"
import UserEdit from "./pages/UserEdit"
import UserList from "./pages/UserList"


function App() {

  const element = useRoutes([
    { path: '/',element: <UserList/>},
    { path: '/create',element: <UserEdit/>},
    { path: '/edit/:id',element: <UserEdit/>}
  ])
  return element
}

export default App
