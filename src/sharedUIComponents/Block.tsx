import * as React from "react";
import { useLayoutContext } from "../sharedUIProviders/LayoutContext/LayoutContextProvider";
import { WidthOutput } from "../debug/WidthOutput";

const MaxContentWidthWrapper: React.FC<{ constrain?: boolean }> = (props) => {
  const { constrain, children } = props;
  if (constrain) {
    return <div className="maxContentWidth gutters">{children}</div>;
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export const Block: React.FC<{
  isFullWidth?: boolean;
  message?: string;
  id?: string;
}> = (props) => {
  const { isFullWidth, message, id } = props;
  const { isInGrid } = useLayoutContext();
  const classes = isFullWidth
    ? "block full-width-block"
    : "block default-block";

  return (
    <MaxContentWidthWrapper constrain={!isInGrid && !isFullWidth}>
      <div className={classes} id={id}>
        {message && (
          <p>
            <span className="message">{message}</span>
          </p>
        )}
        <WidthOutput
          showSizeClass={true}
          message="block"
          showPreciseMeasurement={false}
          inheritsLayoutContext={true}
        />
      </div>
    </MaxContentWidthWrapper>
  );
};
