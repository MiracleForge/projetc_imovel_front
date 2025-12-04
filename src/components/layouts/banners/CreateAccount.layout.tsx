export default function CreateAccountBanner() {
  return (

    <div className="my-8 border-b border-b-foreground pb-8">
      <div className="">
        <div className="md:flex mt-8 md:-mx-4">
          <div
            className="relative w-full h-72 md:h-96 mt-8 md:mx-4 overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2 rounded-2xl before:absolute before:inset-0 before:bg-linear-to-t before:from-black/60 before:to-black/10 before:z-10 brightness-125"
            style={{ backgroundImage: "url('/banners/features/apartamentos-decorados.png')" }}
          >
            <div className="relative z-20 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Apartamentos decorados</h2>
                <p className="mt-2 text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.
                </p>
                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                  <span>Shop Now</span>
                  <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative w-full h-96 mt-8 md:mx-4 overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2 rounded-2xl before:absolute before:inset-0 before:bg-linear-to-t before:from-black/60 before:to-black/10 before:z-10 brightness-125"
            style={{ backgroundImage: "url('/banners/features/compra-na-planta.png')" }}
          >
            <div className="relative z-20 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Imóveis na Planta</h2>
                <p className="mt-2 text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.
                </p>
                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                  <span>Shop Now</span>
                  <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 h-96 rounded-md overflow-hidden bg-right mdbg-cover /aspect-auto /bg-contain bg-no-repeat" style={{ backgroundImage: "url('/banners/features/frame-create-account-banner.png')" }}>
          <div className=" flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-white font-semibold">Sport Shoes</h2>
              <p className="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
              <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Shop Now</span>
                <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
