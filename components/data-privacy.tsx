import { Shield, Lock, Database } from "lucide-react";

export default function DataPrivacy() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-32">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-gray-50 text-4xl font-bold sm:text-5xl mb-6">
          Your Data Privacy
        </h2>
        <p className="text-xl text-gray-300">
          We take your privacy seriously. All your cognitive assessment data is
          stored securely in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Local Storage */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gray-900 p-8 rounded-xl">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div className="pt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-100 text-left">
                Local Storage
              </h3>
              <p className="text-gray-300 text-left text-lg">
                Your assessment results are stored directly in your
                browser&apos;s local storage, never leaves your device.
              </p>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gray-900 p-8 rounded-xl">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="pt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-100 text-left">
                Data Security
              </h3>
              <p className="text-gray-300 text-left text-lg">
                Your data is encrypted and protected. Only you have access to
                your assessment history and results.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Control */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gray-900 p-8 rounded-xl">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="pt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-100 text-left">
                Privacy Control
              </h3>
              <p className="text-gray-300 text-left text-lg">
                You have full control over your data. You can clear your
                assessment history at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
