import { Pizza, EggFried, Carrot, Drumstick, Fish, Salad } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header
      className="relative bg-cover bg-center min-h-[400px] overflow-hidden"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* Animated Food Icons with Framer Motion */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          className="absolute left-10 top-10"
          animate={{ y: [0, -30, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Pizza className="text-orange-300 opacity-80 w-14 h-14" />
        </motion.div>
        <motion.div
          className="absolute right-16 top-24"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <EggFried className="text-yellow-200 opacity-80 w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute left-1/3 top-32"
          animate={{ y: [0, 25, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Carrot className="text-orange-400 opacity-80 w-10 h-10" />
        </motion.div>
        <motion.div
          className="absolute right-1/4 bottom-16"
          animate={{ y: [0, -18, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Drumstick className="text-orange-200 opacity-80 w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute left-1/4 bottom-10"
          animate={{ y: [0, -22, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Fish className="text-blue-300 opacity-80 w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute right-10 top-10"
          animate={{ y: [0, 30, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Salad className="text-green-300 opacity-80 w-14 h-14" />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-0"></div>
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-extrabold text-white">
            <span className="text-white text-15xl">AI Recipe </span>
            <span className="text-orange-400 text-15xl">Generator</span>
          </h1>
          <p className="mt-4 text-white/90 text-2xl max-w-2xl">
            Transform your ingredients into delicious recipes with AI-powered
            suggestions, complete with nutritional information and dietary
            preferences.
          </p>
        </div>
      </div>
    </header>
  );
}
