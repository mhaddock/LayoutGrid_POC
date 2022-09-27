import * as React from "react";
import {
  SIZE_CLASS_RANGES,
  SizeClass,
  SizeClassRanges,
  sizeClassFromWidth,
  LayoutContextProvider
} from "./LayoutContextProvider";

/**
 * Hook used to enable media query listeners at specified SizeClasses.
 * @returns The matching SizeClass.
 */
export const useMediaQueries = (
  sizeClassRanges?: SizeClassRanges
): SizeClass => {
  const _sizeClassRanges = sizeClassRanges || SIZE_CLASS_RANGES;

  let mediaQueryLists: [number, MediaQueryList][];

  //TODO: media query min-width should be in ems
  if (typeof window !== "undefined" && window.matchMedia) {
    mediaQueryLists = Object.entries(_sizeClassRanges).map(([_, value]) => [
      value[0],
      window.matchMedia(`(min-width: ${value[0]}px)`)
    ]);
  }

  const getSizeClass = (): SizeClass => {
    let largestMediaQueryMatch: [number, MediaQueryList] | undefined;
    let sizeClass: SizeClass | undefined;

    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      mediaQueryLists.length > 0
    ) {
      const mediaQueryListMatches: [
        number,
        MediaQueryList
      ][] = mediaQueryLists.filter((mql) => mql[1].matches);

      mediaQueryListMatches.forEach((match) => {
        /* istanbul ignore next */
        if (
          largestMediaQueryMatch === undefined ||
          match[0] > largestMediaQueryMatch[0]
        ) {
          largestMediaQueryMatch = match;
        }
      });

      if (mediaQueryListMatches.length < 1) {
        console.log("prob extra_small");
        largestMediaQueryMatch = undefined;
      }
    }

    if (largestMediaQueryMatch) {
      sizeClass = sizeClassFromWidth(largestMediaQueryMatch[0]);
    } else {
      // media queries will not match extra_small
      sizeClass = SizeClass.EXTRA_SMALL;
    }

    return sizeClass ? sizeClass : SizeClass.SMALL;
  };

  const [sizeClass, setSizeClass] = React.useState<SizeClass>(getSizeClass());

  /* istanbul ignore next */
  React.useEffect(() => {
    const handler = () => setSizeClass(getSizeClass());
    if (mediaQueryLists && mediaQueryLists.length > 0) {
      mediaQueryLists.forEach((mql) =>
        mql[1].addEventListener("change", handler)
      );
    }
    // remove listeners on cleanup
    return () => {
      if (mediaQueryLists && mediaQueryLists.length > 0) {
        mediaQueryLists.forEach((mql) =>
          mql[1].removeEventListener("change", handler)
        );
      }
    };
  });

  return sizeClass;
};

export const MediaQueryLayoutContextProvider: React.FC<{}> = (props) => {
  const sizeClass = useMediaQueries();
  const { children } = props;

  return (
    <LayoutContextProvider sizeClass={sizeClass}>
      {children}
    </LayoutContextProvider>
  );
};
