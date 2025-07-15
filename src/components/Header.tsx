import React from "react";
import TextContainer from "./TextContainer";

interface HeaderProps {
    gameState: number;
    correct: boolean;
    addtlScore: number;
}

const Header: React.FC<HeaderProps> = (props) => {
    const { gameState, correct, addtlScore } = props;

    const [score, setScore] = React.useState<number>(0);

    React.useEffect(() => {
        if (gameState == 0) {
            if (correct)
                setScore(score + addtlScore);
            else {
                setScore(0);
            }
        } else if (gameState == 1) {

        }
    }, [gameState])
    return (
        <div className="justify-end items-center m-1.5 flex gap-1.5 rounded bg-gray-300 p-3">
            {
                gameState == 1 ? (
                <TextContainer color='emerald-400' shadowColor='emerald-500'>+{addtlScore}</TextContainer>
                ) : (
                <></>
                )
            }
            
            <TextContainer >Score: {score}</TextContainer>
        </div>
    )
}

export default Header;