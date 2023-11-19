import { observer } from "mobx-react";
import { useInjection } from "../Core/Providers/Injection";
import { PostsListPresenter } from "./PostsListPresenter";

export const PostsComponent = observer(() => {
  const presenter = useInjection(PostsListPresenter);

  if (presenter.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {presenter.posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{post.updatedAt}</p>
          <p>{post.authorId}</p>
        </div>
      ))}
    </div>
  );
});
