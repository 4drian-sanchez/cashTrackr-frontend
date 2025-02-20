export default function ErrorMessage({children} : {children : React.ReactNode}) {
  return (
    <p className="bg-red-200 text-red-700 font-bold rounded-lg py-4 text-center my-3">
        {children}
    </p>
  );
};