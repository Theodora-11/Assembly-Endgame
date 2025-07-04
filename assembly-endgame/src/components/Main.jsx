import {languages} from '../../language'
import React from 'react'
import clsx from 'clsx'

export default function Main() {
  
  const [currentWord, setCurrentWord] = React.useState('refactor');
  const [guessLetters, setGuessLetters] = React.useState([]);
  const wrongGuessCount = guessLetters.filter(letter => !currentWord.includes(letter));
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboardLetters = alphabet.split('').map((keyLetter, index) => {
    const isGuess = guessLetters.includes(keyLetter);
    const isCorrect = isGuess && currentWord.includes(keyLetter);
    const isWrong = isGuess && !currentWord.includes(keyLetter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    })
    
    return(
      <button 
        key={index} 
        className={className} 
        onClick={() => guessChose(keyLetter)}
      >
        {keyLetter.toUpperCase()}
      </button>
    )
  })

  const letters = currentWord.split('').map((letter, index) => (
    <span key={index} className="letter">
      {guessLetters.includes(letter) ? letter.toUpperCase() : ''}
    </span>
  ))

  function guessChose(keyLetter) {
    setGuessLetters(prevLetter => 
      prevLetter.includes(keyLetter)? prevLetter : [...prevLetter, keyLetter]
    )
  }

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