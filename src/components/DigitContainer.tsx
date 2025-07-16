interface DigitContainerProps {
    digit?: string;
    title?: string;
}

const DigitContainer: React.FC<DigitContainerProps> = (props) => {
    const { digit, title } = props;

    return (
        <div className="aspect-square rounded-sm bg-gray-200" title={title}>
            <div className="h-9 w-10 rounded-sm bg-white text-black text-2xl font-bold">{digit}</div>
        </div>
    );
}

export default DigitContainer;