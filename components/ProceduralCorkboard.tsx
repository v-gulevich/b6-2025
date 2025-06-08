"use client"; 

import React from 'react';
import { useProceduralCork } from '@/hooks/useProceduralCork';
import styles from './Corkboard.module.css'; 

interface ProceduralCorkboardProps {
  children: React.ReactNode;
}

const ProceduralCorkboard: React.FC<ProceduralCorkboardProps> = ({ children }) => {
  const { backgroundUrl, isLoading } = useProceduralCork({
    // You can override default config here if you want
    // e.g., width: 1024, height: 1024
  });

  const boardStyle: React.CSSProperties = {
    // Dynamically set the background image
    backgroundImage: isLoading ? 'none' : `url(${backgroundUrl})`,
    // By generating a smaller, tileable texture, performance is much better.
    backgroundSize: '400px', // The size you want the tile to appear on screen
    backgroundRepeat: 'repeat',
  };

  return (
    <div className={styles.board} style={boardStyle}>
      {/* A loading fallback */}
      {isLoading && <div className={styles.loading}>Generating Texture...</div>}
      
      {/* The rest of the board structure */}
      <div className={styles.light}></div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default ProceduralCorkboard;