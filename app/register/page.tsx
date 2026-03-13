"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Church, 
  Heart, 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import { cn } from "@/lib/utils";

// --- Types ---
interface FormData {
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  residence: string;
  church_id: string;
  status: string;
  occupation_info: string;
  is_baptized: boolean;
  is_confirmed: boolean;
  is_saved: boolean;
  ministry_role: string;
  leader_position: string;
  comments: string;
}

// --- Steps ---
const steps = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Church & Parish", icon: Church },
  { id: 3, title: "Social Status", icon: GraduationCap },
  { id: 4, title: "Spiritual Status", icon: Heart },
];

export default function YouthRegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Hierarchy state
  const [churches, setChurches] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    date_of_birth: "",
    gender: "MALE",
    phone: "",
    email: "",
    residence: "",
    church_id: "",
    status: "STUDENT",
    occupation_info: "",
    is_baptized: false,
    is_confirmed: false,
    is_saved: false,
    ministry_role: "Member",
    leader_position: "",
    comments: "",
  });

  useEffect(() => {
    // Fetch churches for the dropdown
    fetch("/api/church")
      .then(res => res.json())
      .then(data => setChurches(data))
      .catch(err => console.error("Failed to load churches", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    setDirection(1);
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let photoUrl = "";
      
      // 1. Upload photo if exists
      if (photo) {
        const uploadData = new FormData();
        uploadData.append("file", photo);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
        const uploadJson = await uploadRes.json();
        photoUrl = uploadJson.url;
      }

      // 2. Submit Youth Data
      const response = await fetch("/api/youth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, photo_url: photoUrl }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Submission failed"}`);
      }
    } catch (error) {
      console.error("Submission error", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-none shadow-2xl bg-white overflow-hidden text-center">
            <div className="h-2 bg-green-500" />
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 size={48} />
                </div>
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-slate-900 mb-4">Registration Complete!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Thank you for registering with the Nairobi Diocese Youth Ministry. 
                Your information has been successfully received. Welcome to our community!
              </p>
              <Button 
                variant="primary" 
                className="w-full h-12 text-lg shadow-lg shadow-primary/20"
                onClick={() => window.location.href = "/"}
              >
                Go Back Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <Logo width={220} height={80} className="mb-4" />
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight">Youth Registration</h1>
          <p className="text-slate-500 mt-2 font-medium">Join the Nairobi Diocese Youth Ministry community</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 px-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            
            {/* Active Progress Line */}
            <motion.div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0" 
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
            />

            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div className={cn(
                    "h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isActive ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-white border-slate-200 text-slate-400",
                    isCurrent && "ring-4 ring-primary/20"
                  )}>
                    <Icon size={isActive ? 20 : 18} />
                  </div>
                  <span className={cn(
                    "hidden md:block absolute -bottom-8 whitespace-nowrap text-[10px] md:text-sm font-bold uppercase tracking-wider transition-colors",
                    isActive ? "text-primary" : "text-slate-400"
                  )}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-none shadow-xl bg-white overflow-hidden mt-16 md:mt-20">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              <div className="relative min-h-[450px] p-6 md:p-10">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full"
                  >
                    {/* Step 1: Personal Details */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          {/* Photo Upload Side */}
                          <div className="w-full md:w-1/3 flex flex-col items-center">
                            <div className="relative group cursor-pointer" onClick={() => document.getElementById('photo-input')?.click()}>
                              <div className="h-40 w-40 md:h-48 md:w-48 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                                {photoPreview ? (
                                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                  <div className="text-center p-4">
                                    <Camera size={32} className="mx-auto text-slate-400 mb-2 group-hover:text-primary transition-colors" />
                                    <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors uppercase">Upload Profile Photo</span>
                                  </div>
                                )}
                              </div>
                              <input id="photo-input" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                              <div className="mt-2 text-center">
                                <span className="text-[10px] text-slate-400 font-medium">JPEG, PNG Max 5MB</span>
                              </div>
                            </div>
                          </div>

                          {/* Fields Side */}
                          <div className="w-full md:w-2/3 space-y-4">
                            <Input label="Full Name" name="full_name" placeholder="Enter your full name" value={formData.full_name} onChange={handleInputChange} required />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Input label="Date of Birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleInputChange} required />
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Gender</label>
                                <select 
                                  name="gender" 
                                  value={formData.gender} 
                                  onChange={handleInputChange}
                                  className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                >
                                  <option value="MALE">Male</option>
                                  <option value="FEMALE">Female</option>
                                  <option value="OTHER">Other</option>
                                </select>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Input label="Phone Number" name="phone" placeholder="+254..." value={formData.phone} onChange={handleInputChange} required />
                              <Input label="Email Address" name="email" type="email" placeholder="example@email.com" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <Input label="Place of Residence" name="residence" placeholder="e.g., Makadara, Nairobi" value={formData.residence} onChange={handleInputChange} required />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Church Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-start gap-4">
                          <AlertCircle className="text-primary mt-1" size={20} />
                          <div>
                            <h4 className="text-sm font-bold text-primary italic">Note on Church Selection</h4>
                            <p className="text-xs text-primary/80 mt-1">Please select the local church where you are currently a member. This helps your local leaders manage your information better.</p>
                          </div>
                        </div>

                        <div className="space-y-6 max-w-2xl mx-auto">
                          <div className="space-y-2">
                             <label className="text-sm font-bold text-slate-700 ml-1">Your Local Church</label>
                             <select 
                                name="church_id" 
                                value={formData.church_id} 
                                onChange={handleInputChange}
                                required
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                             >
                               <option value="">-- Choose Church --</option>
                               {churches.map((church) => (
                                 <option key={church.id} value={church.id}>
                                   {church.name} ({church.parish?.name})
                                 </option>
                               ))}
                             </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Your Role in Youth Ministry</label>
                            <div className="grid grid-cols-2 gap-4">
                              <button 
                                type="button" 
                                onClick={() => setFormData(prev => ({ ...prev, ministry_role: 'Member', leader_position: '' }))}
                                className={cn(
                                  "p-4 rounded-xl border-2 text-center transition-all",
                                  formData.ministry_role === 'Member' ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-slate-100 hover:border-slate-200"
                                )}
                              >
                                <User className="mx-auto mb-2" size={24} />
                                <span className="text-sm font-bold">Member</span>
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setFormData(prev => ({ ...prev, ministry_role: 'Leader' }))}
                                className={cn(
                                  "p-4 rounded-xl border-2 text-center transition-all",
                                  formData.ministry_role === 'Leader' ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-slate-100 hover:border-slate-200"
                                )}
                              >
                                <Church className="mx-auto mb-2" size={24} />
                                <span className="text-sm font-bold">Leader</span>
                              </button>
                            </div>
                          </div>

                          {formData.ministry_role === 'Leader' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                              <Input label="Your Position (if Leader)" name="leader_position" placeholder="e.g., Chairman, Secretary, Treasurer..." value={formData.leader_position} onChange={handleInputChange} required />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Social & Educational Status */}
                    {currentStep === 3 && (
                      <div className="space-y-8 max-w-2xl mx-auto">
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-slate-700 ml-1">Current Status</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['STUDENT', 'WORKING', 'SELF_EMPLOYED', 'OTHER'].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, status: s }))}
                                className={cn(
                                  "py-3 px-2 rounded-lg border text-[10px] md:text-xs font-black uppercase tracking-widest transition-all",
                                  formData.status === s ? "bg-primary border-primary text-white" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                                )}
                              >
                                {s.replace('_', ' ')}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Input 
                          label={
                            formData.status === 'STUDENT' ? "School / College Name" :
                            formData.status === 'WORKING' ? "Employer / Company Name" :
                            formData.status === 'SELF_EMPLOYED' ? "Business Name" : "Specify Details"
                          } 
                          name="occupation_info" 
                          placeholder="Please enter details here..." 
                          value={formData.occupation_info} 
                          onChange={handleInputChange} 
                          required 
                        />

                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Additional Comments / Feedback</label>
                           <textarea 
                             name="comments" 
                             rows={4} 
                             value={formData.comments} 
                             onChange={handleInputChange}
                             placeholder="Anything else you'd like to share?"
                             className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                           />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Spiritual Status */}
                    {currentStep === 4 && (
                      <div className="space-y-10 max-w-2xl mx-auto py-4 text-center">
                        <div className="inline-block p-4 bg-accent/20 rounded-2xl mb-2">
                          <Heart className="text-accent-foreground" size={48} fill="currentColor" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-heading font-black text-slate-900 italic">"Raising a Godly Generation"</h3>
                        <p className="text-slate-500 font-medium">Please indicate your current spiritual milestones in the Anglican Church.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {[
                             { id: 'is_baptized', label: 'Baptized', emoji: '💧' },
                             { id: 'is_confirmed', label: 'Confirmed', emoji: '⛪' },
                             { id: 'is_saved', label: 'Saved', emoji: '🕊️' },
                           ].map((check) => (
                             <label key={check.id} className="cursor-pointer group">
                               <input 
                                 type="checkbox" 
                                 name={check.id} 
                                 checked={(formData as any)[check.id]} 
                                 onChange={handleInputChange}
                                 className="hidden peer"
                               />
                               <div className="p-8 rounded-2xl border-2 border-slate-50 bg-slate-50/50 flex flex-col items-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 group-hover:scale-105">
                                  <span className="text-4xl mb-3">{check.emoji}</span>
                                  <span className={cn(
                                    "text-sm font-black uppercase tracking-tighter",
                                    (formData as any)[check.id] ? "text-primary" : "text-slate-400"
                                  )}>
                                    {check.label}
                                  </span>
                                  <div className={cn(
                                    "mt-4 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                    (formData as any)[check.id] ? "bg-primary border-primary text-white" : "bg-white border-slate-200"
                                  )}>
                                    {(formData as any)[check.id] && <CheckCircle2 size={16} />}
                                  </div>
                               </div>
                             </label>
                           ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Buttons */}
              <div className="bg-slate-50/50 px-6 py-8 md:px-10 border-t flex items-center justify-between">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={prevStep} 
                  disabled={currentStep === 1 || isLoading}
                  className="gap-2 font-bold uppercase tracking-widest text-[10px]"
                >
                  <ChevronLeft size={16} /> Back
                </Button>

                {currentStep === steps.length ? (
                  <Button 
                    type="submit" 
                    variant="primary" 
                    loading={isLoading}
                    className="gap-2 h-12 px-10 shadow-lg shadow-primary/20 text-sm font-black uppercase tracking-widest"
                  >
                    Complete Registration <ChevronRight size={18} />
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="primary" 
                    onClick={nextStep}
                    className="gap-2 h-12 px-10 shadow-lg shadow-primary/20 text-sm font-black uppercase tracking-widest"
                  >
                    Continue <ChevronRight size={18} />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Support Link */}
        <p className="text-center mt-10 text-sm text-slate-500 font-medium italic">
          Need help? Contact the Diocese Secretariat at <span className="text-primary font-bold">secretariat@ndym.org</span>
        </p>
      </div>
    </div>
  );
}
