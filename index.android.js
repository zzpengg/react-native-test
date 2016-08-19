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
  Image
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
       active:false
     }
   }
    onPress = () => {
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
    }
  render() {
    return (
      <View style={[styles.container,this.state.active && styles.button]}>
         <Image
           style={styles.logo}
           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
         />
         <Text>身高</Text>
         <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(height) => this.setState({height})}
          value={`${this.state.height}`}
        />
        <Text>體重</Text>
         <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(weight) => this.setState({weight})}
          value={`${this.state.weight}`}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text>button</Text>
        </TouchableOpacity>
        <Text>{this.state.bmi}</Text>
        <Text>狀態</Text>
        <Text>{this.state.result}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(page) => this.setState({page})}
          value={`${this.state.page}`}
        />
        <Image
           style={styles.logo}
           source={{uri: `https://pokeadvisor.com/img/mon/${this.state.page}.png`}}
         />
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
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    flex:1,
    textAlign: 'center',
    color: '#ff5533',
    marginBottom: 5,
  },
  logo:{
    justifyContent: 'center',
    flex:1,
    height: 70,
    width: 90 
  }
});

AppRegistry.registerComponent('test', () => test);
