import React from "react";

export function NoInternetScreen({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="absolute inset-0 z-[9999] flex flex-col items-center justify-center w-full h-full bg-black/95 backdrop-blur-xl rounded-2xl">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-pink-500/40 via-black to-purple-700/40 rounded-full blur-3xl opacity-80 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-purple-700/30 via-black to-pink-500/30 rounded-full blur-3xl opacity-70 animate-pulse" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full p-8 rounded-2xl bg-black/80 shadow-2xl border border-gray-800">
        <img src="/no-internet.svg" alt="No Internet" className="w-40 h-40 mb-6" />
        <h2 className="text-3xl font-bold text-primary mb-2 tracking-widest">Whoops!!</h2>
        <p className="text-base text-gray-400 mb-6 text-center max-w-xs">
          No Internet connection was found. Check your connection or try again.
        </p>
        <button
          onClick={onRetry}
          className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg tracking-wide"
        >
          Try Again
        </button>
      </div>
    </div>
  );
} 