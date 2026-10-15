import { useState, useCallback } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AuthProvider, useAuth } from "./context/AuthContext";

import AnimatedBackground from "./components/background/AnimatedBackground";
import SplashScreen from "./components/ui/SplashScreen";

import LoginScreen from "./pages/LoginScreen";
import ProjectSpace from "./pages/client/ProjectSpace";
import GalleryPage from "./pages/client/GalleryPage";
import VideosPage from "./pages/client/VideosPage";
import DocumentsPage from "./pages/client/DocumentsPage";
import PlansPage from "./pages/client/PlansPage";
import TimelinePage from "./pages/client/TimelinePage";
import DownloadsPage from "./pages/client/DownloadsPage";
import ContactPage from "./pages/client/ContactPage";
import InteractivePage from "./pages/client/InteractivePage";
import SettingsPage from "./pages/client/SettingsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}


function AdminRoute({ children }: { children: React.ReactNode }) {
  const { session, profile, loading } = useAuth();

  if (loading) return null;

  if (!session) {
    return <Navigate to="/" replace />;
  }

  if (profile && profile.role !== "admin") {
    return <Navigate to="/project" replace />;
  }

  return <>{children}</>;
}



function AppContent() {

  const [splashDone, setSplashDone] = useState(false);

  const { session, loading } = useAuth();


  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);



  if (loading) {

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: "#050505",
        }}
      >

        <div
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.4rem",
            fontWeight: 300,
            letterSpacing: "0.5em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          VERO
        </div>

      </div>
    );

  }



  return (

    <div className="relative min-h-screen overflow-hidden">


      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">

        <AnimatedBackground />

      </div>



      {/* CONTENT */}
      <div className="relative z-10 min-h-screen">


        <AnimatePresence mode="wait">

          {!splashDone && (

            <SplashScreen
              onComplete={handleSplashComplete}
            />

          )}

        </AnimatePresence>



        {splashDone && (

          <Routes>


            <Route
              path="/"
              element={
                session
                ? <Navigate to="/project" replace />
                : <LoginScreen />
              }
            />


            <Route
              path="/project"
              element={
                <ProtectedRoute>
                  <ProjectSpace />
                </ProtectedRoute>
              }
            />


            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                  <GalleryPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/videos"
              element={
                <ProtectedRoute>
                  <VideosPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <DocumentsPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/plans"
              element={
                <ProtectedRoute>
                  <PlansPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/timeline"
              element={
                <ProtectedRoute>
                  <TimelinePage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/downloads"
              element={
                <ProtectedRoute>
                  <DownloadsPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/interactive"
              element={
                <ProtectedRoute>
                  <InteractivePage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />


            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />


          </Routes>

        )}

       </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HashRouter>
  );
}