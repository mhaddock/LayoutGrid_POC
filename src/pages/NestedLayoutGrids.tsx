import * as React from "react";
import { BackLink } from "../BackLink";
import {
  BaselineGrid,
  DebugButton,
  UseCaseGlobalExpandButton,
  UseCaseGlobalExpandContextProvider,
  UseCase
} from "../debug";
import {
  BaselineGridContextProvider,
  LayoutGrid
} from "../egdsComponents/LayoutGrid";
import { Layout } from "../sharedUIComponents/Layout";
import { Block } from "../sharedUIComponents/Block";
import { CompositeBlock } from "../sharedUIComponents/CompositeBlock";
import { WidthOutput } from "../debug/WidthOutput";
import { Section } from "../sharedUIComponents/Section";
import { MediaQueryLayoutContextProvider } from "../sharedUIProviders/LayoutContext";

export const NestedLayoutGrids: React.FC<{}> = () => {
  return (
    <div className="App">
      <MediaQueryLayoutContextProvider>
        <BaselineGridContextProvider debug={true}>
          <UseCaseGlobalExpandContextProvider expandState={true}>
            <div className="widgets">
              <BackLink />
              <DebugButton />
              <UseCaseGlobalExpandButton />
            </div>
            <WidthOutput
              showSizeClass={true}
              showPreciseMeasurement={true}
              showSelfMeasurement={true}
              message="viewport"
            />
            <BaselineGrid showPreciseMeasurement={true} />

            <Layout id="CompositeBlocksScreen">
              <UseCase description="Composite Block w/sub-grid, un-nested">
                <CompositeBlock message="composite block w/subrid" />
              </UseCase>

              <UseCase description="Irregular baseline grid colspans: LayoutGrid &gt; Composite Block w/sub-grid">
                <LayoutGrid
                  id="grid-1"
                  columns={{
                    EXTRA_LARGE: [3, 9],
                    LARGE: [3, 9],
                    MEDIUM: [3, 5],
                    SMALL: [4],
                    EXTRA_SMALL: [4]
                  }}
                >
                  <Section>
                    <Block message="block 1-1" />
                  </Section>
                  <Section>
                    <CompositeBlock message="composite block w/subgrid" />
                  </Section>
                </LayoutGrid>
              </UseCase>

              <UseCase description="33/66: LayoutGrid &gt; Composite Block w/sub-grid">
                <LayoutGrid
                  id="grid-2"
                  columns={{
                    EXTRA_LARGE: [4, 8],
                    LARGE: [4, 8],
                    MEDIUM: [4, 4],
                    SMALL: [4],
                    EXTRA_SMALL: [4]
                  }}
                >
                  <Section>
                    <Block message="block 2-1" />
                  </Section>
                  <Section>
                    <CompositeBlock message="composite block w/subgrid" />
                  </Section>
                </LayoutGrid>
              </UseCase>

              <UseCase description="66/33: LayoutGrid w/sub-grid &gt; Composite Block w/sub-grid">
                <LayoutGrid
                  id="grid-4"
                  columns={{
                    EXTRA_LARGE: [8, 4],
                    LARGE: [8, 4],
                    MEDIUM: [4, 4],
                    SMALL: [4],
                    EXTRA_SMALL: [4]
                  }}
                >
                  <LayoutGrid
                    columns={{
                      EXTRA_LARGE: [6, 6],
                      LARGE: [6, 6],
                      MEDIUM: [4, 4],
                      SMALL: [4],
                      EXTRA_SMALL: [4]
                    }}
                  >
                    <Section>
                      <Block message="block 3-1" />
                    </Section>
                    <Section>
                      <Block message="block 3-2" />
                    </Section>
                  </LayoutGrid>

                  <Section>
                    <CompositeBlock message="composite block w/subgrid" />
                  </Section>
                </LayoutGrid>
              </UseCase>
            </Layout>
          </UseCaseGlobalExpandContextProvider>
        </BaselineGridContextProvider>
      </MediaQueryLayoutContextProvider>
    </div>
  );
};
