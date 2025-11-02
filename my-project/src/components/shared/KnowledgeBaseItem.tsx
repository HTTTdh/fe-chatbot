// src/components/knowledge-base/KnowledgeBaseItem.tsx
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { KnowledgeBaseItem as TKnowledgeBaseItem } from "@/types/knowledge";
import {
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
// Bỏ Input vì không dùng
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/formatDateTime";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea"; // Thêm lại Textarea
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface KnowledgeBaseItemProps {
  item: TKnowledgeBaseItem;
}

const formSchema = z.object({
  raw_content: z.string().min(1, "Nội dung là bắt buộc."),
});

export function KnowledgeBaseItem({ item }: KnowledgeBaseItemProps) {
  const { deleteItem, isDeleting, updateItem, isUpdating } = useKnowledgeBase();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      raw_content: item.raw_content || "",
    },
  });

  useEffect(() => {
    if (item.raw_content) {
      form.reset({
        raw_content: item.raw_content,
      });
    }
  }, [item.raw_content, form.reset]);

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    await deleteItem(item.id);
    setIsDeleteDialogOpen(false);
  };

  // 4. Reset form khi mở dialog
  const handleEditClick = () => {
    form.reset({
      raw_content: item.raw_content || "",
    });
    setIsEditDialogOpen(true);
  };

  // 5. Xử lý logic submit cho 'raw_content'
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateItem({
        id: item.id,
        data: {
          raw_content: values.raw_content,
        },
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  }

  return (
    <>
      <Item variant="outline" className="p-4">
        <FileText className="h-6 w-6 text-muted-foreground" />
        <ItemContent className="ml-4">
          <div className="flex items-center gap-2">
            <ItemTitle>{item.file_name}</ItemTitle>
            {/* Logic badge này dùng để xác định loại item */}
            <Badge variant={item.file_type !== null ? "secondary" : "outline"}>
              {item.file_type !== null ? item.file_type : "Văn bản"}
            </Badge>
          </div>
          <ItemDescription>
            Tạo lúc: {formatDateTime(item.created_at)}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isDeleting}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* 6. CHỈ HIỂN THỊ "Chỉnh sửa" nếu là "Văn bản" (file_type == null) */}
              {item.file_type === null && (
                <DropdownMenuItem onClick={handleEditClick}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </DropdownMenuItem>
              )}

              {/* Nút Xóa luôn hiển thị */}
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-red-600"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      {/* 7. Dialog Form này giờ chỉ dành cho "Văn bản" (Rich Text) */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Chỉnh sửa nội dung</DialogTitle>
                <DialogDescription>
                  Thay đổi nội dung văn bản và nhấn lưu.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* 8. Sửa FormField để dùng 'raw_content' với <Textarea> */}
                <FormField
                  control={form.control}
                  name="raw_content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung (Rich Text)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập nội dung văn bản..."
                          className="min-h-[200px]"
                          {...field}
                          disabled={isUpdating}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isUpdating}>
                    Hủy
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Lưu thay đổi
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa "{item.file_name}"? Hành động này không
              thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>
                Hủy
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                "Xóa"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Component Skeleton không thay đổi
export const KnowledgeBaseItemSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <Skeleton className="h-6 w-6 rounded" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-8 w-8" />
    </div>
  );
};
