import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardHeader } from "@/components/organisms/dashboard-header";

// Mock the hooks
vi.mock("@/stores/useUserStore", () => ({
  useUserStore: () => ({
    user: { name: "Test User", email: "test@example.com" },
  }),
}));

vi.mock("@/features/leads/hooks", () => ({
  useUnreadLeadsCount: () => ({
    data: { count: 5 },
  }),
}));

vi.mock("@/features/auth/hooks/useLogout", () => ({
  useLogout: () => ({
    mutate: vi.fn(),
  }),
}));

// Mock Lucide icons
vi.mock("lucide-react", () => ({
  Bell: () => <span data-testid="bell-icon">Bell</span>,
  LogOut: () => <span>LogOut</span>,
  Menu: () => <span>Menu</span>,
  Search: () => <span>Search</span>,
  User: () => <span>User</span>,
}));

// Mock components
vi.mock("@/components/atoms/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: () => <div>DropdownContent</div>,
  DropdownMenuItem: () => <div>DropdownMenuItem</div>,
  DropdownMenuLabel: () => <div>DropdownMenuLabel</div>,
  DropdownMenuSeparator: () => <div>DropdownMenuSeparator</div>,
}));

vi.mock("@/components/atoms/popover", () => ({
  Popover: ({ children }: any) => <div>{children}</div>,
  PopoverTrigger: ({ children }: any) => <div>{children}</div>,
  PopoverContent: () => <div>PopoverContent</div>,
}));

vi.mock("@/components/atoms/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

describe("DashboardHeader Accessibility", () => {
  it("notification button has accessible name and visible focus styles", () => {
    render(
      <DashboardHeader
        onMenuClick={vi.fn()}
        title="Dashboard"
        subtitle="Overview"
      />
    );

    // Find the notification button
    // We expect this to FAIL initially because aria-label is missing
    // or PASS if I use a less specific query, but for TDD strictness I'll use getByRole with name
    // However, since I'm fixing it in the next step, I'll write the test for the DESIRED state.

    // Attempt to find by role "button" with name "Notificações" (which doesn't exist yet)
    // If this throws, the test fails, which is correct for TDD (red-green-refactor)
    // But to avoid crashing the test suite completely, let's use queryByRole and expect it to be in the document.

    const notificationButton = screen.queryByRole("button", { name: /notificações/i });

    // This assertion will fail until the fix is implemented
    expect(notificationButton).toBeInTheDocument();

    if (notificationButton) {
        expect(notificationButton).toHaveClass("focus-visible:ring-2");
        expect(notificationButton).toHaveClass("outline-none");
    }
  });
});
