import { AiFillQuestionCircle } from "react-icons/ai";

const Questions: React.FC = () => {
  return (
    <div className="rounded-[30px] bg-pp-gray px-9 py-8">
      <div className=" grid-colsgrid-2">
        <div>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <span className="tracking-wide text-2xl font-bold mb-4 text-white">
              Questions you've completed
            </span>
          </div>
          <ul className="list-inside space-y-2">
            <div className="flex justify-between">
              <div className="text-white font-bold">
                Largest Sum Of Averages
              </div>
              <div className="text-white">12 September 2023</div>
            </div>
            <div className="flex justify-between">
              <div className="text-white font-bold">
                Maximum Profit As Salesman
              </div>
              <div className="text-white">12 September 2023</div>
            </div>
            <div className="flex justify-between">
              <div className="text-white font-bold">
                Construct Longest New String
              </div>
              <div className="text-white">12 September 2023</div>
            </div>
            <div className="flex justify-between">
              <div className="text-white font-bold">Sum Of Subarray Ranges</div>
              <div className="text-white">12 September 2023</div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Questions;
