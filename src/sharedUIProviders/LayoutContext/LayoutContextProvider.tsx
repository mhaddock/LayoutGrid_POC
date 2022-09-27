import * as React from "react";

export enum SizeClass {
  EXTRA_SMALL = "EXTRA_SMALL",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  EXTRA_LARGE = "EXTRA_LARGE"
}

export type SizeClassWidthRange = [number, number]; // min, max
export type SizeClassRanges = Record<SizeClass, SizeClassWidthRange>;

export const SIZE_CLASS_RANGES: SizeClassRanges = {
  EXTRA_SMALL: [1, 300],
  SMALL: [301, 600],
  MEDIUM: [601, 900],
  LARGE: [901, 1200],
  EXTRA_LARGE: [1201, Infinity]
};

export const sizeClassFromWidth = (width: number): SizeClass => {
  if (!width) {
    return SizeClass.SMALL;
  }
  if (width <= SIZE_CLASS_RANGES.EXTRA_SMALL[1]) {
    return SizeClass.EXTRA_SMALL;
  } else if (width <= SIZE_CLASS_RANGES.SMALL[1]) {
    return SizeClass.SMALL;
  } else if (width <= SIZE_CLASS_RANGES.MEDIUM[1]) {
    return SizeClass.MEDIUM;
  } else if (width <= SIZE_CLASS_RANGES.LARGE[1]) {
    return SizeClass.LARGE;
  }

  return SizeClass.EXTRA_LARGE;
};

enum InitedBy {
  INHERITED = "inherited",
  MEASURED = "measured",
  DECLARED = "declared",
  UNKNOWN = "unknown"
}

interface LayoutContextValue {
  sizeClass?: SizeClass;
  initedBy?: InitedBy; //for debugging
  widthInPx?: number; //should be private?
  isInGrid?: boolean;
  rootSizeClass?: SizeClass; //for debugging
}

export const LayoutContext = React.createContext<LayoutContextValue>({});

interface LayoutContextProviderProps {
  sizeClass?: SizeClass;
  widthRef?: React.MutableRefObject<any>;
  isInGrid?: boolean;
}

export const LayoutContextProvider: React.FC<LayoutContextProviderProps> = (
  props
) => {
  const {
    children,
    sizeClass: sizeClassProp,
    widthRef,
    isInGrid: isInGridProp
  } = props;
  const inheritedLayoutContext = React.useContext(LayoutContext);
  const {
    sizeClass: inheritedSizeClass,
    isInGrid: inheritedIsInGrid,
    rootSizeClass
  } = inheritedLayoutContext;

  const [sizeClassState, setSizeClassState] = React.useState(
    sizeClassProp || inheritedSizeClass || SizeClass.SMALL
  );
  const isInGrid = React.useMemo(() => {
    return isInGridProp
      ? isInGridProp
      : inheritedIsInGrid
      ? inheritedIsInGrid
      : false;
  }, [isInGridProp, inheritedIsInGrid]);

  const [widthInPx, setWidthInPx] = React.useState(0);

  const initedRef = React.useRef(false);
  const initedBy = sizeClassProp
    ? InitedBy.DECLARED
    : widthRef && widthRef.current
    ? InitedBy.MEASURED
    : InitedBy.UNKNOWN;

  React.useLayoutEffect(() => {
    if (widthInPx > 0) {
      setSizeClassState(sizeClassFromWidth(widthInPx));
      // console.log(widthInPx);
      // console.log(sizeClassFromWidth(widthInPx));

      setSizeClassState(sizeClassFromWidth(widthInPx));
    }
  }, [widthInPx]);

  React.useLayoutEffect(() => {
    if (sizeClassProp) {
      setSizeClassState(sizeClassProp);
    } else if (inheritedSizeClass) {
      setSizeClassState(inheritedSizeClass);
    }

    const handler = () => {
      if (!sizeClassProp && widthRef && widthRef.current) {
        setWidthInPx(widthRef.current.offsetWidth as number);
      }
    };

    if (!sizeClassProp && widthRef) {
      window.addEventListener("resize", handler);

      return () => {
        window.removeEventListener("resize", handler);
      };
    } else if (!inheritedSizeClass) {
      window.addEventListener("resize", handler);

      return () => {
        window.removeEventListener("resize", handler);
      };
    }

    if (initedRef.current === false) {
      initedRef.current = true;
      handler();
    }
  }, [inheritedSizeClass, sizeClassProp, widthRef]);

  return (
    <LayoutContext.Provider
      value={{
        sizeClass: sizeClassState,
        initedBy: initedBy,
        widthInPx: widthInPx,
        isInGrid: isInGrid,
        rootSizeClass: rootSizeClass ? rootSizeClass : sizeClassState
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextValue =>
  React.useContext(LayoutContext);
