import {
  FaLeaf,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-40 pb-12 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="glass-panel p-10 md:p-16 border-white/5 bg-slate-900/40 backdrop-blur-3xl shadow-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-16">
            {/* Brand & Purpose */}
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <FaLeaf className="text-xl" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">
                  EcoCulture.
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Architecting the future of travel through responsible AI and
                community-led exploration. Building a bridge between culture and
                sustainability.
              </p>
              <div className="flex gap-4">
                {[FaTwitter, FaInstagram, FaLinkedin, FaGithub].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                    >
                      <Icon />
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-1">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-8">
                Navigation
              </h4>
              <ul className="space-y-4">
                {[
                  "Home",
                  "Destinations",
                  "Map Explorer",
                  "Marketplace",
                  "AI Planner",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase().replace(" ", "")}`}
                      className="text-slate-400 text-sm font-bold hover:text-emerald-400 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 h-0.5 bg-emerald-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legacy & Ethics */}
            <div className="lg:col-span-1">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-8">
                Ethics
              </h4>
              <ul className="space-y-4">
                {[
                  "Carbon Offsetting",
                  "Artisan Fair Pay",
                  "Community Grants",
                  "Eco Certification",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 text-sm font-bold hover:text-emerald-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="lg:col-span-1 space-y-6">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-8">
                Connectivity
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-emerald-500 mt-1" />
                  <p className="text-slate-400 text-sm font-medium">
                    102 EcoHub, IIT Madras Research Park,
                    <br />
                    Chennai, India 600113
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-emerald-500" />
                  <p className="text-slate-400 text-sm font-medium">
                    hello@ecoculture.ai
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhone className="text-emerald-500" />
                  <p className="text-slate-400 text-sm font-medium">
                    +91 44 2257 6000
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              © {new Date().getFullYear()} EcoCulture AI Platform. All rights
              reserved.
            </div>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                Privacy Protocol
              </a>
              <a
                href="#"
                className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                Terms of Journey
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
