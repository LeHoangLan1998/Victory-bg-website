import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

const Category_1 = () => {

    return (
        <Container style={{ margin: '60px auto' }}>
            <Row>
                <Col>
                    <div className='container-custom'>
                        <div className='image-darken'>
                            <a href="#jackets">
                                <Image fluid src='src\assets\jacket.jpg'></Image>
                                <h2 className='centered text-unselectable '>Якета</h2>
                            </a>
                        </div>
                    </div>
                </Col>


                <Col>
                    <div className='container-custom'>
                        <div className='image-darken'>
                            <a href="#trousers">
                                <Image fluid src='src\assets\trousers.jpg'></Image>
                                <h2 className='centered text-unselectable' >Панталони</h2>
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Category_1;