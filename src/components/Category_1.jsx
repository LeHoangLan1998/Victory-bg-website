import Image from 'react-bootstrap/Image';

const Category_1 = () => {

    return (
        <div style={{ backgroundColor: '#f4fafb', padding: "150px 60px", margin: "60px auto" }}>
            <div className='container-custom'>
                <h1 style={{ marginBottom: '60px' }}>Нови артикули:</h1>
                <div className="grid-category" direction="horizontal " gap={3}>
                    <div>
                        <a href="#jackets">
                            <Image fluid src='src\assets\jacket.jpg' style={{maxHeight: '400px'}}></Image>
                        </a>
                    </div>

                    <div>
                        <a href="#trousers">
                            <Image fluid src='src\assets\trousers.jpg' style={{maxHeight: '400px'}}></Image>
                        </a>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Category_1;