import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, Calendar, Edit, Save, X, Trophy, Target, Clock, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-06-15",
    address: "123 Learning Street, Education City, EC 12345",
    bio: "Passionate student with a keen interest in mathematics and science. Currently pursuing advanced courses in multiple subjects.",
    joinDate: "2024-01-01",
    studentId: "STU2024001"
  });

  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mock statistics data
  const stats = {
    testsCompleted: 24,
    averageScore: 82.5,
    totalStudyTime: 156, // hours
    currentStreak: 7, // days
    rank: 15,
    totalStudents: 120,
    certificates: 3,
    achievements: 8
  };

  const recentActivity = [
    { action: "Completed", item: "Chemistry - Organic", date: "2024-01-10", score: 85 },
    { action: "Started", item: "Physics - Mechanics", date: "2024-01-08", score: null },
    { action: "Completed", item: "Biology - Genetics", date: "2024-01-08", score: 92 },
    { action: "Completed", item: "English - Grammar", date: "2024-01-05", score: 78 }
  ];

  return (
    <DashboardLayout userRole="student">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  <p className="text-muted-foreground">Student • ID: {profileData.studentId}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">Active Student</Badge>
                    <Badge variant="outline">Rank #{stats.rank}</Badge>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                className="gap-2"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Manage your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        id="dob"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.dateOfBirth}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 text-sm">{profileData.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      className="w-full p-2 border rounded-md resize-none h-24"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 text-sm">{profileData.bio}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Trophy className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tests Completed</p>
                    <p className="text-2xl font-bold">{stats.testsCompleted}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Target className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold">{stats.averageScore}%</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Study Time</p>
                    <p className="text-2xl font-bold">{stats.totalStudyTime}h</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Rank</p>
                    <p className="text-2xl font-bold">#{stats.rank}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Milestones</CardTitle>
                <CardDescription>
                  Your learning accomplishments and certificates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">{stats.certificates}</p>
                    <p className="text-sm text-muted-foreground">Certificates</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">{stats.achievements}</p>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">{stats.currentStreak}</p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest test activities and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.action === "Completed" ? "bg-success" : "bg-primary"
                        }`} />
                        <div>
                          <p className="font-medium">
                            {activity.action} {activity.item}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                      {activity.score && (
                        <Badge variant="secondary">
                          {activity.score}%
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;