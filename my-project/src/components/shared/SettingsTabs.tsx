import React, { useState } from "react"; // 1. Cần import React
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// 2. Import 'InputProps' để gõ kiểu cho PasswordInput
import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { RadioGroupSetting } from "./RadioGroup"; // Giả định import
import { Eye, EyeOff, PlusCircle, XCircle } from "lucide-react";
import { RadioGroupSetting } from "./RadioGroup";
import { Textarea } from "../ui/textarea";

// 3. Định nghĩa kiểu cho một key item
type KeyItem = {
  id: number;
  value: string;
};

// 4. Sử dụng InputProps thay vì 'any'
const PasswordInput = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <div className="relative">
      <Input
        type={isVisible ? "text" : "password"}
        className="pr-10"
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-900"
        onClick={() => setIsVisible(!isVisible)}
        aria-label={isVisible ? "Ẩn key" : "Hiển thị key"}
      >
        <Icon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function SettingsTabs() {
  const [showKeySection, setShowKeySection] = useState(false);

  // 5. Gõ kiểu cho state 'keys' là một mảng của KeyItem
  const [keys, setKeys] = useState<KeyItem[]>([]);

  // 6. Gõ kiểu cho 'event'
  const handleKeyChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setKeys((currentKeys) =>
      currentKeys.map((key) =>
        key.id === id ? { ...key, value: newValue } : key
      )
    );
  };

  const addKeyInput = () => {
    if (!showKeySection) {
      setShowKeySection(true);
      setKeys([{ id: Date.now(), value: "" }]);
      return;
    }
    setKeys((currentKeys) => [...currentKeys, { id: Date.now(), value: "" }]);
  };

  // 7. Gõ kiểu cho 'idToRemove'
  const removeKeyInput = (idToRemove: number) => {
    setKeys((currentKeys) =>
      currentKeys.filter((key) => key.id !== idToRemove)
    );
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="configAI" className="w-full">
        <TabsList>
          <TabsTrigger value="configAI">Cấu hình AI</TabsTrigger>
          <TabsTrigger value="configPrompt">Cấu hình Prompt</TabsTrigger>
          <TabsTrigger value="configInfo">Thông tin chatbot</TabsTrigger>
        </TabsList>
        <TabsContent value="configAI">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình AI</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Chọn mô hình</Label>
                <RadioGroupSetting />
              </div>

              <div className="grid gap-4">
                <Label>API Keys</Label>
                {showKeySection && (
                  <div className="grid gap-4">
                    {/* TypeScript sẽ tự động suy ra 'keyItem' là kiểu 'KeyItem' */}
                    {keys.map((keyItem, index) => (
                      <div key={keyItem.id} className="flex items-center gap-2">
                        <div className="flex-1 grid gap-1.5">
                          <Label
                            htmlFor={`key-${keyItem.id}`}
                            className="text-xs text-gray-600"
                          >
                            Key {index + 1}
                          </Label>
                          <PasswordInput
                            id={`key-${keyItem.id}`}
                            value={keyItem.value}
                            onChange={(event) =>
                              handleKeyChange(keyItem.id, event)
                            }
                            placeholder="Dán API key của bạn vào đây..."
                          />
                        </div>
                        {keys.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="mt-5 text-red-500 hover:text-red-700"
                            onClick={() => removeKeyInput(keyItem.id)}
                            aria-label="Xóa key"
                          >
                            <XCircle className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={addKeyInput}
                  className="w-fit"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {keys.length === 0 ? "Thêm key" : "Thêm key khác"}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Lưu cấu hình</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="configPrompt">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình Prompt</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Textarea placeholder="Nhập prompt tùy chỉnh của bạn ở đây..." />
            </CardContent>
            <CardFooter>
              <Button>Lưu cấu hình</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="configInfo">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chatbot</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
