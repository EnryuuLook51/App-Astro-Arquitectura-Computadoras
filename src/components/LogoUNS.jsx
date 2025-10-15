export default function LogoUNS() {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="relative p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-red-200/60 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-105">
        <img
          src="/images/logo.png"
          alt="Logo Universidad Nacional del Santa"
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain drop-shadow-sm"
        />
      </div>
    </div>
  );
}
