import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, Clock, TrendingUp, Plus, Edit, Trash2, Eye } from "lucide-react";

// Mock data for admin dashboard
const stats = {
  totalUsers: 1248,
  activeTests: 15,
  completedTests: 156,
  averageScore: 78.5,
};

const recentTests = [
  { id: 1, title: "Mathematics - Algebra", questions: 50, duration: 120, status: "active", participants: 45 },
  { id: 2, title: "Physics - Mechanics", questions: 40, duration: 90, status: "active", participants: 32 },
  { id: 3, title: "Chemistry - Organic", questions: 35, duration: 75, status: "draft", participants: 0 },
  { id: 4, title: "English - Grammar", questions: 30, duration: 60, status: "completed", participants: 28 },
];

const recentUsers = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "student", joined: "2024-01-10", testsCompleted: 8 },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "student", joined: "2024-01-12", testsCompleted: 12 },
  { id: 3, name: "Mike Davis", email: "mike@example.com", role: "student", joined: "2024-01-15", testsCompleted: 5 },
  { id: 4, name: "Lisa Wilson", email: "lisa@example.com", role: "admin", joined: "2024-01-05", testsCompleted: 15 },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/90">Manage your exam portal efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTests}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTests}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">+3.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tests */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Tests</CardTitle>
                  <CardDescription>Latest test activities</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Test
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.title}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            test.status === "active" ? "default" : 
                            test.status === "draft" ? "secondary" : 
                            "outline"
                          }
                        >
                          {test.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{test.participants}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Newly registered users</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Tests</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.testsCompleted}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <Plus className="w-6 h-6" />
                <span>Create Test</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="w-6 h-6" />
                <span>Manage Users</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span>Question Bank</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <TrendingUp className="w-6 h-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;