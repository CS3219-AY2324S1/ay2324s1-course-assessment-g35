import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
type History = {
  roomid: string;
  user1: string;
  user2: string;
  time: string; // It's a string in the provided JSON, but consider using a Date if that's the actual type
  code: string;
  questionid: number; // Assuming it's a number, adjust the type if it's different
};

// TODO: get questions from the service rather than hardcoding
const Questions: React.FC = () => {
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`http://35.227.201.105?userId=c69376b0-a16e-474e-8665-aca86e19e143`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHistoryLoading(false);
        setHistoryData(data);
      });
  }, []);
  return (
    // TODO: when styling, add font-poppins to the texts
    
    <div className="rounded-[30px] bg-pp-gray px-9 py-8">
      <div className=" grid-colsgrid-2">
        <div>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <span className="tracking-wide text-2xl font-bold mb-4 text-white">
              Questions you've completed
            </span>
          </div>
          <ul className="list-inside space-y-2">
            {historyData ? (
              historyData.map((data) => {
                return <HistoryItem question={data} />;
              })
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const HistoryItem = (question: History) => {
  console.log(question.question);
  return (
    <>
      <div className="flex justify-between">
        <div className="text-white font-bold">
          {question.question.questionid}
        </div>
        <div className="text-white">12 September 2023</div>
      </div>
    </>
  );
};
export default Questions;
