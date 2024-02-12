import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

function MenuMain() {
  return (
    <ListGroup variant="flush" className="shadow-sm rounded text-center">
      <ListGroup.Item action>
        <Link className="text-decoration-none text-secondary fw-semibold" to="/">
          Все гостиницы
        </Link>
      </ListGroup.Item>
      <ListGroup.Item action>
        <Link className="text-decoration-none text-secondary fw-semibold" to="/find-hotels">
          Поиск номера
        </Link>
      </ListGroup.Item>
      <ListGroup.Item action>
        <Link className="text-decoration-none text-secondary fw-semibold" to="/add-hotels">
          Добавить гостиницу
        </Link>
      </ListGroup.Item>
      <ListGroup.Item action>
        <Link className="text-decoration-none text-secondary fw-semibold" to="/users">
          Пользователи
        </Link>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default MenuMain
