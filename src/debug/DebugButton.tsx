import * as React from "react";
import { useBaselineGridContext } from "../egdsComponents/LayoutGrid";

export const DebugButton: React.FC<{}> = () => {
  const { debug, setDebug } = useBaselineGridContext();

  const setDebugHandler = () => {
    if (setDebug) {
      setDebug(!debug);
    }
  };

  const buttonText = React.useMemo(() => {
    return debug ? "hide layout info" : "show layout info";
  }, [debug]);

  return (
    <button id="debugButton" onClick={setDebugHandler}>
      {buttonText}
    </button>
  );
};
