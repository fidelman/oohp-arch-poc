export interface TreeNode {
  id: string;
  type: "root" | "link";
  text: string;
  children?: TreeNode[];
}

export const tree: TreeNode = {
  id: "homeLink",
  type: "root",
  text: "Home",
  children: [
    {
      id: "postsLink",
      type: "link",
      text: "Posts",
    },
  ],
};
