import React from "react";

export default function useUpdateEffect(effect: () => void, deps: any[]) {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      effect();
    } else {
      isMounted.current = true;
    }
  }, [...deps]);
}
