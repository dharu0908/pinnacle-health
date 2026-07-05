export interface Condition {
  id: string;
  name: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  conditions: string[];
}

export interface BookingFormState {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  apptType: string;
  apptMode: string;
  message: string;
}

export interface AppointmentRequest extends BookingFormState {
  id: string;
  submittedAt: string;
  status: 'Pending' | 'Confirmed' | 'Declined';
}
