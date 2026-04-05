import type { FC, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './index.css';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '250px',
  },
};

type SearchBarProps = {
  className?: string;
  value: string;
  setValue: (value: string) => void;
  setPage: (value: number) => void;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const SearchBar: FC<SearchBarProps> = ({
  value,
  setValue,
  setPage,
  placeholder = 'Search...',
  className = '',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(localValue);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [localValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
  };

  return (
    <div className={`search-container ${className}`}>
      <input
        className="search-input"
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};
