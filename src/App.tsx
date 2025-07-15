import './App.css'
import TextContainer from './components/TextContainer'
import DigitContainer from './components/DigitContainer'
import DigitButton from './components/DigitButton'
import React from 'react'
import Header from './components/Header'
import Calculator from './components/Calculator'
import { GenerateRandomDigit, IsDigitValid, IsOperationValid } from './utils/GenerateHelpers'

function App() {

  const [sendDigitQueue, setSendDigitQueue] = React.useState<string[]>([]);
  const [digitChoices, setDigitChoices] = React.useState<string[]>([]);

  const [operation, setOperation] = React.useState<string>("");
  const [gameState, setGameState] = React.useState<number>(0);
  const [digitsUsed, setDigitsUsed] = React.useState<number>(0);
  const [correct, setCorrect] = React.useState<boolean>(false);
  const [swaps, setSwaps] = React.useState<number>(5);
  const [addtlScore, setAddtlScore] = React.useState<number>(0);

  const OnDigitChosen = (digit: string) => {
    if (gameState == 1)
      return;

    if (IsOperationValid(digit)) {
      if (operation != "") {
        setDigitChoices(prev => [...prev, operation]);
      } else {
        setDigitsUsed(digitsUsed + 1);
      }

      setOperation(digit);
    } else if (IsDigitValid(digit)) {
      setSendDigitQueue(prev => [...prev, digit]);
    }
  }

  const onDigitSwap = (digit: string) => {
    if (gameState == 1)
      return;

    if (swaps > 0) {
      let newDigit = digit;
      while(newDigit === digit) {
        newDigit = GenerateRandomDigit();
      }
      setDigitChoices(prev => [...prev, newDigit]);
      setSwaps(swaps - 1);

    } else {
      setDigitChoices(prev => [...prev, digit]);
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
  }

  

  const OnContinue = () => {
    if (correct) {
      
    } else {
      setSwaps(5);
      setAddtlScore(0);
    }

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

  React.useEffect(() => {
    setDigitChoices([]);
    for(let i = 0; i < 6; i++) {
      const digit = GenerateRandomDigit();
      setDigitChoices(prev => [...prev, digit]);
    }
  }, []);

  return (
    <>
    <Header gameState={gameState} addtlScore={addtlScore} correct={correct} />
    <Calculator 
      gameState={gameState}
      operation={operation}
      sendDigitQueue={sendDigitQueue}
      onReturnDigit={OnDigitReturned}
      onEmptyQueue={onEmptyQueue}
      onSetAddtlScore={onSetAddtlScore} 
      onResult={onResult}      
    />  
    <div className="m-1.5 flex items-center justify-center gap-1.5 rounded bg-gray-300 p-3">
      <TextContainer color="rose-400" shadowColor='rose-500'>Swaps: {swaps}</TextContainer>
      <div className="mb-1.5 flex gap-1.5 rounded-sm bg-gray-400 p-1.5 font-mono text-4xl font-bold">
        { digitChoices.map((digit, index) => (
            <DigitButton 
              digit={digit} 
              textHighlight={"text-gray-500"} 
              onPressButton={() => {
                if (gameState == 1)
                  return;

                OnDigitChosen(digit);
                setDigitChoices(prev => prev.filter((_, i) => i != index));
              }}
              onRightClick={() => {
                if (gameState == 1)
                  return;

                onDigitSwap(digit);
                setDigitChoices(prev => prev.filter((_, i) => i != index));
              }}
              />
          ))
        }
      </div>
      <div className="justify-right mb-1.5 flex gap-1.5 rounded-sm bg-gray-400 p-1.5 font-mono text-4xl font-bold">
        {
          gameState == 0 ? (
            <>
              <DigitButton 
                digit="=" 
                color="bg-blue-500" 
                shadowColor="bg-blue-700" 
                textColor="text-white" 
                textHighlight="text-blue-200" 
                onPressButton={OnEquals}
              />
              <DigitButton 
                digit="CLEAR" 
                width={30} 
                color="bg-blue-500" 
                shadowColor="bg-blue-700" 
                textColor="text-white" 
                textHighlight="text-blue-200" 
                onPressButton={OnClear}
              />
            </>
          ) : (
            <DigitButton 
              digit="CONTINUE" 
              width={50} 
              color="bg-blue-500" 
              shadowColor="bg-blue-700" 
              textColor="text-white" 
              textHighlight="text-blue-200" 
              onPressButton={OnContinue}
            />
          )
        }
        
      </div>
    </div>
  </>
  )
}

export default App
