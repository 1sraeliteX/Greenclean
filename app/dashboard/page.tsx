export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">Waste Management System</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Waste Collection Dashboard</h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">Collected Today</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">1,245 kg</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400">Recycled</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">843 kg</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <p className="text-sm text-amber-600 dark:text-amber-400">Pending Collections</p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">12</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors">
                Schedule Pickup
              </button>
              <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                Report Issue
              </button>
              <button className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-3 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                View Schedule
              </button>
              <button className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-3 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors">
                Recycling Guide
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-800 mt-8 py-6 border-t border-gray-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Waste Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
