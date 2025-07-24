import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as  Info, Zap } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

export const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    royalties: '10',
    category: 'art',
    properties: [{ key: '', value: '' }]
  });
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
//   const { isDark } = useTheme();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle property changes
  const handlePropertyChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedProperties = [...formData.properties];
    updatedProperties[index][field] = value;
    setFormData(prev => ({
      ...prev,
      properties: updatedProperties
    }));
  };

  // Add new property
  const addProperty = () => {
    setFormData(prev => ({
      ...prev,
      properties: [...prev.properties, { key: '', value: '' }]
    }));
  };

  // Remove property
  const removeProperty = (index: number) => {
    const updatedProperties = [...formData.properties];
    updatedProperties.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      properties: updatedProperties
    }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size exceeds 10MB limit');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size exceeds 10MB limit');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!previewImage) {
      toast.error('Please upload an image for your NFT');
      return;
    }
    
    // Here you would typically connect to the blockchain and mint the NFT
    toast.success('NFT created successfully! Redirecting to your profile...');
    
    // In a real app, you would redirect to the newly created NFT detail page
    // or show a success screen with transaction details
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent mb-4">
            Create New NFT
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create, sell and collect digital items secured by blockchain technology. Express your creativity and earn rewards in the decentralized marketplace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Upload */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 sticky top-32">
              <h2 className="text-xl font-semibold text-white mb-4">Upload File</h2>
              
              <div 
                className={`border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-[#14F195] bg-[#14F195]/10' : 'border-white/20 hover:border-[#9945FF]/50 hover:bg-white/5'}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={previewImage} 
                      alt="NFT Preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:bg-red-500/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-4 rounded-full bg-white/10 mb-4">
                      <Upload className="w-8 h-8 text-[#9945FF]" />
                    </div>
                    <p className="text-white font-medium mb-2">Drag and drop file</p>
                    <p className="text-gray-400 text-sm mb-4">PNG, JPG, GIF, WEBP or MP4. Max 10MB.</p>
                    <button 
                      type="button"
                      className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      Browse Files
                    </button>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*,video/mp4"
                  className="hidden" 
                />
              </div>
              
              <div className="mt-4 p-4 bg-[#9945FF]/10 border border-[#9945FF]/20 rounded-lg">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-[#9945FF] mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-300">
                    Your file will be minted as an NFT on the Solana blockchain. Gas fees will apply when listing for sale.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Form Fields */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">NFT Details</h2>
              
              {/* Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="NFT Name"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent"
                />
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-white font-medium mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of your NFT"
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent resize-none"
                />
              </div>
              
              {/* Price and Royalties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="price" className="block text-white font-medium mb-2">Price (SOL)</label>
                  <div className="relative">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent"
                    />
                    <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#14F195] w-5 h-5" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="royalties" className="block text-white font-medium mb-2">Royalties (%)</label>
                  <input
                    type="number"
                    id="royalties"
                    name="royalties"
                    value={formData.royalties}
                    onChange={handleInputChange}
                    placeholder="10"
                    min="0"
                    max="50"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Category */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-white font-medium mb-2">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27 stroke=%27%23ffffff%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="art">Art</option>
                  <option value="collectibles">Collectibles</option>
                  <option value="photography">Photography</option>
                  <option value="music">Music</option>
                  <option value="video">Video</option>
                  <option value="sports">Sports</option>
                  <option value="utility">Utility</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Properties */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-white font-medium">Properties</label>
                  <button
                    type="button"
                    onClick={addProperty}
                    className="px-3 py-1 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-colors"
                  >
                    Add Property
                  </button>
                </div>
                
                {formData.properties.map((property, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <input
                      type="text"
                      value={property.key}
                      onChange={(e) => handlePropertyChange(index, 'key', e.target.value)}
                      placeholder="Key"
                      className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={property.value}
                      onChange={(e) => handlePropertyChange(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent"
                    />
                    {formData.properties.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProperty(index)}
                        className="p-2 bg-white/10 rounded-lg text-white hover:bg-red-500/20 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 mt-6 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#9945FF]/30 transition-all duration-300"
              >
                Create NFT
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
