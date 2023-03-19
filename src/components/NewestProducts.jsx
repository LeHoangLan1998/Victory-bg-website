import Image from "react-bootstrap/Image";

const NewestProducts = () => {
  return (
    <div
      style={{
        backgroundColor: "#f4fafb",
        padding: "150px 60px",
        margin: "60px 0",
      }}
    >
      <div className="container-custom">
        <h2 style={{ marginBottom: "60px", fontWeight: "100" }}>Нови артикули:</h2>
        <div className="grid-category" direction="horizontal " gap={3}>
          <div>
            <a href="#jackets">
              <Image
                fluid
                src="src\assets\jacket.png"
                style={{ maxHeight: "400px" }}
              ></Image>
            </a>
          </div>

          <div>
            <a href="#trousers">
              <Image
                fluid
                src="src\assets\trousers.png"
                style={{ maxHeight: "400px" }}
              ></Image>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewestProducts;
