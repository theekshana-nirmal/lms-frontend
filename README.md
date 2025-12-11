# Learning Management System (LMS) - Frontend

A comprehensive Learning Management System designed to streamline the educational experience for both students and lecturers through a modern, intuitive single-page application.

## Overview

This LMS platform provides a complete educational ecosystem where students can enroll in courses, track their academic progress, and access learning materials, while lecturers can manage courses, evaluate student performance, and communicate with enrolled students through announcements and notifications.

## Key Features

### User Management
- **User Registration & Authentication**: Secure account creation for students and teachers with role-based access control
- **Profile Management**: Comprehensive user profiles with personal information and contact details
- **Session-based Authentication**: Secure login system with token-based session management

### For Students
- **Course Catalog**: Browse and explore available courses with detailed descriptions and lecturer information
- **Course Enrollment**: Simple enrollment process with instant course access
- **Grade Tracking**: View academic performance across all enrolled courses and modules
- **Course Content Access**: Centralized access to lecture notes, assignments, and reading materials
- **Email Notifications**: Receive course announcements and updates directly via email

### For Lecturers
- **Course Management**: View and manage assigned courses with full administrative control
- **Student Roster**: Access complete list of enrolled students for each course
- **Grade Management**: Evaluate students and post marks for various course modules
- **Announcement System**: Post course-specific announcements with automatic email notifications to enrolled students
- **Content Management**: Upload and organize course materials including lecture notes, assignments, and resources

### Academic Features
- **Module-based Grading**: Comprehensive grade tracking system organized by course modules
- **Performance Analytics**: Track student progress and academic performance across multiple courses
- **Many-to-Many Relationships**: Flexible system supporting students enrolled in multiple courses and courses with multiple students

## Technology Stack

### Frontend
- **React**: 19.2
- **Architecture**: Single-page application (SPA)
- **API Integration**: RESTful API endpoints
- **Runtime**: Bun

### Backend
- Repository: [LMS Backend](https://github.com/theekshana-nirmal/lms-backend)
- Architecture: REST API

## Getting Started

### Prerequisites
- Bun (latest version)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd lms-frontend
```

2. Install dependencies
```bash
bun install
```

3. Configure environment variables
```bash
# Create a .env file in the root directory
# Add your API endpoint and other configuration
REACT_APP_API_URL=your_backend_api_url
```

4. Start the development server
```bash
bun start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
lms-frontend/
├── public/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main application pages
│   ├── services/       # API integration services
│   ├── utils/          # Helper functions and utilities
│   ├── App.js          # Main application component
│   └── index.js        # Application entry point
├── package.json
└── README.md
```

## User Roles

### Student
- Register and create profile
- Browse and enroll in courses
- Access course materials
- View grades and academic progress
- Receive course announcements

### Lecturer
- Manage assigned courses
- View enrolled students
- Post and manage grades
- Upload course content
- Send announcements to students

## Core Workflows

### Student Journey
1. **Registration** → Create account with personal details
2. **Authentication** → Secure login with credentials
3. **Course Discovery** → Browse available courses
4. **Enrollment** → Enroll in desired courses
5. **Learning** → Access course materials and content
6. **Progress Tracking** → Monitor grades and performance

### Lecturer Journey
1. **Authentication** → Secure login to the platform
2. **Course Access** → View assigned courses
3. **Student Management** → Monitor enrolled students
4. **Content Upload** → Provide learning materials
5. **Grade Management** → Evaluate and post student marks
6. **Communication** → Send announcements to students

## API Integration

This frontend application communicates with the backend REST API for all data operations:
- User authentication and authorization
- Course data retrieval and enrollment
- Grade management and tracking
- Content management
- Announcement and notification system

Backend Repository: [https://github.com/theekshana-nirmal/lms-backend](https://github.com/theekshana-nirmal/lms-backend)

## Email Notification System

The platform features an integrated email notification system that automatically sends updates to students when:
- New announcements are posted by lecturers
- Important course updates are published
- Administrative notifications are issued

## Acknowledgments

- Built with React 19.2
- Powered by REST API architecture
- Designed for modern educational institutions

---

**Note**: Make sure to configure the backend API connection before running the application. Refer to the backend repository for setup instructions.
