'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        redirect: false,
      })

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "登录失败",
          description: "邮箱地址无效",
        })
      } else {
        router.push("/")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "出错了",
        description: "请稍后重试",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              邮箱
            </Label>
            <Input
              id="email"
              placeholder="邮箱地址"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            使用邮箱登录
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            或者
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleSignIn}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            src="/google.svg"
            alt="Google"
            width={16}
            height={16}
            className="mr-2"
          />
        )}
        使用 Google 账号登录
      </Button>
      <p className="px-8 text-center text-sm text-muted-foreground">
        还没有账号？{" "}
        <a
          href="/signup"
          className="underline underline-offset-4 hover:text-primary"
        >
          注册
        </a>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          角色梦工厂
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "这个平台让我能够轻松创建和管理我的 AI 角色，为我的创作带来了无限可能。"
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              欢迎回来
            </h1>
            <p className="text-sm text-muted-foreground">
              输入邮箱或使用 Google 账号登录
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
