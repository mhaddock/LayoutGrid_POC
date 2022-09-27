import * as React from "react";

interface VisibilityWidgetContextValue {
  state: Record<
    string,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  >;
  toggle: (id: string, value?: boolean) => void;
}

const VisibilityWidgetContext = React.createContext<
  VisibilityWidgetContextValue
>({ state: {}, toggle: (id: string, value?: boolean) => {} });

export const VisibilityWidgetContextProvider: React.FC<{}> = (props) => {
  const { children } = props;

  const defaultVisibility = true as boolean;

  const visibilityWidgetContextValue: VisibilityWidgetContextValue = {
    state: {
      "no-grid": React.useState(defaultVisibility),
      "grid-single": React.useState(defaultVisibility),
      "grid-50-50": React.useState(defaultVisibility),
      "grid-composite-block": React.useState(defaultVisibility),
      "grid-floating": React.useState(defaultVisibility),
      "grid-33-33-33": React.useState(defaultVisibility),
      "grid-25-25-25-25": React.useState(defaultVisibility),
      "grid-25-50-25": React.useState(defaultVisibility),
      "grid-33-66": React.useState(defaultVisibility),
      "_nested-grid-50-50": React.useState(defaultVisibility),
      "grid-3c-fill": React.useState(defaultVisibility)
    },
    toggle: (id: string, value?: boolean) => {}
  };

  visibilityWidgetContextValue.toggle = (id: string, value?: boolean) => {
    const state = visibilityWidgetContextValue.state;

    if (state[id]) {
      const [visibility, setVisibility] = state[id];
      if (typeof value === "boolean") {
        setVisibility(value);
      } else {
        setVisibility(!visibility);
      }
    }
  };

  return (
    <VisibilityWidgetContext.Provider value={visibilityWidgetContextValue}>
      {children}
    </VisibilityWidgetContext.Provider>
  );
};

export const useVisibilityWidgetContext = () =>
  React.useContext(VisibilityWidgetContext);

export const VisibilityWidget: React.FC<{}> = () => {
  const {
    state: visibilityContextState,
    toggle
  } = useVisibilityWidgetContext();

  const handler: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (evt && evt.target.value) {
      toggle(evt.target.value);
    }
  };

  const hideAllText = "Hide All";
  const showAllText = "Show All";
  const defaultShouldHide = true as boolean;
  const [shouldHide, setShouldHide] = React.useState(defaultShouldHide);

  const buttonText = React.useMemo(() => {
    const text = shouldHide ? hideAllText : showAllText;
    return text;
  }, [shouldHide]);

  const ShowHideAll: React.FC<{}> = () => {
    const showHideHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
      const newShouldHide = !shouldHide;
      setShouldHide(newShouldHide);
      Object.keys(visibilityContextState).forEach((gridId) => {
        const [, setVisibility] = visibilityContextState[gridId];
        setVisibility(newShouldHide);
      });
    };

    const ShowHideButton: React.FC<{ buttonText: string }> = (props) => {
      return <button onClick={showHideHandler}>{props.buttonText}</button>;
    };

    return <ShowHideButton buttonText={buttonText} />;
  };

  return (
    <div id="widget">
      {Object.keys(visibilityContextState).map((gridId) => {
        const [state] = visibilityContextState[gridId];
        const id = `${gridId}-tgl`;

        return (
          <label id={id + "-label"} htmlFor={id} key={id + "-key"}>
            <input
              type="checkbox"
              id={id}
              value={gridId}
              checked={state}
              onChange={handler}
            />
            {gridId}
          </label>
        );
      })}
      <ShowHideAll />
    </div>
  );
};
