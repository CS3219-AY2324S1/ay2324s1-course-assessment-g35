import { useEffect, useState } from "react";
import QuestionRow from "./Questions/QuestionRow";
import { HISTORY_URI } from "@/constants/uri";

export type History = {
  roomid: string;
  user1: string;
  user2: string;
  time: string; // It's a string in the provided JSON, but consider using a Date if that's the actual type
  code: string;
  questionid: number; // Assuming it's a number, adjust the type if it's different
};

// TODO: get questions from the service rather than hardcoding
const Questions: React.FC<{ userName: string | undefined }> = ({ userName }) => {
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userName) return;
    fetch(`${HISTORY_URI.GET_BY_USERNAME}?userName=${userName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHistoryLoading(false);
        setHistoryData(data);
      });
  }, [userName]);

  return (
    <>
      <div className="flex flex-col bg-pp-gray rounded-[20px] p-8 overflow-hidden">
        <h2 className="font-poppins text-white text-2xl font-bold overflow-hidden">
          Questions you've completed
        </h2>
        <div className="flex flex-col gap-y-4 overflow-auto mt-6">
          {/* TODO: later, link the questions to the QuestionRow */}
          {historyLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pp-blue"></div>
            </div>
          ) : (
            historyData.length === 0 ? (
              <div className="flex justify-center items-center">
                <p className="text-white text-lg">No questions found. Start doing today!</p>
              </div>
            ) : (
              historyData.map((history) => {
                return <QuestionRow key={history.roomid} history={history} />;
              })
            )
          )}
          
          {/* TODO: to remove later when the history set up, just map to create QuestionRow components */}
          {/* <QuestionRow
            title={"Reverse a String"}
            description={"Write a function that reverses a string. The input string is given as an array\nof characters s.\nYou must do this by modifying the input array in-place with O(1) extra\nmemory.\nExample 1:\nInput: s = [\"h\",\"e\",\"l\",\"l\",\"o\"]\nOutput: [\"o\",\"l\",\"l\",\"e\",\"h\"]\nExample 2:\nInput: s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]\nOutput: [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]\nConstraints:\n* 1 <= s.length <= 105\n* s[i] is a printable ascii character."}
            difficulty={"Easy"}
            category={["Bit Manipulation"]}
            date={"3/11/2023"}
          />
          <QuestionRow
            title={"Super long question title to test overflow"}
            description={"Lorem ipsum"}
            difficulty={"Hard"}
            category={["Algorithms", "Data Structures"]}
            date={"2/11/2023"}
          />
          <QuestionRow
            title={"Question title"}
            description={"Lorem ipsum"}
            difficulty={"Hard"}
            category={["Strings", "Databases"]}
            date={"2/11/2023"}
          />
          <QuestionRow
            title={"Question title"}
            description={"Lorem ipsum"}
            difficulty={"Hard"}
            category={["Databases", "Recursion", "Arrays"]}
            date={"2/11/2023"}
          />
          <QuestionRow
            title={"Question title"}
            description={"Lorem ipsum"}
            difficulty={"Hard"}
            category={["Bit Manipulation"]}
            date={"2/11/2023"}
          />
          <QuestionRow
            title={"Question title"}
            description={"Lorem ipsum"}
            difficulty={"Hard"}
            category={["Recursion"]}
            date={"2/11/2023"}
          />
          <QuestionRow
            title={"Question title"}
            description={"Lorem ipsum"}
            difficulty={"Hard"}
            category={["Arrays"]}
            date={"2/11/2023"}
          /> */}
        </div>
      </div>

      {/* <div className="rounded-[30px] bg-pp-gray px-9 py-8">
      <div className="grid-colsgrid-2">
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
    </div> */}
    </>
  );
};

export default Questions;
