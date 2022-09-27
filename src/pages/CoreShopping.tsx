import * as React from "react";
import { BaselineGrid, WidthOutput, DebugButton } from "../debug";
import {
  Section,
  FloatingSection,
  ExternalAdSection
} from "../sharedUIComponents/Section";
import { Block } from "../sharedUIComponents/Block";
import { CompositeBlock } from "../sharedUIComponents/CompositeBlock";
import { Layout } from "../sharedUIComponents/Layout";
import {
  BaselineGridContextProvider,
  LayoutGrid
} from "../egdsComponents/LayoutGrid";
import { MediaQueryLayoutContextProvider } from "../sharedUIProviders/LayoutContext";
import { BackLink } from "../BackLink";
import { Header, Footer } from "../sharedUIComponents/HeaderFooter";
import { Ad } from "../sharedUIComponents/Ad";

export const CoreShopping: React.FC<{}> = () => {
  return (
    <div className="App">
      <MediaQueryLayoutContextProvider>
        <BaselineGridContextProvider debug={false}>
          <div className="widgets">
            <BackLink />
            <DebugButton />
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

            <Section>
              <Block isFullWidth={true} message="hero" />
            </Section>

            <LayoutGrid
              id="grid-single"
              columns={{
                EXTRA_LARGE: [12],
                LARGE: [12],
                MEDIUM: [8],
                SMALL: [4],
                EXTRA_SMALL: [4]
              }}
            >
              <Section>
                <Block message="banner" />
              </Section>
            </LayoutGrid>
            <ExternalAdSection>
              <Ad />
            </ExternalAdSection>
            <div>
              <LayoutGrid
                id="grid-66-33"
                columns={{
                  EXTRA_LARGE: [8, 4],
                  LARGE: [8, 4],
                  MEDIUM: [4, 4],
                  SMALL: [4, 0],
                  EXTRA_SMALL: [4, 0]
                }}
              >
                <Section>
                  <Block message="misc block" />
                  <Block message="misc block" />
                  <Block message="misc block" />
                  <Block message="misc block" />
                  <CompositeBlock message="composite block" />
                  <Block message="misc block" />
                  <Block message="misc block" />
                </Section>
                <FloatingSection>
                  <Block message="Price Summary" />
                </FloatingSection>
              </LayoutGrid>
            </div>

            <Footer />
          </Layout>
        </BaselineGridContextProvider>
      </MediaQueryLayoutContextProvider>
    </div>
  );
};
