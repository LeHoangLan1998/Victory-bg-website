import { useEffect, useState } from 'react'
import './App.css'
import CarouselComp from '../components/CarouselComp';
import Category_1 from '../components/Category_1';
import Item from '../components/Item';
import 'bootstrap/dist/css/bootstrap.min.css';

import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import NavBar from '../components/NavBar';

function MainPage() {

  const [products, setProducts] = useState([]);
  const [navBarScroll, setNavBarScroll] = useState(false);
  const usersCollectionRef = collection(db, "products")


  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(usersCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getProducts();
  }, []
  )

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavBarScroll(true);
    }
    else {
      setNavBarScroll(false);
    }  
  }
  useEffect(() => {
    changeBackground()
    // adding the event when scroll change Logo
    window.addEventListener("scroll", changeBackground)
  })

  return (
    <>
      <NavBar dynamic="true" scrollState={navBarScroll} />
      <CarouselComp />
      <Category_1 />

      <div className='grid-container'>
        {products.map(
          (product) => {
            return (
              <Item
                src={`src\\assets\\products\\${product.imageRef}`}
                title={product.productName}
                price={product.price}
                material={product.material}
                color={product.color}
                length={product.length}
                size={product.size}
                id={product.id}
                key={product.id}
              />
            )
          }
        )}
      </div>
    </>
  )
}

export default MainPage
