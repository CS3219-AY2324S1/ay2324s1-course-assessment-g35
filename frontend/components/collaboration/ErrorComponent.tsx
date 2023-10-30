const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <>
      <p className="text-red-500">{message}</p>
    </>
  );
};

export default ErrorComponent;
