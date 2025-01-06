import Link from 'next/link';
import { FaRobot, FaBrain, FaComments, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">欢迎来到 AI 角色创建平台</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            在这里，你可以创建和管理你的 AI 角色，为每个角色定制独特的个性和行为特征。
            打造属于你的专属 AI 助手，让交互更加个性化和有趣。
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/create"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transform hover:scale-105 transition-all shadow-lg"
            >
              创建新角色
            </Link>
            <Link
              href="/characters"
              className="px-8 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all"
            >
              浏览角色列表
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">平台特色</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-3xl mb-4 flex justify-center">
              <FaRobot />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">个性化角色</h3>
            <p className="text-gray-600 text-center">
              自定义角色性格、知识领域和对话风格，创造独一无二的 AI 助手
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-3xl mb-4 flex justify-center">
              <FaBrain />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">智能学习</h3>
            <p className="text-gray-600 text-center">
              AI 角色能够学习和适应你的偏好，提供更贴心的互动体验
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-3xl mb-4 flex justify-center">
              <FaComments />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">自然对话</h3>
            <p className="text-gray-600 text-center">
              支持流畅的多轮对话，让交流更加自然和连贯
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-3xl mb-4 flex justify-center">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">角色市场</h3>
            <p className="text-gray-600 text-center">
              探索其他用户创建的角色，分享你的创意
            </p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">使用指南</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold">创建角色</h3>
              <p className="text-gray-600">定义角色的基本信息，包括名称、性格特征和专业领域</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold">设置行为模式</h3>
              <p className="text-gray-600">自定义角色的对话风格、回应方式和知识范围</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold">开始对话</h3>
              <p className="text-gray-600">与你创建的 AI 角色进行互动，体验个性化的对话</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
