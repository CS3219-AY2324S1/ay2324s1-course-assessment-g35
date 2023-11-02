import { Spinner } from "@chakra-ui/react";

interface ResultSectionProps {
  results: string;
  isLoading: boolean;
  errorMsg: string;
  stderr: string;
}

const OutputShow = ({ output }: { output: string }) => {
  return <>{output}</>;
};

export default function CodeResults({
  results,
  isLoading,
  errorMsg,
  stderr,
}: ResultSectionProps) {
  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Results</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Output</h3>
          {errorMsg != "" ? (
            <>
              <ErrorComponent message={errorMsg} />
              <ErrorComponent message={stderr} />
            </>
          ) : (
            <p className="text-gray-600">{results}</p>
          )}
        </div>
      )}
    </div>
  );
}

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <>
      <p className="text-red-500">{message}</p>
    </>
  );
};
