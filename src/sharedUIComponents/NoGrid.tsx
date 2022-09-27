import * as React from "react";
import { Section } from "./Section";
import { Block } from "./Block";

export const NoGrid: React.FC<{}> = () => {
  return (
    <div id="no-grid">
      <Section>
        <Block isFullWidth={true} message="full width" />
        <Block isFullWidth={false} message="max content width" />
      </Section>
    </div>
  );
};
