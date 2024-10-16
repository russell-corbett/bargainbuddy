export default function TechPage() {
    return (
      <div className="bg-white min-h-screen p-8">
        {/* Page Heading */}
        <div className="mt-12 relative">
          <h1 className="text-black text-6xl font-newsreader">Tech</h1>
          <div className="absolute top-12 right-0 flex space-x-4">
            <button className="px-4 py-2 bg-lime-800 text-white rounded-2xl font-semibold">Default</button>
            <button className="px-4 py-2 border border-stone-300 text-black rounded-2xl font-semibold">A-Z</button>
            <button className="px-4 py-2 border border-stone-300 text-black rounded-2xl font-semibold">List view</button>
          </div>
        </div>
  
        {/* Product Cards */}
        <div className="grid grid-cols-3 gap-8 mt-12">
            {/* Product 1 */}
            <div className="bg-stone-50 rounded-3xl border-2 border-neutral-200 p-4 relative">
            <img src="https://via.placeholder.com/395x296"className="w-full h-72 object-cover rounded-t-3xl" />
            <h2 className="text-black text-xl font-semibold mt-4">Product Name</h2>
            <p className="text-lime-800 text-xl font-semibold">Price</p>
            <p className="text-neutral-500">Store Name</p>
            </div>

            {/* Product 2 */}
            <div className="bg-stone-50 rounded-3xl border-2 border-neutral-200 p-4 relative">
            <img src="https://via.placeholder.com/395x296"className="w-full h-72 object-cover rounded-t-3xl" />
            <h2 className="text-black text-xl font-semibold mt-4">Product Name</h2>
            <p className="text-lime-800 text-xl font-semibold">Price</p>
            <p className="text-neutral-500">Store Name</p>
            </div>

            {/* Product 3 */}
            <div className="bg-stone-50 rounded-3xl border-2 border-neutral-200 p-4 relative">
            <img src="https://via.placeholder.com/395x296"className="w-full h-72 object-cover rounded-t-3xl" />
            <h2 className="text-black text-xl font-semibold mt-4">Product Name</h2>
            <p className="text-lime-800 text-xl font-semibold">Price</p>
            <p className="text-neutral-500">Store Name</p>
            </div>
        </div>
      </div>
    );
  }
  