import { injectable } from "inversify";
import Navigo, { Handler } from "navigo";

export type RouteConfig = Record<
  string,
  {
    as: string;
    uses: Handler;
  }
>;

@injectable()
export class RouterGateway {
  navigo: Navigo | null = null;

  registerRoutes = async (routeConfig: RouteConfig) => {
    if (this.navigo) return new Promise((resolve) => setTimeout(resolve, 0));
    this.navigo = new Navigo("/");
    const self = this.navigo;
    self
      .on(routeConfig)
      .notFound(() => {})
      .resolve();

    return new Promise((resolve) => setTimeout(resolve, 0));
  };

  unload = () => {
    if (this.navigo) {
      this.navigo.destroy();
    }
  };

  goToId = async (name: string) => {
    if (this.navigo) {
      this.navigo.navigateByName(name);
    }
  };
}
