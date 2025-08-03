# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

# 🏆 Habit Tracker - Frontend

A modern, responsive habit tracking application built with React, TypeScript, and Tailwind CSS. This frontend application provides a beautiful glassmorphism UI for managing daily habits with real-time tracking, AI-powered chat assistance, and comprehensive user management.

## ✨ Features

### 🎯 **Core Functionality**

- **User Authentication** - Secure login/register system with JWT tokens
- **Habit Management** - Create, edit, update, and delete habits
- **Real-time Tracking** - Track habit status (Pending, OnGoing, Completed, Uncompleted)
- **Progress Dashboard** - Visual overview of daily habit progress
- **User Profile** - Manage account settings and change passwords

### 🤖 **AI Integration**

- **Smart Chat Bot** - AI-powered assistant for habit guidance and motivation
- **Daily Insights** - Get personalized recommendations and tips

### 🎨 **Modern UI/UX**

- **Glassmorphism Design** - Beautiful glass-like transparent effects
- **Responsive Layout** - Optimized for desktop, tablet, and mobile
- **Dark Theme** - Elegant gradient backgrounds with purple accents
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Toast Notifications** - Real-time feedback for user actions

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 6.3.5** - Fast build tool and dev server

### **Styling & UI**

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Headless UI 2.2.4** - Unstyled, accessible UI components
- **Lucide React 0.525.0** - Beautiful SVG icons
- **Heroicons 2.2.0** - Additional icon set
- **Framer Motion 12.19.2** - Animation library

### **Navigation & State**

- **React Router DOM 7.6.2** - Client-side routing
- **React Context** - Global state management
- **Local Storage** - Persistent authentication

### **User Experience**

- **React Hot Toast 2.5.2** - Elegant notifications
- **React Markdown 10.1.0** - Markdown rendering for chat

## 🚀 Getting Started

## Prerequisites

Before running this application, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (configurable via environment variables)

### **Installation**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd habit-tracker-front
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Configure API endpoint (optional):**

   Create a `.env` file in the root directory to set your API URL:

   ```env
   VITE_API_URL=https://your-api-endpoint.com
   ```

   If no `.env` file is provided, the app defaults to `http://localhost:5237`

5. **Open your browser**
   Navigate to `http://localhost:5173`

### **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── auth/            # Authentication components
│   └── PrivateRoute.tsx
├── components/      # Reusable UI components
│   ├── ChatBotModal.tsx
│   ├── ConfirmDeleteAccountModal.tsx
│   ├── ConfirmDeleteModal.tsx
│   ├── CreateHabitModal.tsx
│   ├── EditHabitModal.tsx
│   ├── Navbar.tsx
│   └── TypingLoader.tsx
├── context/         # React Context providers
│   └── AuthContext.tsx
├── pages/           # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Profile.tsx
│   └── Register.tsx
├── types/           # TypeScript type definitions
│   ├── auth.ts
│   ├── chat.ts
│   ├── habits.ts
│   └── user.ts
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## 🎨 Design System

### **Color Palette**

- **Primary Background**: Gradient from `#080112` to `#0e0121`
- **Glass Elements**: Semi-transparent white with backdrop blur
- **Accent Color**: Purple (`#7c3aed`, `#8b5cf6`)
- **Success**: Green (`#16a34a`)
- **Warning**: Yellow (`#eab308`)
- **Error**: Red (`#dc2626`)

### **Typography**

- **Headings**: Bold, clean fonts for hierarchy
- **Body Text**: Light gray for readability on dark backgrounds
- **Interactive Elements**: White text for contrast

### **Components**

All modals and cards feature:

- Glass morphism effects with `backdrop-blur-xl`
- Semi-transparent backgrounds (`bg-white/10`)
- Subtle borders (`border-white/10`)
- Smooth hover animations and scaling

## **� API Integration**

The frontend communicates with a backend API. The API endpoint is configurable via environment variables:

- **Default**: `http://localhost:5237` (for development)
- **Production**: Set `VITE_API_URL` environment variable

### **API Endpoints**

### **Authentication**

- `POST /api/Auth/login` - User login
- `POST /api/Auth/register` - User registration

### **User Management**

- `GET /api/User/me` - Get user profile
- `PUT /api/User/me` - Update user profile
- `PUT /api/User/me/password` - Change password
- `DELETE /api/User/me` - Delete account

### **Habit Management**

- `GET /api/Habit` - Get user habits
- `POST /api/Habit` - Create new habit
- `PUT /api/Habit/{id}` - Update habit
- `DELETE /api/Habit/{id}` - Delete habit

### **AI Chat**

- `POST /api/Chat/response` - Get AI chat response

## 🔐 Authentication Flow

1. **Registration/Login** - User provides credentials
2. **JWT Token** - Backend returns authentication token
3. **Local Storage** - Token stored for persistence
4. **Protected Routes** - PrivateRoute component guards authenticated pages
5. **Auto-logout** - Token removal on logout or expiration

## 📱 Key Components

### **Dashboard**

- Habit overview with status indicators
- Visual progress summary
- Quick habit management actions
- Responsive grid layout

### **Profile Management**

- User information display
- Profile editing capabilities
- Password change functionality
- Account deletion with confirmation

### **Habit Modals**

- Create new habits with detailed configuration
- Edit existing habits with current data pre-filled
- Delete confirmations with safety checks

### **AI Chat Bot**

- Floating action button for easy access
- Conversation interface with typing indicators
- Markdown support for rich responses
- Message limit protection

## 🎯 Usage Guide

### **Getting Started**

1. **Register** a new account or **login** with existing credentials
2. **Navigate to Dashboard** to see your habits overview
3. **Create your first habit** using the "Create Habit" button
4. **Track progress** by updating habit status throughout the day

### **Managing Habits**

- **Create**: Click "Create Habit" and fill in details
- **Edit**: Click the pencil icon on any habit card
- **Delete**: Click the trash icon and confirm deletion
- **Status Update**: Use the edit modal to change habit status

### **Profile Settings**

- **View Profile**: Click "Profile" in the navigation
- **Edit Information**: Update name, email, or password
- **Delete Account**: Use the danger zone section (irreversible)

### **AI Assistant**

- **Access Chat**: Click the floating bot icon
- **Ask Questions**: Get habit guidance and motivation
- **Daily Limit**: 20 messages per day per user

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Unauthorized access prevention
- **Input Validation** - Client-side form validation
- **XSS Protection** - Secure data handling and rendering
- **Rate Limiting** - Chat message limits to prevent abuse

## 🚨 Error Handling

The application includes comprehensive error handling:

- **Network Errors** - Graceful handling of API failures
- **Validation Errors** - Real-time form validation feedback
- **Authentication Errors** - Automatic logout on token expiration
- **User Feedback** - Toast notifications for all operations

## 🎨 Customization

### **Theming**

The design uses Tailwind CSS utility classes. To customize:

1. Modify colors in `tailwind.config.js`
2. Update gradient backgrounds in components
3. Adjust glass effect opacity and blur values

### **Layout**

- Responsive breakpoints defined in Tailwind
- Grid layouts automatically adapt to screen size
- Mobile-first design approach

## 📊 Performance

- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Components loaded on demand
- **Optimized Builds** - Vite production optimizations
- **Small Bundle Size** - Tree-shaking eliminates unused code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Headless UI** - For accessible component primitives
- **Lucide** - For beautiful icons
- **Framer Motion** - For smooth animations

---

Built with ❤️ using React, TypeScript, and Tailwind CSS

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
