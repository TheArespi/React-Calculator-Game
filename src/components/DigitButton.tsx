import React from "react";

interface DigitButtonProps {
    digit?: string;
    width?: number;
    color?: string;
    shadowColor?: string;
    textColor?: string;
    textHighlight?: string;
    onPressButton?: () => void;
    onRightClick?: () => void;
}

const DigitButton: React.FC<DigitButtonProps> = (props) => {

    const { 
        digit, 
        width=10,
        color="bg-white", 
        shadowColor="bg-gray-200", 
        textColor="text-black",
        textHighlight="text-black",
        onPressButton,
        onRightClick,
    } = props;

    const [finalWidth, setFinalWidth] = React.useState<string>(`w-${width}`);

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (onRightClick)
            onRightClick();
    }

    React.useEffect(() => {
        setFinalWidth(`w-${width}`);
    }, [width]);

    return (
        <div 
            className={`aspect-square h-10 ${finalWidth} rounded-sm ${shadowColor} cursor-pointer`}
            onClick={onPressButton}  
            onContextMenu={handleRightClick}
        >
          <div className={`
                h-8 
                ${finalWidth}
                justify-center 
                rounded-sm 
                ${color}
                ${textColor} 
                text-center 
                text-2xl 
                hover:h-full 
                hover:text-3xl 
                hover:${textHighlight}`}
            >{digit}</div>
        </div>
    )
}

export default DigitButton;