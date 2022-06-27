import React from 'react'
import './cart.css'

const Cart = () => {
  return (
    <section className='cart-page flex-grow-1'>
        <div className='container'>
            <div className='title-section'>
                <p className='title-page font-22px'>Your cart: 3 items</p>
            </div>

            <div>
                <div className='row'>
                    <div className='col-lg-8'>
                        <table className='table table-bordered tbl-cart'>
                            <thead>
                                <tr>
                                    <td>Product</td>
                                    <td>Price</td>
                                    <td>Quantity</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='product-column'>
                                            <img src="./assets//images/books.jpg" alt='Books' />
                                            <div className='pc-infor'>
                                                <p className='font-20px'>Book Title</p>
                                                <p>Author Name</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='price-column'>
                                                <p className='font-20px'></p>
                                                <p>Author Name</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Cart
