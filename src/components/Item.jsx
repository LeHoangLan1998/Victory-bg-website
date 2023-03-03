import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const Item = (props) => {

    //Popover config
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{props.title}</Popover.Header>
            <Popover.Body>
                <ul>
                    <li>Материя: {props.material}</li>
                    <li>Цвят: {props.color}</li>
                    <li>Дължина: {props.length}</li>
                    <li>Цена: {props.price}</li>
                    <li>Размери: {props.size}</li>
                </ul>
            </Popover.Body>
        </Popover>
    )


    return (

        <Card border='light'>
            <OverlayTrigger placement='auto' overlay={popover}>
                <a href={`/products/${props.id}`} style={{ color: 'black' }}>
                    <Card.Img variant="top" src={props.src} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text>
                            {`${props.price} лв.`}
                        </Card.Text>
                    </Card.Body>
                </a>
            </OverlayTrigger>
        </Card>

    )
}

export default Item;