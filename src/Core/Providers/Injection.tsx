import { Container, interfaces } from "inversify";
import { useContext, useMemo, createContext } from "react";

const InversifyContext = createContext<{ container: Container | null }>({
  container: null,
});

interface InjectionProviderProps {
  container: Container;
  children: React.ReactNode;
}

export const InjectionProvider = (props: InjectionProviderProps) => {
  return (
    <InversifyContext.Provider value={{ container: props.container }}>
      {props.children}
    </InversifyContext.Provider>
  );
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new Error();
  }

  const instance = useMemo(
    () => container.get(identifier),
    [container, identifier]
  );

  return instance;
}
