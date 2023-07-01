
import React from 'react';

  /**
   * The `useTitle` function is a custom hook in TypeScript that updates the document title and restores
   * it to the original title when the component unmounts.
   * @param {string} title - The `title` parameter is a string that represents the new title that you
   * want to set for the document.
   */
  export const useTitle = (title: string) => {
      const documentDefined = typeof document !== 'undefined';
      const originalTitle = React.useRef(documentDefined ? document.title : null);
    
      React.useEffect(() => {
        if (!documentDefined) return;
    
        if (document.title !== title) document.title = title;
    
        return () => {
          document.title  = originalTitle.current as string;
        };
      }, []);
    };