import { useEffect, useState } from "react";

interface TagProps {
  category: string;
}

export default function CategoryRow({ category }: TagProps) {
  const categoryColors: Record<string, { text: string, background: string }> = {
    // TODO: colors to be edited later!
    "Algorithms": { text: 'text-pp-accentblue', background: 'bg-pp-blue' },
    "Databases": { text: 'text-pp-accentblue', background: 'bg-pp-blue' },
    "Brainteaser": { text: 'text-pp-accentblue', background: 'bg-pp-blue' },

    "Strings": { text: 'text-pp-accentgreen', background: 'bg-pp-green' },
    "Data Structures": { text: 'text-pp-darkpurple', background: 'bg-pp-lightpurple' },
    "Recursion": { text: 'text-pp-accentgreen', background: 'bg-pp-green' },
    "Arrays": { text: 'text-pp-accentred', background: 'bg-pp-red' },
    "Bit Manipulation" : { text: 'text-pp-darkpurple', background: 'bg-pp-lightpurple'},
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

  const className = `text-poppins text-base tracking-tight font-bold h-2/12 rounded-[30px] py-2 px-4 text-center ${textColor} ${backgroundColor}`
  return (
    <div className={className}>
      {category}
    </div>
  );
}
