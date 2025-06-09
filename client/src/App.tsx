import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAuthStore, isAdminRole } from "@/lib/auth";

// Storefront Pages
import { HomePage } from "@/pages/storefront/HomePage";
import { ProductCatalog } from "@/pages/storefront/ProductCatalog";
import { ProductDetail } from "@/pages/storefront/ProductDetail";
import { CheckoutPage } from "@/pages/storefront/CheckoutPage";
import { DonationRequest } from "@/pages/storefront/DonationRequest";
import { DonationPage } from "@/pages/storefront/DonationPage";
import { WarrantyPage } from "@/pages/storefront/WarrantyPage";
import { ProfilePage } from "@/pages/storefront/ProfilePage";
import { OrderHistoryPage } from "@/pages/storefront/OrderHistoryPage";
import { WishlistPage } from "@/pages/storefront/WishlistPage";
import { RewardsPage } from "@/pages/storefront/RewardsPage";

// Admin Pages
import { Dashboard } from "@/pages/admin/Dashboard";
import { ProductManagement } from "@/pages/admin/ProductManagement";
import { ConsignmentManagement } from "@/pages/admin/ConsignmentManagement";
import { UserManagement } from "@/pages/admin/UserManagement";
import { DonationManagement } from "@/pages/admin/DonationManagement";
import { Reports } from "@/pages/admin/Reports";

import NotFound from "@/pages/not-found";

function AppRouter() {
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = isAuthenticated && user && isAdminRole(user.role);

  return (
    <Switch>
      {/* Storefront Routes */}
      <Route path="/">
        <StorefrontLayout>
          <HomePage />
        </StorefrontLayout>
      </Route>
      
      <Route path="/catalog">
        <StorefrontLayout>
          <ProductCatalog />
        </StorefrontLayout>
      </Route>
      
      <Route path="/product/:id">
        {(params) => (
          <StorefrontLayout>
            <ProductDetail productId={parseInt(params.id)} />
          </StorefrontLayout>
        )}
      </Route>
      
      <Route path="/checkout">
        <ProtectedRoute requiredRole="storefront">
          <StorefrontLayout>
            <CheckoutPage />
          </StorefrontLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/donations/request">
        <ProtectedRoute requiredRole="organisasi">
          <StorefrontLayout>
            <DonationRequest />
          </StorefrontLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/donations">
        <StorefrontLayout>
          <DonationPage />
        </StorefrontLayout>
      </Route>
      
      <Route path="/warranty">
        <StorefrontLayout>
          <WarrantyPage />
        </StorefrontLayout>
      </Route>
      
      <Route path="/profile">
        <ProtectedRoute requiredRole="storefront">
          <StorefrontLayout>
            <ProfilePage />
          </StorefrontLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/orders">
        <ProtectedRoute requiredRole="storefront">
          <StorefrontLayout>
            <OrderHistoryPage />
          </StorefrontLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/wishlist">
        <ProtectedRoute requiredRole="storefront">
          <StorefrontLayout>
            <WishlistPage />
          </StorefrontLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/rewards">
        <ProtectedRoute requiredRole="storefront">
          <StorefrontLayout>
            <RewardsPage />
          </StorefrontLayout>
        </ProtectedRoute>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <ProtectedRoute requiredRole="admin">
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/products">
        <ProtectedRoute requiredRole="admin">
          <AdminLayout>
            <ProductManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/employees">
        <ProtectedRoute requiredRole="admin">
          <AdminLayout>
            <UserManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/consigners">
        <ProtectedRoute requiredRole="admin">
          <AdminLayout>
            <ConsignmentManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/organizations">
        <ProtectedRoute requiredRole="admin">
          <AdminLayout>
            <UserManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/inventory">
        <ProtectedRoute requiredRole="pegawai_gudang">
          <AdminLayout>
            <ProductManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/transactions">
        <ProtectedRoute requiredRole="admin">
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/shipping">
        <ProtectedRoute requiredRole="pegawai_gudang">
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/donations">
        <ProtectedRoute requiredRole="admin">
          <AdminLayout>
            <DonationManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/reports/:type?">
        <ProtectedRoute requiredRole="owner">
          <AdminLayout>
            <Reports />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin/my-items">
        <ProtectedRoute requiredRole="penitip">
          <AdminLayout>
            <ConsignmentManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AppRouter />
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
