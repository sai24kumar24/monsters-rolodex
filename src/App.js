import { useState, useEffect } from 'react';
import React from 'react';
import CardList from './components/cardlist/cardlist.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () =>{
  
  const [seachField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setfilteredMonsters] = useState(monsters);
  
  // console.log('render');
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json() )
          .then((users) => setMonsters(users));  
  }, []);

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(seachField);
    });

    setfilteredMonsters(newFilteredMonsters);
  }, [monsters, seachField ]);

  const onSearchChange = (event) => {
        const searchFieldString= event.target.value.toLocaleLowerCase();
           setSearchField(searchFieldString);
        }




  return(
    <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>

        <SearchBox 
          onChangeHandler = {onSearchChange}
         placeHolder ={'Search Monsters'} 
         className='monsters-search-box'/>
        <CardList monsters={filteredMonsters} />

    </div>
  )
}

export default App;
