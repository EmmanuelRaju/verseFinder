import React from 'react';
import './App.css';
import DisplayBox from './components/DisplayBox/DisplayBox';
import SearchBox from './components/SearchBox/SearchBox';
import { useSelector } from 'react-redux';
import BooksBox from './components/BooksBox/BooksBox';
import logo from './assets/images/logo.png'

function App() {
  const verses = useSelector(state => state.verse)
  console.log(verses);

  return (
    <div className='layout'>
      <main className='content'>
        <img src={logo} alt='logo' className='logo' />
        <SearchBox />
        <BooksBox />
        {verses.eng.reference && <section className='displayBox'>
          <DisplayBox title={verses.eng.reference} verse={verses.eng.verse} />
          <DisplayBox title={verses.tel.reference} verse={verses.tel.verse} />
        </section>}
      </main>
    </div>
  )
}

export default App;
