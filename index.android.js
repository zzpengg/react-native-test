/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

class test extends Component {
   constructor(props)
   {
     super(props);
     this.state={
       height:0,
       weight:0,
       bmi:0,
       result:"",
       page:'',
       active:false,
       id:0,
       pokemons: [],
       stats:[],
       limit:0
     }
   }
 /*   onPress = () => {
    console.log('pressed');
    var bmi=this.state.weight/(this.state.height/100*this.state.height/100);
    var result="";
    var active=!this.state.active;
    if(bmi >25)
       result="肥宅";
    else
       result="正常";
    this.setState({result:result});
    this.setState({bmi:bmi});
    this.setState({active:active});
    }*/

    fetchPokemons = () => {
        console.log("press");
        const url = `http://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=0`;
            fetch(url)
            .then((pokemonlist) => pokemonlist.json())
            .then((pokemonlistJson) => {
                console.log(pokemonlistJson);
                // this.setState({pokemons: responseJson});
                let pokemons =[] ;
                let i=0;
                for(let pokemon of pokemonlistJson.results) {
                    i++;
                    pokemons.push({
                    id: i,
                    name:pokemon.name,
                    pic:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
                    });
                }
                this.setState({pokemons});
                return pokemonlistJson;
             })
             .catch((error) => {
             console.error(error);
           });
      }
      
      fetchPokemonsDetails = () => {
        console.log("press");
        const url = `http://pokeapi.co/api/v2/pokemon/${this.state.id}/`;
            fetch(url)
            .then((detaillist) => detaillist.json())
            .then((detaillistJson) => {
                console.log(detaillistJson);
                // this.setState({pokemons: responseJson});
                let stats =[] ;
                for(let pokemon of detaillistJson.stats) {
                    stats.push({
                    name:pokemon.stat.name,
                    base_stat:pokemon.stat.base_stat,
                    });
                }
                this.setState({stats});
                return detaillistJson;
             })
             .catch((error) => {
             console.error(error);
           });
      }
      
      renderPokemonList = () => {
       return  this.state.pokemons.map((pokemon ,i) => {
             return (
                <View key={i} style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{borderBottomWidth: 6,borderBottomColor: '#BBB'}}>
                      <TouchableOpacity onPress={ () => this.state.id = pokemon.id} >
                        <Text>  {pokemon.name}!{pokemon.id}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.fetchPokemonsDetails}>
                        <Image style={styles.logo} source={{uri: pokemon.pic}}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Alert.alert(
            'Alert Title',
            null,
            [
              {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
              {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
              {text: 'Baz', onPress: () => console.log('Baz Pressed!')},
            ]
          )}>
                        <Text>  Details </Text>
                      </TouchableOpacity>
                    
                  
                    
                  </View>
                </View>
             );
             
         });
     }
  render() {
    return (
      <View style={[styles.container,this.state.active && styles.button]}>
  
         <Text>limit</Text>
         <TextInput
          style={{height: 40, flexDirection:'column', borderColor: 'gray', borderWidth: 1}}
          onChangeText={limit => this.setState({limit})}
          value={`${this.state.limit}`}
         />
       
           <TouchableOpacity onPress={this.fetchPokemons}>
            <Text>  抓寶可夢瞜!</Text>
           </TouchableOpacity>
        <ScrollView style={{ alignSelf: 'stretch', backgroundColor: 'lightblue'}}>
            {this.renderPokemonList()}
          </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:
  {
    backgroundColor:'#ff5533'
  },
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    justifyContent:'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#ff5533',
    marginBottom: 5,
  },
  logo:{
    height: 140,
    width: 160
  }
});

AppRegistry.registerComponent('test', () => test);
