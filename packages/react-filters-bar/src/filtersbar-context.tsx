import { createContext, PropsWithChildren, useContext } from "react";

type FiltersDef = Record<string, JSX.Element>;

const FiltersBarCtx = createContext<{ filtersDef: FiltersDef } | null>(null);

export function useFiltersBarCtx() {
  const ctx = useContext(FiltersBarCtx);
  if (ctx == null) {
    throw Error("FiltersBarCtx.Provider is missing.");
  }
  return ctx;
}

export function FiltersBarProvider<TFiltersDef extends FiltersDef>({
  children,
  filtersDef,
}: PropsWithChildren<{ filtersDef: TFiltersDef }>) {
  return (
    <FiltersBarCtx.Provider value={{ filtersDef }}>
      {children}
    </FiltersBarCtx.Provider>
  );
}
