import { useState, useEffect } from 'react';
import { supabase, type DeliveryZone } from '@/lib/supabase';

interface Settings {
  freeDeliveryThreshold: number;
  contactEmail: string;
  restaurantType: string;
}

// Cache settings in memory to reduce API calls
let settingsCache: Settings | null = null;
let zonesCache: DeliveryZone[] | null = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    freeDeliveryThreshold: 75,
    contactEmail: 'lemtnacanada@gmail.com',
    restaurantType: 'Canadienne',
  });
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const now = Date.now();
      
      // Use cache if available and fresh
      if (settingsCache && zonesCache && (now - lastFetch) < CACHE_DURATION) {
        setSettings(settingsCache);
        setZones(zonesCache);
        setLoading(false);
        return;
      }

      try {
        // Fetch settings
        const { data: settingsData } = await supabase
          .from('settings')
          .select('key, value');

        if (settingsData) {
          const newSettings: Settings = {
            freeDeliveryThreshold: 75,
            contactEmail: 'lemtnacanada@gmail.com',
            restaurantType: 'Canadienne',
          };

          settingsData.forEach(item => {
            if (item.key === 'free_delivery_threshold') {
              newSettings.freeDeliveryThreshold = parseInt(item.value);
            } else if (item.key === 'contact_email') {
              newSettings.contactEmail = item.value;
            } else if (item.key === 'restaurant_type') {
              newSettings.restaurantType = item.value;
            }
          });

          settingsCache = newSettings;
          setSettings(newSettings);
        }

        // Fetch zones
        const { data: zonesData } = await supabase
          .from('delivery_zones')
          .select('id, name, display_order')
          .order('display_order', { ascending: true });

        if (zonesData) {
          zonesCache = zonesData;
          setZones(zonesData);
        }

        lastFetch = now;
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, zones, loading };
}
