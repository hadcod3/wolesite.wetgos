
'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  buttonVariant?: "default" | "ghost" | "outline" | "link";
  onSearch: (query: string, categoryId?: string) => void;
  defaultValue?: string;
  selectedCategoryId?: string;
}

export function SearchBar({
  placeholder = "Search...",
  className = "",
  buttonVariant = "outline",
  onSearch,
  defaultValue = "",
  selectedCategoryId
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchQuery, selectedCategoryId);
    }, 300); // debounce (optional)

    return () => clearTimeout(timeout);
  }, [searchQuery, selectedCategoryId, onSearch]); 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategoryId);
  };
  return (
    <form onSubmit={handleSubmit} className={`flex w-full items-center ${className}`}>
      <Input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-12 focus-visible:ring-0 text-2xl"
      />
      <Button
        type="submit"
        variant={buttonVariant}
        className="h-12 aspect-square bg-green-700 hover:bg-green-800 cursor-pointer transition-colors duration-300 ease"
      >
        <SearchIcon size={20} className="stroke-zinc-50" />
      </Button>
    </form>
  );
}
