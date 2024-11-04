'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, CreditCard, Bell, Shield, LogOut, AlertTriangle } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { User as UserType } from '@/app/api/types/types'
import useCheckUserToken from '@/app/api/middleware/userLoggedIn';
import { useRouter } from 'next/navigation'


export default function AccountSettings() {
    const [userData, setUserData] = useState<UserType | undefined>()
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deleteAccount, setDeleteAccount] = useState<Boolean>(false)
    const [logOut, setLogOut] = useState<Boolean>(false)
    const router = useRouter();
    const { isUserLoggedIn, userId } = useCheckUserToken()
    const [password, setPassword] = useState<string>('')


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token')
            if (!token) return

            try {
                const tokenResponse = await fetch('http://localhost:3001/checkToken', {
                    headers: { 'Authorization': `Bearer ${token}` },
                })
                const { success, userId } = await tokenResponse.json()

                if (!success || !userId) return

                const response = await fetch(`http://localhost:3001/user/${userId}`)
                const data: UserType[] = await response.json()
                setUserData(data[0])
            } catch (error) {
                console.error('Failed to fetch User Data or validate token:', error)
            }
        }

        fetchUserData()
    }, [])


    useEffect(() => {
        const confirmLogout = async () => {
            if (logOut == false) return

            try {
                localStorage.removeItem('token');
                router.push(`/`);
            } catch (error) {
                console.error('Failed to fetch User Data or validate token:', error)
            }
        }

        confirmLogout()
    }, [logOut])

    useEffect(() => {
        const handleDelete = async () => {
            const token = localStorage.getItem('token');

            // Do nothing if deleteAccount is false or if there is no token
            if (!deleteAccount || !token) return;

            try {
                if (userId) {
                    const response = await fetch(`http://localhost:3001/user/delete`, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Use 'Authorization' and include 'Bearer' prefix
                            'userid': userId
                        },
                    });

                    if (response.ok) {
                        // Handle success (e.g., log out the user, redirect, etc.)
                        console.log('Account successfully deleted');
                    } else {
                        // Handle any errors
                        const errorMessage = await response.json();
                        console.error('Failed to delete account:', errorMessage);
                    }
                }
            } catch (error) {
                console.error('Error occurred while deleting account:', error);
            }
        };

        handleDelete();
    }, [deleteAccount, userId]);


    if (!isUserLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>You don't appear to be logged in anymore</p>
            </div>
        )
    }

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Loading user data...</p>
            </div>
        )
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => prev ? { ...prev, [e.target.name]: e.target.value } : prev)
    }

    const handleSubscriptionChange = (value: string) => {
        setUserData(prev => prev ? { ...prev, subscription: value } : prev)
    }

    const handleNotificationChange = (type: 'email' | 'push') => {
        setUserData(prev => prev ? {
            ...prev,
            email_notifications: type === 'email' ? !prev.email_notifications : prev.email_notifications,
            push_notifications: type === 'push' ? !prev.push_notifications : prev.push_notifications,
        } : prev)
    }

    const handleTwoFactorChange = () => {
        setUserData(prev => prev ? { ...prev, twoFactor: !prev.twoFactor } : prev)
    }

    const savesettings = async () => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const updatedSettings = { userData, password }

        // Create the request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Pass the token in headers
            },
            body: JSON.stringify({
                userId, // Include the userId in the body
                settings: updatedSettings, // Pass the updated settings
            }),
        };

        try {
            const response = await fetch('http://localhost:3001/user/save', requestOptions);
            if (!response.ok) {
                throw new Error('Failed to save settings');
            }
        } catch (error) {
            console.error('Error during settings save:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };


    // Opens Warning Screen
    const handleLogout = () => setIsLogoutDialogOpen(true)

    // Opens Warning Screen
    const handleDeleteAccountButton = () => setIsDeleteDialogOpen(true)

    return (
        <div className="min-h-screen bg-black text-white p-8 relative">
            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl font-bold mb-8 text-center">Account Settings</h1>
                <Tabs defaultValue="profile" className="space-y-8">
                    <TabsList className="bg-gray-800 p-1 rounded-lg">
                        <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 rounded">Profile</TabsTrigger>
                        <TabsTrigger value="subscription" className="data-[state=active]:bg-blue-600 rounded">Subscription</TabsTrigger>
                        <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 rounded">Notifications</TabsTrigger>
                        <TabsTrigger value="security" className="data-[state=active]:bg-blue-600 rounded">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card className="bg-gray-900 text-white border border-gray-800">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your account details here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="w-20 h-20 border-2 border-blue-600">
                                        <AvatarImage src={userData.profile_picture} alt={userData.username} />
                                        <AvatarFallback>{userData.username}</AvatarFallback>
                                    </Avatar>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Change Avatar</Button>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" name="username" value={userData.username} disabled className="bg-gray-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={userData.email} onChange={handleInputChange} className="bg-gray-800" />
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700" onClick={savesettings}>Save Changes</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="subscription">
                        <Card className="bg-gray-900 text-white border border-gray-800">
                            <CardHeader>
                                <CardTitle>Subscription Plan</CardTitle>
                                <CardDescription>Manage your subscription here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Select value={userData.subscription} onValueChange={handleSubscriptionChange}>
                                    <SelectTrigger className="bg-gray-800">
                                        <SelectValue placeholder="Select a plan" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800">
                                        <SelectItem value="Free">Free</SelectItem>
                                        {/*<SelectItem value="Pro">Pro</SelectItem>
                                        <SelectItem value="Ultimate">Ultimate</SelectItem>*/}
                                    </SelectContent>
                                </Select>
                                <div className="flex justify-between items-center">
                                    <span>Current Plan: {userData.subscription}</span>
                                    <Button variant="outline" className="bg-blue-600 hover:bg-blue-700">Upgrade Plan</Button>
                                </div>
                                <Separator />
                                {/*<div className="space-y-2">
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="bg-gray-800" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryDate">Expiry Date</Label>
                                        <Input id="expiryDate" placeholder="MM/YY" className="bg-gray-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" className="bg-gray-800" />
                                    </div>
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700">Update Payment Method</Button> */}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications">
                        <Card className="bg-gray-900 text-white border border-gray-800">
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>Manage how you receive notifications.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-notifications">Email Notifications</Label>
                                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                                    </div>
                                    <Switch
                                        id="email-notifications"
                                        checked={userData.email_notifications}
                                        onCheckedChange={() => handleNotificationChange('email')}
                                        className="bg-gray-600 data-[state=checked]:bg-blue-600"
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="push-notifications">Push Notifications</Label>
                                        <p className="text-sm text-gray-400">Receive push notifications on your device</p>
                                    </div>
                                    <Switch
                                        id="push-notifications"
                                        checked={userData.push_notifications}
                                        onCheckedChange={() => handleNotificationChange('push')}
                                        className="bg-gray-600 data-[state=checked]:bg-blue-600"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card className="bg-gray-900 text-white border border-gray-800">
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your account's security.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" className="bg-gray-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" className="bg-gray-800" />
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700">Change Password</Button>

                                {/*<Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                                    </div>
                                    <Switch
                                        id="two-factor"
                                        checked={userData.twoFactor}
                                        onCheckedChange={handleTwoFactorChange}
                                        className="bg-gray-600 data-[state=checked]:bg-blue-600"
                                    />
                                </div> */}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mt-8 flex justify-between items-center">
                    <Button
                        variant="outline"
                        className="bg-transparent border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </Button>
                    {/*<Button
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleDeleteAccountButton}
                    >
                        Delete Account
                    </Button>*/}
                </div>
            </div>

            <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <AlertDialogContent className="bg-gray-900 text-white border border-gray-800">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be redirected to the home page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => setLogOut(true)} className="bg-red-600 hover:bg-red-700">Log Out</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/*<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-gray-900 text-white border border-gray-800">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">
                            <AlertTriangle className="inline-block mr-2" />
                            Delete Account
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col items-stretch">
                        <Button
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white relative overflow-hidden mb-4"
                            onClick={() => setDeleteAccount(true)}
                        >
                            Delete Account
                            <div
                                className="absolute bottom-0 left-0 h-1 bg-white"
                            />
                        </Button>
                        <AlertDialogCancel
                            className="bg-gray-700 text-white hover:bg-gray-600"
                            onClick={() => {
                                setIsDeleteDialogOpen(false)
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>*/}
        </div>
    )
}