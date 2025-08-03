import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ConfirmDeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteAccountModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteAccountModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl p-6 shadow-xl transition-all text-white">
              <Dialog.Title className="text-lg font-semibold text-red-400">
                Confirm Account Deletion
              </Dialog.Title>

              <div className="mt-2">
                <p className="text-sm text-gray-300">
                  This action will permanently delete your account and all your
                  information.
                  <br />
                  Are you sure you want to continue?
                </p>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors duration-300 ease-in-out"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 ease-in-out"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  Yes, delete account
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmDeleteAccountModal;
