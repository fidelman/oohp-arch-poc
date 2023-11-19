import { Container } from "inversify";
import { PostsRepository } from "../Posts/PostsRepository";

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
    return this.container;
  };
}
