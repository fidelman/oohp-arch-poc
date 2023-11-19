import * as React from "react";
import { observer } from "mobx-react";
import { useInjection } from "./Core/Providers/Injection";
import { AppPresenter } from "./Core/AppPresenter";
import { renderedComponents } from "./Core/RenderedComponent";
import { NavigationComponent } from "./Navigation/NavigationComponent";

const App = observer(() => {
  const presenter = useInjection(AppPresenter);

  const onRouteChange = () => {};

  React.useEffect(() => {
    presenter.load(onRouteChange);
  }, []);

  return (
    <div className="container">
      <NavigationComponent />
      {renderedComponents.map((current) => {
        return (
          presenter.currentRoute.routeId === current.id && current.component
        );
      })}
    </div>
  );
});
export default App;
