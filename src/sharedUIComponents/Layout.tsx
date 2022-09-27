import * as React from "react";
import { useBaselineGridContext } from "../egdsComponents/LayoutGrid";

export const Layout: React.FC<{ id?: string }> = (props) => {
  const { id, children } = props;
  const { debug } = useBaselineGridContext();
  const idValue = id ? id : "";
  const classes = debug ? "layout debug" : "layout";
  return (
    <div id={idValue} className={classes}>
      {children}
    </div>
  );
};
