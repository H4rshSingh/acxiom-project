import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to the ERP System</h1>
      <p className="mt-4 text-lg">Choose your role to continue:</p>

      <div className="mt-8 flex space-x-4">
        <Link href="/vendor/login" className="px-6 py-2 bg-blue-500 text-white rounded">Vendor</Link>
        <Link href="/admin/login" className="px-6 py-2 bg-green-500 text-white rounded">Admin</Link>
        <Link href="/user/login" className="px-6 py-2 bg-red-500 text-white rounded">User</Link>
      </div>
    </div>
  );
}