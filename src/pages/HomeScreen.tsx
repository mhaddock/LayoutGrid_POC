import * as React from "react";
import { BaselineGrid, WidthOutput, DebugButton } from "../debug";
import { Section } from "../sharedUIComponents/Section";
import { Block } from "../sharedUIComponents/Block";
import { Layout } from "../sharedUIComponents/Layout";
import {
  BaselineGridContextProvider,
  LayoutGrid
} from "../egdsComponents/LayoutGrid";
import { BackLink } from "../BackLink";
import { Header, Footer } from "../sharedUIComponents/HeaderFooter";
import { MediaQueryLayoutContextProvider } from "../sharedUIProviders/LayoutContext";

export const HomeScreen: React.FC<{}> = () => {
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
              <Block id="heroImage" message="hero image" isFullWidth={true} />
              <Block id="searchForm" message="search form" />
            </Section>
            <LayoutGrid
              id="grid-66-33"
              columns={{
                EXTRA_LARGE: [8, 4],
                LARGE: [8, 4],
                MEDIUM: [4, 4],
                SMALL: [4],
                EXTRA_SMALL: [4]
              }}
            >
              <Section>
                <Block message="misc content 1" />
              </Section>
              <Section>
                <Block message="misc content 2" />
                <Block message="misc content 3" />
              </Section>
            </LayoutGrid>
            <Section>
              <Block message="carousel" isFullWidth={true} />
            </Section>
            <Footer />
          </Layout>
        </BaselineGridContextProvider>
      </MediaQueryLayoutContextProvider>
      <p>
        modelled after:{" "}
        <a target="_blank" rel="noreferrer" href="https://stays.bookety.com/">
          https://stays.bookety.com/
        </a>
      </p>
    </div>
  );
};
