import React from "react";
import DigitContainer from "./DigitContainer"
import TextContainer from "./TextContainer"
import { GenerateRandomDigit } from "../utils/GenerateHelpers";

interface CalculatorProps {
    gameState: number;
    operation: string;
    sendDigitQueue: string[];
    toClear: boolean;
    onReturnDigit: (digit: string) => void;
    onEmptyQueue: () => void;
    onSetAddtlScore: (score: number) => void;
    onResult: (correct: boolean) => void;
    onClearFinished: () => void;
}

const Calculator: React.FC<CalculatorProps> = (props) => {
    const { 
    gameState,
    operation,
    sendDigitQueue,
    toClear,
    onReturnDigit,
    onEmptyQueue,
    onSetAddtlScore,
    onResult,
    onClearFinished,
    } = props

    const [chosenDigitQueue, setChosenDigitQueue] = React.useState<string[]>([]);

    const [correct, setCorrect] = React.useState<boolean>(false);
    const [digitsUsed, setDigitsUsed] = React.useState<number>(0);

    const [previousNumber, setPreviousNumber] = React.useState<number>(0);
    const [totalNumber, setTotalNumber] = React.useState<number>(0);
    const [ceilNumber, setCeilNumber] = React.useState<number>(0);
    const [floorNumber, setFloorNumber] = React.useState<number>(0);

    const GenerateFloorAndCeil = () => {
        const floor = Math.floor(Math.random() * 1000);
        setFloorNumber(floor);
        const diff = Math.floor(Math.random() * 500);
        setCeilNumber(Math.min(1000, floor + diff));
    }

    React.useEffect(() => {
        if (!sendDigitQueue.length)
            return;
        
        let newChosen = [...chosenDigitQueue];
        const toReturn: string[] = [];

        sendDigitQueue.forEach(digit => {
            if (newChosen.length < 3) {
                newChosen.push(digit);
            } else {
                toReturn.push(digit);
            }
        });

        setChosenDigitQueue(newChosen);
        setDigitsUsed(prev => prev + newChosen.length - chosenDigitQueue.length);

        toReturn.forEach(digit => onReturnDigit(digit));

        onEmptyQueue();
    }, [sendDigitQueue]);

    React.useEffect(() => {
        if (gameState == 0) {
            if (correct) {
                setPreviousNumber(totalNumber);
              } else {
                setPreviousNumber(0);
                onSetAddtlScore(0);
              }
          
              setTotalNumber(0);
          
              for (let i = 0; i < digitsUsed; i++) {
                const digit = GenerateRandomDigit();
          
                onReturnDigit(digit);
              }
              
              setDigitsUsed(0);
          
              GenerateFloorAndCeil();
              setChosenDigitQueue([]);
        } else if (gameState == 1) {
            const prevNumber = Number(previousNumber);
            const chosenNumber = Number(`${chosenDigitQueue.length > 0 ? chosenDigitQueue[0] : ""}${chosenDigitQueue.length > 1 ? chosenDigitQueue[1] : ""}${chosenDigitQueue.length > 2 ? chosenDigitQueue[2] : ""}`);
        
            let total = 0;

            if (operation === "+")
            total = prevNumber + chosenNumber;
            else if (operation === "*")
            total = prevNumber * chosenNumber;
            else if (operation === "-")
            total = prevNumber - chosenNumber;
            else if (operation === "/")
            total = prevNumber / chosenNumber;
            else if (operation === "")
            total = chosenNumber;

            if (operation != "")
                setDigitsUsed(digitsUsed + 1);

            const formattedTotal = total - Math.floor(total) > 0 ? total.toFixed(2) : total;
            setTotalNumber(Number(formattedTotal));

            if (floorNumber < total && total < ceilNumber) {
                setCorrect(true);
                onResult(true);

                const operationUsed = operation != "";
                const numbersUsed = digitsUsed - (operationUsed ? 1 : 0);

                const roundScore = (4 - numbersUsed) * (operationUsed ? 2 : 1);

                onSetAddtlScore(roundScore);
            } else {
                setCorrect(false);
                onResult(false);

                onSetAddtlScore(0);
            }
        }
    }, [gameState])

    React.useEffect(() => {
        if (!toClear)
            return;

        chosenDigitQueue.forEach(digit => {
            onReturnDigit(digit);
        });

        setChosenDigitQueue([]);
        onClearFinished();
    }, [toClear]);

    React.useEffect(() => {
        GenerateFloorAndCeil()
    }, []);

    return (
        <div className="m-1.5 grid grid-cols-3 gap-1.5 rounded bg-gray-300 p-3">
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
            <TextContainer 
                color={gameState == 0 ? "gray-400" : correct ? "emerald-400" : "rose-400"}
                shadowColor={gameState == 0 ? "gray-500" : correct ? "emerald-500" : "rose-500"}
            >{totalNumber}</TextContainer>
            <TextContainer justify="between">
                <div>&lt;</div>
                <div>{ceilNumber}</div>
            </TextContainer>
        </div>
    )
}

export default Calculator;