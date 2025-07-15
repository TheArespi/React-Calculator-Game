import type { ReactNode } from "react";

interface TextContainerProps {
    children?: ReactNode;
    justify?: string;
}

const TextContainer: React.FC<TextContainerProps> = (props) => {
    const { children, justify="end" } = props;

    const finalJustify = `justify-${justify}`;

    return (
        <div className="mb-1.5 h-10 rounded-sm bg-gray-500">
          <div className={`flex h-9 ${finalJustify} rounded-sm bg-gray-400 p-1.5 text-right font-mono text-2xl font-bold`}>{children}</div>
        </div>
    )
}

export default TextContainer;