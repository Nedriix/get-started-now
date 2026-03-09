import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PricingManager from '@/components/admin/PricingManager';
import VehicleManager from '@/components/admin/VehicleManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';
import { LogOut, LayoutDashboard, Tag, Car, Settings } from 'lucide-react';

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">Administrace</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              Zobrazit web
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-1.5" />
              Odhlásit
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="pricing">
          <TabsList className="mb-6 w-full sm:w-auto">
            <TabsTrigger value="pricing" className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              Ceník
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-1.5">
              <Car className="h-4 w-4" />
              Vozový park
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1.5">
              <Settings className="h-4 w-4" />
              Nastavení
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pricing">
            <PricingManager />
          </TabsContent>
          <TabsContent value="vehicles">
            <VehicleManager />
          </TabsContent>
          <TabsContent value="settings">
            <SiteSettingsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
