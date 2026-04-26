import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Lock, Envelope, Warning } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full relative">
        {/* Subtle Ambient Glow */}
        <div className="absolute -inset-24 bg-white/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl"
        >
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-2 block">Admin Access</span>
            <h1 className="font-serif text-3xl text-white italic">Welcome Back</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-3 overflow-hidden"
                >
                  <Warning size={16} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 flex items-center gap-2">
                <Envelope size={14} /> Email Address
              </label>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wedding.com"
                className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white font-sans focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white font-sans focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full py-5 rounded-full bg-white text-black font-sans text-sm font-bold tracking-widest uppercase hover:bg-white/90 transition-all active:scale-95 disabled:opacity-50 mt-4 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </motion.div>

        <p className="mt-8 text-center text-white/20 text-[10px] uppercase tracking-[0.3em]">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default Login;
