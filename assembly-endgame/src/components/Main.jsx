import { languages } from '../../language'
import { getFarewellText, getRandomWords } from '../../utils'
import React from 'react'
import clsx from 'clsx'


export default function Main() {
  // State values
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWords());
  const [guessLetters, setGuessLetters] = React.useState([]);

  //Derived values
  const numGuessesLeft = languages.length - 1
  const wrongGuessCount = guessLetters.filter(letter => !currentWord.includes(letter)).length;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const gameWon = currentWord.split('').every(letter => guessLetters.includes(letter));
  const gameLost = wrongGuessCount === languages.length - 1; 
  const gameOver = gameWon || gameLost;
  const lastGuessLetter = guessLetters[guessLetters.length -1];
  const isLastLetterIncorrect = lastGuessLetter && !currentWord.includes(lastGuessLetter);


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
        disabled={gameOver}
        aria-disabled={guessLetters.includes(keyLetter)}
        aria-label={`Letter ${keyLetter}`}
        key={index} 
        className={className} 
        onClick={() => guessChose(keyLetter)}
      >
        {keyLetter.toUpperCase()}
      </button>
    )
  })

  const letters = currentWord.split('').map((letter, index) => {
    const showLetters = gameLost || guessLetters.includes(letter);
    const showLetterStyle = clsx('letter', gameLost && !guessLetters.includes(letter) && 'missed-letters');

    return(
      <span key={index} className={showLetterStyle}>
        {(guessLetters.includes(letter) || gameLost)? letter.toUpperCase() : ''}
      </span>
    )
  })

  function guessChose(keyLetter) {
    setGuessLetters(prevLetter => 
      prevLetter.includes(keyLetter)? prevLetter : [...prevLetter, keyLetter]
    )
  }

  const languageBtn = languages.map((objLang, index) => {
    const isLanguageDeleted = index < wrongGuessCount;
    const style = {
      backgroundColor: objLang.backgroundColor,
      color: objLang.color
    }

    const className = clsx('language-btn', isLanguageDeleted && 'delete');

    return (
      <button 
        key={objLang.name} 
        style={style}
        className={className}
      >
        {objLang.name}
      </button>
    )
  })

  function checkGameStatus() {
    if(!gameOver && isLastLetterIncorrect) {
      return (
        <p className="bye">{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
      )
    }

    if(gameWon) {
      return(
        <>
          <h2 className="state-type">You win!</h2>
          <p className="state-text">Well done!</p>
        </>
      )
    }

    if(gameLost) {
      return(
        <>
          <h2 className="state-type">Game over!</h2>
          <p className="state-text">You lose! Better start learning Assembly!</p>
        </>
      )
    }

    return null
  }

  function resetGame() {
    setCurrentWord(() => getRandomWords());
    setGuessLetters([]);
  }

  const gameStatus = clsx('state-box', {
    won: gameWon,
    lost: gameLost,
    bye: !gameOver && isLastLetterIncorrect,
  })

  return(
    <main>

      <section className={gameStatus}>
        {checkGameStatus()}
      </section>

      <section className="buttons-box">
        {languageBtn}
      </section>

      <section className="words-box">
        {letters}
      </section>

      <section 
        className="sr-only" 
        aria-live="polite" 
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessLetter) ? 
            `Correct! The letter ${lastGuessLetter} is in the word.` : 
            `Sorry, the letter ${lastGuessLetter} is not in the word.`
          }
          You have {numGuessesLeft} attempts left.
        </p>

        <p>Current word: {currentWord.split("").map(letter => 
        guessLetters.includes(letter) ? letter + "." : "blank.")
        .join(" ")}
        </p>
      </section>


      <section className="keyboard-box">
        {keyboardLetters}
      </section>
      {gameOver && <button className="new-game-btn" onClick={resetGame}>New game</button>}

    </main>
  )
}