import './App.css'
import TextContainer from './components/TextContainer'
import DigitContainer from './components/DigitContainer'
import DigitButton from './components/DigitButton'
import React from 'react'
import Header from './components/Header'
import Calculator from './components/Calculator'
import { GenerateRandomDigit, IsDigitValid, IsOperationValid } from './utils/GenerateHelpers'
import Controller from './components/Controller'

function App() {

  const [sendDigitQueue, setSendDigitQueue] = React.useState<string[]>([]);
  const [digitChoices, setDigitChoices] = React.useState<string[]>([]);

  const [operation, setOperation] = React.useState<string>("");
  const [gameState, setGameState] = React.useState<number>(0);
  const [digitsUsed, setDigitsUsed] = React.useState<number>(0);
  const [correct, setCorrect] = React.useState<boolean>(false);
  const [toClear, setToClear] = React.useState<boolean>(false);
  const [swaps, setSwaps] = React.useState<number>(5);
  const [addtlScore, setAddtlScore] = React.useState<number>(0);

  const OnDigitChosen = (digit: string) => {
    if (gameState == 1)
      return;

    if (IsOperationValid(digit)) {
      setOperation(digit);
    } else if (IsDigitValid(digit)) {
      setSendDigitQueue(prev => [...prev, digit]);
    }
  }

  const OnEquals = () => {
    setGameState(1);
  }

  const OnClear = () => {
    if (operation != "")
      setDigitChoices(prev => [...prev, operation]);

    setSendDigitQueue([]);
    setOperation("");
    setDigitsUsed(0);
    setToClear(true);
  }

  const OnContinue = () => {
    if (!correct)
      setAddtlScore(addtlScore);
    
    setOperation("");
    setGameState(0);
  }

  const OnDigitReturned = (digit: string) => {
    setDigitChoices(prev => [...prev, digit]);
  }

  const onEmptyQueue = () => {
    setSendDigitQueue([]);
  }

  const onSetAddtlScore = (score: number) => {
    setAddtlScore(score);
  }

  const onResult = (result: boolean) => {
    setCorrect(result);
  }

  const onReturnsConsumed = () => {
    setDigitChoices([]);
  }

  const onClearFinished = () => {
    setToClear(false);
  }

  return (
    <>
    <Header gameState={gameState} addtlScore={addtlScore} correct={correct} />
    <Calculator 
      gameState={gameState}
      operation={operation}
      sendDigitQueue={sendDigitQueue}
      toClear={toClear}
      onReturnDigit={OnDigitReturned}
      onEmptyQueue={onEmptyQueue}
      onSetAddtlScore={onSetAddtlScore} 
      onResult={onResult}    
      onClearFinished={onClearFinished}  
    />  
    <Controller 
      gameState={gameState} 
      correct={correct}
      returnQueue={digitChoices}
      operation={operation}
      onDigitChosen={OnDigitChosen} 
      onEquals={OnEquals} 
      onClear={OnClear} 
      onContinue={OnContinue}
      onReturnsConsumed={onReturnsConsumed} />
  </>
  )
}

export default App
