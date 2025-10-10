import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../contexts/ThemeContext';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  bucket?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onImageChange, bucket = 'team-images', label = 'Rasm yuklash' }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const { isDark } = useTheme();

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setPreview(data.publicUrl);
      onImageChange(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Rasm yuklashda xatolik yuz berdi!');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Rasm hajmi 5MB dan kichik bo\'lishi kerak!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    uploadImage(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange('');
  };

  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        {label}
      </label>

      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-lg object-cover border-2 border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className={`w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center ${
            isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
          }`}>
            <ImageIcon className={`w-8 h-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>
        )}

        <div className="flex-1">
          <label
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
              uploading
                ? 'opacity-50 cursor-not-allowed'
                : isDark
                ? 'border-gray-600 hover:border-blue-500 bg-gray-700 hover:bg-gray-600'
                : 'border-gray-300 hover:border-blue-500 bg-white hover:bg-gray-50'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>
              {uploading ? 'Yuklanmoqda...' : 'Rasm tanlang'}
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
          <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            JPG, PNG, WEBP (max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
