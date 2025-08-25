'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Bell, 
  Globe, 
  Palette, 
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  supportPhone: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  defaultLanguage: string;
  defaultCurrency: string;
  timezone: string;
  maxFileSize: number;
  allowedFileTypes: string[];
}

interface SecuritySettings {
  passwordMinLength: number;
  requireSpecialChars: boolean;
  requireNumbers: boolean;
  requireUppercase: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  twoFactorRequired: boolean;
  ipWhitelist: string[];
}

interface NotificationSettings {
  orderUpdates: boolean;
  paymentConfirmations: boolean;
  systemAlerts: boolean;
  marketingEmails: boolean;
  pushNotifications: boolean;
  emailTemplates: Record<string, boolean>;
}

const AdminSettingsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // System Settings
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: 'Construction E-Commerce',
    siteDescription: 'Professional construction materials and services',
    contactEmail: 'admin@construction.com',
    supportPhone: '+1-555-0123',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    defaultLanguage: 'en',
    defaultCurrency: 'USD',
    timezone: 'UTC',
    maxFileSize: 10,
    allowedFileTypes: ['jpg', 'png', 'pdf', 'doc']
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorRequired: false,
    ipWhitelist: []
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    paymentConfirmations: true,
    systemAlerts: true,
    marketingEmails: false,
    pushNotifications: true,
    emailTemplates: {
      welcome: true,
      orderConfirmation: true,
      passwordReset: true,
      newsletter: false
    }
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
  }, [user, router]);

  const handleSystemSettingChange = (key: keyof SystemSettings, value: string | boolean | number | string[]) => {
    setSystemSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSecuritySettingChange = (key: keyof SecuritySettings, value: string | boolean | number | string[]) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationSettingChange = (key: keyof NotificationSettings, value: boolean | Record<string, boolean>) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage (in a real app, this would be an API call)
      localStorage.setItem('admin_system_settings', JSON.stringify(systemSettings));
      localStorage.setItem('admin_security_settings', JSON.stringify(securitySettings));
      localStorage.setItem('admin_notification_settings', JSON.stringify(notificationSettings));
      
      setHasUnsavedChanges(false);
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    // Reset to default values
    setSystemSettings({
      siteName: 'Construction E-Commerce',
      siteDescription: 'Professional construction materials and services',
      contactEmail: 'admin@construction.com',
      supportPhone: '+1-555-0123',
      maintenanceMode: false,
      registrationEnabled: true,
      emailNotifications: true,
      smsNotifications: false,
      defaultLanguage: 'en',
      defaultCurrency: 'USD',
      timezone: 'UTC',
      maxFileSize: 10,
      allowedFileTypes: ['jpg', 'png', 'pdf', 'doc']
    });
    
    setSecuritySettings({
      passwordMinLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorRequired: false,
      ipWhitelist: []
    });
    
    setNotificationSettings({
      orderUpdates: true,
      paymentConfirmations: true,
      systemAlerts: true,
      marketingEmails: false,
      pushNotifications: true,
      emailTemplates: {
        welcome: true,
        orderConfirmation: true,
        passwordReset: true,
        newsletter: false
      }
    });
    
    setHasUnsavedChanges(false);
    toast.info('Settings reset to defaults');
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
                <p className="text-gray-600">Manage system configuration and preferences</p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleResetSettings}
                  disabled={isLoading}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button
                  onClick={handleSaveSettings}
                  disabled={isLoading || !hasUnsavedChanges}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>

          {/* Settings Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Advanced</span>
              </TabsTrigger>
            </TabsList>

            {/* General Settings Tab */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Site Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="w-5 h-5" />
                      <span>Site Information</span>
                    </CardTitle>
                    <CardDescription>
                      Basic site configuration and branding
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={systemSettings.siteName}
                        onChange={(e) => handleSystemSettingChange('siteName', e.target.value)}
                        placeholder="Enter site name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Input
                        id="siteDescription"
                        value={systemSettings.siteDescription}
                        onChange={(e) => handleSystemSettingChange('siteDescription', e.target.value)}
                        placeholder="Enter site description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={systemSettings.contactEmail}
                        onChange={(e) => handleSystemSettingChange('contactEmail', e.target.value)}
                        placeholder="admin@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="supportPhone">Support Phone</Label>
                      <Input
                        id="supportPhone"
                        value={systemSettings.supportPhone}
                        onChange={(e) => handleSystemSettingChange('supportPhone', e.target.value)}
                        placeholder="+1-555-0123"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* System Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>System Configuration</span>
                    </CardTitle>
                    <CardDescription>
                      Core system behavior and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                        <p className="text-sm text-gray-500">Temporarily disable site access</p>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => handleSystemSettingChange('maintenanceMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="registrationEnabled">User Registration</Label>
                        <p className="text-sm text-gray-500">Allow new user registrations</p>
                      </div>
                      <Switch
                        id="registrationEnabled"
                        checked={systemSettings.registrationEnabled}
                        onCheckedChange={(checked) => handleSystemSettingChange('registrationEnabled', checked)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="defaultLanguage">Default Language</Label>
                      <Select
                        value={systemSettings.defaultLanguage}
                        onValueChange={(value) => handleSystemSettingChange('defaultLanguage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="defaultCurrency">Default Currency</Label>
                      <Select
                        value={systemSettings.defaultCurrency}
                        onValueChange={(value) => handleSystemSettingChange('defaultCurrency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Settings Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Password Policy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Password Policy</span>
                    </CardTitle>
                    <CardDescription>
                      Configure password requirements and security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="passwordMinLength">Minimum Length</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        min="6"
                        max="20"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) => handleSecuritySettingChange('passwordMinLength', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                        <p className="text-sm text-gray-500">Must include !@#$%^&*</p>
                      </div>
                      <Switch
                        id="requireSpecialChars"
                        checked={securitySettings.requireSpecialChars}
                        onCheckedChange={(checked) => handleSecuritySettingChange('requireSpecialChars', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireNumbers">Require Numbers</Label>
                        <p className="text-sm text-gray-500">Must include 0-9</p>
                      </div>
                      <Switch
                        id="requireNumbers"
                        checked={securitySettings.requireNumbers}
                        onCheckedChange={(checked) => handleSecuritySettingChange('requireNumbers', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireUppercase">Require Uppercase</Label>
                        <p className="text-sm text-gray-500">Must include A-Z</p>
                      </div>
                      <Switch
                        id="requireUppercase"
                        checked={securitySettings.requireUppercase}
                        onCheckedChange={(checked) => handleSecuritySettingChange('requireUppercase', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Session & Access Control */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Session & Access Control</span>
                    </CardTitle>
                    <CardDescription>
                      Manage user sessions and access restrictions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        min="5"
                        max="1440"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        min="3"
                        max="10"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => handleSecuritySettingChange('maxLoginAttempts', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactorRequired">Require 2FA</Label>
                        <p className="text-sm text-gray-500">Force two-factor authentication</p>
                      </div>
                      <Switch
                        id="twoFactorRequired"
                        checked={securitySettings.twoFactorRequired}
                        onCheckedChange={(checked) => handleSecuritySettingChange('twoFactorRequired', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* System Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span>System Notifications</span>
                    </CardTitle>
                    <CardDescription>
                      Configure system-wide notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="orderUpdates">Order Updates</Label>
                        <p className="text-sm text-gray-500">Notify users about order status changes</p>
                      </div>
                      <Switch
                        id="orderUpdates"
                        checked={notificationSettings.orderUpdates}
                        onCheckedChange={(checked) => handleNotificationSettingChange('orderUpdates', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="paymentConfirmations">Payment Confirmations</Label>
                        <p className="text-sm text-gray-500">Send payment receipt emails</p>
                      </div>
                      <Switch
                        id="paymentConfirmations"
                        checked={notificationSettings.paymentConfirmations}
                        onCheckedChange={(checked) => handleNotificationSettingChange('paymentConfirmations', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="systemAlerts">System Alerts</Label>
                        <p className="text-sm text-gray-500">Critical system notifications</p>
                      </div>
                      <Switch
                        id="systemAlerts"
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) => handleNotificationSettingChange('systemAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">Promotional and newsletter emails</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => handleNotificationSettingChange('marketingEmails', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Email Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="w-5 h-5" />
                      <span>Email Templates</span>
                    </CardTitle>
                    <CardDescription>
                      Manage automated email notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="welcomeEmail">Welcome Email</Label>
                        <p className="text-sm text-gray-500">New user registration</p>
                      </div>
                      <Switch
                        id="welcomeEmail"
                        checked={notificationSettings.emailTemplates.welcome}
                        onCheckedChange={(checked) => handleNotificationSettingChange('emailTemplates', {
                          ...notificationSettings.emailTemplates,
                          welcome: checked
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                        <p className="text-sm text-gray-500">Order placement confirmation</p>
                      </div>
                      <Switch
                        id="orderConfirmation"
                        checked={notificationSettings.emailTemplates.orderConfirmation}
                        onCheckedChange={(checked) => handleNotificationSettingChange('emailTemplates', {
                          ...notificationSettings.emailTemplates,
                          orderConfirmation: checked
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="passwordReset">Password Reset</Label>
                        <p className="text-sm text-gray-500">Password recovery emails</p>
                      </div>
                      <Switch
                        id="passwordReset"
                        checked={notificationSettings.emailTemplates.passwordReset}
                        onCheckedChange={(checked) => handleNotificationSettingChange('emailTemplates', {
                          ...notificationSettings.emailTemplates,
                          passwordReset: checked
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <p className="text-sm text-gray-500">Weekly/monthly updates</p>
                      </div>
                      <Switch
                        id="newsletter"
                        checked={notificationSettings.emailTemplates.newsletter}
                        onCheckedChange={(checked) => handleNotificationSettingChange('emailTemplates', {
                          ...notificationSettings.emailTemplates,
                          newsletter: checked
                        })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Advanced Settings Tab */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* File Upload Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="w-5 h-5" />
                      <span>File Upload Settings</span>
                    </CardTitle>
                    <CardDescription>
                      Configure file upload limits and restrictions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                      <Input
                        id="maxFileSize"
                        type="number"
                        min="1"
                        max="100"
                        value={systemSettings.maxFileSize}
                        onChange={(e) => handleSystemSettingChange('maxFileSize', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                      <Input
                        id="allowedFileTypes"
                        value={systemSettings.allowedFileTypes.join(', ')}
                        onChange={(e) => handleSystemSettingChange('allowedFileTypes', e.target.value.split(', ').map(t => t.trim()))}
                        placeholder="jpg, png, pdf, doc"
                      />
                      <p className="text-sm text-gray-500 mt-1">Separate with commas</p>
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>System Status</span>
                    </CardTitle>
                    <CardDescription>
                      Current system health and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Database</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Storage</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Normal
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Cache</span>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Warming
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-900">Backup</span>
                      </div>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Failed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button variant="outline" onClick={handleResetSettings}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset All Settings
                </Button>
                <Button onClick={handleSaveSettings} disabled={isLoading || !hasUnsavedChanges}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save All Changes'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
