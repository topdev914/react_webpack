import React, { useState, useContext, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Carousel from 'react-multi-carousel';
import { debounce } from "lodash"

import { END_POINT, API_KEY } from "../const"
import { GlobalContext } from "../provider/context"
import Thumbnail from "../componets/Thumbnail";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 20
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    partialVisibilityGutter: 20
  },
  smallTablet: {
    breakpoint: { max: 768, min: 425 },
    items: 2,
  },
  mobile: {
     breakpoint: { max: 425, min: 0 },
     items: 1,
   }
}



function Main(){
  const { updateMovies, movieList } = useContext(GlobalContext);

  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(true)
  const [searchText, setSearchText] = useState('')

  const searchRef = useRef()
  const navigate = useNavigate()

  const debounceSearch = debounce(async text => {
    const res = await fetch(`${END_POINT}?s=${text}&apikey=${API_KEY}`)
    const response = await res.json()
    if(response.Search) {
      updateMovies(response.Search)
    }
  }, 700)

  const handleChange = (e) => {
    const text = e.target.value
    setSearchText(text)
    debounceSearch(text)
  }

  const handleViewDetail = (imdbID) => {
    navigate(`/${imdbID}`)
  }
  
  return (
    <section>
      <header className={isMenuVisible ? "menu":"menu mobile"}>
        <div className="menu-container">
            <div className="menu-holder">
                <h1>Xcentium </h1>
                <nav className='menu-nav'>
                    <a href="#" className="menu-nav__item">COMMON</a>
                    <a href="#" className="menu-nav__item">WHAT'S NEW</a>
                    <a href="#" className="menu-nav__item">PRODUCTS</a>
                    <a href="#" className="menu-nav__item">Top 10 MOVIES</a>
                </nav>
                <div className='menu-tool'>
                    <a href="#" className="menu-tool__search" 
                      onClick={(e) => {
                        e.preventDefault()
                        setIsSearchVisible(true)
                        searchRef.current.focus()
                      }}>
                      search  <FontAwesomeIcon icon='fa-magnifying-glass'/>
                    </a>
                    <div className="hamburger" onClick={(e)=>setIsMenuVisible(!isMenuVisible)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div className={(isSearchVisible ? "showing " : "") + "search-container"}>
            <input type="text" value={searchText} ref={searchRef} onChange={handleChange} />
            <a href="#" onClick={(e) => {
                setIsSearchVisible(false)
                setSearchText("")
            }}>
                <FontAwesomeIcon icon='fa-close' />
            </a>
        </div>
      </header>
      <main className='home' >
        {movieList.length > 0 && (
          <>
              <div className="container">
              <Carousel 
                  responsive={responsive}
                  autoPlay={true}
                  autoPlaySpeed={3000}
                  infinite={true}
                  keyBoardControl={true}
                  partialVisbile
              >
                {
                    movieList.map(({ imdbID, Poster, Title, Type, Year }) => (
                        <Thumbnail
                            key={imdbID}
                            Poster={Poster}
                            imdbID={imdbID}
                            Title={Title}
                            Type={Type}
                            Year={Year}
                            onViewDetail={handleViewDetail}
                        />
                    ))
                }
              </Carousel>
              </div>
          </>
        )}
      </main>
    </section>
  )
}

export default Main