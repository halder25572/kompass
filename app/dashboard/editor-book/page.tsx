import { redirect } from "next/navigation";

type EditorMainPageProps = {
    searchParams?: {
        bookId?: string;
    };
};

const EditorMainPage = ({ searchParams }: EditorMainPageProps) => {
    if (searchParams?.bookId) {
        redirect(`/dashboard/${searchParams.bookId}/editor-book`);
    }

    redirect("/dashboard");
};

export default EditorMainPage;