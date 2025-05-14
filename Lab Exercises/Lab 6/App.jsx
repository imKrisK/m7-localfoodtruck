import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Emoji from './components/Emoji';
import BigCats from './components/BigCats';
import Calculator from './components/Calculator';

function ComplexComment(props) {
  return (
    <div className="comment componentBox">
      <div className="UserInfo">
        <img className="Avatar" src={props.author.avatarUrl} alt={props.author.name} />
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{props.date.toLocaleString()}</div>
    </div>
  );
}

function NamePart(props) {
  return <span className="NamePart">{props.value}</span>;
}

function FullName(props) {
  return (
    <div className="FullName componentBox">
      Full name: <NamePart value={props.first} /> <NamePart value={props.last} />
    </div>
  );
}

function FancyBox(props) {
  return <div className={`FancyBox FancyBox-${props.color}`}>{props.children}</div>;
}

function Callout(props) {
  return (
    <FancyBox color="blue">
      <h1 className="Callout-title">{props.title}</h1>
      <p className="Callout-message">{props.message}</p>
      {props.children}
    </FancyBox>
  );
}

function MoviesList() {
  const movies = [
    {
      title: 'The Shawshank Redemption',
      year: 1994,
      synopsis: 'Two imprisoned men find redemption.',
    },
    {
      title: 'The Dark Knight',
      year: 2008,
      synopsis: 'Batman fights the menace known as the Joker.',
    },
    {
      title: 'Interstellar',
      year: 2014,
      synopsis: 'Explorers travel through a wormhole in space.',
    },
  ];

  return (
    <div className="MoviesList componentBox">
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [mood, setMood] = useState('happy');
  const spiderman = {
    name: 'Spiderman',
    alterEgo: 'Peter Parker',
    catchPhrase: 'With great power comes great responsibility',
  };

  const spideyJSXFragment = (
    <>
      <h3>{spiderman.name}</h3>
      <blockquote>{spiderman.catchPhrase}</blockquote>
      <cite>{spiderman.alterEgo}</cite>
    </>
  );

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div>
        Current Mood: {mood}
        <button onClick={() => setMood('tired')}>Stay Up Late</button>
        <button onClick={() => setMood('hungry')}>Skip Lunch</button>
      </div>
      <MoviesList />
      <Callout title="Nested React Component" message="Simple message with a fancy box applied via composition">
        <FullName first="Elon" last="Musk" />
      </Callout>
      {spideyJSXFragment}
      <BigCats />
      <Emoji />
      <Calculator />
    </>
  );
}

export default App;
