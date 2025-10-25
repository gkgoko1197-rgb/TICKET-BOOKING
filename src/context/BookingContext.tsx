
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Booking = {
  id: string;
  type: 'flight' | 'accommodation';
  title: string;
  details: string;
  date: string;
};

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  hasNewBookings: boolean;
  markAsViewed: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [hasNewBookings, setHasNewBookings] = useState(false);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    setHasNewBookings(true);
  };

  const markAsViewed = () => {
    setHasNewBookings(false);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, isSidebarOpen, setSidebarOpen, hasNewBookings, markAsViewed }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
