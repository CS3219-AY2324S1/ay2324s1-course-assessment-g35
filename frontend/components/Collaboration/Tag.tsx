import { useEffect, useState } from "react";

interface TagProps {
  title: String;
}

export default function Tag({ title }: TagProps) {
  const textColors = ['text-pp-red', 'text-pp-accentgreen', 'text-pp-darkpurple']
  const backgroundColors = ['bg-pp-accentred', 'bg-pp-green', 'bg-pp-lightpurple']
  
  const [textColor, setTextColor] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * textColors.length)
    const textColor = textColors[randomIndex]
    const backgroundColor = backgroundColors[randomIndex]
    setTextColor(textColor)
    setBackgroundColor(backgroundColor)
  }, []);

  const className = `text-xs font-bold h-2/12 rounded-[30px] py-2 px-4 text-center ${textColor} ${backgroundColor}`
  return (
    <div className={className}>
        {title}
    </div>
  );
}
