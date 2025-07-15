import type { ReactNode } from "react";
import React from "react";

interface TextContainerProps {
    children?: ReactNode;
    justify?: string;
    color?: string;
    shadowColor?: string;
}

const TextContainer: React.FC<TextContainerProps> = (props) => {
    const { children, justify="end", color="gray-400", shadowColor="gray-500" } = props;

    const finalJustify = React.useMemo(() => `justify-${justify}`, [justify]);
    const finalColor = React.useMemo(() => `bg-${color}`, [color]);
    const finalShadowColor = React.useMemo(() => `bg-${shadowColor}`, [shadowColor]);

    return (
        <div className={`mb-1.5 h-10 rounded-sm ${finalShadowColor}`}>
          <div className={`flex h-9 ${finalJustify} rounded-sm ${finalColor} p-1.5 text-right font-mono text-2xl font-bold`}>{children}</div>
        </div>
    )
}

export default TextContainer;