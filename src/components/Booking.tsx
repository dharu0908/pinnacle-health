import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Mail, Phone, Heart, Check, Clock, Trash2 } from 'lucide-react';
import { BookingFormState, AppointmentRequest } from '../types';
import { APPOINTMENT_TYPES, APPOINTMENT_MODES } from '../data';

export default function Booking() {
  const [formData, setFormData] = useState<BookingFormState>({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    apptType: '',
    apptMode: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<BookingFormState>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookings, setBookings] = useState<AppointmentRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'my-bookings'>('form');

  // Load existing bookings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pinnacle_bookings');
      if (saved) {
        setBookings(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading bookings', e);
    }
  }, []);

  // Save bookings to localStorage when they change
  const saveBookings = (newBookings: AppointmentRequest[]) => {
    try {
      localStorage.setItem('pinnacle_bookings', JSON.stringify(newBookings));
      setBookings(newBookings);
    } catch (e) {
      console.error('Error saving bookings', e);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof BookingFormState]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const tempErrors: Partial<BookingFormState> = {};
    if (!formData.fname.trim()) tempErrors.fname = 'First name is required';
    if (!formData.lname.trim()) tempErrors.lname = 'Last name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{7,15}$/.test(formData.phone)) {
      tempErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.apptType) tempErrors.apptType = 'Please select an appointment type';
    if (!formData.apptMode) tempErrors.apptMode = 'Please select a preferred format';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const newBooking: AppointmentRequest = {
        ...formData,
        id: 'booking_' + Date.now(),
        submittedAt: new Date().toLocaleDateString('en-CA', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Pending'
      };

      const updatedBookings = [newBooking, ...bookings];
      saveBookings(updatedBookings);
      setIsSubmitted(true);
      
      // Reset form fields
      setFormData({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        apptType: '',
        apptMode: '',
        message: ''
      });
    }
  };

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment request?')) {
      const updated = bookings.filter((b) => b.id !== id);
      saveBookings(updated);
    }
  };

  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 22, stiffness: 80, duration: 0.6 }
    }
  };

  const consultationOptions = [
    {
      icon: '🕐',
      title: 'Initial Consultation (Adults)',
      desc: '60–90 minutes · Comprehensive health intake · Remedy prescription included'
    },
    {
      icon: '👶',
      title: 'Pediatric Consultation',
      desc: '45–60 minutes · For infants, children & teens · Parent/guardian present'
    },
    {
      icon: '🔄',
      title: 'Follow-Up Visit',
      desc: '30–45 minutes · Progress review & remedy adjustment · Existing patients only'
    },
    {
      icon: '💬',
      title: 'Free Discovery Call (15 min)',
      desc: 'Not sure if homeopathy is right for you? Let’s chat — no obligation, no charge.'
    }
  ];

  return (
    <section id="book" className="py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Booking Info Column - Left */}
          <div className="lg:col-span-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={scrollRevealVariants}
              className="flex flex-col"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sage-dark mb-3">
                <span className="w-5 h-[1px] bg-sage" />
                <span>Appointments</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-light text-forest leading-tight mb-6">
                Book a <span className="font-serif italic text-sage-dark">consultation</span>
              </h2>

              <p className="text-sm sm:text-base font-light text-text-soft leading-relaxed mb-8">
                I'd love to meet you and understand how I can support your health journey. Reach out to schedule your first consultation — in-person in Windsor or virtually from anywhere in Ontario.
              </p>

              {/* Consultation Options List */}
              <div className="flex flex-col gap-4">
                {consultationOptions.map((opt, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-cream border border-cream-dark/60 rounded-md shadow-xs hover:border-sage-light transition-all"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-xs flex-shrink-0">
                      {opt.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-forest">
                        {opt.title}
                      </h4>
                      <p className="text-xs text-text-soft font-light mt-0.5 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Interactive Panel - Right */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={scrollRevealVariants}
              className="bg-cream border border-cream-dark/70 rounded-md p-6 sm:p-8 relative overflow-hidden shadow-xs flex flex-col"
            >
              {/* Header colored bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sage-light via-sage to-sage-dark" />

              {/* Tab Navigation (Form vs My Bookings) */}
              <div className="flex border-b border-cream-dark/80 pb-4 mb-6 gap-6">
                <button
                  onClick={() => {
                    setActiveTab('form');
                    setIsSubmitted(false);
                  }}
                  className={`text-xs font-semibold uppercase tracking-widest pb-2 border-b-2 cursor-pointer transition-all ${
                    activeTab === 'form'
                      ? 'border-forest text-forest'
                      : 'border-transparent text-text-soft/60 hover:text-text-soft'
                  }`}
                >
                  Request Consultation
                </button>
                <button
                  onClick={() => setActiveTab('my-bookings')}
                  className={`text-xs font-semibold uppercase tracking-widest pb-2 border-b-2 cursor-pointer transition-all relative flex items-center gap-1.5 ${
                    activeTab === 'my-bookings'
                      ? 'border-forest text-forest'
                      : 'border-transparent text-text-soft/60 hover:text-text-soft'
                  }`}
                >
                  My Bookings
                  {bookings.length > 0 && (
                    <span className="bg-sage text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      {bookings.length}
                    </span>
                  )}
                </button>
              </div>

              {activeTab === 'form' ? (
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="booking-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="mb-4">
                        <h3 className="font-serif text-xl font-medium text-forest mb-1">
                          Request an Appointment
                        </h3>
                        <p className="text-xs text-text-soft font-light">
                          Fill out the form and I'll get back to you within one business day to confirm your time.
                        </p>
                      </div>

                      {/* Names Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label htmlFor="fname" className="text-[10px] font-semibold tracking-wider uppercase text-forest mb-1.5">
                            First Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="fname"
                              placeholder="Jane"
                              value={formData.fname}
                              onChange={handleInputChange}
                              className={`w-full bg-white border ${
                                errors.fname ? 'border-red-400 focus:border-red-400' : 'border-cream-dark/80 focus:border-sage'
                              } rounded-sm px-3.5 py-2.5 text-xs focus:ring-3 focus:ring-sage/5 transition-all outline-hidden`}
                            />
                            <User className="w-3.5 h-3.5 text-text-soft/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                          {errors.fname && (
                            <span className="text-[10px] text-red-500 font-medium mt-1">{errors.fname}</span>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="lname" className="text-[10px] font-semibold tracking-wider uppercase text-forest mb-1.5">
                            Last Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="lname"
                              placeholder="Smith"
                              value={formData.lname}
                              onChange={handleInputChange}
                              className={`w-full bg-white border ${
                                errors.lname ? 'border-red-400 focus:border-red-400' : 'border-cream-dark/80 focus:border-sage'
                              } rounded-sm px-3.5 py-2.5 text-xs focus:ring-3 focus:ring-sage/5 transition-all outline-hidden`}
                            />
                            <User className="w-3.5 h-3.5 text-text-soft/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                          {errors.lname && (
                            <span className="text-[10px] text-red-500 font-medium mt-1">{errors.lname}</span>
                          )}
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-[10px] font-semibold tracking-wider uppercase text-forest mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            placeholder="jane@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-white border ${
                              errors.email ? 'border-red-400 focus:border-red-400' : 'border-cream-dark/80 focus:border-sage'
                            } rounded-sm px-3.5 py-2.5 text-xs focus:ring-3 focus:ring-sage/5 transition-all outline-hidden`}
                          />
                          <Mail className="w-3.5 h-3.5 text-text-soft/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.email && (
                          <span className="text-[10px] text-red-500 font-medium mt-1">{errors.email}</span>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div className="flex flex-col">
                        <label htmlFor="phone" className="text-[10px] font-semibold tracking-wider uppercase text-forest mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            placeholder="(519) 000-0000"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full bg-white border ${
                              errors.phone ? 'border-red-400 focus:border-red-400' : 'border-cream-dark/80 focus:border-sage'
                            } rounded-sm px-3.5 py-2.5 text-xs focus:ring-3 focus:ring-sage/5 transition-all outline-hidden`}
                          />
                          <Phone className="w-3.5 h-3.5 text-text-soft/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.phone && (
                          <span className="text-[10px] text-red-500 font-medium mt-1">{errors.phone}</span>
                        )}
                      </div>

                      {/* Selection dropdown: Appointment Type */}
                      <div className="flex flex-col">
                        <label htmlFor="apptType" className="text-[10px] font-semibold tracking-wider uppercase text-forest mb-1.5">
                          Appointment Type
                        </label>
                        <select
                          id="apptType"
                          value={formData.apptType}
                          onChange={handleInputChange}
                          className={`w-full bg-white border ${
                            errors.apptType ? 'border-red-400 focus:border-red-400' : 'border-cream-dark/80 focus:border-sage'
                          } rounded-sm px-3.5 py-2.5 text-xs focus:ring-3 focus:ring-sage/5 transition-all outline-hidden`}
                        >
                          <option value="">Select appointment type…</option>
                          {APPOINTMENT_TYPES.map((type, idx) => (
                            <option key={idx} value={type}>{type}</option>
                          ))}
                        </select>
                        {errors.apptType && (
                          <span className="text-[10px] text-red-500 font-medium mt-1">{errors.apptType}</span>
                        )}
                      </div>

                      {/* Selection dropdown: Preferred Format */}
                      <div className="flex flex-col">
                        <label htmlFor="apptMode" className="text-[10px] font-semibold tracking-wider uppercase text-forest mb-1.5">
                          Preferred Format
                        </label>
                        <select
                          id="apptMode"
                          value={formData.apptMode}
                          onChange={handleInputChange}
                          className={`w-full bg-white border ${
                            errors.apptMode ? 'border-red-400 focus:border-red-400' : 'border-cream-dark/80 focus:border-sage'
                          } rounded-sm px-3.5 py-2.5 text-xs focus:ring-3 focus:ring-sage/5 transition-all outline-hidden`}
                        >
                          <option value="">In-person or virtual?</option>
                          {APPOINTMENT_MODES.map((mode, idx) => (
                            <option key={idx} value={mode}>{mode}</option>
                          ))}
                        </select>
                        {errors.apptMode && (
                          <span className="text-[10px] text-red-500 font-medium mt-1">{errors.apptMode}</span>
                        )}
                      </div>

                      {/* Description Textarea */}
                      <div className="flex flex-col">
                        <label htmlFor="message" className="text-[10px] font-semibold tracking-wider uppercase text-forest mb-1.5">
                          Brief Description of Your Concern (Optional)
                        </label>
                        <textarea
                          id="message"
                          placeholder="Please share what brings you in — even a brief description helps me prepare for our conversation."
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full bg-white border border-cream-dark/80 focus:border-sage rounded-sm px-3.5 py-2.5 text-xs focus:ring-3 focus:ring-sage/5 transition-all outline-hidden resize-y min-h-[70px]"
                        />
                      </div>

                      {/* Action Button */}
                      <button
                        type="submit"
                        className="w-full py-3.5 mt-2 bg-forest hover:bg-sage-dark text-cream text-xs font-semibold tracking-widest uppercase rounded-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer text-center"
                      >
                        Send Appointment Request
                      </button>

                      <p className="text-center text-[10px] text-text-soft/60 italic pt-2">
                        Your information is kept strictly confidential in accordance with Ontario privacy legislation.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="booking-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 px-4"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-sage-light to-sage rounded-full flex items-center justify-center text-cream shadow-md mx-auto mb-6">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif text-2xl font-light text-forest mb-3">
                        Thank you!
                      </h4>
                      <p className="text-sm text-text-soft leading-relaxed max-w-sm mx-auto mb-6">
                        Your request has been successfully received. Pooja Jani will be in touch within one business day to confirm your appointment. We look forward to meeting you.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setActiveTab('my-bookings');
                        }}
                        className="inline-flex items-center gap-2 border border-sage hover:bg-sage hover:text-white text-forest font-semibold text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-sm transition-all cursor-pointer"
                      >
                        View My Bookings
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <div className="space-y-4">
                  <div className="mb-4">
                    <h3 className="font-serif text-xl font-medium text-forest mb-1">
                      Your Submitted Requests
                    </h3>
                    <p className="text-xs text-text-soft font-light">
                      Review or manage your booked consult requests saved on your device cache.
                    </p>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-cream-dark rounded-md bg-white/50">
                      <Clock className="w-8 h-8 text-text-soft/40 mx-auto mb-3" />
                      <p className="text-xs text-text-soft/60">No pending requests found on this browser.</p>
                      <button
                        onClick={() => setActiveTab('form')}
                        className="text-xs font-semibold text-sage-dark underline mt-2 hover:text-forest cursor-pointer"
                      >
                        Book your first session
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                      {bookings.map((b) => (
                        <div
                          key={b.id}
                          className="bg-white border border-cream-dark/60 rounded-md p-4 relative shadow-2xs hover:border-sage-light transition-all"
                        >
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <div>
                              <span className="text-[10px] font-bold text-sage-dark uppercase tracking-wider bg-sage/10 px-2 py-0.5 rounded-sm mr-2">
                                {b.status}
                              </span>
                              <span className="text-[10px] text-text-soft font-medium">
                                {b.submittedAt}
                              </span>
                            </div>
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="text-text-soft/40 hover:text-red-500 transition-colors p-1 rounded-sm cursor-pointer"
                              title="Cancel Request"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h5 className="text-xs sm:text-sm font-semibold text-forest mb-1">
                            {b.fname} {b.lname}
                          </h5>

                          <div className="text-[11px] text-text-soft space-y-0.5 font-light">
                            <p><strong>Type:</strong> {b.apptType}</p>
                            <p><strong>Format:</strong> {b.apptMode}</p>
                            {b.message && (
                              <p className="italic mt-1.5 border-l-2 border-cream-dark/60 pl-2 text-[10px]">
                                "{b.message}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
