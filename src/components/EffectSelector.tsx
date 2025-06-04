import React from 'react';
import { motion } from 'framer-motion';

interface Effect {
  id: string;
  name: string;
  description: string;
}

interface EffectSelectorProps {
  effects: Effect[];
  selectedEffect: string | null;
  onSelectEffect: (effectId: string) => void;
}

const EffectSelector: React.FC<EffectSelectorProps> = ({ 
  effects, 
  selectedEffect, 
  onSelectEffect 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {effects.map((effect) => (
        <motion.div
          key={effect.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectEffect(effect.id)}
          className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
            selectedEffect === effect.id 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start">
            <div className="mr-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedEffect === effect.id 
                  ? 'border-primary-500' 
                  : 'border-gray-400'
              }`}>
                {selectedEffect === effect.id && (
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-1">{effect.name}</h3>
              <p className="text-sm text-gray-600">{effect.description}</p>
            </div>
          </div>
          
          {/* We would show a preview image or animation here in a real implementation */}
          <div className="mt-3 w-full h-24 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-sm text-gray-400">Effect Preview</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EffectSelector;