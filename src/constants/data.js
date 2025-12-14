import featureImage from "../assets/features.png";
import faqImage from "../assets/faq.png";

export const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "FAQ", href: "#faq" },
  { name: "About", href: "#about" },
];

export const HERO_CONTENT = {
  title: "Learn Smarter. \nTeach Better. \nAll in One Platform.",
  subtitle:
    "A simple Learning Management System\nfor students and teachers to manage courses, grades, and learning materials in one place.",
};

export const FEATURES_CONTENT = {
  title: "Features",
  bulletPoints: [
    "Course Creation & Management",
    "Course Enrollment",
    "Study Materials Sharing",
    "Announcements & Notifications",
  ],
  image: featureImage,
};

export const FAQ_CONTENT = {
  title: "Frequently Asked Questions",
  faqs: [
    {
      question: "Who can use this system?",
      answer: "Students and teachers of the university.",
    },
    {
      question: "Can students see their grades online?",
      answer: "Yes, students can view all their marks after logging in.",
    },
    {
      question: "Do students get notifications?",
      answer: "Yes, email notifications are sent for course announcements.",
    },
  ],
  image: faqImage,
};

export const ABOUT_CONTENT = {
  title: "About",
  description:
    "This Learning Management System is an educational project created to learn and practice web development concepts.",
};

export const CTA_CONTENT = {
  title: "Ready to Get Started?",
  subtitle:
    "Create an account today and explore courses, grades, and learning materials easily.",
  buttonText: "Register Now",
};

export const FOOTER_CONTENT = {
  text: "© 2025 Learning Management System. All rights reserved.",
};
