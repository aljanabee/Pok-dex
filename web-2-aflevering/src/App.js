import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';


function App() {
  const [pokemon, setPokemon]= useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setloading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelTokens: new axios.CancelTokens(c => cancel = c )
    }).then(res =>{
      setloading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.prev)
    setPokemon( res.data.result.map(p => p.name ))
  }) 

  return () => cancel()
  
  },[currentPageUrl])

  function gotoNextPage(){
      setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
}

  if (loading) return "loading..."
  
    return (
      <>
    <PokemonList  pokemon={pokemon} />
    <Pagination 
      gotoNextPage={nextPageUrl ? gotoNextPage : null} 
      gotoPrevPage={prevPageUrl ?  gotoPrevPage : null} 
       />
    </>
  );
}

export default App;
