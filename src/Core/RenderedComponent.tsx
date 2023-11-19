import { PostsComponent } from "../Posts/PostsComponent";

interface RenderedComponent {
  id: string;
  component: JSX.Element;
}

export const renderedComponents: RenderedComponent[] = [
  {
    id: "homeLink",
    component: <h1 key="default">Default page</h1>,
  },
  {
    id: "postsLink",
    component: <PostsComponent key="postsLink" />,
  },
];
