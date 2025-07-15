import TextContainer from "./TextContainer";

interface HeaderProps {
    gameState: number;
    addtlScore: number;
    score: number;
}

const Header: React.FC<HeaderProps> = (props) => {
    const { gameState, addtlScore, score } = props;
    
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