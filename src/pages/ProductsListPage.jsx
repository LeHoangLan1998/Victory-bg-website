import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
  Configure,
  CurrentRefinements,
} from "react-instantsearch-hooks-web";
import "instantsearch.css/themes/algolia.css";
import NavBar from "../components/NavBar";
import Popover from "react-bootstrap/Popover";
import { OverlayTrigger } from "react-bootstrap";
import { useParams } from "react-router-dom";

const searchClient = algoliasearch(
  "A1VDU6VM8X",
  "b6c97432f075a452e5f6d26bb16ae207"
);

const ProductsListPage = () => {

  let { category } = useParams();
  let categoryName = ""

  if (category) {
    switch (category) {
      case "male":
        categoryName = "Мъжки";
        break;

      case "female":
        categoryName = "Женски";
        break;

      default:
        categoryName = "";
        break;
    }
  }
  else {
    categoryName = "Всички";
  }

  return (
    <>
      {
        <style type="text/css">
          {`
            .ais-Hits-item {
                width: 300px !important;
                padding: 0;
                border: 0;
                text-align: left;
            }
            .ais-Hits {
                max-width: 1300px;
            }
                `}
        </style>
      }


      <div style={{ marginTop: "5rem" }}>
        <NavBar scrollState={true} />
        <InstantSearch
          searchClient={searchClient}
          indexName="algolia-product-index"
        >
          {category ? (
            <Configure /* hitsPerPage={4} */ filters={`gender:${category}`} />
          ) : null}

          <h5>Категория {categoryName}</h5>

          <div style={{ backgroundColor: "#f4fafb", padding: "3rem" }}>
            <SearchBox
              searchAsYouType={false}
              placeholder="Търсете..."
              className="custom-SearchBox"
            />
          </div>

          <CurrentRefinements />

          <div
            className="grid-container-productList"
            style={{
              marginTop: "80px",
              marginLeft: "3rem",
              marginRight: "3rem",
            }}
          >
            <div style={{ textAlign: "left", paddingLeft: "15px" }}>
              <p>Размери:</p>
              <RefinementList attribute="size" />
              <hr />
              <p>Цветове:</p>
              <RefinementList attribute="color" />
            </div>

            <div style={{ marginLeft: "120px" }}>
              <Hits hitComponent={Hit} />
              <div style={{ margin: "40px auto" }}>
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </>
  );
};

const Hit = ({ hit }) => {
  //Popover config
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{hit.productName}</Popover.Header>
      <Popover.Body>
        <ul>
          <li>Материя: {hit.material}</li>
          <li>Цвят: {hit.color}</li>
          <li>Дължина: {hit.length}</li>
          <li>Цена: {hit.price}</li>
          <li>Размери: {hit.size}</li>
        </ul>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <OverlayTrigger placement="auto" overlay={popover}>
        <a href={`/item/${hit.id}`} style={{ color: "black" }}>
          <img
            src={`\\src\\assets\\products\\${hit.imageRef}`}
            style={{ maxWidth: "100%" }}
          ></img>
          <div style={{ display: "flex" }}>
            <Highlight attribute="productName" hit={hit} />
            <span style={{ marginLeft: "auto" }}>{hit.price} лв.</span>
          </div>
        </a>
      </OverlayTrigger>
    </>
  );
};

export default ProductsListPage;
