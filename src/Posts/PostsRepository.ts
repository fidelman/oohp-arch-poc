import { injectable, inject } from "inversify";
import { Types } from "../IOC/Types";
import { PostResponse } from "../Core/OpenApi/Methods.schemas";
import { makeObservable, observable } from "mobx";
import type { DataGateway } from "../Core/HttpGateway";

@injectable()
export class PostsRepository {
  isPostsLoading = false;
  postsPm: PostResponse[] = [];

  constructor() {
    makeObservable(this, {
      isPostsLoading: observable,
      postsPm: observable,
    });
  }

  @inject(Types.IDataGateway)
  private dataGateway!: DataGateway;

  async load() {
    this.isPostsLoading = true;
    const postsDto =
      await this.dataGateway!.methods.postsControllerGetAllPosts();

    console.log(postsDto);
    this.isPostsLoading = false;
    if (postsDto.data) {
      this.postsPm = postsDto.data;
    }

    // Error handling logic goes here
  }
}
