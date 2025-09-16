
import React from 'react';

type SVGProps = React.SVGProps<SVGSVGElement>;

export const LogoIcon: React.FC<SVGProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.378 1.602a.75.75 0 00-.756 0L3.366 6.134a.75.75 0 00-.366.648v10.434c0 .28.144.536.38.68l8.25 5.026a.75.75 0 00.752 0l8.25-5.026a.75.75 0 00.38-.68V6.782a.75.75 0 00-.366-.648L12.378 1.602zM12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
    <path d="M12 3.101l7.634 4.364-4.256 2.593a4.998 4.998 0 01-6.756 0L4.366 7.465 12 3.1zM4.5 8.356l4.256 2.593a5 5 0 012.244 4.31v5.185l-6.5-3.962V8.356zm15 0v8.126l-6.5 3.962v-5.185a5 5 0 012.244-4.31l4.256-2.593z" />
  </svg>
);

export const SpinnerIcon: React.FC<SVGProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const SparklesIcon: React.FC<SVGProps> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.894 2.553a1 1 0 00-1.789 0l-2 4a1 1 0 00.95 1.447h4a1 1 0 00.95-1.447l-2-4zM10 18a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1zM2 11a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zm14 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM6.343 4.929a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414L6.343 6.343a1 1 0 010-1.414zm8.486 8.486a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zM4.929 13.657a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm8.486-8.486a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0z" />
  </svg>
);

export const XMarkIcon: React.FC<SVGProps> = (props) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const PaperAirplaneIcon: React.FC<SVGProps> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.894 2.553a1 1 0 00-1.789 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

export const ChatBubbleIcon: React.FC<SVGProps> = (props) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.05 1.05 0 01-1.485 0l-3.72-3.72a2.122 2.122 0 01-1.485-.618c-.377-.377-.618-.885-.618-1.485V10.608c0-.97.616-1.813 1.5-2.097m6.75 0a3.75 3.75 0 10-7.5 0" />
  </svg>
);

export const ChecklistIcon: React.FC<SVGProps> = (props) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PlusIcon: React.FC<SVGProps> = (props) => (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);
