import React from 'react';
import styles from './PostItNote.module.css';

// --- A small, self-contained Pin component ---
// We define it here because it's only ever used by the PostItNote.
const Pin = () => <div className={styles.pin}></div>;


// --- TypeScript Interface for our component's props ---
interface PostItNoteProps {
  /** The content to display inside the note */
  children: React.ReactNode;
  
  /** The rotation of the note in degrees (e.g., -5, 10). Defaults to 0. */
  rotation?: number;
  
  /** The color scheme for the note. Defaults to 'yellow'. */
  color?: 'yellow' | 'pink' | 'blue' | 'green';
  
  /** React CSS properties for absolute positioning (e.g., { top: '10%', left: '20%' }) */
  style?: React.CSSProperties;
}

/**
 * A skeuomorphic Post-It Note component with a pin, designed to be
 * placed on a corkboard. It's customizable with colors, rotation, and content.
 */
const PostItNote: React.FC<PostItNoteProps> = ({
  children,
  rotation = 0,
  color = 'yellow',
  style, // This will contain positioning like `top` and `left`
}) => {

  // This is the "correct" way to handle dynamic transforms with hover effects in CSS.
  // We pass the rotation as a CSS custom property (`--rotation`) so the CSS :hover
  // rule can access it and combine it with its own `scale` transform.
  const noteStyle: React.CSSProperties & { [key: string]: string | number | undefined } = {
    '--rotation': `${rotation}deg`, // Pass rotation as a CSS variable
    ...style,                      // Spread the positioning styles (top, left, etc.)
  };

  return (
    // We combine a base class 'note' with a dynamic color class like 'yellow'
    <div 
      className={`${styles.note} ${styles[color]}`} 
      style={noteStyle}
    >
      <Pin />
      <div className={styles.text}>
        {children}
      </div>
    </div>
  );
};

export default PostItNote;