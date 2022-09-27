import * as React from "react";
import { LayoutGrid } from "../egdsComponents/LayoutGrid";
import { Block } from "./Block";

export const CompositeBlock: React.FC<{ message?: string }> = (props) => {
  const { message } = props;
  return (
    <div id="composite-block">
      <Block message={message + " child 1"} />
      <LayoutGrid
        columns={{
          EXTRA_LARGE: [6, 6],
          LARGE: [6, 6],
          MEDIUM: [4, 4],
          SMALL: [4],
          EXTRA_SMALL: [4]
        }}
      >
        <Block message={message + " child 2"} />
        <Block message={message + " child 3"} />
      </LayoutGrid>
    </div>
  );
};
