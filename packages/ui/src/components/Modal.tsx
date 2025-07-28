import type { ReactNode } from 'react';
import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { cn } from '../utils/cn';

/**
 * Modal component with backdrop blur and smooth animations
 */
export const AppModal = ({
  children,
  className,
  isDismissable = true,
  isOpen,
  onClose,
  title,
  trigger,
}: {
  /** Modal content */
  children: ReactNode;

  /** Additional CSS classes for the modal */
  className?: string;

  /** Whether the modal can be dismissed by clicking outside */
  isDismissable?: boolean;

  /** Whether the modal is open */
  isOpen?: boolean;

  /** Function to call when modal should close */
  onClose?: () => void;

  /** Modal title */
  title?: string;

  /** Trigger element to open the modal */
  trigger?: ReactNode;
}) => {
  if (trigger) {
    return (
      <DialogTrigger>
        {trigger}
        <ModalOverlay
          isDismissable={isDismissable}
          className={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
            'flex items-center justify-center p-4',
            'entering:animate-in entering:fade-in-0',
            'exiting:animate-out exiting:fade-out-0'
          )}
        >
          <Modal
            className={cn(
              'bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden',
              'entering:animate-in entering:zoom-in-95 entering:slide-in-from-bottom-8',
              'exiting:animate-out exiting:zoom-out-95 exiting:slide-out-to-bottom-8',
              className
            )}
          >
            <Dialog className='outline-none'>
              {({ close }) => (
                <div className='flex flex-col max-h-[80vh]'>
                  {title && (
                    <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                      <Heading slot='title' className='text-xl font-semibold text-gray-900'>
                        {title}
                      </Heading>
                      <Button
                        onPress={close}
                        className='text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-colors'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                        >
                          <title>Close modal</title>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </Button>
                    </div>
                  )}
                  <div className='p-6 overflow-y-auto flex-1'>{children}</div>
                </div>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    );
  }

  // Controlled modal without trigger
  return (
    <ModalOverlay
      isDismissable={isDismissable}
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose?.()}
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'flex items-center justify-center p-4',
        'entering:animate-in entering:fade-in-0',
        'exiting:animate-out exiting:fade-out-0'
      )}
    >
      <Modal
        className={cn(
          'bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden',
          'entering:animate-in entering:zoom-in-95 entering:slide-in-from-bottom-8',
          'exiting:animate-out exiting:zoom-out-95 exiting:slide-out-to-bottom-8',
          className
        )}
      >
        <Dialog className='outline-none'>
          {({ close }) => (
            <div className='flex flex-col max-h-[80vh]'>
              {title && (
                <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                  <Heading slot='title' className='text-xl font-semibold text-gray-900'>
                    {title}
                  </Heading>
                  <Button
                    onPress={() => {
                      close();
                      onClose?.();
                    }}
                    className='text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-colors'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <title>Close modal</title>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </Button>
                </div>
              )}
              <div className='p-6 overflow-y-auto flex-1'>{children}</div>
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};
