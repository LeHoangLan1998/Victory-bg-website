import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, RefinementList, Pagination, Configure } from "react-instantsearch-hooks-web";
import 'instantsearch.css/themes/algolia.css';
import Item from "../components/Item";
import NavBar from "../components/NavBar";


const searchClient = algoliasearch("A1VDU6VM8X", "b6c97432f075a452e5f6d26bb16ae207")


const ProductsListPage = () => {
    return (
        <>
            <style type="text/css">
                {`
            .ais-Hits-item {
                width: 300px !important;
            }
            .ais-Hits {
                max-width: 1300px;
            }
                `}
            </style>

            <NavBar scrollState={true} />
            <div style={{ marginTop: "15vh" }}>
                <InstantSearch searchClient={searchClient} indexName="algolia-product-index">
                    {/* <Configure hitsPerPage={4}/> */}
                    <SearchBox searchAsYouType={false} placeholder="Търсете..." className="custom-SearchBox" />
                    <div className="grid-container-productList" style={{ marginTop: "80px", marginLeft: "3rem", marginRight: "3rem"}}>
                        <div style={{ textAlign: "left", paddingLeft: "15px" }}>
                            <p>Размери:</p>
                            <RefinementList attribute="size" />
                            <hr />
                            <p>Цветове:</p>
                            <RefinementList attribute="color" />
                        </div>

                        <div style={{ marginLeft: '120px' }}>
                            <Hits hitComponent={Hit} />
                            <div style={{ margin: '40px auto' }}>
                                <Pagination />
                            </div>

                        </div>
                    </div>
                </InstantSearch>
            </div>
        </>
    )
}


const Hit = ({ hit }) => {
    return (<>

        <div>
            <a href={`/products/${hit.id}`} style={{ color: 'black' }}>
                <img src={`\\src\\assets\\products\\${hit.imageRef}`} style={{ maxWidth: '20vh' }}></img>
                <h5><Highlight attribute="productName" hit={hit} /></h5>
                <p>{hit.price} лв.</p>
            </a>
        </div>
    </>
    )
}

export default ProductsListPage;