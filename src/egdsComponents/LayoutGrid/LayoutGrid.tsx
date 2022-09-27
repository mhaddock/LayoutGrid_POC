import * as React from "react";
import {
  useBaselineGridContext,
  BaselineGridContextProvider,
  sizeClassFromNumCols
} from "./BaselineGridContextProvider";
import {
  LayoutContextProvider,
  MediaQueryLayoutContextProvider,
  SizeClass,
  useLayoutContext
} from "../../sharedUIProviders/LayoutContext";
import { WidthOutput } from "../../debug";

type Columns = Record<SizeClass, number[]>;

export interface LayoutGridProps {
  columns?: Columns;
  id?: string;
  className?: string;
}

export const MAX_COLUMN_SPANS: Record<SizeClass, number> = {
  EXTRA_LARGE: 12,
  LARGE: 12,
  MEDIUM: 8,
  SMALL: 4,
  EXTRA_SMALL: 4
};

const SINGLE_COLUMN_GRID: Columns = {
  EXTRA_LARGE: [MAX_COLUMN_SPANS.EXTRA_LARGE],
  LARGE: [MAX_COLUMN_SPANS.LARGE],
  MEDIUM: [MAX_COLUMN_SPANS.MEDIUM],
  SMALL: [MAX_COLUMN_SPANS.SMALL],
  EXTRA_SMALL: [MAX_COLUMN_SPANS.EXTRA_SMALL]
};

const sumColSpans = (colSpans: number[]): number => {
  return colSpans.reduce((partialSum, a) => partialSum + a, 0);
};

const numChildrenMatchColSpans = (
  numChildren: number,
  colSpans: number[]
): boolean => {
  const totalColSpans = sumColSpans(colSpans);
  const singleColumn = colSpans.length === 1;
  const atLeastOneColSpanPerChild = totalColSpans >= numChildren;
  const dividesEvenlyIntoMultipeRows = numChildren % colSpans.length === 0;

  return (
    singleColumn || (atLeastOneColSpanPerChild && dividesEvenlyIntoMultipeRows)
  );
};

const isColumnsPropValid = (
  numChildren: number,
  columns?: Columns
): boolean => {
  if (!columns) {
    return false;
  }

  const isSizeClassValid = (
    columns: Columns,
    sizeClass: SizeClass
  ): boolean => {
    return (
      columns[sizeClass] &&
      sumColSpans(columns[sizeClass]) <= MAX_COLUMN_SPANS[sizeClass] &&
      numChildrenMatchColSpans(numChildren, columns[sizeClass])
    );
  };

  if (
    isSizeClassValid(columns, SizeClass.EXTRA_LARGE) &&
    isSizeClassValid(columns, SizeClass.LARGE) &&
    isSizeClassValid(columns, SizeClass.MEDIUM) &&
    isSizeClassValid(columns, SizeClass.SMALL) &&
    isSizeClassValid(columns, SizeClass.EXTRA_SMALL)
  ) {
    return true;
  }
  return false;
};

const getColSpan = (
  gridColSpan: number,
  index: number,
  columns: Columns
): number => {
  const sizeClass = sizeClassFromNumCols(gridColSpan);
  const colSpans = columns[sizeClass];

  const colSpanIndex = colSpans.length === 1 ? 0 : index % colSpans.length;
  return colSpans[colSpanIndex];
};

const LayoutGridItem: React.FC<{
  columns: Columns;
  index: number;
}> = (props) => {
  const { numCols: baselineCols } = useBaselineGridContext();
  const { columns, index, children } = props;

  const initialColSpan = getColSpan(baselineCols, index, columns);

  const [colSpan, setColSpan] = React.useState(initialColSpan);

  const gridItemRef = React.useRef() as React.MutableRefObject<any>;

  React.useEffect(() => {
    const _colSpan = getColSpan(baselineCols, index, columns);
    setColSpan(_colSpan);
  }, [baselineCols, index, columns]);

  return colSpan === 0 ? (
    <MediaQueryLayoutContextProvider>
      <BaselineGridContextProvider baselineColumns={0}>
        {children}
      </BaselineGridContextProvider>
    </MediaQueryLayoutContextProvider>
  ) : (
    <div
      className="layoutGridItem"
      style={{ gridColumn: `span ${colSpan}` }}
      ref={gridItemRef}
    >
      <LayoutContextProvider widthRef={gridItemRef} isInGrid={true}>
        <BaselineGridContextProvider baselineColumns={colSpan}>
          <WidthOutput
            message={"grid item"}
            cols={colSpan}
            showSizeClass={true}
            showPreciseMeasurement={true}
          />
          {children}
        </BaselineGridContextProvider>
      </LayoutContextProvider>
    </div>
  );
};

export const LayoutGrid: React.FC<LayoutGridProps> = (props) => {
  const { numCols: baselineCols, debug } = useBaselineGridContext();
  const { isInGrid } = useLayoutContext();
  const { columns: columnsProp, id, children, className } = props;
  const childrenAsArray = React.Children.toArray(children);

  const buildTemplateColumnsValue = (cols: number[]): string => {
    let value = "";

    cols.forEach((col) => {
      value = `${value} ${col}fr`.trim();
    });

    return value;
  };

  const gridTemplateColumnsValue = React.useMemo(() => {
    return buildTemplateColumnsValue(Array(baselineCols).fill(1));
  }, [baselineCols]);

  const classes = className ? `layoutGrid ${className}` : "layoutGrid";

  // default to single column if columns prop not valid
  const isValid = React.useMemo(() => {
    const result = isColumnsPropValid(childrenAsArray.length, columnsProp);
    return result;
  }, [columnsProp, childrenAsArray.length]);

  const columns = columnsProp && isValid ? columnsProp : SINGLE_COLUMN_GRID;

  const wrapperClasses = isInGrid
    ? "maxContentWidth"
    : "maxContentWidth gutters";

  return (
    <div className={wrapperClasses}>
      {debug && <p className="gridLabel gutters">grid: {baselineCols} cols</p>}
      <div
        className={classes}
        id={id}
        style={{
          gridTemplateColumns: `${gridTemplateColumnsValue}`
        }}
      >
        {childrenAsArray &&
          childrenAsArray.map((child, index) => {
            return (
              <LayoutGridItem
                columns={columns}
                index={index}
                key={`gridItem-${index}`}
              >
                {child}
              </LayoutGridItem>
            );
          })}
      </div>
    </div>
  );
};
