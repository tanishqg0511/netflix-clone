import React from 'react'
import "./Home.scss"
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlinePlus,AiOutlinePlaySquare} from 'react-icons/ai'

const apiKey = "fa02ab38d0de60ac38333215ee6e4924"
const url = "https://api.themoviedb.org/3/movie"
const imgUrl = "https://image.tmdb.org/t/p/original"


const Card = ({ img }) => (
  <img className="card" src={img} alt="cover" />
)

const Row = ({ title, arr = [{ img: "https://lumiere-a.akamaihd.net/v1/images/image_174b2bb6.jpeg?region=0%2C0%2C1400%2C2100" }] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {
        arr.map((item, index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))
      }
    </div>
  </div>
)
const Home = () => {
  const [moviespopular, setPopular] = useState([]);
  const [moviesTopRated, setTopRated] = useState([]);
  const [moviesUpcoming, setUpcoming] = useState([]);
  const [moviesNowPlaying, setNowPlaying] = useState([]);
  const [moviesGenre, setGenre] = useState([]);
  // const [moviesLatest,setLatest]=useState([]);
  useEffect(() => {
    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/popular?api_key=${apiKey}&page=1`)
      setPopular(results)
    }
    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/top_rated?api_key=${apiKey}&page=3`)
      setTopRated(results)
    }
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/upcoming?api_key=${apiKey}&page=4`)
      setUpcoming(results)
    }
    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/now_playing?api_key=${apiKey}&page5`)
      setNowPlaying(results)
    }
    const allGenre = async () => {
      const { data: { genres } } = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=fa02ab38d0de60ac38333215ee6e4924&language=en-US")
      setGenre(genres)
    }
    // const fetchLatest=async()=>{
    //   const {data:{results}}= await axios.get(`${url}/latest?api_key=${apiKey}`)
    //   setLatest(results)
    // }
    fetchPopular();
    // fetchLatest();  
    fetchTopRated();
    fetchUpcoming();
    fetchNowPlaying();
    allGenre();
  }, [])


  return (
    <section className='home'>
      <div className="banner" style={{ backgroundImage: moviespopular[0] ? `url(${`${imgUrl}/${moviespopular[0].poster_path}`})` : "none" }}>
        {moviespopular[0] && <h1>{moviespopular[0].original_title}</h1>}
        {moviespopular[0] &&<p>{moviespopular[0].overview}</p>}
        <div>
          <button> <AiOutlinePlaySquare/>Play</button>
          <button> <AiOutlinePlus/>My List</button>
        </div>
      </div>
      <Row title={"Popular on Netflix"} arr={moviespopular} />
      {/* <Row title={"Latest Movies"} arr={moviesLatest}/> */}
      <Row title={"Top Rated"} arr={moviesTopRated} />
      <Row title={"Now Playing"} arr={moviesNowPlaying} />
      <Row title={"Upcoming Movies"} arr={moviesUpcoming} />

      <div className="genre">
        {moviesGenre.map((item) => (
          <Link key={item.index} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>
    </section>
  )
}

export default Home
