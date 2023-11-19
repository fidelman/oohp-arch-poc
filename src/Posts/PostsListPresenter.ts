import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";
import { PostsRepository } from "./PostsRepository";
import format from "date-fns/format";

@injectable()
export class PostsListPresenter {
  constructor(
    @inject(PostsRepository)
    private postsRepository: PostsRepository
  ) {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  get viewModel() {
    return {
      isLoading: this.postsRepository.isPostsLoading,
      posts: [...this.postsRepository.postsPm]
        .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
        .map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          updatedAt: format(new Date(post.updatedAt), "d MMM"),
          authorId: post.authorId,
        })),
    };
  }
}
