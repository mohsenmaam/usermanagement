import LoadingSpinner from '@/components/LoadingSpinner';

/**
 * Loading Component for App Router
 * Displayed during page transitions
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
