import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string, city: string, postalCode: string) => void;
  error?: string;
}

const AddressAutocomplete = ({ value, onChange, error }: AddressAutocompleteProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<GeocoderAutocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (!containerRef.current) return;

    // Free API key - 3000 requests/day, no credit card needed
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY || '';

    autocompleteRef.current = new GeocoderAutocomplete(
      containerRef.current,
      apiKey,
      {
        type: 'street',
        filter: {
          countrycode: ['ca', 'us'], // Canada and US
        },
        placeholder: 'Commencez à taper votre adresse...',
      }
    );

    autocompleteRef.current.on('select', (location: any) => {
      if (!location) return;

      const properties = location.properties;
      const street = properties.street || '';
      const houseNumber = properties.housenumber || '';
      const fullAddress = houseNumber ? `${houseNumber} ${street}` : street;
      const city = properties.city || properties.county || '';
      const postalCode = properties.postcode || '';

      setInputValue(fullAddress);
      onChange(fullAddress, city, postalCode);
    });

    autocompleteRef.current.on('input', (value: string) => {
      setInputValue(value);
      onChange(value, '', '');
    });

    return () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.off('select');
        autocompleteRef.current.off('input');
      }
    };
  }, [onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`address-autocomplete-wrapper ${error ? 'border-destructive' : ''}`}
      />
      <style>{`
        .address-autocomplete-wrapper .geoapify-autocomplete-input {
          width: 100%;
          height: 40px;
          border-radius: 0.375rem;
          border: 1px solid hsl(var(--border));
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          background: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        
        .address-autocomplete-wrapper .geoapify-autocomplete-input:focus {
          outline: none;
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 1px hsl(var(--ring));
        }
        
        .address-autocomplete-wrapper.border-destructive .geoapify-autocomplete-input {
          border-color: hsl(var(--destructive));
        }
        
        .geoapify-autocomplete-items {
          border: 1px solid hsl(var(--border));
          border-radius: 0.375rem;
          background: hsl(var(--background));
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          margin-top: 4px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .geoapify-autocomplete-item {
          padding: 0.75rem;
          cursor: pointer;
          border-bottom: 1px solid hsl(var(--border));
          color: hsl(var(--foreground));
        }
        
        .geoapify-autocomplete-item:hover,
        .geoapify-autocomplete-item.active {
          background: hsl(var(--accent));
        }
        
        .geoapify-autocomplete-item:last-child {
          border-bottom: none;
        }
        
        .geoapify-close-button {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AddressAutocomplete;
