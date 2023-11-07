import { Pie, PieChart } from "recharts";
import { History } from "./Questions";
import { HISTORY_URI } from "@/constants/uri";
import { QUESTION_URI } from "@/constants/uri";
import { useEffect, useState } from "react";
import axios from "axios";

interface ActivtyProps {
  username: String | undefined;
}

export default function Activity({ username }: ActivtyProps) {
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [easyCount, setEasyCount] = useState<number>(0);
  const [mediumCount, setMediumCount] = useState<number>(0);
  const [hardCount, setHardCount] = useState<number>(0);

  // TODO: wait for history fix to implement the question completed count
  // useEffect(() => {
  //   const getActivityLevels = () => {
  //     historyData.map((history) => {
  //       axios
  //         .get(`${QUESTION_URI.GET_BY_ID}/${history.questionid}`)
  //         .then((res) => {
  //           const currentDifficulty = res.data.difficulty;
  //           console.log(currentDifficulty);
  //           if (currentDifficulty == "Easy") {
  //             setEasyCount((easyCount) => easyCount + 1);
  //           } else if (currentDifficulty == "Medium") {
  //             setMediumCount((mediumCount) => mediumCount + 1);
  //           } else if (currentDifficulty == "Hard") {
  //             setHardCount((hardCount) => hardCount + 1);
  //           }
  //         });
  //     });
  //   };
  //   if (!username) {
  //     return;
  //   } else {
  //     fetch(`${HISTORY_URI.GET_BY_USERNAME}?.username=${username}`).then(
  //       (res) =>
  //         res.json().then((data) => {
  //           setHistoryData(data);
  //         })
  //     );
  //     return getActivityLevels();
  //   }
  // }, [username]);

  // TODO: when linked with history, change the values to be {easyCount} etc
  const activityData = [
    {
      name: "Easy",
      value: 10,
      fill: "#BEE460",
    },
    {
      name: "Medium",
      value: 20,
      fill: "#88D9E6",
    },
    {
      name: "Hard",
      value: 50,
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
