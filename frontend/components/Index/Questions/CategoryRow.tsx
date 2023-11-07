import { useEffect, useState } from "react";

interface TagProps {
  category: string;
}

export default function CategoryRow({ category }: TagProps) {
  const categoryColors: Record<string, { text: string, background: string }> = {
    "Algorithms": { text: 'text-pp-accentblue', background: 'bg-pp-blue' },
    "Databases": { text: 'text-pp-accentblue', background: 'bg-pp-blue' },
    "Brainteaser": { text: 'text-pp-accentblue', background: 'bg-pp-blue' },

    "Data Structures": { text: 'text-pp-lightpurple', background: 'bg-pp-accentlightpurple' },
    "Recursion": { text: 'text-white', background: 'bg-pp-accentwhite'},
    "Arrays": { text: 'text-pp-black', background: 'bg-pp-accentblack' },
    "Bit Manipulation" : { text: 'text-pp-accentpink', background: 'bg-pp-pink' },
  };

  const [textColor, setTextColor] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  useEffect(() => {
    if (categoryColors[category]) {
      const { text, background } = categoryColors[category];
      setTextColor(text);
      setBackgroundColor(background);
    }
  }, [category]);

  const className = `font-poppins text-base tracking-tight h-2/12 rounded-[30px] py-2 px-4 text-center ${textColor} ${backgroundColor}`
  return (
    <div className={className}>
      {category}
    </div>
  );
}
