import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Import icons từ lucide-react
import {
  Search,
  Paperclip,
  SendHorizontal,
  Archive,
  Loader2,
} from "lucide-react";

// --- IMPORT TỪ LOGIC VÀ COMPONENT ĐÃ TÁCH ---
import { useAdminChat } from "@/hooks/useAdminChat";
import { SessionItem, MessageItem } from "@/components/shared/ChatComponents";

// --- COMPONENT CHÍNH: TRANG CHAT ADMIN ---

export default function ChatPage() {
  // Chỉ một dòng này để lấy TOÀN BỘ logic!
  const {
    isLoadingSessions,
    isLoadingMessages,
    filteredSessions,
    currentSessionId,
    currentSessionInfo,
    messages,
    newMessage,
    searchTerm,
    setNewMessage,
    setSearchTerm,
    handleSelectSession,
    handleSendMessage,
    handleKeyDown,
    messagesEndRef,
  } = useAdminChat();

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      {/* THAY THẾ ResizablePanelGroup bằng <div> với flex-row */}
      <div className="flex h-full w-full flex-row">
        {/* === CỘT 1: DANH SÁCH PHIÊN CHAT (Width cố định) === */}
        <div className="flex h-full w-[300px] flex-shrink-0 flex-col border-r">
          <div className="flex h-full flex-col">
            <div className="p-3">
              <h2 className="text-lg font-semibold">Phiên chat</h2>
            </div>
            <div className="relative p-3">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm phiên..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* THAY THẾ ScrollArea bằng <div overflow-y-auto> */}
            <div className="flex-1 overflow-y-auto px-2">
              <div className="flex flex-col gap-1">
                {isLoadingSessions ? (
                  <div className="flex justify-center items-center p-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  filteredSessions.map((session) => (
                    <SessionItem
                      key={session.chat_session_id}
                      session={session}
                      isActive={session.chat_session_id === currentSessionId}
                      onClick={() =>
                        handleSelectSession(session.chat_session_id)
                      }
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* === CỘT 2: NỘI DUNG CHAT (Width linh hoạt) === */}
        <div className="flex h-full flex-1 flex-col">
          <div className="flex h-full flex-col">
            {/* Header của cột chat */}
            <div className="flex h-14 items-center justify-between border-b p-3">
              <h3 className="text-lg font-semibold">
                {currentSessionInfo
                  ? `Phiên: ${
                      currentSessionInfo.customer_name ||
                      currentSessionInfo.chat_session_id.slice(0, 8)
                    }`
                  : "Chọn một phiên chat"}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  disabled={!currentSessionId}
                >
                  <Archive className="mr-2 h-4 w-4" />
                  Thủ công
                </Button>
              </div>
            </div>

            {/* Khu vực hiển thị tin nhắn */}
            {/* THAY THẾ ScrollArea bằng <div overflow-y-auto> */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-4">
                {isLoadingMessages ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">
                      Đang tải tin nhắn...
                    </span>
                  </div>
                ) : !currentSessionId ? (
                  <div className="text-center text-muted-foreground p-8">
                    Vui lòng chọn một phiên chat từ danh sách bên trái.
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <MessageItem key={msg.id || index} msg={msg} />
                  ))
                )}
                {/* Ref này vẫn dùng để cuộn xuống cuối */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <Separator />

            {/* Khu vực nhập liệu (Giữ nguyên) */}
            <div className="p-4">
              <div className="relative">
                <Textarea
                  placeholder={
                    currentSessionId
                      ? "Nhập tin nhắn..."
                      : "Vui lòng chọn phiên chat..."
                  }
                  className="pr-28 min-h-[60px]"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!currentSessionId || isLoadingMessages}
                />
                <div className="absolute right-3 top-3 flex gap-2">
                  <Button variant="ghost" size="icon" disabled>
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Đính kèm</span>
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || !currentSessionId}
                  >
                    <SendHorizontal className="h-4 w-4" />
                    <span className="sr-only">Gửi</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === CỘT 3: THÔNG TIN HỖ TRỢ (Width cố định) === */}
        <div className="flex h-full w-[350px] flex-shrink-0 flex-col border-l">
          {/* THAY THẾ ScrollArea bằng <div overflow-y-auto> */}
          <div className="h-full overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              {/* Card: Thông tin phiên */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin phiên hỗ trợ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Cán bộ xử lý</Label>
                    <Select
                      defaultValue="nguyen-van-a"
                      disabled={!currentSessionId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cán bộ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chua-gan">Chưa gán</SelectItem>
                        <SelectItem value="nguyen-van-a">
                          Nguyễn Văn A
                        </SelectItem>
                        <SelectItem value="tran-thi-b">Trần Thị B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Card: Hồ sơ liên quan */}
              <Card>
                <CardHeader>
                  <CardTitle>Hồ sơ liên quan</CardTitle>
                  <CardDescription>
                    Liên kết với hồ sơ trên Cổng Dịch vụ công.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="ma-ho-so">Mã hồ sơ</Label>
                    <Input
                      id="ma-ho-so"
                      placeholder="Nhập mã hồ sơ..."
                      disabled={!currentSessionId}
                    />
                  </div>
                  <Button className="w-full" disabled={!currentSessionId}>
                    Tìm kiếm hồ sơ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
