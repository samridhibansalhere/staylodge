import React from 'react';

function Spinner({ fullHeight = false }: { fullHeight?: boolean }) {
  return (
    <div className='flex items-center justify-center' style={{ height: fullHeight ? "85vh" : "auto" }}>
      <div className='h-12 w-12 border-4 border-solid border-azure-200 border-t-transparent rounded-full animate-spin custom-spinner'>
      </div>
    </div>
  );
}

export default Spinner;
