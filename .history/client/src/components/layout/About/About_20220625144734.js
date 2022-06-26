import React from 'react'

const About = () => {
  return (
    <section className='about-page flex-grow-1 d-flex align-items-center'>
        <div className='container'>
            <div className='row py-3 px-5'>
                <div className='col-md-12'>
                    <h2 className='text-center'>Welcome to bookworm</h2>
                    <p>"Bookworm is an independent New York bookstore and language school with locations in
                Manhattan and Brooklyn. We specialize in travel books and language classes."</p>
                </div>
                <div className='col-md-6'>
                    <h3>Our Story</h3>
                    <p>
                        The name Bookworm was taken from the original name for New York International Airport, w
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About
