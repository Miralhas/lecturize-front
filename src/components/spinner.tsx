import { Loader } from "lucide-react";
import { PropsWithChildren } from "react";

const Spinner = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <Loader className="h-4 w-4 animate-spin"/> {children} 
    </div>
  )
}

export default Spinner;

