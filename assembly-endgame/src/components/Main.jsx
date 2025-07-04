import {languages} from '../../language'
import React from 'react'

export default function Main() {
  
  const [currentWord, setCurrentWord] = React.useState('refactor');
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboardLetters = alphabet.split('').map((keyLetter, index) => (
    <button key={index} className='keyboard-btn'>{keyLetter.toUpperCase()}</button>
  )); 

  const letters = currentWord.split('').map((letter, index) => (
    <span key={index} className="letter">{letter.toUpperCase()}</span>
  ));

  const languageBtn = languages.map(objLang => {
    const style = {
      backgroundColor: objLang.backgroundColor,
      color: objLang.color
    }

    return (
      <button 
        key={objLang.name} 
        style={style}
        className='language-btn'
      >
        {objLang.name}
      </button>
    )
  })

  return(
    <main>
      <section className="state-box">
        <h2 className="state-type">You win!</h2>
        <p className="state-text">Well done!</p>
      </section>

      <section className="buttons-box">
        {languageBtn}
      </section>

      <section className="words-box">
        {letters}
      </section>

      <section className="keyboard-box">
        {keyboardLetters}
      </section>
      <button className="new-game-btn">New game</button>
    </main>
  )
}