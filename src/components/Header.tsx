import React from "react";
import TextContainer from "./TextContainer";

interface HeaderProps {
    gameState: number;
    correct: boolean;
    addtlScore: number;
}

const Header: React.FC<HeaderProps> = (props) => {
    const { gameState, correct, addtlScore } = props;

    const correctTooltip = "Since you got the answer correct, your additional score is calculated based on the score calculation";
    const wrongTooltip = "Since your answer is not in the range, you got 0 points. Better luck next time";

    const [score, setScore] = React.useState<number>(0);
    const [addtlScoreTooltip, setAddtlScoreTooltip] = React.useState<string>(wrongTooltip);

    React.useEffect(() => {
        if (correct)
            setAddtlScoreTooltip(correctTooltip);
        else
            setAddtlScoreTooltip(wrongTooltip);
    }, [correct]);

    React.useEffect(() => {
        if (gameState == 0) {
            if (correct)
                setScore(score + addtlScore);
            else {
                setScore(0);
            }
        } else if (gameState == 1) {

        }
    }, [gameState]);

    return (
        <div className="justify-end items-center m-1.5 flex gap-1.5 rounded bg-gray-300 p-3">
            {
                gameState == 1 ? (
                    <TextContainer color='emerald-400' shadowColor='emerald-500' title={addtlScoreTooltip}>+{addtlScore}</TextContainer>
                ) : (
                    <></>
                )
            }
            
            <TextContainer title="This is the total score.">Score: {score}</TextContainer>
        </div>
    )
}

export default Header;