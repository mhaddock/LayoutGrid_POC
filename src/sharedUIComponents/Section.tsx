import * as React from "react";
import { WidthOutput } from "../debug";
import { useBaselineGridContext } from "../egdsComponents/LayoutGrid";
import {
  useLayoutContext,
  SizeClass
} from "../sharedUIProviders/LayoutContext";

export const Section: React.FC<{
  message?: string;
  className?: string;
  id?: string;
}> = (props) => {
  const { children, message, className, id } = props;
  const classes = className ? `section ${className}` : "section";

  return (
    <div className={classes} id={id}>
      <div className="label">
        {message && <p>{message}</p>}
        <WidthOutput
          showSizeClass={true}
          message={"section"}
          inheritsLayoutContext={true}
        />
      </div>
      {children}
    </div>
  );
};

export const FloatingSection: React.FC<{ message?: string }> = (props) => {
  const { numCols } = useBaselineGridContext();
  const { children, message: messageProp } = props;

  const [classes, setClasses] = React.useState("section");
  const [message, setMessage] = React.useState("section");
  const [useRootLayoutContext, setUseRootLayoutContext] = React.useState(false);

  React.useEffect(() => {
    const _classes = numCols === 0 ? "section floating" : "section";
    setMessage(numCols === 0 ? "floating" : "not floating");
    setClasses(_classes);
    setUseRootLayoutContext(numCols === 0 ? true : false);
  }, [numCols, setClasses]);

  // should inherit sizeClass from top when floating

  return (
    <div className={classes}>
      <div className="label">
        {messageProp && <p>{messageProp}</p>}
        <WidthOutput
          showSizeClass={true}
          message={message}
          inheritsLayoutContext={true}
          useRootLayoutContext={useRootLayoutContext}
        />
      </div>
      {children}
    </div>
  );
};

export const ExternalAdSection: React.FC<{}> = (props) => {
  const { children } = props;
  const { sizeClass } = useLayoutContext();

  if (sizeClass === SizeClass.EXTRA_LARGE) {
    return (
      <Section id="externalAd" className="maxContentWidthAndGutters">
        {children}
      </Section>
    );
  }

  return null;
};
