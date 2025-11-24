import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase } from '../../lib/supabase';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  bucket: string;
  label?: string;
  accept?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  bucket,
  label = 'Rasm yuklash',
  accept = 'image/*'
}) => {
  const { isDark } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      console.log('ImageUpload: Uploading file to Supabase:', fileName, bucket);

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      console.log('ImageUpload: Upload successful, public URL:', publicUrl);
      onImageChange(publicUrl);
    } catch (error) {
      console.error('ImageUpload: Upload failed:', error);
      alert('Rasm yuklashda xatolik yuz berdi');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('ImageUpload: File selected:', file.name, file.size, file.type);
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      console.log('ImageUpload: File dropped:', file.name, file.size, file.type);
      uploadFile(file);
    }
  };

  const handleRemove = () => {
    onImageChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        {label}
      </label>

      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isUploading
              ? 'border-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
              : isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-pointer'
              : isDark
              ? 'border-gray-600 hover:border-gray-500 bg-gray-800 cursor-pointer'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50 cursor-pointer'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : isDragging ? (
              <Upload className="w-12 h-12 text-blue-500" />
            ) : (
              <ImageIcon className={`w-12 h-12 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            )}
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {isUploading ? 'Yuklanmoqda...' : isDragging ? 'Rasmni tashlang' : 'Rasm yuklash uchun bosing yoki torting'}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              PNG, JPG, WEBP (max. 5MB)
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
