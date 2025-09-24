# 🏥 PAPI's Medical Care

<div align="center">
  <p>
    <strong>_Modern healthcare management system with intuitive appointment booking.</strong>
  </p>
</div>

## 📸 Preview

<div align="center">
  <img src="front/M3_project/src/assets/1.png" alt="PAPI's Medical Care Preview" width="600">
  <p><em>Screenshot of the appointment booking interface</em></p>
</div>

## ✨ Features

<details>
  <summary><strong>👤 User Management</strong></summary>

- Secure user registration validation
- Password encryption using bcrypt
- User authentication and session management
- Unique patient identification system
</details>

<details>
  <summary><strong>📅 Appointment System</strong></summary>

- Online appointment booking with date and time selection
- Weekend validation (no appointments on weekends)
- Appointment cancellation functionality
</details>

<details>
  <summary><strong>🎨 Modern UI/UX</strong></summary>

- Clean, responsive design
- Intuitive navigation with React Router
- Form validation and error handling
- Loading states and user feedback
</details>

<details>
  <summary><strong>🔧 Technical Features</strong></summary>

- Full-stack TypeScript implementation
- RESTful API architecture
- PostgreSQL database with TypeORM
- CORS support for cross-origin requests
- Environment-based configuration
- ESLint code quality enforcement
</details>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd back
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment configuration**
   Create a `.env` file in the `back` directory:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   ```

4. **Database(Backend) setup**
   ```bash
   npm run build
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd front/M3_project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🛠️ Tech Stack

<details>
  <summary><strong>Frontend Technologies</strong></summary>

- **React 19** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with Flexbox/Grid
- **ESLint** - Code quality and linting
</details>

<details>
  <summary><strong>Backend Technologies</strong></summary>

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **TypeORM** - Object-relational mapping
- **PostgreSQL** - Relational database
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
</details>

<details>
  <summary><strong>Database Design</strong></summary>

- **Users** - Patient information and credentials
- **Appointments** - Appointment scheduling and management
- **Credentials** - Secure authentication data
</details>

## 🧪 Testing

<details>
  <summary><strong>Code Quality</strong></summary>

The project implements comprehensive code quality measures:

- ESLint configuration for both frontend and backend
- TypeScript strict type checking
- Form validation with custom validators
- Error handling and user feedback
</details>

## 🏗️ Project Structure

<details>
  <summary><strong>Backend Structure</strong></summary>

```text
back/
├── 📁 src/
│   ├── 📁 config/
│   │   ├── data_source.ts    # Database configuration
│   │   └── envs.ts          # Environment variables
│   ├── 📁 controllers/
│   │   ├── appointmentsController.ts
│   │   └── userController.ts
│   ├── 📁 dto/
│   │   ├── appointmentDto.ts
│   │   └── userDto.ts
│   ├── 📁 entities/
│   │   ├── Appointments.ts
│   │   ├── Credentials.ts
│   │   └── User.ts
│   ├── 📁 interfaces/
│   │   └── types.ts
│   ├── 📁 middlewares/
│   │   └── authMiddleware.ts
│   ├── 📁 routes/
│   │   ├── appointmentsRouter.ts
│   │   └── userRouter.ts
│   ├── 📁 services/
│   │   ├── appointmentService.ts
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── index.ts             # Application entry point
│   └── server.ts            # Express server setup
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 .env
```

</details>

<details>
  <summary><strong>Frontend Structure</strong></summary>

```text
front/M3_project/
├── 📁 src/
│   ├── 📁 assets/
│   │   ├── 📷 1.png                    # Application preview image
│   │   ├── 📁 home-images/             # Images for home page
│   │   ├── 📁 notFound-images/         # Images for 404 page
│   │   └── 📁 service-images/          # Images for services
│   ├── 📁 components/
│   │   ├── About.jsx        # About section component
│   │   ├── AppointmentForm.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── Footer.jsx
│   │   ├── NavBar.jsx
│   │   ├── Service.jsx
│   │   └── Text.jsx
│   ├── 📁 context/
│   │   └── UserProvider.jsx  # User context for state management
│   ├── 📁 helpers/
│   │   └── texts.js         # Application text content
│   ├── 📁 validators/
│   │   └── appointmentValidator.js
│   ├── 📁 views/
│   │   ├── Home.jsx         # Landing page
│   │   ├── AppointmentWeb.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx              # Main application component
│   └── main.jsx             # React application entry point
├── 📄 index.html
├── 📄 package.json
├── 📄 vite.config.js
└── 📄 README.md
```

</details>

## 🎮 How to Use

### For Patients

1. **Registration**

   - Visit the homepage and click "Register"
   - Fill in your personal information
   - Create a secure password

2. **Login**

   - Use your Username and Password
   - Access your personal dashboard

3. **Book Appointments**

   - Navigate to the appointments section
   - Choose an available date and time
   - Confirm your appointment

4. **Manage Appointments**
   - View all your scheduled appointments
   - Cancel appointments if needed

{{ ... }}

<details>
  <summary><strong>🔒 Security Features</strong></summary>

- **Input Validation**: Comprehensive form validation on both frontend and backend
- **CORS Protection**: Configured cross-origin resource sharing
- **Authentication Middleware**: Protected routes for authenticated users only
</details>

<details>
  <summary><strong>📱 API Endpoints</strong></summary>

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Appointments

- `GET /appointments` - Get user appointments
- `POST /appointments` - Create new appointment
- `DELETE /appointments/:id` - Cancel appointment
</details>

---

<div align="center">
  Made with ❤️ for healthcare everywhere
</div>
