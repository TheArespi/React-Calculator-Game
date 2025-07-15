import './App.css'
import TextContainer from './components/TextContainer'
import DigitContainer from './components/DigitContainer'
import DigitButton from './components/DigitButton'
import React from 'react'

function App() {

  const [sendDigitQueue, setSendDigitQueue] = React.useState<string[]>([]);
  const [chosenDigitQueue, setChosenDigitQueue] = React.useState<string[]>([]);
  const [digitChoices, setDigitChoices] = React.useState<string[]>([]);

  const [operation, setOperation] = React.useState<string>("");
  const [previousNumber, setPreviousNumber] = React.useState<number>(0);
  const [floorNumber, setFloorNumber] = React.useState<number>(0);
  const [ceilNumber, setCeilNumber] = React.useState<number>(0);
  const [totalNumber, setTotalNumber] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<number>(0);

  const validOperations = new Set<string>(); 
  validOperations.add("+");
  validOperations.add("-"); 
  validOperations.add("*"); 
  validOperations.add("/");

  const validDigits = new Set<string>();
  validDigits.add("1");
  validDigits.add("2"); 
  validDigits.add("3"); 
  validDigits.add("4");
  validDigits.add("5");
  validDigits.add("6"); 
  validDigits.add("7"); 
  validDigits.add("8");
  validDigits.add("9");
  validDigits.add("0");

  const OnDigitChosen = (digit: string) => {
    if (gameState == 1)
      return;

    if (validOperations.has(digit)) {
      setOperation(digit);
    } else if (validDigits.has(digit)) {
      setSendDigitQueue(prev => [...prev, digit]);
    }
  }

  const OnEquals = () => {
    const prevNumber = Number(previousNumber);
    const chosenNumber = Number(`${chosenDigitQueue.length > 0 ? chosenDigitQueue[0] : ""}${chosenDigitQueue.length > 1 ? chosenDigitQueue[1] : ""}${chosenDigitQueue.length > 2 ? chosenDigitQueue[2] : ""}`);
  
    let total = 0;

    if (operation === "+")
      total = prevNumber + chosenNumber;
    else if (operation === "")
      total = chosenNumber;

    setTotalNumber(total);

    setChosenDigitQueue([]);
    setOperation("");

    setGameState(1);
  }

  const OnClear = () => {
    const localQueue = chosenDigitQueue;

    localQueue.forEach(digit => {
      setDigitChoices(prev => [...prev, digit]);
    })

    if (operation != "")
      setDigitChoices(prev => [...prev, operation]);

    setChosenDigitQueue([]);
    setOperation("");
  }

  const OnContinue = () => {
    setPreviousNumber(totalNumber);
    setTotalNumber(0);

    setGameState(0)
  }

  React.useEffect(() => {
    if (sendDigitQueue.length <= 0)
      return;

    const localQueue = sendDigitQueue;

    localQueue.forEach(digit => {
      if (chosenDigitQueue.length < 3) {
        setChosenDigitQueue(prev => [...prev, digit]);
      } else {
        setDigitChoices(prev => [...prev, digit]);
      }
    })

    setSendDigitQueue([]);
  }, [sendDigitQueue]);

  React.useEffect(() => {
    setDigitChoices(["1", "2", "3", "4", "5", "+"]);
  }, []);

  return (
    <>
    <div className="justify-right m-1.5 grid grid-cols-3 gap-1.5 rounded bg-gray-300 p-3">
      <div></div>
      <div>
        <TextContainer>{previousNumber}</TextContainer>
        <div className="mb-1.5 flex justify-between text-center gap-5">
          <DigitContainer digit={operation}/>
          <div className="flex gap-1.5">
            <DigitContainer digit={chosenDigitQueue.length >= 1 ? chosenDigitQueue[0] : ""}/>
            <DigitContainer digit={chosenDigitQueue.length >= 2 ? chosenDigitQueue[1] : ""}/>
            <DigitContainer digit={chosenDigitQueue.length >= 3 ? chosenDigitQueue[2] : ""}/>
          </div>
        </div>
        <div className="h-1.5 w-full rounded bg-gray-400"></div>
      </div>
      <div></div>
      <TextContainer justify="between">
        <div>{floorNumber}</div>
        <div>&lt;</div>
      </TextContainer>
      <TextContainer>{totalNumber}</TextContainer>
      <TextContainer justify="between">
        <div>&lt;</div>
        <div>{ceilNumber}</div>
      </TextContainer>
    </div>
    <div className="m-1.5 flex justify-center gap-1.5 rounded bg-gray-300 p-3">
      <div className="mb-1.5 flex gap-1.5 rounded-sm bg-gray-400 p-1.5 font-mono text-4xl font-bold">
        { digitChoices.map((digit, index) => (
            <DigitButton 
              digit={digit} 
              textHighlight="text-gray-500" 
              onPressButton={() => {
                if (gameState == 1)
                  return;

                OnDigitChosen(digit);
                setDigitChoices(prev => prev.filter((_, i) => i != index));
              }}/>
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
