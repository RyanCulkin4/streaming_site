"use client"

import type React from "react"

import { useState } from "react"
import { X, Eye, EyeOff, Check, Star, Zap, Database, Shield, TrendingUp, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { signIn } from "next-auth/react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  // Database values for average user selections
  averageSelections?: {
    adFreeTokens: number
    storage: number
  }
}

export default function AuthModal({
  isOpen,
  onClose,
  // Default average values (these would come from your database)
  averageSelections = {
    adFreeTokens: 200, // Average user selects 200 tokens
    storage: 100, // Average user selects 100GB
  },
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [subscription, setSubscription] = useState({
    adFreeTokens: 0,
    storage: 50,
  })

  // Validation states
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    general: "",
  })

  //const { updateSubscription } = useAuth()

  if (!isOpen) return null

  const validateUsername = (username: string) => {
    if (username.length < 3) return "Username must be at least 3 characters"
    if (username.includes(" ")) return "Username cannot contain spaces"
    return ""
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return ""
  }

  const validatePassword = (password: string) => {
    if (password.length < 6) return "Password must be at least 6 characters"
    return ""
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear errors on input change
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "", general: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({ username: "", email: "", password: "", general: "" })

    try {
      if (isLogin) {
        // Handle login with NextAuth
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setErrors((prev) => ({ ...prev, general: "Invalid email or password" }))
        } else {
          onClose()
        }
      } else {
        // Validate signup form
        const newErrors = {
          username: validateUsername(formData.username),
          email: validateEmail(formData.email),
          password: validatePassword(formData.password),
          general: "",
        }

        setErrors(newErrors)

        if (!Object.values(newErrors).some((error) => error)) {
          // Handle signup
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              username: formData.username,
              subscription: {
                adFreeTokens: getAdFreePrice(),
                storage: getStoragePrice(),
              },
            }),
          })

          if (response.ok) {
            // Auto-login after successful registration
            const result = await signIn("credentials", {
              email: formData.email,
              password: formData.password,
              redirect: false,
            })

            if (!result?.error) {
              onClose()
            }
          } else {
            const errorData = await response.json()
            setErrors((prev) => ({ ...prev, general: errorData.error || "Registration failed" }))
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      setErrors((prev) => ({ ...prev, general: "An unexpected error occurred" }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/" })
    } catch (error) {
      console.error("Social login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Ad Free Token options: 0, 100, 200, 300, 400, 500, Infinite
  const adFreeTokenOptions = [0, 100, 200, 300, 400, 500, 999] // 999 represents infinite
  const getAdFreeTokensFromSlider = (value: number) => {
    return adFreeTokenOptions[value]
  }
  const getSliderFromAdFreeTokens = (tokens: number) => {
    if (tokens === 999) return 6
    return adFreeTokenOptions.indexOf(tokens)
  }

  // Storage options: 50, 100, 200, 500, 1000
  const storageOptions = [50, 100, 200, 500, 1000]
  const getStorageFromSlider = (value: number) => {
    return storageOptions[value]
  }
  const getSliderFromStorage = (storage: number) => {
    return storageOptions.indexOf(storage)
  }

  // Calculate average positions for arrows
  const getAverageAdFreePosition = () => {
    const averageIndex = getSliderFromAdFreeTokens(averageSelections.adFreeTokens)
    return (averageIndex / 6) * 100 // Convert to percentage
  }

  const getAverageStoragePosition = () => {
    const averageIndex = getSliderFromStorage(averageSelections.storage)
    return (averageIndex / 4) * 100 // Convert to percentage
  }

  const getAdFreePrice = () => {
    if (subscription.adFreeTokens === 0) return 0
    if (subscription.adFreeTokens === 100) return 1
    if (subscription.adFreeTokens === 200) return 2
    if (subscription.adFreeTokens === 300) return 3
    if (subscription.adFreeTokens === 400) return 4
    if (subscription.adFreeTokens === 500) return 5
    return 6 // Infinite
  }

  const getStoragePrice = () => {
    if (subscription.storage === 50) return 0
    if (subscription.storage === 100) return 2
    if (subscription.storage === 200) return 4
    if (subscription.storage === 500) return 6
    return 8 // 1TB
  }

  const getTotalPrice = () => {
    return getAdFreePrice() + getStoragePrice()
  }

  // Calculate site tokens based on total subscription price / 3 (rounded up)
  const getSiteTokens = () => {
    const totalPrice = getTotalPrice()
    if (totalPrice === 0) return 1 // Free users get 1 token if active
    return Math.ceil(totalPrice / 3)
  }

  // Component for average indicator arrow
  const AverageIndicator = ({ position, value }: { position: number; value: string }) => (
    <div
      className="absolute -top-8 transform -translate-x-1/2 flex flex-col items-center z-10"
      style={{ left: `${position}%` }}
    >
      <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
        <TrendingUp className="h-3 w-3" />
        <span className="font-medium">Avg: {value}</span>
      </div>
      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500 mt-1"></div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between p-8 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-pink-400">
                {isLogin ? "Welcome Back" : "Join AnimeVerse"}
              </h2>
              <p className="text-gray-400 text-sm">
                {isLogin ? "Sign in to your account" : "Create your personalized experience"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="relative p-8">
          <div className={`grid gap-12 ${isLogin ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 lg:grid-cols-2"}`}>
            {/* Login/Signup Form */}
            <div className={isLogin ? "text-center" : ""}>
              {/* Tab Switcher */}
              <div className="flex mb-8 p-1 bg-gray-800/50 rounded-xl border border-gray-700/50">
                <Button
                  variant="ghost"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 rounded-lg transition-all duration-300 ${
                    isLogin
                      ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 rounded-lg transition-all duration-300 ${
                    !isLogin
                      ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="w-full bg-white/5 border-gray-600/50 text-white hover:bg-white/10 rounded-xl h-12"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("discord")}
                  disabled={isLoading}
                  className="w-full bg-[#5865F2]/10 border-[#5865F2]/50 text-white hover:bg-[#5865F2]/20 rounded-xl h-12"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Continue with Discord
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or continue with email</span>
                </div>
              </div>

              {errors.general && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-300 font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-xl h-12 transition-all duration-200"
                      placeholder="Choose your username"
                      disabled={isLoading}
                    />
                    {errors.username && (
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                        {errors.username}
                      </p>
                    )}
                    <p className="text-gray-500 text-xs flex items-center gap-2">
                      <Check className="h-3 w-3" />
                      Must be at least 3 characters, no spaces allowed
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-xl h-12 transition-all duration-200"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-xl h-12 pr-12 transition-all duration-200"
                      placeholder="Create a secure password"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                      {errors.password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="flex items-center gap-2">
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isLogin ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                    {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                  </div>
                </Button>
              </form>

              {isLogin && (
                <div className="mt-6">
                  <Button variant="link" className="text-pink-400 hover:text-pink-300 transition-colors duration-200">
                    Forgot your password?
                  </Button>
                </div>
              )}
            </div>

            {/* Subscription Builder (only for signup) */}
            {!isLogin && (
              <div>
                <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-pink-500/10 to-violet-500/10 border-b border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-gray-200 text-xl">Build Your Subscription</CardTitle>
                        <CardDescription className="text-gray-400">
                          Customize your AnimeVerse experience with flexible options
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Ad Free Tokens */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-lg flex items-center justify-center">
                            <Shield className="h-4 w-4 text-pink-400" />
                          </div>
                          <Label className="text-gray-200 font-semibold">Ad Free Tokens</Label>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                            ${getAdFreePrice()}
                          </span>
                          <span className="text-gray-400 text-sm">/month</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="relative">
                          <AverageIndicator
                            position={getAverageAdFreePosition()}
                            value={
                              averageSelections.adFreeTokens === 999 ? "∞" : averageSelections.adFreeTokens.toString()
                            }
                          />
                          <Slider
                            value={[getSliderFromAdFreeTokens(subscription.adFreeTokens)]}
                            onValueChange={(value: number[]) => {
                              if (value.length > 0) {
                                const tokens = getAdFreeTokensFromSlider(value[0])
                                setSubscription((prev) => ({ ...prev, adFreeTokens: tokens }))
                              }
                            }}
                            max={6}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span>100</span>
                          <span>200</span>
                          <span>300</span>
                          <span>400</span>
                          <span>500</span>
                          <span>∞</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-pink-500/5 to-violet-500/5 p-4 rounded-xl border border-pink-500/10">
                        <p className="text-sm text-gray-300">
                          <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                            {subscription.adFreeTokens === 999
                              ? "Unlimited"
                              : subscription.adFreeTokens === 0
                                ? "No"
                                : subscription.adFreeTokens}{" "}
                            {subscription.adFreeTokens === 0 ? "ad-free experience" : "tokens"}
                          </strong>{" "}
                          {subscription.adFreeTokens === 0
                            ? "- You'll see ads but can still enjoy all content"
                            : "- Each token covers one ad. When depleted, ads return until next month."}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                    {/* Storage Space */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-lg flex items-center justify-center">
                            <Database className="h-4 w-4 text-pink-400" />
                          </div>
                          <Label className="text-gray-200 font-semibold">Storage Space</Label>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                            ${getStoragePrice()}
                          </span>
                          <span className="text-gray-400 text-sm">/month</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="relative">
                          <AverageIndicator
                            position={getAverageStoragePosition()}
                            value={averageSelections.storage >= 1000 ? "1TB" : `${averageSelections.storage}GB`}
                          />
                          <Slider
                            value={[getSliderFromStorage(subscription.storage)]}
                            onValueChange={(value: number[]) => {
                              const storage = getStorageFromSlider(value[0])
                              setSubscription((prev) => ({ ...prev, storage: storage }))
                            }}
                            max={4}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>50GB</span>
                          <span>100GB</span>
                          <span>200GB</span>
                          <span>500GB</span>
                          <span>1TB</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-pink-500/5 to-violet-500/5 p-4 rounded-xl border border-pink-500/10">
                        <p className="text-sm text-gray-300">
                          <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                            {subscription.storage >= 1000 ? "1TB" : `${subscription.storage}GB`}
                          </strong>{" "}
                          - Private uploads count toward your limit. Public content uploads are unlimited and free.
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                    {/* Site Tokens - Now calculated automatically */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                            <Coins className="h-4 w-4 text-violet-400" />
                          </div>
                          <Label className="text-gray-200 font-semibold">Site Tokens</Label>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                            {getSiteTokens()}
                          </span>
                          <span className="text-gray-400 text-sm">/month</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-violet-500/5 to-pink-500/5 p-4 rounded-xl border border-violet-500/10">
                        <div className="space-y-3">
                          <p className="text-sm text-gray-300">
                            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                              {getSiteTokens()} tokens/month
                            </strong>{" "}
                            - Sitewide currency for purchasing anything on AnimeVerse
                          </p>
                          <div className="space-y-2 text-xs text-gray-400">
                            {getTotalPrice() === 0 ? (
                              <div className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>
                                  <strong className="text-orange-400">Free Users:</strong> Get 1 token monthly by
                                  staying active (viewing content or interacting with polls at least twice per week)
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>
                                  <strong className="text-green-400">Paying Members:</strong> Automatic monthly
                                  allocation based on subscription cost ÷ 3 (rounded up), regardless of activity
                                </span>
                              </div>
                            )}
                            <div className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>
                                <strong className="text-blue-400">Use tokens for:</strong> Extra ad-free tokens,
                                exclusive merch, physical media, collectibles, and more
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                    {/* Total */}
                    <div className="bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-pink-500/10 p-6 rounded-2xl border border-pink-500/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-violet-500/5 animate-pulse"></div>
                      <div className="relative">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-200 font-bold text-xl">Total Monthly Cost:</span>
                          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-pink-400">
                            ${getTotalPrice()}
                            <span className="text-lg text-gray-400">/month</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span>
                              {subscription.adFreeTokens === 999
                                ? "Unlimited"
                                : subscription.adFreeTokens === 0
                                  ? "Standard"
                                  : subscription.adFreeTokens}{" "}
                              {subscription.adFreeTokens === 0 ? "experience" : "ad-free tokens"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-5 h-5 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span>
                              {subscription.storage >= 1000 ? "1TB" : `${subscription.storage}GB`} private storage
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span>{getSiteTokens()} site tokens monthly</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-5 h-5 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span>Unlimited public uploads</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}