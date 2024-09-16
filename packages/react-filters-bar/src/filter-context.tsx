import { createContext, PropsWithChildren, useContext } from "react";

type FilterState = {
  remove: () => void;
  setOperator: (value: string) => void;
  setValue: (value: string) => void;
  operator: string;
  value: string;
};

const FilterCtx = createContext<FilterState | null>(null);

export function useFilterCtx() {
  const ctx = useContext(FilterCtx);
  if (ctx == null) {
    throw Error("FilterCtx.Provider is missing.");
  }
  return ctx;
}

export function FilterProvider({
  children,
  ...props
}: PropsWithChildren<FilterState>) {
  return <FilterCtx.Provider value={props}>{children}</FilterCtx.Provider>;
}
