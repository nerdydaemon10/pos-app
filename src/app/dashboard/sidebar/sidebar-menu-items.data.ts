import { SidebarDropdownMenu } from './sidebar-dropdown-menu/sidebar-dropdown-menu.type'

export const sidebarMenuItems: SidebarDropdownMenu[] = [
  {
    name: "Sales Management",
    icon: "credit-card",
    items: [
      {
        name: "Dashboard",
        path: ""
      },
      {
        name: "Biling & Checkout",
        path: ""
      },
      {
        name: "Transactions History",
        path: ""
      },
      {
        name: "Sales Report",
        path: ""
      }
    ]
  },
  {
    name: "Inventory Management",
    icon: "grid-alt",
    items: [
      {
        name: "Stocks Overview",
        path: ""
      },
      {
        name: "Stock Movements",
        path: ""
      },
      {
        name: "Stock Adjustments",
        path: ""
      },
      {
        name: "Warehouse Managem.",
        path: ""
      },
      {
        name: "Re-Order Alerts",
        path: ""
      }
    ]
  },
  {
    name: "Product Management",
    icon: "shopping-bag",
    items: [
      {
        name: "Products",
        path: ""
      },
      {
        name: "Categories",
        path: ""
      },
      {
        name: "Brands",
        path: ""
      },
      {
        name: "Barcode/QR Management",
        path: ""
      },
    ]
  },
  {
    name: "Supplier Management",
    icon: "package",
    items: [
      {
        name: "Suppliers",
        path: ""
      },
      {
        name: "Purchase Orders",
        path: ""
      },
      {
        name: "Re-Order Alerts",
        path: ""
      }
    ]
  },
  {
    name: "Reports & Analytics",
    icon: "bar-chart-alt-2",
    items: [
      {
        name: "Sales Reports",
        path: ""
      },
      {
        name: "Inventory Reports",
        path: ""
      },
      {
        name: "Supplier Reports",
        path: ""
      }
    ]
  },
  {
    name: "User Management",
    icon: "cog",
    items: [
      {
        name: "Users",
        path: ""
      },
      {
        name: "Roles",
        path: ""
      },
      {
        name: "Permissions",
        path: ""
      }
    ]
  },
]