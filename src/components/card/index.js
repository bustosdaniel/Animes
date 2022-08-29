import React, { useEffect, useState } from 'react'
import { GetAnimes } from '../../api'
import Modal from '../modal'
import '../card/index.css'
import Spinner from '../spinner'

export default function Card() {
  const [animes, setAnimes] = useState([])
  const [pagination, setPagintaion] = useState([])
  const [loadig, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState({})
  const [filter, setFilter] = useState()
  const [type, setType] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  const handleChangeFilter = (event) => {
    const { value } = event.target
    setFilter(value)
    getAnimes(value, type)
    setCurrentPage(1)
  }

  const handleChangeType = (event) => {
    const { value } = event.target
    setType(value)
    getAnimes(filter, value)
    setCurrentPage(1)
  }

  const handleSelectedAnime = (anime) => {
    setSelectedAnime(anime)
    toggleModal()
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    getAnimes(filter, type)
  }, [currentPage])

  const getAnimes = (filter, type) => {
    setLoading(true)
    GetAnimes({ params: { filter: filter, type: type, page: currentPage } })
      .then((response) => {
        setAnimes(response.data)
        setPagintaion(response.pagination)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const totalPages = `${pagination?.current_page} / ${pagination?.items?.total}`

  return (
    <section className="card-container">
      <div className="card-section-content">
        <div className="card-content-select">
          <select
            className="select-card"
            name="filter"
            onChange={handleChangeFilter}
          >
            <option selected>airing</option>
            <option selected>upcoming</option>
            <option selected>bypopularity</option>
            <option selected>favorite</option>
            <option selected>...</option>
          </select>
        </div>
        <div>
          <select
            name="type"
            className="select-type"
            onChange={handleChangeType}
          >
            <option selected>tv</option>
            <option selected>movie</option>
            <option selected>ova</option>
            <option selected>special</option>
            <option selected>ona</option>
            <option selected>music</option>
            <option selected>...</option>
          </select>
        </div>
      </div>
      <div className="card-content-pagination">
        <button className="btn-previous" onClick={() => previousPage()}>
          <img
            src="https://icons-for-free.com/iconfiles/png/512/arrow+left+chevron+chevronleft+left+left+icon+icon-1320185731545502691.png"
            alt=""
          />
        </button>
        <p>{totalPages}</p>
        <button className="btn-next" onClick={() => nextPage()}>
          <img
            src="https://icons-for-free.com/iconfiles/png/512/arrow+right+chevron+chevronright+right+right+icon+icon-1320185732203239715.png"
            alt=""
          />
        </button>
      </div>
      {loadig ? (
        <Spinner />
      ) : (
        <div className="card-content">
          {animes.map((anime) => {
            const genders = `${anime.genres[0]?.name || 'anime'} - ${
              anime.genres[0]?.type
            }`
            return (
              <div className="card" key={anime.mal_id}>
                <figure className="card-image">
                  <img src={anime.images.webp.image_url} alt="logo" />
                </figure>
                <div className="card-body">
                  <p>{anime.title}</p>
                  <p>{anime.duration}</p>
                  <p>{genders}</p>
                  <p className="card-content-synopsis">{anime.synopsis}</p>
                  <button
                    className="btn-trailer"
                    onClick={() => handleSelectedAnime(anime)}
                  >
                    Ver trailer
                  </button>
                  {!!selectedAnime && (
                    <Modal
                      title={selectedAnime?.title}
                      isOpen={modal}
                      toggleModal={toggleModal}
                      selectedAnime={selectedAnime}
                    >
                      <iframe
                        width="560"
                        height="315"
                        src={selectedAnime?.trailer?.embed_url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Modal>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
