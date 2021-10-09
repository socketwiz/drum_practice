import React from 'react';

export default function App(props) {
  const { routes } = props;

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {routes()}
          </div>
        </main>
      </div>
    </div>
  );
}
