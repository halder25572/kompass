import BookCreator from "@/components/create/BookCreator";


const createPage = () => {
    return (
        <div
            style={{
                backgroundImage: "url('/images/stepBg1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="w-full min-h-screen">
            <BookCreator />
        </div>
    );
};

export default createPage;