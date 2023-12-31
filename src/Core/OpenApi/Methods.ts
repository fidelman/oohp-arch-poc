/**
 * Generated by orval v6.19.0 🍺
 * Do not edit manually.
 * ThinkEasy
 * Test Task BE
 * OpenAPI spec version: 1.0
 */
import type {
  Auth,
  CreatePostInput,
  LoginInput,
  PostResponce,
  PostResponse,
  RefreshResponceModel,
  RefreshTokenInput,
  SignupInput,
} from "./Methods.schemas";
import { clientInstance } from "./Mutator";
import type { BodyType } from "./Mutator";

export const getThinkEasy = () => {
  /**
   * @summary Signup a new user
   */
  const authControllerSignup = (signupInput: BodyType<SignupInput>) => {
    return clientInstance<Auth>({
      url: `/auth/signup`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: signupInput,
    });
  };

  /**
   * @summary Login an existing user
   */
  const authControllerLogin = (loginInput: BodyType<LoginInput>) => {
    return clientInstance<Auth>({
      url: `/auth/login`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: loginInput,
    });
  };

  /**
   * @summary Refresh access token using a refresh token
   */
  const authControllerRefreshToken = (
    refreshTokenInput: BodyType<RefreshTokenInput>,
  ) => {
    return clientInstance<RefreshResponceModel>({
      url: `/auth/refresh-token`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: refreshTokenInput,
    });
  };

  /**
   * @summary Create a new post
   */
  const postsControllerCreate = (
    createPostInput: BodyType<CreatePostInput>,
  ) => {
    return clientInstance<PostResponce>({
      url: `/posts`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: createPostInput,
    });
  };

  /**
   * @summary Get all posts
   */
  const postsControllerGetAllPosts = () => {
    return clientInstance<PostResponse[]>({ url: `/posts`, method: "get" });
  };

  /**
   * @summary Get all posts of a user
   */
  const postsControllerUserPosts = (userId: string) => {
    return clientInstance<PostResponse[]>({
      url: `/posts/user/${userId}`,
      method: "get",
    });
  };

  /**
   * @summary Get a post by its ID
   */
  const postsControllerPost = (postId: string) => {
    return clientInstance<PostResponse>({
      url: `/posts/${postId}`,
      method: "get",
    });
  };

  return {
    authControllerSignup,
    authControllerLogin,
    authControllerRefreshToken,
    postsControllerCreate,
    postsControllerGetAllPosts,
    postsControllerUserPosts,
    postsControllerPost,
  };
};
export type AuthControllerSignupResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getThinkEasy>["authControllerSignup"]>>
>;
export type AuthControllerLoginResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getThinkEasy>["authControllerLogin"]>>
>;
export type AuthControllerRefreshTokenResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getThinkEasy>["authControllerRefreshToken"]>
  >
>;
export type PostsControllerCreateResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getThinkEasy>["postsControllerCreate"]>>
>;
export type PostsControllerGetAllPostsResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getThinkEasy>["postsControllerGetAllPosts"]>
  >
>;
export type PostsControllerUserPostsResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getThinkEasy>["postsControllerUserPosts"]>
  >
>;
export type PostsControllerPostResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getThinkEasy>["postsControllerPost"]>>
>;
