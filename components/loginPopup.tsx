import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import React from 'react'
import { SubscriptionTiers } from "@/app/api/types/types";


export function LoginPopup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>('');
    const [isSignIn, setIsSignIn] = useState(true);
    const [selectedTier, setSelectedTier] = useState<string>('Free'); // Default Selection is 'Free'; Other options are 'Pro', or 'Ultimate'
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionTiers[]>([]);



    const handleSignIn = async () => {
        setError(''); // Reset error before attempting sign in
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            localStorage.setItem('token', response.data.token);
            window.location.reload();

        } catch (err) {
            setError('Invalid username or password'); // Debug log
        }
    };


    const handleSignUp = async () => {
        setError(''); // Reset error before attempting sign up
        try {
            const response = await axios.post('http://localhost:3001/signup', { username, password, email, selectedTier });
            console.log(response.data); // Debug log
            localStorage.setItem('token', response.data.token);
            window.location.reload();
        } catch (err) {
            console.error(err); // Debug log
            setError('Error during sign up. Please try again.');
        }
    };

    useEffect(() => {
        const fetchSubscriptionTiers = async () => {
            try {
                const response = await fetch('http://localhost:3001/subscription_tiers');
                if (!response.ok) throw new Error('Network response was not ok');
                const data: SubscriptionTiers[] = await response.json(); // Expect an array
                setSubscriptionData(data)
            } catch (error) {
                console.error('Failed to fetch reviews data:', error);
                return [];
            }
        };

        fetchSubscriptionTiers();
    }, []);

    // Clear error on username or password change
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if (error) setError(''); // Clear error on input change
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) setError(''); // Clear error on input change
    };

    return (
        <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white">
            <DialogHeader>
                <DialogTitle>Sign Up / Sign In</DialogTitle>
                <DialogDescription className="text-gray-400">Create an account or sign in to access all features.</DialogDescription>
            </DialogHeader>
            {error && <p className="text-red-500">{error}</p>} {/* Ensure this is displayed */}
            <Tabs defaultValue="signin" className="w-full" onValueChange={(value) => setIsSignIn(value === 'signin')}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                    <TabsTrigger value="signin" className="data-[state=active]:bg-gray-700">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-gray-700">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Username / Email"
                        className="bg-gray-800 text-white"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        className="bg-gray-800 text-white"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSignIn}>Sign In</Button>
                </TabsContent>
                <TabsContent value="signup" className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Username"
                        className="bg-gray-800 text-white"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            if (error) setError(''); // Clear error on input change
                        }}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        className="bg-gray-800 text-white"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (error) setError(''); // Clear error on input change
                        }}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        className="bg-gray-800 text-white"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError(''); // Clear error on input change
                        }}
                    />
                    <div className="space-y-2">
                        <h4 className="font-semibold">Subscription Tiers:</h4>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {subscriptionData.map((tier) => (
                                <div
                                    key={tier.name}
                                    className={`border p-4 rounded-lg flex flex-col ${selectedTier === tier.name ? 'bg-blue-600' : 'bg-gray-800'}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h5 className="font-semibold">{tier.name}</h5>
                                        {/*{tier.icon}*/}
                                    </div>
                                    <p className="font-bold mb-4">${tier.price}</p>
                                    <ul className="text-sm list-disc pl-5 mb-4 flex-grow space-y-2">
                                        {tier.votepower !== 0 && (
                                            <li>{tier.votepower_txt}</li>
                                        )}
                                        {tier.cloudlimit !== 0 && (
                                            <li>{tier.cloudlimit_txt}</li>
                                        )}
                                        {tier.store_discount !== 0 && (
                                            <li>{tier.store_discount_txt}</li>
                                        )}
                                        {tier.game_discount !== 0 && (
                                            <li>{tier.game_discount_txt}</li>
                                        )}
                                        {tier.other && tier.other.length > 0 ? (
                                            tier.other.map((other_items) => (
                                                <li>{other_items}</li>
                                            ))
                                        ) : null}

                                    </ul>
                                    <Button
                                        className="w-full mt-auto"
                                        variant={selectedTier === tier.name ? "secondary" : "default"}
                                        onClick={() => setSelectedTier(tier.name)}
                                    >
                                        {selectedTier === tier.name ? 'SELECTED' : 'Select'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSignUp}>Sign Up</Button>
                </TabsContent>
            </Tabs>
        </DialogContent>
    );
}
