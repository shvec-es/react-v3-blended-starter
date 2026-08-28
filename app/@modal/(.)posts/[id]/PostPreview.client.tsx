'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!post || !post.userId) return;

    const fn = async () => {
      const res = await fetchUserById(post.userId);
      setUser(res);
    };
    fn();
  }, []);

  // замість useEffect для запиту за юзером можна використати ще один useQuery з обовʼязковою умовою enabled: Boolean(post?.userId),
  // const {
  //   data: user,
  //   isLoading: isUserLoading,
  //   error: userError,
  // } = useQuery({
  //   queryKey: ['user', post?.userId],
  //   queryFn: () => fetchUserById(post!.userId),
  //   enabled: Boolean(post?.userId), // запит не піде, поки post.userId дорівнює undefined
  // });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !post) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post.title}</h2>
          </div>

          <p className={css.content}>{post.body}</p>
        </div>
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
