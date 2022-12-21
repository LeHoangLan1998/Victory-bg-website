import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, RefinementList, Pagination, Configure } from "react-instantsearch-hooks-web";
import 'instantsearch.css/themes/algolia-min.css';
import Item from "../components/Item";
import NavBar from "../components/NavBar";


const searchClient = algoliasearch("A1VDU6VM8X", "b6c97432f075a452e5f6d26bb16ae207")


const ProductsListPage = () => {

    return (
        <>
            <NavBar scrollState={true}/>
            <div style={{marginTop: "10vh"}}>
                <InstantSearch searchClient={searchClient} indexName="algolia-product-index">
                    {/* <Configure hitsPerPage={4}/> */}
                    <SearchBox searchAsYouType={false} placeholder="Търсете..." className="custom-SearchBox" />
                    <div className="flex-container" style={{ marginTop: "80px" }}>
                        <div>
                            <RefinementList attribute="size" />
                            <hr />
                            <RefinementList attribute="color" />
                        </div>

                        <div>
                            <Hits hitComponent={Hit} />
                            <Pagination />
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