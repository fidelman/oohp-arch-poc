import { inject, injectable } from "inversify";
import { computed, action, makeObservable } from "mobx";
import { RouterRepository } from "./RouterRepository";
import type { UpdateCurrentRoute } from "./RouterRepository";

@injectable()
export class Router {
  @inject(RouterRepository)
  private routerRepository!: RouterRepository;

  get currentRoute() {
    return this.routerRepository.currentRoute;
  }

  constructor() {
    makeObservable(this, {
      currentRoute: computed,
      updateCurrentRoute: action,
    });
  }

  updateCurrentRoute: UpdateCurrentRoute = async (newRouteId) => {
    // Logic for auth redirection lies here

    const oldRoute = this.routerRepository.findRoute(this.currentRoute.routeId);
    const newRoute = this.routerRepository.findRoute(newRouteId);
    const routeChanged = oldRoute.routeId !== newRoute.routeId;

    if (routeChanged) {
      if (this.routerRepository.onRouteChanged)
        this.routerRepository.onRouteChanged();
      if (oldRoute.onLeave) oldRoute.onLeave();
      if (newRoute.onEnter) newRoute.onEnter();
      this.routerRepository.currentRoute.routeId = newRoute.routeId;
      this.routerRepository.currentRoute.routeDef = newRoute.routeDef;
    }
  };

  registerRoutes = (onRouteChange: () => void) => {
    this.routerRepository.registerRoutes(
      this.updateCurrentRoute,
      onRouteChange
    );
  };

  goToId = async (routeId: string) => {
    this.routerRepository.goToId(routeId);
  };
}
