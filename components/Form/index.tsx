'use client'
import Link from "next/link";
import Button from "../Button";
import { useEffect, useState } from "react";
import { IForm } from "./FormType";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Form ({ id = '', onSubmit }: IForm) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter()

  const handlerChangeTitle = (e: any) => {
    const { value } = e.target;
    setTitle(value);
  }

  const handlerChangeContent = (e: any) => {
    const { value } = e.target;
    setContent(value);
  }

  const handlerSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(title, content);
    router.push('/protected');
  }

  const getNote = async () => {
    const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BASE}/note/${id}`);

    if(status === 200) {
      setTitle(data.title);
      setContent(data.content);
    }
  }

  useEffect(() => {
    if(id)
      getNote();
  }, [id])

  return(
    <form className="flex flex-col gap-2">
      <div className="w-full">
        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input
          value={title}
          onChange={handlerChangeTitle}
          type="text"
          id="base-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="w-full">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
        <textarea
          id="message"
          value={content}
          onChange={handlerChangeContent}
          rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
        />
      </div>
      <div className="flex">
        <Button
          text="Submit"
          colorButton="PRIMARY"
          typeButton="submit"
          clicked={handlerSubmit}
        />
        <Link
          className="mx-4 max-w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href={'/protected'}
        >
          Back
        </Link>
      </div>
    </form>
  );
}
