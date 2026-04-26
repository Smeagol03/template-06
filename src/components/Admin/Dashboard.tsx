import { useState, useEffect } from "react";
import { ref, onValue, query, orderByChild } from "firebase/database";
import { signOut } from "firebase/auth";
import { db, auth } from "../../lib/firebase";
import { 
  Users, 
  UserPlus, 
  ChatCenteredDots, 
  SignOut, 
  Copy, 
  Check, 
  WhatsappLogo, 
  Link as LinkIcon,
  MagnifyingGlass,
  ArrowSquareOut
} from "@phosphor-icons/react";
import { WEDDING_DATA } from "../../constants/data";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"guests" | "generator">("guests");
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Generator State
  const [guestName, setGuestName] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const responsesRef = query(ref(db, "demo/responses"), orderByChild("timestamp"));
    const unsubscribe = onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse();
        setResponses(list);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const stats = {
    total: responses.length,
    attending: responses.filter(r => r.status === "hadir").length,
    totalGuests: responses
      .filter(r => r.status === "hadir")
      .reduce((acc, curr) => acc + (parseInt(curr.guests) || 0), 0)
  };

  const filteredResponses = responses.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSignOut = () => signOut(auth);

  const generatedUrl = `${WEDDING_DATA.baseUrl}/?to=${encodeURIComponent(guestName)}`;
  
  const messageTemplate = `Assalamu'alaikum Wr. Wb.

Bismillahirramanirrahim.
Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i ${guestName || '[Nama Tamu]'} untuk menghadiri acara pernikahan kami.

"Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan pernikahan kami."

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami berdua.

Silakan klik tautan di bawah ini untuk melihat detail undangan:
${generatedUrl}

Atas kehadiran dan doa restunya, kami ucapkan terima kasih.

Wassalamu'alaikum Wr. Wb.

Kami yang berbahagia,
${WEDDING_DATA.couple.groom.name.split(' ')[0]} & ${WEDDING_DATA.couple.bride.name.split(' ')[0]}`;

  const copyToClipboard = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black">
              <Users size={24} weight="fill" />
            </div>
            <div>
              <h1 className="font-serif text-lg leading-tight">Admin Console</h1>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Wedding Management</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex bg-white/5 rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setActiveTab("guests")}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'guests' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Guest List
              </button>
              <button 
                onClick={() => setActiveTab("generator")}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'generator' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Generator
              </button>
            </div>
            
            <button 
              onClick={handleSignOut}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-red-500/20 hover:border-red-500/20 transition-all"
            >
              <SignOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b border-white/5 bg-black/20">
        <button 
          onClick={() => setActiveTab("guests")}
          className={`flex-1 py-4 text-[10px] font-bold tracking-[0.2em] uppercase border-b-2 transition-all ${activeTab === 'guests' ? 'border-white text-white' : 'border-transparent text-white/20'}`}
        >
          Guest List
        </button>
        <button 
          onClick={() => setActiveTab("generator")}
          className={`flex-1 py-4 text-[10px] font-bold tracking-[0.2em] uppercase border-b-2 transition-all ${activeTab === 'generator' ? 'border-white text-white' : 'border-transparent text-white/20'}`}
        >
          Generator
        </button>
      </div>

      <main className="max-w-7xl mx-auto p-6 py-10">
        <AnimatePresence mode="wait">
          {activeTab === "guests" ? (
            <motion.div 
              key="guests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Total RSVPs", value: stats.total, icon: ChatCenteredDots, color: "text-blue-400" },
                  { label: "Attending", value: stats.attending, icon: Users, color: "text-emerald-400" },
                  { label: "Total Persons", value: stats.totalGuests, icon: UserPlus, color: "text-purple-400" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                      <stat.icon size={24} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                      <p className="text-3xl font-serif">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Card */}
              <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="font-serif text-xl">Recent Responses</h2>
                  <div className="relative max-w-sm w-full">
                    <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input 
                      type="text"
                      placeholder="Search guests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-6 py-3 rounded-full bg-white/5 border border-white/5 text-sm focus:outline-none focus:border-white/20 transition-all"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                        <th className="px-8 py-5 font-medium">Guest Name</th>
                        <th className="px-8 py-5 font-medium">Status</th>
                        <th className="px-8 py-5 font-medium text-center">Qty</th>
                        <th className="px-8 py-5 font-medium">Message</th>
                        <th className="px-8 py-5 font-medium text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center">
                            <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin mx-auto" />
                          </td>
                        </tr>
                      ) : filteredResponses.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center text-white/20 italic font-serif">
                            No guests found
                          </td>
                        </tr>
                      ) : filteredResponses.map((res) => (
                        <tr key={res.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="px-8 py-5">
                            <p className="text-sm font-medium text-white/80">{res.name}</p>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`text-[10px] font-bold uppercase tracking-tighter px-3 py-1 rounded-full ${res.status === 'hadir' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                              {res.status === 'hadir' ? 'Attending' : 'Not Attending'}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-center text-sm text-white/40">{res.guests}</td>
                          <td className="px-8 py-5">
                            <p className="text-xs text-white/40 italic max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
                              "{res.message || "No message"}"
                            </p>
                          </td>
                          <td className="px-8 py-5 text-right text-[10px] text-white/20 uppercase tracking-widest">
                            {new Date(res.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="generator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="p-8 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-10">
                <div className="text-center">
                  <h2 className="font-serif text-3xl mb-2 italic">Link Generator</h2>
                  <p className="text-white/40 text-sm">Create personalized invitation links for your guests.</p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 flex items-center gap-2">
                      <UserPlus size={14} /> Guest Name
                    </label>
                    <input 
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Budi Santoso"
                      className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white font-sans focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 flex items-center gap-2">
                      <LinkIcon size={14} /> Personalized Link
                    </label>
                    <div className="relative">
                      <input 
                        readOnly
                        type="text"
                        value={generatedUrl}
                        className="w-full px-6 py-4 pr-16 rounded-full bg-black/40 border border-white/5 text-white/60 font-sans text-sm overflow-hidden text-ellipsis"
                      />
                      <button 
                        onClick={() => copyToClipboard(generatedUrl, setCopiedLink)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        {copiedLink ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} className="text-white/40" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const waUrl = `https://wa.me/?text=${encodeURIComponent(messageTemplate)}`;
                      window.open(waUrl, "_blank");
                    }}
                    className="w-full py-5 rounded-full bg-emerald-500 text-white font-sans text-sm font-bold tracking-widest uppercase hover:bg-emerald-400 transition-all flex items-center justify-center gap-3"
                  >
                    <WhatsappLogo size={20} weight="fill" />Bagikan</button>
                </div>
              </div>
              
              <div className="p-8 rounded-[2.5rem] bg-white/[0.01] border border-dashed border-white/5 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                    <ArrowSquareOut size={20} />
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Tamu akan melihat nama mereka di halaman pembuka <br /> dan link akan otomatis melompat ke bagian detail.
                  </p>
                </div>
                <a href="/" target="_blank" className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white underline underline-offset-4 whitespace-nowrap">Preview Page</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
