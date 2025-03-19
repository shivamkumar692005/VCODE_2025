import React, { useState } from 'react';
import { Heart, ZoomIn } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  title: string;
  height: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1682687220742-aba19b51f36e",
    title: "Sunset vibes",
    height: "h-[300px]"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1682687221038-404670bd5121",
    title: "Mountain escape",
    height: "h-[400px]"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1682687220198-88e9bdea9931",
    title: "Urban life",
    height: "h-[350px]"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1682687220067-dced0a5fbb6f",
    title: "Nature's beauty",
    height: "h-[280px]"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1682687220509-61b8a906ca19",
    title: "City lights",
    height: "h-[320px]"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae",
    title: "Beach day",
    height: "h-[360px]"
  }
];

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400 tracking-wider">
        Awesome Photo Gallery
      </h1>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mx-auto max-w-7xl">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative mb-4 break-inside-avoid group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className={`relative ${photo.height} overflow-hidden rounded-xl ring-2 ring-gray-700 group-hover:ring-cyan-500 transition-all duration-300`}>
              <img
                src={`${photo.url}?auto=format&fit=crop&w=800`}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-lg font-semibold text-cyan-300">{photo.title}</p>
                </div>
              </div>
              <button
                onClick={(e) => toggleLike(photo.id, e)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm"
              >
                <Heart
                  className={`w-6 h-6 ${
                    likedPhotos.has(photo.id)
                      ? "fill-pink-500 text-pink-500"
                      : "text-gray-300 hover:text-pink-400"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <img
              src={`${selectedPhoto.url}?auto=format&fit=crop&w=1200`}
              alt={selectedPhoto.title}
              className="w-full h-full object-contain rounded-lg ring-4 ring-cyan-500/30"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm"
            >
              <ZoomIn className="w-6 h-6 text-cyan-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;