import { injectable, inject } from "inversify";
import { Types } from "../IOC/Types";
import { PostResponse } from "../Core/OpenApi/Methods.schemas";
import { makeObservable, observable } from "mobx";
import { DataGateway } from "../Core/HttpGateway";

@injectable()
export class PostsRepository {
  isPostsLoading = false;
  postsPm: PostResponse[] = [];

  constructor(
    @inject(Types.IDataGateway)
    private dataGateway: DataGateway
  ) {
    makeObservable(this, { postsPm: observable, isPostsLoading: observable });
  }

  async getAllPosts() {
    this.isPostsLoading = true;
    const postsDto =
      await this.dataGateway.methods.postsControllerGetAllPosts();

    this.isPostsLoading = false;
    if (postsDto.data) {
      this.postsPm = postsDto.data;
    }

    // Error handling logic goes here
  }
}
