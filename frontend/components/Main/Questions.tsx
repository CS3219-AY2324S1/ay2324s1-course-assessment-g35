import { AiFillQuestionCircle } from "react-icons/ai";

const Questions: React.FC = () => {
  return (
    <div className="bg-white p-3 shadow-sm rounded">
      <div className=" grid-colsgrid-2">
        <div>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <span className="text-black-500 text-2xl">
              <AiFillQuestionCircle style={{ fontSize: "2rem" }} />
            </span>
            <span className="tracking-wide text-2xl font-bold mb-4">
              Past Questions
            </span>
          </div>
          <ul className="list-inside space-y-2">
            <li>
              <div className="text-teal-600">Largest Sum Of Averages</div>
              <div className="text-gray-500 text-xs">12 September 2023</div>
            </li>
            <li>
              <div className="text-teal-600">Maximum Profit As Salesman</div>
              <div className="text-gray-500 text-xs">12 September 2023</div>
            </li>
            <li>
              <div className="text-teal-600">Construct Longest New String</div>
              <div className="text-gray-500 text-xs">12 September 2023</div>
            </li>
            <li>
              <div className="text-teal-600">Sum Of Subarray Ranges</div>
              <div className="text-gray-500 text-xs">12 September 2023</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Questions;
