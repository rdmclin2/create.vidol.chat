import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">欢迎来到 AI 角色创建平台</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          在这里，你可以创建和管理你的 AI 角色，为每个角色定制独特的个性和行为特征。
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/create"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            创建新角色
          </Link>
          <Link
            href="/characters"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            浏览角色列表
          </Link>
        </div>
      </div>
    </div>
  );
}
