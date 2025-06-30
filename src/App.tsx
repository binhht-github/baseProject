import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./lib/ProtectedRoute"
import { NavigationMenuDemo } from "./components/layout/Navigation"
import { lazy, Suspense } from "react"
import { Toaster } from "sonner"
// const HomePage = lazy(() => import('./pages/HomePage'));

const LoginPage = lazy(() => import("./pages/LoginPage"))
const DashBoard = lazy(() => import("./pages/DashBoard"))
const UserPage = lazy(() => import("./pages/UserPage"))
const ProductPage = lazy(() => import("./pages/ProductPage"))
const ReportPage = lazy(() => import("./pages/ReportPage"))

function App() {
  return (
    <div>
      <NavigationMenuDemo />
      <Suspense fallback={<div className="p-4">Đang tải...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/product"
            element={
              <ProtectedRoute requireRole="admin">
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute requireRole="admin">
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requireRoles={["admin", "staff"]}>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position='top-right' expand={false} richColors />
      </Suspense>
    </div>
  )
}

export default App
