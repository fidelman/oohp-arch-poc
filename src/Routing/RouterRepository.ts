import { makeObservable, observable } from "mobx";
import { inject, injectable } from "inversify";
import { Types } from "../IOC/Types";
import { PostsRepository } from "../Posts/PostsRepository";
import { RouteConfig, RouterGateway } from "./RouterGateway";

export type RouteId = "postsLink" | "homeLink" | "loadingSpinner" | "";

type RouteParams = {
  path: string;
  isSecure?: boolean;
};

export type UpdateCurrentRoute = (
  newRouteId: string,
  params: RouteParams,
  query: string
) => Promise<void>;

interface Route {
  routeId: RouteId;
  routeDef: RouteParams;
  onEnter?: () => void;
  onLeave?: () => void;
}

const LOADING_ROUTE: Route = {
  routeId: "loadingSpinner",
  routeDef: {
    path: "",
  },
};

@injectable()
export class RouterRepository {
  currentRoute: Route = {
    routeId: "",
    routeDef: {
      path: "",
    },
  };

  constructor() {
    makeObservable(this, {
      currentRoute: observable,
    });
  }

  @inject(PostsRepository)
  private postsRepository!: PostsRepository;

  @inject(Types.IRouterGateway)
  private routerGateway!: RouterGateway;

  onRouteChanged: (() => void) | null = null;

  routes: Route[] = [
    {
      routeId: "homeLink",
      routeDef: {
        path: "/",
        isSecure: false,
      },
      onEnter: () => {},
    },
    {
      routeId: "postsLink",
      routeDef: {
        path: "/posts",
        isSecure: false,
      },
      onEnter: () => this.postsRepository!.load(),
    },
  ];

  registerRoutes = (
    updateCurrentRoute: UpdateCurrentRoute,
    onRouteChanged: () => void
  ) => {
    this.onRouteChanged = onRouteChanged;
    let routeConfig: RouteConfig = {};
    this.routes.forEach((routeArg) => {
      const route = this.findRoute(routeArg.routeId);
      routeConfig[route.routeDef.path] = {
        as: route.routeId,
        uses: (match) => {
          updateCurrentRoute(
            route.routeId,
            route.routeDef,
            match ? match.queryString : ""
          );
        },
      };
    });

    this.routerGateway.registerRoutes(routeConfig);
  };

  findRoute = (routeId: string | null) => {
    const route = this.routes.find((route) => {
      return route.routeId === routeId;
    });
    return route || LOADING_ROUTE;
  };

  goToId = async (routeId: string) => {
    this.routerGateway!.goToId(routeId);
  };
}
