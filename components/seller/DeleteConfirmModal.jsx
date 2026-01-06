'use client';
import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="card-dark p-6 max-w-md w-full border-2 border-red-500/30 shadow-2xl animate-fadeInScale">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-red-500/10 border border-red-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-2">
            Delete Product?
          </h2>

          <p className="text-slate-300 text-center mb-6">
            Are you sure you want to delete <span className="font-semibold text-cyan-400">"{productName}"</span>?
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-6 py-3 bg-slate-800 text-slate-100 font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmModal;
