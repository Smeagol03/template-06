import { useState, useRef } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "../lib/firebase";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle,
  Users,
  ChatCenteredDots,
  PaperPlaneTilt,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "hadir",
    guests: "1",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".rsvp-form", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setIsSubmitting(true);
    try {
      const rsvpRef = ref(db, "demo/responses");
      const newRsvpRef = push(rsvpRef);
      await set(newRsvpRef, {
        ...formData,
        timestamp: Date.now(),
      });

      setIsSuccess(true);
      setFormData({ name: "", status: "hadir", guests: "1", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 mb-4 block">
            Reservation
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
            RSVP & Wishes
          </h2>
          <p className="font-sans text-sm text-white/40 leading-relaxed">
            Mohon konfirmasi kehadiran Anda untuk membantu kami menyiapkan hari
            bahagia ini.
          </p>
        </div>

        {/* RSVP Form Card */}
        <div className="rsvp-form relative group">
          <div className="relative z-10 p-8 md:p-12 rounded-[2.5rem] bg-white/2 border border-white/10 backdrop-blur-xl overflow-hidden">
            {isSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} weight="fill" />
                </div>
                <h3 className="font-serif text-2xl text-white italic">
                  Terima Kasih!
                </h3>
                <p className="text-white/50 font-sans text-sm">
                  Pesan dan konfirmasi Anda telah kami terima.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors underline underline-offset-8"
                >
                  Kirim Ucapan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4">
                    Nama Lengkap
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Masukkan nama Anda"
                    className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white font-sans focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                {/* Status & Guests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 flex items-center gap-2">
                      <CheckCircle size={14} /> Kehadiran
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-6 py-4 rounded-full bg-[#1a1a1a] border border-white/10 text-white font-sans focus:outline-none focus:border-white/30 appearance-none transition-colors"
                    >
                      <option value="hadir">Hadir</option>
                      <option value="tidak">Berhalangan Hadir</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 flex items-center gap-2">
                      <Users size={14} /> Jumlah Tamu
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: e.target.value })
                      }
                      className="w-full px-6 py-4 rounded-full bg-[#1a1a1a] border border-white/10 text-white font-sans focus:outline-none focus:border-white/30 appearance-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} Orang
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 flex items-center gap-2">
                    <ChatCenteredDots size={14} /> Ucapan & Doa
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tuliskan ucapan selamat dan doa untuk mempelai..."
                    className="w-full px-6 py-5 rounded-4xl bg-white/5 border border-white/10 text-white font-sans focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="group/btn relative w-full inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-white text-black font-sans text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Kirim</span>
                      <PaperPlaneTilt
                        size={18}
                        weight="bold"
                        className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Outer Shell */}
          <div className="absolute -inset-4 border border-white/5 rounded-[3.5rem] -z-10 opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default RSVP;
