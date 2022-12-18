import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { AppLayout } from "@/components/Layouts";
import { GlobalNav } from "@/components/Nav";

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const file of data.file) {
      if (file instanceof File) {
        formData.append("files[]", file);
      }
    }

    const res = await fetch("/api/upload", {
      method: "POST",

      body: formData,
    });
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <GlobalNav />
        <main className="flex min-h-screen flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" {...register("file")} multiple={true} />

            <input type="submit" />
          </form>
        </main>
      </AppLayout>
    </>
  );
};

export default Upload;
