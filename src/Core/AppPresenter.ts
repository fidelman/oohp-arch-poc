import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";
import { Router } from "../Routing/Router";

@injectable()
export class AppPresenter {
  @inject(Router)
  private router!: Router;

  constructor() {
    makeObservable(this, {
      currentRoute: computed,
    });
  }

  get currentRoute() {
    return this.router.currentRoute;
  }

  load = (onRouteChange: () => void) => {
    const onRouteChangeWrapper = () => {
      onRouteChange();
    };
    this.router.registerRoutes(onRouteChangeWrapper);
  };
}
