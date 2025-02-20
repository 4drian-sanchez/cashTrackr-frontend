export default function SuccessMessage({children} : {children : React.ReactNode}) {
    return (
      <p className="bg-amber-200 text-amber-700 font-bold rounded-lg py-4 text-center my-3">
          {children}
      </p>
    );
  };