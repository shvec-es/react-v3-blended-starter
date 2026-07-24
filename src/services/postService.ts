import axios from "axios";
import type { NewPost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPropsResponse {
  posts: Post[];
  totalCount: number;
}
export const fetchPosts = async (searchText: string, page: number): Promise<FetchPropsResponse> => {
  const response = await axios.get<Post[]>("/posts", {
    params: {
      _page: page,
      _limit: 8,
      ...(searchText && { q: searchText }),
    },
  });
  const totalCount = Number(response.headers["x-total-count"]);

  return { posts: response.data, totalCount };
};

export const createPost = async (newPost: NewPost) => {
  const response = await axios.post<Post>("/posts", newPost);
  return response.data;
};

export const editPost = async (newDataPost: Post) => {
  const response = await axios.patch<Post>(`/posts/${newDataPost.id}`, newDataPost);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete<Post>(`/posts/${postId}`);
  return response.data;
};
