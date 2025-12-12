import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lock,
  Bell,
  User,
  Shield,
  Eye,
  EyeOff,
  Save,
  Mail,
  MessageSquare,
  Award,
  BookOpen,
  Trash2,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailCourseUpdates: true,
    emailNewCourses: true,
    emailPromotions: false,
    emailWeeklyDigest: true,
    pushLessonReminders: true,
    pushQuizResults: true,
    pushCertificates: true,
    pushAnnouncements: false,
  });

  const [accountSettings, setAccountSettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    publicProfile: false,
    showProgress: true,
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      });
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleNotificationSave = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleAccountSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your account settings have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="password" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Password</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
              </TabsList>

              {/* Password Tab */}
              <TabsContent value="password">
                <Card variant="elevated" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-foreground">
                        Change Password
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                          }
                          placeholder="Enter your current password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                          }
                          placeholder="Enter your new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters long
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                          }
                          placeholder="Confirm your new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full sm:w-auto">
                      <Save className="h-4 w-4" />
                      Update Password
                    </Button>
                  </form>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card variant="elevated" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-foreground">
                        Email Notifications
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Choose what emails you want to receive
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Course Updates</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when courses you're enrolled in are updated
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.emailCourseUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailCourseUpdates: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">New Courses</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when new courses are published
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.emailNewCourses}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNewCourses: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Promotions</p>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional emails and special offers
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.emailPromotions}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailPromotions: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Weekly Digest</p>
                          <p className="text-sm text-muted-foreground">
                            Get a weekly summary of your learning progress
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.emailWeeklyDigest}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailWeeklyDigest: checked })
                        }
                      />
                    </div>
                  </div>
                </Card>

                <Card variant="elevated" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Bell className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-foreground">
                        Push Notifications
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your in-app notification preferences
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Lesson Reminders</p>
                          <p className="text-sm text-muted-foreground">
                            Remind me to continue learning
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.pushLessonReminders}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushLessonReminders: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Quiz Results</p>
                          <p className="text-sm text-muted-foreground">
                            Notify me when quiz results are available
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.pushQuizResults}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushQuizResults: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Certificates</p>
                          <p className="text-sm text-muted-foreground">
                            Notify me when I earn a certificate
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.pushCertificates}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushCertificates: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Announcements</p>
                          <p className="text-sm text-muted-foreground">
                            Receive platform announcements
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.pushAnnouncements}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushAnnouncements: checked })
                        }
                      />
                    </div>
                  </div>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleNotificationSave}>
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                <Card variant="elevated" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-foreground">
                        Security Settings
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your account security preferences
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={accountSettings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setAccountSettings({ ...accountSettings, twoFactorAuth: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Login Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone logs into your account
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={accountSettings.loginAlerts}
                        onCheckedChange={(checked) =>
                          setAccountSettings({ ...accountSettings, loginAlerts: checked })
                        }
                      />
                    </div>
                  </div>
                </Card>

                <Card variant="elevated" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-foreground">
                        Privacy Settings
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Control your profile visibility
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Public Profile</p>
                          <p className="text-sm text-muted-foreground">
                            Allow others to see your profile
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={accountSettings.publicProfile}
                        onCheckedChange={(checked) =>
                          setAccountSettings({ ...accountSettings, publicProfile: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Show Learning Progress</p>
                          <p className="text-sm text-muted-foreground">
                            Display your course progress on your profile
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={accountSettings.showProgress}
                        onCheckedChange={(checked) =>
                          setAccountSettings({ ...accountSettings, showProgress: checked })
                        }
                      />
                    </div>
                  </div>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleAccountSave}>
                    <Save className="h-4 w-4" />
                    Save Settings
                  </Button>
                </div>

                {/* Danger Zone */}
                <Card variant="elevated" className="p-6 border-destructive/20">
                  <h2 className="font-heading text-lg font-semibold text-destructive mb-4">
                    Danger Zone
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Sign Out Everywhere</p>
                        <p className="text-sm text-muted-foreground">
                          Log out from all devices
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <LogOut className="h-4 w-4" />
                        Sign Out All
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove all of your data including course progress,
                              certificates, and learning history.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
