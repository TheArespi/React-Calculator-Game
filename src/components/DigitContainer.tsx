interface DigitContainerProps {
    digit?: string;
}

const DigitContainer: React.FC<DigitContainerProps> = (props) => {
    const { digit } = props;

    return (
        <div className="aspect-square rounded-sm bg-gray-200">
            <div className="h-9 w-10 rounded-sm bg-white text-black text-2xl font-bold">{digit}</div>
        </div>
    );
}

export default DigitContainer;