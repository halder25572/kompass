import { redirect } from "next/navigation";

type EditorMainPageProps = {
    searchParams?: Promise<{
        bookId?: string;
    }>;
};

const EditorMainPage = async ({ searchParams }: EditorMainPageProps) => {
    const resolvedSearchParams = searchParams ? await searchParams : undefined;

    if (resolvedSearchParams?.bookId) {
        redirect(`/dashboard/${resolvedSearchParams.bookId}/editor-book`);
    }

    redirect("/dashboard");
};

export default EditorMainPage;