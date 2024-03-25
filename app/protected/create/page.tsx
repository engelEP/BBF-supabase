'use client'
import Form from "@/components/Form";
import axios from "axios";

export default function CreateNote() {
  const handlerCreate = (title: string, content: string) => {
    axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/notes`, {
      title,
      content
    });
  }

  return(
    <div className="max-w-md w-full">
        <h2 className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-16">
          Create note
        </h2>
        <Form onSubmit={handlerCreate} />
    </div>
  );
}
