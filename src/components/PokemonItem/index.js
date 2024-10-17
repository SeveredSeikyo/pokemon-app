import { Component } from "react"
import './index.css'

class PokemonItem extends Component{
    render(){
        const {pokemon}=this.props;
        return(
            <div className="card-container">
                <img src={pokemon.imageUrl} alt={pokemon.name}/>
                <h2>{pokemon.name}</h2>
            </div>
        )
    }
}

export default PokemonItem