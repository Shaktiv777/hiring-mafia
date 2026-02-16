
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Crown, Gem } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const REGISTRATION_DEADLINE = new Date(Date.now() + 60 * 60 * 1000);

const plans = {
  basic: {
    name: "Starter",
    price: 500,
    duration: "2 Weeks",
    accent: "text-slate-200",
    border: "border-slate-700",
    badge: "Most Affordable",
    features: [
      "Resume Refinement by Experts",
      "ATS Optimization (90+ Structure)",
      "4 Mentoring Sessions",
      "Access to 200+ Active Roles"
    ]
  },
  pro: {
    name: "Pro",
    price: 3499,
    duration: "4 Months",
    accent: "text-indigo-300",
    border: "border-indigo-500/40",
    badge: "Most Popular",
    features: [
      "Full Resume Rebuild",
      "Strategic ATS Positioning",
      "35 Strategy Sessions",
      "1500+ Premium Openings",
      "Role-Specific Resume Positioning"
    ]
  },
  elite: {
    name: "Elite Mafia",
    price: 5994,
    duration: "6 Months",
    accent: "text-amber-300",
    border: "border-amber-400/40",
    badge: "Best Value",
    features: [
      "High-End Resume Engineering",
      "Advanced Hiring Strategy",
      "50 Private Career Strategy Calls",
      "3000+ High-Salary Roles",
      "Personal Brand Elevation"
    ]
  }
};

function SmoothDigit({ value }) {
  return (
    <div className="relative w-14 md:w-16 h-16 md:h-20 bg-slate-900 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.25)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute text-2xl md:text-4xl font-bold text-amber-400"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [activePlan, setActivePlan] = useState("pro");
  const [timeLeft, setTimeLeft] = useState(0);

  const current = plans[activePlan];

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = REGISTRATION_DEADLINE.getTime() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    const diff = REGISTRATION_DEADLINE.getTime() - Date.now();
    setTimeLeft(diff > 0 ? diff : 0);
  }, 1000);
  return () => clearInterval(interval);
}, []);


/* 🔥 ADD THIS RIGHT BELOW */
useEffect(() => {
  const loadRazorpayButton = () => {
    const container = document.getElementById("razorpay-button-container");
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";

    if (activePlan === "basic") {
      script.setAttribute("data-payment_button_id", "pl_SGayQhu4UeuUlf");
    }
    if (activePlan === "pro") {
      script.setAttribute("data-payment_button_id", "pl_SGaxQbuKBnBidi");
    }
    if (activePlan === "elite") {
      script.setAttribute("data-payment_button_id", "pl_SGasRTmKBLH4hB");
    }

    script.async = true;

    const form = document.createElement("form");
    form.appendChild(script);
    container.appendChild(form);
  };

  loadRazorpayButton();
}, [activePlan]);


  const minutes = useMemo(
    () => String(Math.floor(timeLeft / 60000)).padStart(2, "0"),
    [timeLeft]
  );

  const seconds = useMemo(
    () => String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, "0"),
    [timeLeft]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1a3a] to-black text-white">

      {/* TIMER */}
      <div className="flex flex-col items-center pt-10 pb-8">
        <p className="text-xs tracking-widest text-amber-300/70 uppercase mb-4">
          Registration Closing Soon
        </p>
        <div className="flex items-center gap-3">
          <SmoothDigit value={minutes[0]} />
          <SmoothDigit value={minutes[1]} />
          <span className="text-3xl md:text-4xl font-bold text-amber-400">:</span>
          <SmoothDigit value={seconds[0]} />
          <SmoothDigit value={seconds[1]} />
        </div>
      </div>

      {/* HEADER */}
      <section className="text-center pb-10 px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Crown className="w-7 h-7 text-amber-400" />
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-300 to-white bg-clip-text text-transparent">
            Hiring Mafia
          </h1>
          <Gem className="w-6 h-6 text-amber-400" />
        </div>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Accelerate your career with structured mentorship, elite job access, and strategic positioning.
        </p>
      </section>

      {/* PLAN SELECTOR */}
      <div className="flex justify-center pb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-full p-2 flex gap-2">
          {Object.keys(plans).map((key) => (
            <button
              key={key}
              onClick={() => setActivePlan(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activePlan === key
                  ? "bg-white text-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              ₹{plans[key].price}
            </button>
          ))}
        </div>
      </div>

      {/* PRICING CARD */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        <Card className={`bg-slate-900 border ${current.border} rounded-2xl p-8`}>
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <h2 className={`text-lg font-semibold ${current.accent}`}>
                {current.name} Plan
              </h2>
              <span className="text-xs bg-amber-400 text-black px-2 py-1 rounded-full">
                {current.badge}
              </span>
            </div>

            <div className="text-2xl font-bold text-amber-300 mb-5">
              ₹{current.price}
              <span className="text-sm text-slate-400 ml-2">
                / {current.duration}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              {current.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 mt-1" />
                  <p className="text-sm text-slate-100">{feature}</p>
                </div>
              ))}
            </div>

            <Button className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold">
  

<div className="mt-6 flex justify-center">
  <div id="razorpay-button-container"></div>
</div>


            <p className="text-xs text-slate-500 mt-3 text-center">
              100% secure payment • Instant confirmation • GST invoice provided
            </p>
          </CardContent>
        </Card>
      </div>

      {/* TONIGHT FLOW */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-8">Tonight's Flow</h2>
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-amber-500 text-black text-xs px-3 py-1 rounded-full font-semibold">Step 1</span>
              <span className="text-sm text-slate-400">9:00 – 9:30 PM</span>
            </div>
            <h3 className="font-semibold mb-3">ATS Resume Makeover</h3>
            <ul className="text-sm text-slate-300 space-y-2 mb-4">
              <li>• Fix summary, skills & projects for SDE/Data/ML/Full-Stack</li>
              <li>• Add impact bullets (+metrics) recruiters scan for</li>
              <li>• Score 90–95+ on ATS — live</li>
            </ul>
            <Button className="bg-slate-800 border border-slate-600 text-white">
              Get Resume Template
            </Button>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-amber-500 text-black text-xs px-3 py-1 rounded-full font-semibold">Step 2</span>
              <span className="text-sm text-slate-400">9:30 – 10:00 PM</span>
            </div>
            <h3 className="font-semibold mb-3">Hiring Sprint: Apply Together</h3>
            <ul className="text-sm text-slate-300 space-y-2 mb-4">
              <li>• 50–100+ verified links (FAANG, unicorns, MNCs)</li>
              <li>• Shortlist hack: role-wise filters, referral notes</li>
              <li>• Done-in-call applications</li>
            </ul>
            <Button className="bg-slate-800 border border-slate-600 text-white">
              Unlock Apply Links
            </Button>
          </div>
        </div>
      </div>

      {/* APPLY BASED ON ROLE */}
      <div className="max-w-6xl mx-auto px-6 pb-24 mt-16">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:col-span-1 h-full">
            <h3 className="text-xl font-semibold mb-4">Apply Based on Role</h3>
            <p className="text-sm text-slate-300 mb-4">How to Edit Your Resume</p>
            <ol className="text-sm text-slate-400 space-y-2">
              <li>1. Click on File in the top-left</li>
              <li>2. Click on Make a copy</li>
              <li>3. Edit your Name, College, CGPA, Email, Contact, LinkedIn</li>
            </ol>
            <p className="text-xs text-slate-500 mt-4">
              Tip: Match skills, keywords & projects to the JD.
            </p>
          </div>

          <div className="md:col-span-2 grid sm:grid-cols-2 gap-8 h-full">
            {[
              "Software Developer (SDE)",
              "Data Analyst",
              "Java Full-Stack Developer",
              "Machine Learning Developer"
            ].map((role, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between min-h-[180px]"
              >
                <div>
                  <p className="text-xs text-slate-400 mb-2">Resume {index + 1}</p>
                  <h4 className="font-semibold mb-6">{role}</h4>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold w-fit px-5">
                  CLICK TO START
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

