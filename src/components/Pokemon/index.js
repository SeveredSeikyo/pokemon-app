import {Component} from 'react'
import {Oval} from 'react-loader-spinner'
import PokemonItem from '../PokemonItem'
import './index.css'

class Pokemon extends Component{
    state={
        isLoading:true,
        pokemondetails:null,
        searchTerm: "",
        offset:0,
    }

    fetchPokemon = async () => {
        const {offset} = this.state;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=60&offset=${offset}`);
        const data = await response.json();
    
        // Loop through each Pokémon and fetch their details
        const pokemondetails = await Promise.all(data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
                name: pokemonData.name,
                imageUrl: pokemonData.sprites.front_default
            };
        }))
    
        this.setState({
            isLoading: false,
            pokemondetails: pokemondetails,
        })
    };

    componentDidMount(){
        this.fetchPokemon();
    }

    searchPokemon=(event)=>{
        this.setState({
            searchTerm: event.target.value, 
        })
    }

    changeOffset = ()=>{
        this.setState(prevState=>({
            offset : prevState.offset+60,
            isLoading : true,
        }));
        this.fetchPokemon();
    }

    render(){
        const {pokemondetails, isLoading, searchTerm}=this.state;
        const filteredpokemondetails=Array.isArray(pokemondetails)?pokemondetails.filter(pokemon=>pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())):[]
        return(
            <div className="main-container">
                <div className="input-container">
                    <input type="search" onChange={this.searchPokemon} placeholder='Search Pokemon' value={searchTerm}/>
                </div>
                <div className="pokemon-container">
                    {isLoading ? <Oval align="center"/> : 
                        (
                            <>
                            {filteredpokemondetails.map(pokemon=><PokemonItem pokemon={pokemon} key={pokemon.name}/>)}
                            <div className="button-container">
                                <button type="button" onClick={this.changeOffset}/>
                            </div>
                            </>
                        )
                    }
                                                   
                </div>
            </div>
        )
    }
}

export default Pokemon
