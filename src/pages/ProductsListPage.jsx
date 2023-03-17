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
  let categoryName = "";

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
  } else {
    categoryName = "Всички";
  }

  return (
    <>
      {
        <style type="text/css">
          {`
            .ais-Hits-item {
                /* min-width: 300px !important; */
                padding: 0;
                border: 0;
                text-align: left;
                box-shadow: none !important;
            }

            .ais-Hits-list {
              /* justify-content: center; */
            }

            .ais-Highlight-highlighted {
              font-size: 13px;
            }

            .ais-Highlight-nonHighlighted {
              font-size: 13px;
            }
          `}
        </style>
      }

      <div style={{ /* marginTop: "5rem" */ borderStyle: "solid none none", borderWidth: "5rem"}}>
        <InstantSearch
          searchClient={searchClient}
          indexName="algolia-product-index"
        >
          {category ? (
            <Configure /* hitsPerPage={4} */ filters={`gender:${category}`} />
          ) : null}

          <h5 style={{ margin: "1.5rem" }}>Категория {categoryName}</h5>

          <div
            style={{
              backgroundColor: "#f4fafb",
              padding: "3rem",
              marginBottom: "2.5rem",
            }}
          >
            <SearchBox
              searchAsYouType={false}
              placeholder="Търсете..."
              className="custom-SearchBox"
            />
          </div>

          <CurrentRefinements />

          {/* <div>
              <p>Размери:</p>
              <RefinementList attribute="size" />
              <hr />
              <p>Цветове:</p>
              <RefinementList attribute="color" />
            </div> */}

          <Hits hitComponent={Hit} />
          <div style={{ margin: "40px auto" }}>
            <Pagination />
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
            style={{ width: "100%" }}
          ></img>
          <div
            style={{
              display: "flex",
              textTransform: "uppercase",
              fontSize: "13px",
            }}
          >
            <Highlight attribute="productName" hit={hit} />
            <span style={{ marginLeft: "auto" }}>{hit.price} лв.</span>
          </div>
        </a>
      </OverlayTrigger>
    </>
  );
};

export default ProductsListPage;
