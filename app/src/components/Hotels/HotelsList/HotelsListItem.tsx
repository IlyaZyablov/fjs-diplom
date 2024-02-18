import { Button, Col, Container, Row } from "react-bootstrap"
import { HotelData } from "../../../types/interfaces";
import HotelsListItemImgs from "./HotelsListItemImgs";

function HotelsListItem({ hotel }: { hotel: HotelData }) { 
  return (
    <Container className="bg-white rounded shadow-sm p-2 mt-3">
      <Container>
        <Row className="mt-2">
          <Col>
            <HotelsListItemImgs images={hotel.images} />
          </Col>
          <Col>
            <p className="fs-3 text-uppercase">{hotel.title}</p>
            <p className="text-muted">{hotel.description}</p>
            <Button>
              Подробнее
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default HotelsListItem