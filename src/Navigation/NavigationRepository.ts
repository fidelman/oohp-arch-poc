import { injectable, inject } from "inversify";
import TreeModel from "tree-model";
import { Router } from "../Routing/Router";
import { makeObservable, computed } from "mobx";
import { tree } from "./Tree";

@injectable()
export class NavigationRepository {
  @inject(Router)
  private router!: Router;

  get currentNode() {
    var self = this;
    return this.getTree().all(function (node) {
      return node.model.id === self.router.currentRoute.routeId;
    })[0];
  }

  get rootNode() {
    return this.getTree().first(() => true);
  }

  constructor() {
    makeObservable(this, {
      currentNode: computed,
    });
  }

  getTree() {
    let treeModel = new TreeModel();

    let root = treeModel.parse(tree);

    return root;
  }
}
