import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  Link2,
  Zap,
  BarChart3,
  Shield,
  Clock,
  Share2,
} from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  // Redirect authenticated users to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              LinkShort
            </span>
          </div>
          <div className="flex gap-3">
            <SignInButton>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 dark:border-slate-700"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Shorten. Share. Track.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Create short, shareable links in seconds. Track clicks, analyze
              engagement, and manage all your links from one powerful dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SignUpButton>
                <Button size="lg" className="h-12">
                  Get Started Free
                </Button>
              </SignUpButton>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-slate-300 dark:border-slate-700"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Floating Feature Cards */}
          <div className="relative h-80 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg mb-4 ml-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Instant Links
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Create in 1 click
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg ml-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Live Analytics
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Track every click
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 dark:text-white mb-16">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Generate custom short links instantly. No waiting, no complexity.
                Just paste, click, and share.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Detailed Analytics
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Monitor click patterns, geolocation, device types, and referrers
                with comprehensive analytics dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Secure & Reliable
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Enterprise-grade security with SSL encryption, spam detection,
                and 99.9% uptime guarantee.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900 dark:to-orange-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Link Expiration
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Set custom expiration dates for links, control access, and manage
                link lifecycles with precision.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900 dark:to-pink-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Share2 className="w-7 h-7 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Easy Sharing
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                QR code generation, social media integration, and one-click copy
                functionality.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900 dark:to-indigo-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Link2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Custom Domains
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Use your own domain names for branded short links that reflect
                your brand identity.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Simplify Your Links?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users creating, sharing, and tracking short links
            with LinkShort. Start for free today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton>
              <Button
                size="lg"
                className="h-12 bg-white text-blue-600 hover:bg-blue-50"
              >
                Create Account
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white text-white hover:bg-blue-700 dark:hover:bg-blue-700"
              >
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-slate-900 dark:text-white">
                LinkShort
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              © 2026 LinkShort. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
