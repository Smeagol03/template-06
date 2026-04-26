import { MaskHappy, Drop, Heart, Thermometer } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const Protocol = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mask":
        return <MaskHappy size={32} weight="thin" />;
      case "HandsWash":
        return <Drop size={32} weight="thin" />;
      case "Heart":
        return <Heart size={32} weight="thin" />;
      case "Thermometer":
        return <Thermometer size={32} weight="thin" />;
      default:
        return <Heart size={32} weight="thin" />;
    }
  };

  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-4 block">
            Health & Safety
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 italic">
            Wedding Protocols
          </h2>
          <div className="h-px w-16 bg-white/20 mx-auto" />
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {WEDDING_DATA.protocols.map((protocol, index) => (
            <div
              key={index}
              className="protocol-card flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/2 border border-white/5 hover:border-white/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40 mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-500">
                {getIcon(protocol.icon)}
              </div>
              <h3 className="font-sans text-sm font-bold tracking-widest uppercase text-white mb-4">
                {protocol.title}
              </h3>
              <p className="font-sans text-xs text-white/40 leading-relaxed">
                {protocol.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/20">
            Terima kasih telah membantu kami menjaga kenyamanan bersama
          </p>
        </div>
      </div>
    </section>
  );
};

export default Protocol;
