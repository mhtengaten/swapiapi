/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { fetchAllData } from './FetchData'

const App = () => {


  const [searchingKeyword, setsearchingKeyword] = useState();
  const [data, setData] = useState();
  const [loading,setLoadign] = useState();

  const onSearch = async () => {
    try{
      setLoadign(true)
    const response = await fetchAllData(searchingKeyword);
    setData(response);
    setLoadign(false);
    }catch(error){
      console.log(error)
    }
  }

  function renderItem(item) {
    return <View style={styles.viewStyle}>

      <View style={{ flexDirection: "row" }}>

        <View style={{ height: 100, width: 100, backgroundColor: 'lightgray', flex: 0.5 }}>
        </View>

        <View style={{ flex: 1 }}>

          <View style={{ flexDirection: 'row', }}>
            <Text style={styles.text}>Name: </Text>
            <Text style={styles.subheading}>{item.item.name}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Age: </Text>
            <Text style={[styles.subheading, { marginLeft: '10%' }]}>{item.item.birth_year}</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <Text style={styles.text}>Gender: </Text>
            <Text style={[styles.subheading, {}]}>{item.item.gender}</Text>
          </View>
          <View style={styles.image}>

          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, }}>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.text}>Skin_color: </Text>
              <Text style={styles.subheading}>{item.item.skin_color}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Height: </Text>
              <Text style={styles.subheading}>{item.item.height}</Text>
            </View>
            
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.text}>Mass: </Text>
              <Text style={styles.subheading}>{item.item.mass}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  };

  return (
    <View style={{marginBottom:120}}>
      <Text style={styles.heading}>
        SWAPIAPI
      </Text>
      <View style={styles.innerBox}>
        <View style={{ flex: 2 }}>


          <TextInput
            style={styles.input}
            onChangeText={(e) => setsearchingKeyword(e)}
            value={searchingKeyword}
            placeholder="Enter Text here"
          />
        </View>
        <View style={{ flex: 0.5,justifyContent:'center' , }}>
          <TouchableOpacity style={styles.button} onPress={onSearch}>
            <Text style={styles.buttonText}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ?  <View style={{marginTop:'30%'}}>
         <ActivityIndicator style={{}} size="large" color="red" />
         </View>
       :  <FlatList
        data={data}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item, index) => item.key}
      />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
 image:{
  borderWidth: 0.3, 
  marginHorizontal: 10, 
  marginTop: 10
 },
  input: {
    height: 40,
    
    borderWidth: 1,
    padding: 10,

  },
  button:{
    backgroundColor:'red',
    height:40,
    justifyContent:'center',
    borderColor:'red',
    borderWidth:1
  },
   
    buttonText:
    {
      color:'white',
    fontSize:15,
    alignSelf:'center', },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',

    color: 'black',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  innerBox:{
    flexDirection: 'row' ,marginHorizontal:10,marginBottom:12
  },
  subheading: {
    fontSize: 13,
    marginLeft: 10,
    color: 'black',
    alignSelf: "center"

  },

  text: {
    fontSize: 13,
    marginLeft: 10,
    alignSelf: 'center', 
    justifyContent: 'center' 

  },

  viewStyle: {
    backgroundColor: '#F8F8F8',

    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 10,
    elevation: 2,
    marginHorizontal: 10,

  },
});

export default App;
