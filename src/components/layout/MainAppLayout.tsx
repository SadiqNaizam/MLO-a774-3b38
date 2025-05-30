import React from 'react';
import { cn } from '@/lib/utils';

// MANDATORY: Define explicit interface with proper types as per layout component general instructions
interface MainAppLayoutProps {
  children: React.ReactNode; // MANDATORY: Always accept children
  title?: string; // Optional: for setting page title or for accessibility
  className?: string;
}

// CRITICAL: Use React.FC with the proper interface
const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  title,
  className,
}) => {
  // Optional: Set document title if `title` prop is provided.
  // This is a common use case for a 'title' prop in a layout component.
  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <main
      className={cn(
        'flex items-center justify-center h-screen bg-background',
        // The above classes implement: Layout Requirements -> overall.definition
        // - flex: enables flexbox
        // - items-center: vertically centers flex items
        // - justify-center: horizontally centers flex items
        // - h-screen: sets height to 100% of viewport height
        // - bg-background: applies the primary background color defined in Tailwind config (via CSS variables)
        className
      )}
    >
      {/* 
        Children passed to this layout (e.g., LoginForm) are expected to provide 
        their own specific styling, such as card appearance, as per 
        Layout Requirements -> mainContent.layout. 
        The LoginForm.tsx provided in context already implements these card styles.
      */}
      {children}
    </main>
  );
};

export default MainAppLayout;
