import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import PostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import type { Post } from "../../types/post";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  const { data } = useQuery({
    queryKey: ["posts", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  const editPost = (post: Post) => {
    setEditedPost(post);
    setIsEditPost(true);
  };

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;
  const posts = data?.posts ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsModalOpen(true);
            setIsCreatePost(true);
          }}
        >
          Create post
        </button>
      </header>
      {posts.length > 0 && (
        <PostList
          posts={posts}
          toggleModal={() => setIsModalOpen(true)}
          toggleEditPost={editPost}
        />
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {isCreatePost && <PostForm onClose={() => setIsModalOpen(false)} />}
          {isEditPost && (
            <EditPostForm
              initialValues={editedPost}
              onClose={() => {
                setIsModalOpen(false);
                setIsEditPost(false);
                setEditedPost(null);
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
