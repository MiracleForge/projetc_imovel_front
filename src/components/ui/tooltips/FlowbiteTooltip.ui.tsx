//WARN: IF IN PRODUCTION VERCEL SAYS HYDRATATION ERROR SHOWING TOOLTIP OR THIS COMPONENTS, APPLY USE CLIENT AT TOP OF THIS FIle
//use client
//
import { ReactNode } from "react";

interface toolTipProps {
  tooltipId: string;
  children: ReactNode
}

export default function FlowbitToolTip({ tooltipId, children }: toolTipProps) {
  return (
    <div
      id={tooltipId}
      role="tooltip"
      className="absolute  invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900/40 rounded shadow opacity-0 tooltip duration-500 transition-opacity z-9999" >
      {children}
      < div className="tooltip-arrow" data-popper-arrow > </div>
    </div >
  );
}



