import * as React from "react";
import { BackLink } from "../BackLink";
import {
  BaselineGrid,
  DebugButton,
  UseCase,
  UseCaseGlobalExpandButton,
  UseCaseGlobalExpandContextProvider
} from "../debug";
import {
  BaselineGridContextProvider,
  LayoutGrid
} from "../egdsComponents/LayoutGrid";
import { Layout } from "../sharedUIComponents/Layout";
import { Block } from "../sharedUIComponents/Block";
import { WidthOutput } from "../debug/WidthOutput";
import { Section, FloatingSection } from "../sharedUIComponents/Section";
import { NoGrid } from "../sharedUIComponents/NoGrid";
import { MediaQueryLayoutContextProvider } from "../sharedUIProviders/LayoutContext";
import { Header, Footer } from "../sharedUIComponents/HeaderFooter";

export const TestCases: React.FC<{}> = () => {
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

            <Layout>
              <Header />

              <UseCase description="single column, no grid">
                <NoGrid />
              </UseCase>

              <UseCase description="single columns, in grid">
                <LayoutGrid
                  id="grid-single"
                  key="grid-single"
                  columns={{
                    EXTRA_SMALL: [4],
                    SMALL: [4],
                    MEDIUM: [8],
                    LARGE: [12],
                    EXTRA_LARGE: [12]
                  }}
                >
                  <Section>
                    <Block message="block 100" />
                  </Section>
                </LayoutGrid>
              </UseCase>

              <UseCase description="50/50">
                <LayoutGrid
                  id="grid-50-50"
                  key="grid-50-50"
                  columns={{
                    EXTRA_SMALL: [4],
                    SMALL: [4],
                    MEDIUM: [4, 4],
                    LARGE: [6, 6],
                    EXTRA_LARGE: [6, 6]
                  }}
                >
                  <Section>
                    <Block message="block 50" />
                  </Section>
                  <Section>
                    <Block message="block 50" />
                  </Section>
                </LayoutGrid>
              </UseCase>

              <UseCase description="75/25 with floating section">
                <LayoutGrid
                  id="grid-floating"
                  key="grid-floating"
                  columns={{
                    EXTRA_SMALL: [4, 0],
                    SMALL: [4, 0],
                    MEDIUM: [8, 0],
                    LARGE: [9, 3],
                    EXTRA_LARGE: [9, 3]
                  }}
                >
                  <Section>
                    <Block message="block fill" />
                  </Section>
                  <FloatingSection>
                    <Block message="block floats" />
                  </FloatingSection>
                </LayoutGrid>
              </UseCase>

              <UseCase description="33/33/33">
                <LayoutGrid
                  id="grid-33-33-33"
                  key="grid-33-33-33"
                  columns={{
                    EXTRA_SMALL: [4],
                    SMALL: [4],
                    MEDIUM: [8],
                    LARGE: [4, 4, 4],
                    EXTRA_LARGE: [4, 4, 4]
                  }}
                >
                  <Section>
                    <Block message="33" />
                  </Section>
                  <Section>
                    <Block message="33" />
                  </Section>
                  <Section>
                    <Block message="33" />
                  </Section>
                </LayoutGrid>
              </UseCase>

              <UseCase description="25/25/25/25">
                <LayoutGrid
                  id="grid-25-25-25-25"
                  key="grid-25-25-25-25"
                  columns={{
                    EXTRA_SMALL: [4],
                    SMALL: [4],
                    MEDIUM: [4, 4],
                    LARGE: [3, 3, 3, 3],
                    EXTRA_LARGE: [3, 3, 3, 3]
                  }}
                >
                  <Section>
                    <Block message="block 25" />
                  </Section>
                  <Section>
                    <Block message="block 25" />
                  </Section>
                  <Section>
                    <Block message="block 25" />
                  </Section>
                  <Section>
                    <Block message="block 25" />
                  </Section>
                </LayoutGrid>
              </UseCase>

              <UseCase description="25/50/25">
                <LayoutGrid
                  id="grid-25-50-25"
                  key="grid-25-50-25"
                  columns={{
                    EXTRA_SMALL: [4],
                    SMALL: [4],
                    MEDIUM: [8],
                    LARGE: [3, 6, 3],
                    EXTRA_LARGE: [3, 6, 3]
                  }}
                >
                  <Section>
                    <Block message="block 25" />
                  </Section>
                  <Section>
                    <Block message="block 50" />
                  </Section>
                  <Section>
                    <Block message="block 25" />
                  </Section>
                </LayoutGrid>
              </UseCase>

              <UseCase description="33/66 with 50/50 sub-grid">
                <LayoutGrid
                  id="grid-33-66"
                  key="grid-33-66"
                  columns={{
                    EXTRA_SMALL: [4],
                    SMALL: [4],
                    MEDIUM: [4, 4],
                    LARGE: [4, 8],
                    EXTRA_LARGE: [4, 8]
                  }}
                >
                  <Section>
                    <Block message="block 33" />
                  </Section>
                  <Section>
                    <Block message="block 66" />
                    <LayoutGrid
                      id="_nested-grid-50-50"
                      key="_nested-grid-50-50"
                      columns={{
                        EXTRA_SMALL: [4],
                        SMALL: [4],
                        MEDIUM: [4, 4],
                        LARGE: [4, 8],
                        EXTRA_LARGE: [4, 8]
                      }}
                    >
                      <Section>
                        <Block message="block 50" />
                      </Section>
                      <Section>
                        <Block message="block 50" />
                      </Section>
                    </LayoutGrid>
                  </Section>
                </LayoutGrid>
              </UseCase>

              <UseCase description="3 column/fill">
                <LayoutGrid
                  id="grid-3c-fill"
                  key="grid-3c-fill"
                  columns={{
                    EXTRA_SMALL: [4],
                    SMALL: [4],
                    MEDIUM: [3, 5],
                    LARGE: [3, 9],
                    EXTRA_LARGE: [3, 9]
                  }}
                >
                  <Section>
                    <Block message="block 3col" />
                  </Section>
                  <Section>
                    <Block message="block fill" />
                  </Section>
                </LayoutGrid>
              </UseCase>
              <Footer />
            </Layout>
          </UseCaseGlobalExpandContextProvider>
        </BaselineGridContextProvider>
      </MediaQueryLayoutContextProvider>
    </div>
  );
};
