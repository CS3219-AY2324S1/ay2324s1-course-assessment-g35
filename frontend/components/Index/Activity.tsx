import { Pie, PieChart } from "recharts";

interface ActivtyProps {
  username: String | undefined;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

export default function Activity({ username, easyCount, mediumCount, hardCount }: ActivtyProps) {

  const activityData = [
    {
      name: "Easy",
      value: easyCount,
      fill: "#BEE460",
    },
    {
      name: "Medium",
      value: mediumCount,
      fill: "#88D9E6",
    },
    {
      name: "Hard",
      value: hardCount,
      fill: "#6C6EA0",
    },
  ];

  return (
    <>
      <h2 className="font-poppins text-white text-2xl font-bold overflow-hidden">
        Your progress
      </h2>
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-col bg-pp-green w-[500px] rounded-[20px] items-center">
          <p className="font-poppins text-2xl font-bold text-white">
            {easyCount}
          </p>
          <p className="font-poppins text-lg text-white">Easy</p>
        </div>
        <div className="flex flex-col bg-pp-blue w-[500px] rounded-[20px] items-center">
          <p className="font-poppins text-2xl font-bold text-white">
            {mediumCount}
          </p>
          <p className="font-poppins text-lg text-white">Medium</p>
        </div>
        <div className="flex flex-col bg-pp-lightpurple w-[500px] rounded-[20px] items-center">
          <p className="font-poppins text-2xl font-bold text-white">
            {hardCount}
          </p>
          <p className="font-poppins text-lg text-white">Hard</p>
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <PieChart width={200} height={200}>
          <Pie
            cx="50%"
            cy="50%"
            innerRadius={50}
            data={activityData}
            dataKey="value"
            nameKey="name"
            fill="#FFFFFF"
            isAnimationActive={false}
          />
        </PieChart>
      </div>
    </>
  );
}
