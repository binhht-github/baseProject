
import { createRoot } from 'react-dom/client'
import './index.css'
import '@/theme/theme.css'
import './i18n/i18n.ts';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PermissionProvider } from './context/PermissionContext.tsx';
import type { User } from './type/type.g.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // dữ liệu tươi trong 5 phút
      // cacheTime: 1000 * 60 * 10, // cache tồn tại 10 phút nếu không được dùng
      retry: 2, // thử lại 2 lần nếu lỗi
      retryDelay: attempt => attempt * 1000, // delay tăng dần theo số lần thử
      refetchOnWindowFocus: false, // không fetch lại khi focus tab
      refetchOnReconnect: true, // fetch lại khi mạng khôi phục
    },
    mutations: {
      retry: false,
    },
  },
});


const user: User = {
  id: "1",
  name: "Hung Hoang",
  // role: "viewer", // phải là 1 trong "admin" | "editor" | "viewer"
  role: "admin", // phải là 1 trong "admin" | "editor" | "viewer"
  // permissions: ["user:create", "user:delete", "product:edit"],
  permissions: ["user:create", "user:update"],
};



createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <PermissionProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PermissionProvider>
    </ThemeProvider>
  </QueryClientProvider>,
)
