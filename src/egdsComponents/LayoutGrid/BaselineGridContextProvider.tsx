import * as React from "react";
import {
  useLayoutContext,
  SizeClass
} from "../../sharedUIProviders/LayoutContext";

export interface BaselineGridContextValue {
  numCols: number;
  debug?: boolean;
  setDebug?: (debug: boolean) => void;
}

const numColsFromSizeClass = (sizeClass?: SizeClass) => {
  switch (sizeClass) {
    case SizeClass.EXTRA_LARGE: {
      return 12;
    }
    case SizeClass.LARGE: {
      return 12;
    }
    case SizeClass.MEDIUM: {
      return 8;
    }
    case SizeClass.SMALL: {
      return 4;
    }
    case SizeClass.EXTRA_SMALL: {
      return 4;
    }
    default: {
      return 4;
    }
  }
};

export const sizeClassFromNumCols = (numCols: number): SizeClass => {
  if (numCols <= 3) {
    return SizeClass.EXTRA_SMALL;
  } else if (numCols <= 6) {
    return SizeClass.SMALL;
  } else if (numCols <= 9) {
    return SizeClass.MEDIUM;
  } else if (numCols <= 12) {
    return SizeClass.LARGE;
  } else {
    return SizeClass.EXTRA_LARGE;
  }
};

export const BaselineGridContext = React.createContext<
  BaselineGridContextValue
>({
  numCols: numColsFromSizeClass(SizeClass.SMALL)
});

interface BaselineGridContextProviderProps {
  baselineColumns?: number;
  debug?: boolean;
}

export const useBaselineGridContext = (): BaselineGridContextValue =>
  React.useContext(BaselineGridContext);

export const BaselineGridContextProvider: React.FC<BaselineGridContextProviderProps> = (
  props
) => {
  const { sizeClass } = useLayoutContext();
  const {
    debug: inheritedDebug,
    setDebug: inheritedSetDebug
  } = useBaselineGridContext();
  const { baselineColumns: baselineColumnsProp, debug: debugProp } = props;

  const [baselineColumns, setBaselineColumns] = React.useState(
    baselineColumnsProp !== undefined
      ? baselineColumnsProp
      : numColsFromSizeClass(SizeClass.SMALL)
  );

  const [debug, setDebug] = React.useState(debugProp || inheritedDebug);

  const _setDebug = (debug: boolean) => {
    setDebug(debug);
    if (inheritedSetDebug) {
      inheritedSetDebug(debug);
    }
  };

  React.useEffect(() => {
    if (typeof inheritedDebug === "boolean") {
      setDebug(inheritedDebug);
    }
  }, [inheritedDebug]);

  React.useEffect(() => {
    const cols =
      baselineColumnsProp !== undefined
        ? baselineColumnsProp
        : numColsFromSizeClass(sizeClass);
    setBaselineColumns(cols);
  }, [sizeClass, baselineColumnsProp]);

  return (
    <BaselineGridContext.Provider
      value={{ numCols: baselineColumns, debug: debug, setDebug: _setDebug }}
    >
      {props.children}
    </BaselineGridContext.Provider>
  );
};
