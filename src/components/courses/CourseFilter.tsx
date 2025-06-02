import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CourseFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  availableTags: string[];
}

const CourseFilter: React.FC<CourseFilterProps> = ({
  onSearch,
  onFilter,
  availableTags,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const applyFilters = () => {
    onFilter({
      level: selectedLevel,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };
  
  const resetFilters = () => {
    setSelectedLevel(null);
    setSelectedTags([]);
    setPriceRange([0, 100]);
    onFilter({});
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
      <div className="p-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} />}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            variant="primary"
            className="ml-2"
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="ml-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <X size={18} /> : <Filter size={18} />}
          </Button>
        </form>
      </div>
      
      {showFilters && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Level</h3>
              <div className="space-y-2">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="level"
                      checked={selectedLevel === level}
                      onChange={() => setSelectedLevel(level)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFilter;