import React from "react"

function Thumbnail({imdbID, Poster, Title, Type, Year, onViewDetail}){

  return (
    <div>
      <div className="thumbnail">
        <img className='thumbnail-img' src={Poster} />
        <div className='thumbnail-detail'>
            <h3 className="thumbnail-detail__title">{Title}</h3>
            <button className='thumbnail-detail__btn' onClick={() =>onViewDetail(imdbID)} > view detail </button>
        </div>
      </div>
    </div>
  )
}

export default Thumbnail