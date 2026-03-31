import bannerImg from "../assets/banner.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = [
  {
    id: 1,
    name: "AI Landing Pro",
    description: "Create stunning landing pages with AI-powered design tools.",
    price: 29,
    period: "monthly",
    tag: "Popular",
    tagType: "popular",
    features: ["100+ templates", "AI copywriting", "A/B testing", "Analytics"],
    icon: "🚀",
  },
  {
    id: 2,
    name: "Design Templates Plus",
    description: "Access 500+ premium design templates for any project.",
    price: 19,
    period: "monthly",
    tag: "New",
    tagType: "new",
    features: ["500+ templates", "Figma export", "Commercial license", "Updates"],
    icon: "🎨",
  },
  {
    id: 3,
    name: "Personal Stock Assets",
    description: "Unlimited access to premium stock photos and videos.",
    price: 9,
    period: "monthly",
    tag: "Best Seller",
    tagType: "best-seller",
    features: ["1M+ assets", "4K videos", "Commercial use", "No attribution"],
    icon: "📸",
  },
  {
    id: 4,
    name: "Automation Toolkit",
    description: "Automate repetitive tasks and boost your productivity.",
    price: 39,
    period: "monthly",
    tag: "Popular",
    tagType: "popular",
    features: ["100+ automations", "Zapier integration", "API access", "Support"],
    icon: "⚙️",
  },
  {
    id: 5,
    name: "Resume Builder Pro",
    description: "Create ATS-optimized resumes that get you hired faster.",
    price: 15,
    period: "monthly",
    tag: "New",
    tagType: "new",
    features: ["50+ templates", "ATS checker", "PDF export", "Cover letter"],
    icon: "📄",
  },
  {
    id: 6,
    name: "Social Media Content AI",
    description: "Generate engaging social media content with AI assistance.",
    price: 24,
    period: "monthly",
    tag: "Best Seller",
    tagType: "best-seller",
    features: ["AI content", "Scheduler", "Analytics", "Multi-platform"],
    icon: "📱",
  },
];

function TagBadge({ tagType, tag }) {
  const styles = {
    popular: "bg-blue-100 text-blue-700",
    new: "bg-green-100 text-green-700",
    "best-seller": "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[tagType]}`}>
      {tag}
    </span>
  );
}

function ProductCard({ product, onAddToCart, addedIds }) {
  const isAdded = addedIds.has(product.id);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-6 gap-3">
      <div className="flex items-start justify-between">
        <div className="text-3xl">{product.icon}</div>
        <TagBadge tagType={product.tagType} tag={product.tag} />
      </div>
      <h3 className="font-bold text-gray-800 text-base">{product.name}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{product.description}</p>
      <ul className="space-y-1">
        {product.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-blue-500">✓</span> {f}
          </li>
        ))}
      </ul>
      <div className="flex items-end gap-1">
        <span className="text-2xl font-black text-gray-800">${product.price}</span>
        <span className="text-gray-400 text-sm mb-1">/{product.period}</span>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${isAdded
          ? "bg-green-500 text-white cursor-default"
          : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
      >
        {isAdded ? "✓ Added" : "Buy Now"}
      </button>
    </div>
  );
}

function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4">
      <div className="text-2xl">{item.icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
        <p className="text-xs text-gray-400">{item.period}</p>
      </div>
      <span className="font-bold text-gray-700">${item.price}</span>
      <button
        onClick={() => onRemove(item.id)}
        className="w-7 h-7 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold transition"
      >
        ✕
      </button>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("products");

  const addedIds = new Set(cart.map((c) => c.id));
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleAddToCart = (product) => {
    if (addedIds.has(product.id)) return;
    setCart((prev) => [...prev, product]);
    toast.success(`"${product.name}" added to cart!`, { autoClose: 2000 });
  };

  const handleRemove = (id) => {
    const item = cart.find((c) => c.id === id);
    setCart((prev) => prev.filter((c) => c.id !== id));
    toast.error(`"${item?.name}" removed!`, { autoClose: 2000 });
  };

  const handleCheckout = () => {
    setCart([]);
    toast.success("Checkout successful! 🎉", { autoClose: 3000 });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" />

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-blue-600 font-black text-xl">DigiTools</span>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a href="#products" className="hover:text-gray-800">Products</a>
            <a href="#features" className="hover:text-gray-800">Features</a>
            <a href="#pricing" className="hover:text-gray-800">Pricing</a>
            <a href="#" className="hover:text-gray-800">Testimonials</a>
            <a href="#" className="hover:text-gray-800">FAQ</a>
          </div>
          <div className="flex items-center gap-3">

            <button
              onClick={() => setActiveTab("cart")}
              className="relative text-gray-500 hover:text-gray-800 text-xl mr-2"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-800 mr-2">Login</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition">
              Get Started
            </button>

          </div>
        </div>
      </nav>

      {/* BANNER */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              ✦ New: AI-Powered Tools Available
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Supercharge Your<br />Digital Workflow
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Access premium AI tools, design assets, templates, and productivity software all in one place. Start creating faster today.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("products")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Explore Products
              </button>
              <button className="flex items-center bg-gray-100 gap-2 text-gray-600 font-semibold px-6 py-3 rounded-full transition">
                ▶ Watch Demo
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-65 h-65 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center text-7xl shadow-inner">
              <img src={bannerImg} alt="hero" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

       {/* STATS */}
      <section className="bg-blue-600 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 text-center text-white">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "200+", label: "Premium Tools" },
            { value: "4.9", label: "Rating" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black">{s.value}</div>
              <div className="text-blue-200 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS / CART */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-black text-gray-800 text-center mb-2">Premium Digital Tools</h2>
        <p className="text-gray-400 text-center text-sm mb-8">Everything you need to build, design, and grow</p>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${activeTab === "products" ? "bg-blue-600 text-white shadow" : "text-gray-500"
                }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("cart")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === "cart" ? "bg-blue-600 text-white shadow" : "text-gray-500"
                }`}
            >
              Cart
              {cart.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} addedIds={addedIds} />
            ))}
          </div>
        )}

        {activeTab === "cart" && (
          <div className="max-w-lg mx-auto">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-4">🛒</div>
                <p className="font-semibold">Your cart is empty</p>
                <button
                  onClick={() => setActiveTab("products")}
                  className="mt-4 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-blue-700 transition"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} onRemove={handleRemove} />
                ))}
                <div className="bg-white rounded-xl border border-gray-100 p-4 flex justify-between">
                  <span className="font-semibold text-gray-600">Total ({cart.length} items)</span>
                  <span className="font-black text-xl text-gray-800">${total}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* STEPS */}
      <section id="features" className="bg-white py-14 px-6">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-black text-gray-800">Get Started In 3 Steps</h2>
          <p className="text-gray-400 text-sm mt-2">Simple onboarding, powerful results</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", icon: "👤", title: "Create Account", desc: "Sign up for free and explore our full suite of digital tools." },
            { step: "02", icon: "🛠️", title: "Choose Products", desc: "Select the tools that match your workflow and goals." },
            { step: "03", icon: "🚀", title: "Start Creating", desc: "Launch your projects with AI-powered tools and templates." },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">
                {s.icon}
              </div>
              <span className="text-xs text-blue-400 font-bold tracking-widest">STEP {s.step}</span>
              <h3 className="font-bold text-gray-800">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-14 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-black text-gray-800">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-sm mt-2">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Starter", price: "$0", desc: "Perfect for beginners", features: ["5 tools", "Basic templates", "Email support"], highlight: false },
            { name: "Pro", price: "$29", desc: "Most popular choice", features: ["All tools", "200+ templates", "Priority support", "API access"], highlight: true },
            { name: "Enterprise", price: "$99", desc: "For large teams", features: ["Unlimited tools", "Custom templates", "Dedicated support", "SLA"], highlight: false },
          ].map((p) => (
            <div key={p.name} className={`rounded-2xl p-6 flex flex-col gap-4 ${p.highlight ? "bg-blue-600 text-white shadow-xl scale-105" : "bg-white border border-gray-100"}`}>
              <div>
                <div className={`font-bold text-lg ${p.highlight ? "text-white" : "text-gray-800"}`}>{p.name}</div>
                <div className={`text-3xl font-black mt-1 ${p.highlight ? "text-white" : "text-gray-800"}`}>{p.price}<span className="text-sm font-normal">/mo</span></div>
                <div className={`text-sm mt-1 ${p.highlight ? "text-blue-200" : "text-gray-400"}`}>{p.desc}</div>
              </div>
              <ul className="space-y-2 flex-1">
                {p.features.map((f) => (
                  <li key={f} className={`text-sm flex items-center gap-2 ${p.highlight ? "text-blue-100" : "text-gray-600"}`}>
                    <span className={p.highlight ? "text-white" : "text-blue-500"}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`py-2.5 rounded-xl font-semibold text-sm transition ${p.highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-blue-600 py-14 px-6 text-center text-white">
        <h2 className="text-2xl font-black mb-2">Ready To Transform Your Workflow?</h2>
        <p className="text-blue-200 text-sm mb-6">Join 50,000+ professionals using DigiTools</p>
        <div className="flex justify-center gap-3">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition">
            Get Started
          </button>
          <button className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="text-white font-black text-lg mb-2">DigiTools</div>
            <p className="text-sm">Premium digital tools for modern creators.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Templates", "API"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Support", links: ["Help Center", "Contact", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold mb-3 text-sm">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          © 2026 DigiTools. All rights reserved.
        </div>
      </footer>
    </div>
  );
}