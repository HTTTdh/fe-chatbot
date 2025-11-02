// import {
//   ResizablePanelGroup,
//   ResizablePanel,
//   ResizableHandle,
// } from "@/components/ui/resizable";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Loader2 } from "lucide-react";

import {
  ChatHeader,
  ChatInput,
  MessageItem,
} from "@/components/shared/ClientChatUI";
import { useClientChat } from "@/hooks/useClientChat";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { Loader2 } from "lucide-react";

// // Import hook logic
// import { useClientChat } from "@/hooks/useClientChat";

// // Import các component UI đã tách
// import {
//   Sidebar,
//   SupportPanel,
//   ChatHeader,
//   ChatInput,
//   MessageItem,
// } from "@/components/shared/ClientChatUI";

// /**
//  * Trang chat dành cho Công dân - Layout 3 cột
//  */
// export default function ClientChatPage() {
//   // Gọi hook để lấy tất cả state và logic
//   const {
//     messages,
//     newMessage,
//     sessionId,
//     isLoading,
//     isConnecting,
//     setNewMessage,
//     handleSendMessage,
//     handleKeyDown,
//     messagesEndRef,
//   } = useClientChat();

//   return (
//     <div className="flex h-screen w-full bg-background">
//       <ResizablePanelGroup direction="horizontal">
//         {/* === CỘT 1: ĐIỀU HƯỚNG === */}
//         <ResizablePanel
//           defaultSize={15}
//           minSize={15}
//           className="hidden md:block"
//         >
//           <Sidebar />
//         </ResizablePanel>

//         <ResizableHandle withHandle />

//         {/* === CỘT 2: KHUNG CHAT CHÍNH === */}
//         <ResizablePanel defaultSize={55} minSize={30}>
//           <div className="flex h-full flex-col">
//             <ChatHeader isConnecting={isConnecting} />

//             {/* Khu vực hiển thị tin nhắn */}
//             <ScrollArea className="flex-1 p-4">
//               <div className="mx-auto max-w-3xl flex flex-col gap-4">
//                 {isLoading ? (
//                   <div className="flex justify-center items-center p-8">
//                     <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
//                     <span className="ml-2 text-muted-foreground">
//                       Đang tải lịch sử...
//                     </span>
//                   </div>
//                 ) : (
//                   messages.map((msg, index) => (
//                     <MessageItem key={msg.id || index} msg={msg} />
//                   ))
//                 )}
//                 {/* Div trống để tự động cuộn */}
//                 <div ref={messagesEndRef} />
//               </div>
//             </ScrollArea>

//             <Separator />

//             {/* Khu vực nhập liệu */}
//             <ChatInput
//               newMessage={newMessage}
//               setNewMessage={setNewMessage}
//               handleSendMessage={handleSendMessage}
//               handleKeyDown={handleKeyDown}
//               isConnecting={isConnecting}
//               sessionId={sessionId}
//             />
//           </div>
//         </ResizablePanel>

//         <ResizableHandle withHandle />

//         {/* === CỘT 3: THÔNG TIN BỔ TRỢ === */}
//         <ResizablePanel defaultSize={30} minSize={20}>
//           <SupportPanel />
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </div>
//   );
// }

const ClientChat = () => {
  // Gọi hook để lấy tất cả state và logic
  const {
    messages,
    newMessage,
    sessionId,
    isLoading,
    isConnecting,
    setNewMessage,
    handleSendMessage,
    handleKeyDown,
    messagesEndRef,
  } = useClientChat();

  return (
    <div className="flex h-full flex-col">
      <ChatHeader isConnecting={isConnecting} />

      {/* Khu vực hiển thị tin nhắn */}
      <ScrollArea className="flex-1 p-4">
        <div className="mx-auto max-w-3xl flex flex-col gap-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Đang tải lịch sử...
              </span>
            </div>
          ) : (
            messages.map((msg, index) => (
              <MessageItem key={msg.id || index} msg={msg} />
            ))
          )}
          {/* Div trống để tự động cuộn */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <Separator />

      {/* Khu vực nhập liệu */}
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        handleKeyDown={handleKeyDown}
        isConnecting={isConnecting}
        sessionId={sessionId}
      />
    </div>
  );
};

export default ClientChat;
