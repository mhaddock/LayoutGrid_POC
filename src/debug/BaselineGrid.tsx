import * as React from "react";
import { BaselineGridContext } from "../egdsComponents/LayoutGrid";
import { WidthOutput } from "./WidthOutput";

const BaselineColumns: React.FC<{
  numCols: number;
  showPreciseMeasurement?: boolean;
}> = (props) => {
  const { numCols, showPreciseMeasurement } = props;

  return (
    <>
      {[...Array(numCols)].map((value: undefined, index: number) => (
        <div className="column" key={`baselineCol${index + 1}`}>
          <p>{index + 1}</p>
          {showPreciseMeasurement && (
            <WidthOutput
              showPreciseMeasurement={true}
              showSelfMeasurement={true}
              showSizeClass={false}
            />
          )}
        </div>
      ))}
    </>
  );
};

export const BaselineGrid: React.FC<{ showPreciseMeasurement?: boolean }> = (
  props
) => {
  const { numCols, debug } = React.useContext(BaselineGridContext);

  if (!debug) {
    return null;
  }

  const { showPreciseMeasurement } = props;

  return (
    <div className="underlay">
      <div className="maxContentWidth gutters">
        <WidthOutput showSelfMeasurement={true} showPreciseMeasurement={true} />
      </div>
      <div className="maxContentWidth gutters fullHeight">
        <div
          id="baselineGrid"
          style={{
            gridTemplateColumns: `repeat(${numCols}, 1fr)`
          }}
        >
          <BaselineColumns
            numCols={numCols}
            showPreciseMeasurement={showPreciseMeasurement}
          />
        </div>
      </div>
    </div>
  );
};
