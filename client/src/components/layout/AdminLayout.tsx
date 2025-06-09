import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore, getRoleDisplayName } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import {
  Recycle,
  Menu,
  X,
  BarChart3,
  Users,
  Handshake,
  Heart,
  Box,
  Warehouse,
  ShoppingCart,
  Truck,
  FileText,
  BadgeCent,
  Settings,
  Bell,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const { logout } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    ];

    const roleItems = {
      admin: [
        { name: 'Pegawai', href: '/admin/employees', icon: Users },
        { name: 'Penitip', href: '/admin/consigners', icon: Handshake },
        { name: 'Organisasi', href: '/admin/organizations', icon: Heart },
        { name: 'Merchandise', href: '/admin/products', icon: Box },
      ],
      pegawai_gudang: [
        { name: 'Inventori', href: '/admin/inventory', icon: Warehouse },
        { name: 'Transaksi', href: '/admin/transactions', icon: ShoppingCart },
        { name: 'Pengiriman', href: '/admin/shipping', icon: Truck },
      ],
      cs: [
        { name: 'Penitip', href: '/admin/consigners', icon: Handshake },
        { name: 'Transaksi', href: '/admin/transactions', icon: ShoppingCart },
      ],
      owner: [
        { name: 'Laporan Penjualan', href: '/admin/reports/sales', icon: FileText },
        { name: 'Laporan Donasi', href: '/admin/reports/donations', icon: BadgeCent },
        { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
      ],
      penitip: [
        { name: 'Barang Saya', href: '/admin/my-items', icon: Box },
        { name: 'Penjualan', href: '/admin/my-sales', icon: BarChart3 },
      ],
    };

    const userRole = user?.role || 'admin';
    return [...baseItems, ...(roleItems[userRole as keyof typeof roleItems] || [])];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold">ReuseMart</div>
                <div className="text-xs text-gray-400">Admin Dashboard</div>
              </div>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">{getRoleDisplayName(user.role)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => logout()}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900 ml-4">
                {navigationItems.find(item => item.href === location)?.name || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center font-bold text-white bg-red-500 border-2 border-white"
                >
                  12
                </Badge>
              </Button>

              {/* User Menu */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-left hidden sm:block">
                        <div className="text-sm font-semibold">{user.name}</div>
                        <div className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</div>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Pengaturan
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 bg-gray-50">
          {children}
        </div>
      </main>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
