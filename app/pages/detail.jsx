import React, {useState, useEffect, useContext} from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { END_POINT, API_KEY } from "../const"
import { GlobalContext } from "../provider/context"

function Detail(){
  const { addDetail, detailList } = useContext(GlobalContext);
  const [detail, setDetail] = useState()

  const { imdbID } = useParams()
  const navigate = useNavigate()

  const fetchDetail = async (id) => {
    const res = await fetch(`${END_POINT}?i=${id}&apikey=${API_KEY}`)
    const response = await res.json()
    console.log("res", response)
    addDetail(response)
    setDetail(response)
  } 

  useEffect(() => {
    const cachedDetail = detailList.filter(item => item.imdbID == imdbID)
    console.log(cachedDetail)
    if( cachedDetail.length > 0){
      setDetail(cachedDetail[0])
    } else {
      fetchDetail(imdbID)
    }
  }, [imdbID])

  console.log("d", detailList)
  return (
    <section className="detail">
      {
        detail && <>
          <h2 className="detail-title">{detail.Title}</h2>
          <div className="detail-container">
            <div className='detail-img'>
              <img className='detail-img__content' src={detail.Poster} />
            </div>
            <div className="detail-content">
              <div className="detail-item">
                <h3 className='detail-item__title'>Director</h3>
                <h3 className='detail-item__text'>{detail.Director}</h3>
              </div>
              <div className="detail-item">
                <h3 className='detail-item__title'>Writer</h3>
                <h3 className='detail-item__text'>{detail.Writer}</h3>
              </div>
              <div className="detail-item">
                <h3 className='detail-item__title'>Actors</h3>
                <h3 className='detail-item__text'>{detail.Actors}</h3>
              </div>
              <div className="detail-item">
                <h3 className='detail-item__title'>Plot</h3>
                <h3 className='detail-item__text'>{detail.Plot}</h3>
              </div>
              <div className="detail-item">
                <button className="btn-back" onClick={() => navigate(-1)}>back</button>
              </div>
            </div>
          </div>
        </>
      }
      
    </section>
  )
}

export default Detail