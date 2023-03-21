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
import Popover from "react-bootstrap/Popover";
import { OverlayTrigger } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { SquaresFour } from "phosphor-react";
import classes from "./ProductsListPage.module.css";
import { useState } from "react";

const searchClient = algoliasearch(
  "A1VDU6VM8X",
  "b6c97432f075a452e5f6d26bb16ae207"
);

const ProductsListPage = () => {
  const [gridColumns, setGridColumns] = useState(4);
  const [refinementWindow, setRefinementWindow] = useState(false);
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

  const handleGridColumns = () => {
    switch (gridColumns) {
      case 4:
        setGridColumns(6);
        break;

      case 6:
        setGridColumns(8);
        break;

      case 8:
        setGridColumns(4);
        break;

      default:
        break;
    }
  };

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
                width: auto;
            }

            .ais-Hits-list {
              display: grid;
              grid-template-columns: repeat(${gridColumns}, 1fr)
            }

            .ais-Highlight-highlighted {
              font-size: 13px;
            }

            .ais-Highlight-nonHighlighted {
              font-size: 13px;
            }

            .ais-Pagination-item--selected .ais-Pagination-link {
              background-color: black;
              border-color: black;
            }

            .ais-CurrentRefinements {
              justify-content: center;
            }
          `}
        </style>
      }

      <div style={{ borderStyle: "solid none none", borderWidth: "5rem" }}>
        <InstantSearch
          searchClient={searchClient}
          indexName="algolia-product-index"
        >
          {category ? (
            <Configure /* hitsPerPage={4} */ filters={`category:${category}`} />
          ) : null}

          <h1 style={{ margin: "1.5rem", fontWeight: "100" }}>
            Категория {categoryName}
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: ".7rem",
              marginRight: "1rem",
            }}
          >
            <SquaresFour onClick={handleGridColumns} size="32" />
            <div
              style={{
                border: "2px solid black",
                cursor: "pointer",
                padding: "1px 3px",
              }}
              onClick={() => {
                setRefinementWindow(!refinementWindow);
              }}
            >
              Филтри
            </div>
          </div>

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

          <div
            style={{
              position: "relative",
              zIndex: refinementWindow ? 1 : -1,
              height: refinementWindow ? "auto" : "0px",
            }}
          >
            <p>Размери:</p>
            <RefinementList attribute="size" />
            <hr />
            <p>Цветове:</p>
            <RefinementList attribute="color" />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <CurrentRefinements />
          </div>

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
  const navigate = useNavigate();
  //Popover config
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <ul>
          <li>Материя: {hit.material}</li>
          <li>Цвят: {hit.color}</li>
          <li>Дължина: {hit.length}</li>
          <li>Цена: {hit.price}</li>
          <li>Размери: {hit.size.join(", ")}</li>
        </ul>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <OverlayTrigger placement="auto" overlay={popover}>
        <div
          onClick={() => navigate(`/item/${hit.id}`)}
          className={classes["hit-container"]}
        >
          <div style={{ overflow: "hidden" }}>
            <img
              src={`\\src\\assets\\products\\${hit.imageRef}`}
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              textTransform: "uppercase",
              fontSize: "13px",
              color: "black",
            }}
          >
            <Highlight attribute="productName" hit={hit} />
            <span style={{ marginLeft: "auto" }}>{hit.price} лв.</span>
          </div>
        </div>
      </OverlayTrigger>
    </>
  );
};

export default ProductsListPage;
