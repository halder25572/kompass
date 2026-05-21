"use client";

import BookEditor from '@/components/editor/BookEditor';

type EditorPageProps = {
    bookId?: string;
};

export default function PageEditor({ bookId }: EditorPageProps) {
    return <BookEditor bookId={bookId} />;
}
