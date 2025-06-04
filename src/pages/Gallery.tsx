import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Download, Plus } from 'lucide-react';

// Sample data showcasing different effects with the perfume
const sampleVideos = [
  {
    id: 1,
    title: "Luxury Perfume - Banner Unroll",
    effect: "Banner Unroll",
    description: "Elegant vertical unroll revealing the perfume with a subtle shimmer effect",
    thumbnail: "/ads.png",
    date: "2025-06-15"
  },
  {
    id: 2,
    title: "Luxury Perfume - 3D Rotate",
    effect: "3D Rotate",
    description: "Smooth 360° rotation highlighting the bottle's design",
    thumbnail: "/ads.png",
    date: "2025-06-14"
  },
  {
    id: 3,
    title: "Luxury Perfume - Zoom & Shine",
    effect: "Zoom & Shine",
    description: "Dynamic zoom with light reflections on the glass",
    thumbnail: "/ads.png",
    date: "2025-06-12"
  },
  {
    id: 4,
    title: "Luxury Perfume - Color Splash",
    effect: "Color Splash",
    description: "Dramatic color transition emphasizing the blue tones",
    thumbnail: "/ads.png",
    date: "2025-06-10"
  },
  {
    id: 5,
    title: "Luxury Perfume - Particle Burst",
    effect: "Particle Burst",
    description: "Elegant particle animation surrounding the bottle",
    thumbnail: "/ads.png",
    date: "2025-06-08"
  }
];

const Gallery: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CGI Effect Examples</h1>
        <Link to="/create" className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Create New
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleVideos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="card overflow-hidden"
          >
            <div className="relative group">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-64 object-contain bg-gray-50 p-4"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-3 bg-white rounded-full transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="h-6 w-6 text-primary-600" />
                </button>
              </div>
              <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 text-sm rounded-full">
                {video.effect}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{video.description}</p>
              
              <div className="flex justify-between">
                <button className="btn btn-outline text-sm py-1 px-3">
                  <Play className="h-4 w-4 mr-1" />
                  Preview
                </button>
                <button className="btn btn-primary text-sm py-1 px-3">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;