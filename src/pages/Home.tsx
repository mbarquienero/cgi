import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Film, 
  Image, 
  Sparkles, 
  Zap, 
  RotateCw, 
  Download
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Image className="h-6 w-6 text-primary-600" />,
      title: "Upload Your Product",
      description: "Start with any high-quality product image"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary-600" />,
      title: "Choose Effects",
      description: "Select from 5 stunning CGI effects"
    },
    {
      icon: <Film className="h-6 w-6 text-primary-600" />,
      title: "Generate Video",
      description: "Create professional 5-second ad shorts"
    },
    {
      icon: <Download className="h-6 w-6 text-primary-600" />,
      title: "Download & Share",
      description: "Get your video in HD quality"
    }
  ];

  const effectExamples = [
    {
      name: "Banner Unroll",
      description: "Dramatic reveal with elegant unrolling animation",
      image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Zoom & Shine",
      description: "Cinematic zoom with glamorous light effects",
      image: "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "3D Rotate",
      description: "Professional 360° product rotation",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Create Stunning <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">CGI Ad Videos</span> in Seconds
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your product images into captivating short advertisements with our AI-powered CGI effects.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/create" className="btn btn-primary">
                Create Your Ad
              </Link>
              <Link to="/gallery" className="btn btn-outline">
                View Examples
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/5626105/pexels-photo-5626105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="CGI Ad Creation" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white text-lg font-medium">Professional ads made simple</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to create professional CGI advertisements in just a few simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Effect Showcase */}
      <div className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Stunning CGI Effects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our library of professional effects to make your products stand out
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {effectExamples.map((effect, index) => (
            <motion.div 
              key={index}
              className="overflow-hidden rounded-lg shadow-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative">
                <img 
                  src={effect.image} 
                  alt={effect.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{effect.name}</h3>
                    <p className="text-gray-200 text-sm">{effect.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/create" className="btn btn-primary">
            Try It Now
          </Link>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-700 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Create Stunning Ad Videos?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Transform your product images into professional CGI advertisements in seconds
          </p>
          <Link to="/create" className="btn bg-white text-primary-700 hover:bg-gray-100">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;