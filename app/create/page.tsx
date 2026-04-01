import BookCreator from "@/components/create/BookCreator";


const createPage = () => {
    return (
        <div
            style={{
                backgroundImage: "url('/images/stepBg1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="w-full min-h-screen px-4 py-4 sm:px-6 lg:px-8">
            <BookCreator />
        </div>
    );
};

export default createPage;