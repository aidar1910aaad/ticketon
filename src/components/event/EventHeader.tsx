interface Props {
    title?: string;
    imageUrl?: string; // URL изображения
    loading: boolean;
  }
  
  export default function EventHeader({ title, imageUrl, loading }: Props) {
    return (
      <div
        className="w-full h-[400px] bg-gray-700 bg-opacity-70 flex items-center justify-center text-white text-4xl font-bold shadow-md"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {loading ? <div className="animate-pulse w-2/3 h-12 bg-gray-500 rounded-lg"></div> : title}
      </div>
    );
  }
  