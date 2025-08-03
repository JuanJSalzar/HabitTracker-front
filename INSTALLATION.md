# 📦 Installation Guide

This guide will help you set up the Habit Tracker frontend application on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js** (version 18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`
- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)

### Backend Requirement

- **Habit Tracker API** must be running on `http://localhost:5237`
- Ensure the backend is properly configured and accessible

## 🚀 Quick Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd habit-tracker-front
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Environment Setup

The application is pre-configured to connect to `http://localhost:5237` for the API. If your backend runs on a different port, you'll need to update the API endpoints in the source code.

### Step 4: Start Development Server

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

### Step 5: Access the Application

Open your browser and navigate to `http://localhost:5173`

## 🔧 Detailed Installation

### Node.js Installation

#### Windows

1. Download the Windows installer from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Restart your command prompt/terminal
4. Verify: `node --version` and `npm --version`

#### macOS

```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

#### Linux (Ubuntu/Debian)

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Dependency Installation Details

The project uses the following key dependencies:

#### Core Dependencies

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "typescript": "~5.8.3",
  "vite": "^6.3.5"
}
```

#### UI & Styling

```json
{
  "@headlessui/react": "^2.2.4",
  "@heroicons/react": "^2.2.0",
  "lucide-react": "^0.525.0",
  "tailwindcss": "^3.4.17"
}
```

#### Routing & State

```json
{
  "react-router-dom": "^7.6.2",
  "react-hot-toast": "^2.5.2"
}
```

## 🛠️ Build Configuration

### Development Build

```bash
npm run dev
```

- Starts Vite dev server
- Hot Module Replacement (HMR) enabled
- Source maps for debugging
- Fast refresh for React components

### Production Build

```bash
npm run build
```

- Creates optimized production bundle
- Minified and compressed assets
- Tree-shaking to remove unused code
- Output in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

- Serves the production build locally
- Useful for testing before deployment

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Error: Port 5173 is already in use
# Solution: Use a different port
npm run dev -- --port 3000
```

#### Node Version Conflicts

```bash
# Check your Node version
node --version

# If you have an older version, update Node.js
# Or use nvm to manage multiple versions
```

#### Package Installation Failures

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

#### TypeScript Errors

```bash
# Run TypeScript compiler check
npx tsc --noEmit

# Common solutions:
# 1. Update TypeScript: npm install typescript@latest
# 2. Check tsconfig.json configuration
# 3. Ensure all type dependencies are installed
```

### Environment Issues

#### API Connection Problems

- Verify backend is running on `http://localhost:5237`
- Check CORS settings on the backend
- Ensure network connectivity
- Test API endpoints manually with tools like Postman

#### Build Failures

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check for type errors
npx tsc --noEmit
```

## 📁 Project Structure After Installation

```
habit-tracker-front/
├── node_modules/        # Installed dependencies
├── public/             # Static assets
├── src/                # Source code
├── dist/               # Production build (after npm run build)
├── package.json        # Project configuration
├── package-lock.json   # Dependency lock file
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.ts      # Vite build configuration
└── README.md           # Project documentation
```

## ⚡ Performance Optimization

### Development

- Use `npm run dev` for fastest development experience
- Vite's HMR provides instant updates
- TypeScript compilation is handled by Vite

### Production

- Run `npm run build` for optimized production bundle
- Assets are automatically optimized and compressed
- Code splitting reduces initial bundle size

## 🔐 Security Considerations

### Dependencies

- Regularly update dependencies: `npm audit` and `npm audit fix`
- Review security vulnerabilities in dependencies
- Use `npm ci` in production for reproducible builds

### Environment Variables

- Never commit sensitive data to the repository
- Use environment variables for configuration
- Ensure API endpoints are properly secured

## 📞 Support

If you encounter issues during installation:

1. **Check Prerequisites**: Ensure all required software is properly installed
2. **Clear Cache**: Delete `node_modules` and reinstall
3. **Check Network**: Verify internet connection for package downloads
4. **Update Tools**: Ensure you have the latest versions of Node.js and npm
5. **Backend Status**: Verify the backend API is running and accessible

## 🔄 Update Guide

To update the project to the latest version:

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install

# Check for major updates
npm outdated

# Update packages (be careful with major versions)
npm update
```

## 🎯 Next Steps

After successful installation:

1. **Start the Backend**: Ensure your API server is running
2. **Create an Account**: Register a new user account
3. **Explore Features**: Try creating habits and using the dashboard
4. **Read Documentation**: Check the main README.md for usage guide
5. **Customize**: Modify the application to fit your needs

---

For more detailed information about using the application, see the main [README.md](./README.md) file.
