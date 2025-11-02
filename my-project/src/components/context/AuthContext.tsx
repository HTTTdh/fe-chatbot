import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getMe, login } from "@/services/userService";
import type { UserCreateRequest } from "@/types/user";

// ----------------------
// 🔹 Định nghĩa kiểu dữ liệu cho context
// ----------------------
type AuthContextType = {
  user: UserCreateRequest | null;
  loading: boolean;
  error: string | null;
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
};

// ----------------------
// 🔹 Tạo context
// ----------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------
// 🔹 AuthProvider: bọc quanh toàn app
// ----------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserCreateRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ----------------------
  // 🟢 Hàm gọi /users/me để kiểm tra đăng nhập
  // ----------------------
  const fetchUser = async () => {
    try {
      setLoading(true);
      const me = await getMe(); // tự động gửi cookie
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // 🟢 Khi app load, kiểm tra session hiện tại
  // ----------------------
  useEffect(() => {
    fetchUser();
  }, []);

  // ----------------------
  // 🟢 Đăng nhập
  // ----------------------
  const loginUser = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      await login(username, password); // Gửi request login (cookie lưu tự động)
      const me = await getMe(); // Gọi lại để lấy thông tin user
      setUser(me);
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // 🟢 Đăng xuất
  // ----------------------
  const logoutUser = () => {
    setUser(null);
    // Nếu backend có API logout thì có thể gọi ở đây
    // await axiosClient.post("/users/logout", {}, { withCredentials: true });
  };

  // ----------------------
  // 🟢 Trả context xuống toàn app
  // ----------------------
  return (
    <AuthContext.Provider
      value={{ user, loading, error, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------
// 🔹 Hook tiện ích để sử dụng AuthContext
// ----------------------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
