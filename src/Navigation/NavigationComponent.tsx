import { observer } from "mobx-react";
import { useInjection } from "../Core/Providers/Injection";
import { NavigationPresenter } from "./NavigationPresenter";
import { Router } from "../Routing/Router";

export const NavigationComponent = observer(() => {
  const presenter = useInjection(NavigationPresenter);
  const router = useInjection(Router);

  return (
    <div>
      <div>{presenter.viewModel.currentSelectedVisibleName}</div>
      {presenter.viewModel.menuItems.map((menuItem, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              router.goToId(menuItem.id);
            }}
          >
            {menuItem.visibleName}
          </div>
        );
      })}
    </div>
  );
});
