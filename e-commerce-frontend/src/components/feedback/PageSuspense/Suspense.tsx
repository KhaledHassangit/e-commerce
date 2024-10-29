import { Suspense } from "react";

import LottieHandler from "../../common/Lottie/LottierHandler";

const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense  
      fallback={
        <LottieHandler type="loading" className="mt-12" />
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;