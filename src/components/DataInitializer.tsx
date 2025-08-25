'use client';

import { useEffect } from 'react';
import { initializeData } from '@/lib/initData';

const DataInitializer = () => {
  useEffect(() => {
    // Initialize data when the app starts
    initializeData();
  }, []);

  // This component doesn't render anything
  return null;
};

export default DataInitializer;
