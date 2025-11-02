import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/use-users";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

// 1. Import component với tên đúng (UserForm)
import { UserForm } from "./UserEditForm";

// 2. Import thêm hàm createUser
import { updateUser, registerUser } from "@/services/userService";
import { formatDateTime } from "@/lib/formatDateTime";
import type { UserResponse } from "@/types/user";

export function DataTable() {
  const { users, loading, error, refetchUsers } = useUsers();

  // State cho cả hai modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false); // <-- 3. Thêm state "Create"
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);

  // Lọc user (giữ nguyên)
  const viewableUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((item: UserResponse) => item.permission.can_view);
  }, [users]);

  // Mở modal Sửa
  const handleEditClick = (userResponse: UserResponse) => {
    setCurrentUser(userResponse);
    setIsEditOpen(true);
  };

  // 4. Mở modal Thêm mới
  const handleCreateClick = () => {
    setIsCreateOpen(true);
  };

  // 5. Đóng tất cả modal
  const handleCloseModals = () => {
    setIsEditOpen(false);
    setIsCreateOpen(false); // <-- Thêm
    setCurrentUser(null);
  };

  // Xử lý gọi API Sửa (giữ nguyên)
  const handleSaveUser = async (data: Partial<User>) => {
    if (!currentUser) return;

    try {
      await updateUser(currentUser.user.id, data);
      toast.success(
        `Đã cập nhật thành công người dùng ${currentUser.user.full_name}`
      );
      handleCloseModals(); // Đóng modal
      refetchUsers(); // Tải lại danh sách user
    } catch (err) {
      toast.error(
        `Lỗi khi cập nhật: ${(err as Error).message || "Lỗi không xác định"}`
      );
    }
  };

  // 6. Xử lý gọi API Thêm mới
  const handleCreateUser = async (data: Partial<User>) => {
    try {
      await registerUser(data);
      toast.success("Đã tạo người dùng mới thành công");
      handleCloseModals(); // Đóng modal
      refetchUsers(); // Tải lại danh sách user
    } catch (err) {
      toast.error(
        `Lỗi khi tạo người dùng: ${
          (err as Error).message || "Lỗi không xác định"
        }`
      );
    }
  };

  if (loading) {
    return <div className="text-center p-4">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">Có lỗi xảy ra: {error}</div>
    );
  }

  return (
    <>
      {/* 4. Nút "Thêm người dùng" */}
      <div className="flex justify-end mb-4">
        <Button onClick={handleCreateClick}>Thêm người dùng</Button>
      </div>

      <Table>
        <TableCaption>Danh sách người dùng trong hệ thống</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Người dùng</TableHead>
            <TableHead>Tên đầy đủ</TableHead>
            <TableHead>Liên hệ</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {viewableUsers.length > 0 ? (
            viewableUsers.map((item: UserResponse) => (
              <TableRow key={item.user.id}>
                <TableCell className="font-medium">
                  <div className="text-xs text-muted-foreground">
                    @{item.user.username}
                  </div>
                </TableCell>
                <TableCell>{item.user.full_name}</TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.user.role}</Badge>
                </TableCell>
                <TableCell>{formatDateTime(item.user.createdAt)}</TableCell>
                <TableCell className="text-right space-x-2">
                  {item.permission.can_edit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(item)}
                    >
                      Sửa
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Không tìm thấy người dùng nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 7. Render hai modal (Edit và Create) */}

      {/* Modal Sửa */}
      {isEditOpen && currentUser && (
        <UserForm
          mode="edit"
          userResponse={currentUser}
          isOpen={isEditOpen}
          onClose={handleCloseModals}
          onSave={handleSaveUser}
        />
      )}

      {/* Modal Thêm mới */}
      {isCreateOpen && (
        <UserForm
          mode="create"
          isOpen={isCreateOpen}
          onClose={handleCloseModals}
          onSave={handleCreateUser}
          // Không truyền userResponse
        />
      )}
    </>
  );
}
