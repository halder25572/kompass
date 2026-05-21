import EditorPage from "@/components/dashboard/EditorPage";

type EditorBookPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditorBookPage({ params }: EditorBookPageProps) {
    const { id } = await params;
    return <EditorPage bookId={id} />;
}
