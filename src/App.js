import React, { Component } from 'react'
import './App.css';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: "eevee",
      pokemon: "",
      err: ""
    }
  }
  
  componentDidMount() {
    this.getPokemon();
  }

  getPokemon = async () => {
    //   console.log(name);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.state.query.toLowerCase()}`
      );
      const data = await res.json();

      console.log(this);

      this.setState({
        pokemon: data,
        err: null
      });

      console.log(data);
    } catch (err) {
      this.setState({
        err,
        pokemon: null
      });

      console.error(err);
    }
  };

  handleChange = e => {
    this.setState({ query: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.getPokemon();
  }

  render() {

    const { query, pokemon, err } = this.state;
    console.log(`The pokemon is set to: ${query}`);

    return (
      <>
        <div className="main-div">
          <form onSubmit={this.handleSubmit}>
            <h3>Search Pokemon</h3>
            <input type="text" value={query} onChange={this.handleChange} />
            <input type="submit" value="Search" />
          </form>

        {pokemon && !err ? (
          <div className="pokemon-pic">
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
              />
            <h2 className="pokemon-name-title">{pokemon.name}</h2>
            <ul>
              {pokemon.abilities.map((abil) => (
                <li>
                  {abil.ability.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="error">
            <img
              className="img-error"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nuvola_apps_error.svg/1024px-Nuvola_apps_error.svg.png"
              alt={err}
            />
            <h2>Whoops! Couldn't find that Pokemon!</h2>
          </div>
        )}
        </div>
      </>
    )
  }
}
