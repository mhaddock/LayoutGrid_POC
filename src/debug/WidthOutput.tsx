import * as React from "react";
import {
  SizeClass,
  useLayoutContext
} from "../sharedUIProviders/LayoutContext";
import { useBaselineGridContext } from "../egdsComponents/LayoutGrid";

export const WidthOutput: React.FC<{
  showSizeClass?: boolean;
  cols?: number;
  showPreciseMeasurement?: boolean;
  showSelfMeasurement?: boolean;
  inheritsLayoutContext?: boolean;
  useRootLayoutContext?: boolean;
  message?: string;
}> = (props) => {
  const {
    showSizeClass,
    cols,
    showPreciseMeasurement,
    showSelfMeasurement,
    inheritsLayoutContext,
    useRootLayoutContext,
    message
  } = props;
  const colRef = React.useRef() as React.MutableRefObject<any>;
  const initedRef = React.useRef(false);
  const [selfMeasuredWidth, setSelfMeasuredWidth] = React.useState(0);
  const {
    sizeClass,
    initedBy,
    widthInPx: layoutContextWidth,
    rootSizeClass
  } = useLayoutContext();
  const { debug } = useBaselineGridContext();

  const _initedBy = React.useMemo(() => {
    if (useRootLayoutContext) {
      return "root";
    } else if (inheritsLayoutContext) {
      return "inherited";
    }
    return initedBy;
  }, [useRootLayoutContext, inheritsLayoutContext, initedBy]);

  const _sizeClass = React.useMemo(() => {
    if (useRootLayoutContext) {
      return rootSizeClass;
    }
    return sizeClass;
  }, [useRootLayoutContext, rootSizeClass, sizeClass]);

  const handler = () => {
    if (showPreciseMeasurement && showSelfMeasurement) {
      setSelfMeasuredWidth(
        colRef.current && (colRef.current.offsetWidth as number)
      );
    }
  };

  React.useEffect(() => {
    if (!initedRef.current && showSelfMeasurement && showPreciseMeasurement) {
      window.addEventListener("resize", handler);

      return () => {
        window.removeEventListener("resize", handler);
      };
    }
    handler();
  });

  if (!debug) {
    return null;
  }

  const Output: React.FC<{
    _sizeClass?: SizeClass;
    widthInPx?: number;
    _cols?: number;
  }> = (props) => (
    <span>
      {message && `${message}: `}
      {showSizeClass && props._sizeClass}
      {_initedBy && showSizeClass && ` ${_initedBy}`}
      {(showPreciseMeasurement || cols) && " ("}
      {cols && `${cols} cols`}
      {showPreciseMeasurement && cols && ", "}
      {showPreciseMeasurement && `${props.widthInPx}px`}
      {(showPreciseMeasurement || cols) && ")"}
    </span>
  );

  const widthDisplayValue = showSelfMeasurement
    ? selfMeasuredWidth
    : layoutContextWidth;

  return (
    <p className="widthOutput" ref={colRef}>
      <Output _sizeClass={_sizeClass} widthInPx={widthDisplayValue} />
    </p>
  );
};
