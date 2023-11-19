import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";
import { NavigationRepository } from "../Navigation/NavigationRepository";
import { TreeNode } from "./Tree";
import TreeModel from "tree-model";

interface Node extends TreeModel.Node<TreeNode> {
  model: TreeNode;
  children: Node[];
}

@injectable()
export class NavigationPresenter {
  @inject(NavigationRepository)
  private navigationRepository!: NavigationRepository;

  get viewModel() {
    const vm = {
      currentSelectedVisibleName: "",
      menuItems: [],
    };

    let currentNode = this.navigationRepository.currentNode as Node;

    if (currentNode) {
      return {
        menuItems: currentNode.children.map((node) => {
          return { id: node.model.id, visibleName: node.model.text };
        }),
        currentSelectedVisibleName: this.visibleName(currentNode),
      };
    }

    return vm;
  }

  constructor() {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  visibleName = (node: Node) => {
    return node.model.text + " > " + node.model.id;
  };
}
