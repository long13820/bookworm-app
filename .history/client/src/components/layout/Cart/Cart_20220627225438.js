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
                        <table className='table table-'>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Cart
