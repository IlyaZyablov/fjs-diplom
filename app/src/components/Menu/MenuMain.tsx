import { ListGroup } from "react-bootstrap"
import { NavLink } from "react-router-dom"

function MenuMain() {
  return (
    <ListGroup variant="flush" className="shadow-sm rounded text-center">
      <ListGroup.Item action>
        <NavLink className="text-decoration-none text-secondary fw-semibold" to="/">
          Поиск номера
        </NavLink>
      </ListGroup.Item>
      <ListGroup.Item action>
        <NavLink className="text-decoration-none text-secondary fw-semibold" to="/all-hotels">
          Все гостиницы
        </NavLink>
      </ListGroup.Item>
      <ListGroup.Item action>
        <NavLink className="text-decoration-none text-secondary fw-semibold" to="/users">
          Пользователи
        </NavLink>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default MenuMain
