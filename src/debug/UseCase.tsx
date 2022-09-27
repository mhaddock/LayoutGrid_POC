import * as React from "react";

interface GlobalExpandContextValue {
  expandState: boolean;
  toggleExpandState: () => void;
}

const UseCaseGlobalExpandContext = React.createContext<
  GlobalExpandContextValue
>({ expandState: true, toggleExpandState: () => {} });

export const UseCaseGlobalExpandContextProvider: React.FC<{
  expandState: boolean;
}> = (props) => {
  const { expandState, children } = props;
  const [globalExpandState, setGlobalExpandState] = React.useState(expandState);

  const toggleGlobalExpandState = () => {
    setGlobalExpandState(!globalExpandState);
  };

  return (
    <UseCaseGlobalExpandContext.Provider
      value={{
        expandState: globalExpandState,
        toggleExpandState: toggleGlobalExpandState
      }}
    >
      {children}
    </UseCaseGlobalExpandContext.Provider>
  );
};

export const useUseCaseGlobalExpandContext = () =>
  React.useContext(UseCaseGlobalExpandContext);

const Note: React.FC<{ onClick: () => void }> = (props) => {
  const { onClick, children } = props;
  return (
    <div className="maxContentWidth gutters">
      <p onClick={onClick} className="note">
        {children}
      </p>
    </div>
  );
};

const upArrow = "▲";
const downArrow = "▼";

export const UseCaseGlobalExpandButton: React.FC<{}> = () => {
  const { expandState, toggleExpandState } = useUseCaseGlobalExpandContext();

  const buttonText = React.useMemo(
    () => (expandState ? `collase all ${downArrow}` : `expand all ${upArrow}`),
    [expandState]
  );

  const toggleExpandStateHandler = () => {
    toggleExpandState();
  };

  return (
    <button id="expandButton" onClick={toggleExpandStateHandler}>
      <span>{buttonText}</span>
    </button>
  );
};

export const UseCase: React.FC<{ description: string }> = (props) => {
  const { description, children } = props;
  const { expandState: globalExpandState } = useUseCaseGlobalExpandContext();
  const [expandState, setExpandState] = React.useState(true);

  const handler = () => {
    setExpandState(!expandState);
  };

  React.useEffect(() => {
    setExpandState(globalExpandState);
  }, [globalExpandState]);

  const classes = React.useMemo(
    () => (expandState ? "UseCase expanded" : "UseCase collapsed"),
    [expandState]
  );

  return (
    <div className={classes}>
      <Note onClick={handler}>
        {description} {expandState ? downArrow : upArrow}
      </Note>
      {expandState && <div>{children}</div>}
    </div>
  );
};
