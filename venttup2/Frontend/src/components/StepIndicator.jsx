import { CircleCheckBig } from "lucide-react";
import orderStatuses from "../config/orderStatusConfig";

const StepIndicator = ({ 
  order,
  currentStep,
  setFocusStep 
}) => {
  const stages = order ? orderStatuses[order.orderType] || [] : [];
  
  return (
    <div className="w-full h-16 flex justify-center items-center bg-white rounded-md shadow-md">
      {stages.map((step, index) => (
        <div 
          key={index} 
          className="flex items-center group" 
          onClick={()=>setFocusStep(index)}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
              currentStep > index
                ? "bg-green-600 border-green-600 text-white"
                : currentStep === index
                ? "border-green-600 text-green-600"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {currentStep > index ? (
              <span><CircleCheckBig /></span>
            ) : (
              <span>{index+1}</span>
            )}
          </div>

          <div
            className={`ml-2 overflow-hidden transition-all duration-300 max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 ${
              currentStep >= index ? "text-green-600 font-medium" : "text-gray-500"
            } ${currentStep===index ? "max-w-xs text-green-600 opacity-100 ":""}`}
          >
            {step}
          </div>

          {index < stages.length - 1 && <Arrow active={currentStep > index} />}
        </div>
      ))}
    </div>
  );
};

const Arrow = ({ active }) => {
  return (
    <div className="w-10 h-10 flex items-center justify-center -translate-x-4 transition-all duration-300">
      <div
        className={`w-full h-full border-t-2 border-r-2 transform rotate-45 ${
          active ? "border-green-600" : "border-gray-300"
        }`}
      ></div>
    </div>
  );
};

export default StepIndicator;