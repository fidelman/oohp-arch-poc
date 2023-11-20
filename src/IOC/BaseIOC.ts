import { Container } from "inversify";
import { PostsRepository } from "../Posts/PostsRepository";
import { NavigationRepository } from "../Navigation/NavigationRepository";
import { RouterRepository } from "../Routing/RouterRepository";

export class BaseIOC {
  container;

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: "Transient",
    });
  }

  buildBaseTemplate = () => {
    this.container.bind(PostsRepository).to(PostsRepository).inSingletonScope();
    this.container
      .bind(RouterRepository)
      .to(RouterRepository)
      .inSingletonScope();
    this.container
      .bind(NavigationRepository)
      .to(NavigationRepository)
      .inSingletonScope();
    return this.container;
  };
}
