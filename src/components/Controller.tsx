import React from "react";
import DigitButton from "./DigitButton";
import TextContainer from "./TextContainer";
import { GenerateRandomDigit, IsDigitValid, IsOperationValid } from "../utils/GenerateHelpers";

interface ControllerProps {
    gameState: number;
    correct: boolean;
    returnQueue: string[];
    operation: string;
    onDigitChosen: (digit: string) => void;
    onEquals: () => void;
    onClear: () => void;
    onContinue: () => void;
    onReturnsConsumed: () => void;
}

const Controller: React.FC<ControllerProps> = (props) => {
    const { gameState, correct, returnQueue, operation, onDigitChosen, onEquals, onClear, onContinue, onReturnsConsumed } = props;
    
    const [swaps, setSwaps] = React.useState<number>(5);
    const [digitChoices, setDigitChoices] = React.useState<string[]>([]);

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

    const OnDigitChosen = (digit: string) => {
        if (gameState == 1)
            return;

        if (IsOperationValid(digit)) {
            if (operation != "") {
                setDigitChoices(prev => [...prev, operation]);
            }
        }

        onDigitChosen(digit);
    }

    const OnContinue = () => {
        if (!correct) {
            setSwaps(5);
        }

        onContinue();
    }

    React.useEffect(() => {
        if (!returnQueue.length) return;

        returnQueue.forEach(digit => {
            setDigitChoices(prev => [...prev, digit]);
        });

        onReturnsConsumed();
    }, [returnQueue])

    React.useEffect(() => {
        setDigitChoices([]);
        for(let i = 0; i < 6; i++) {
            const digit = GenerateRandomDigit();
            setDigitChoices(prev => [...prev, digit]);
        }
    }, []);

    return (
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
                        onPressButton={onEquals}
                    />
                    <DigitButton 
                        digit="CLEAR" 
                        width={30} 
                        color="bg-blue-500" 
                        shadowColor="bg-blue-700" 
                        textColor="text-white" 
                        textHighlight="text-blue-200" 
                        onPressButton={onClear}
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
    )
}

export default Controller;