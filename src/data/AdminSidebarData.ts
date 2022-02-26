import { NavInterface } from "../interfaces/AdminSideBarInterface";
import { ROUTE_LIST } from "../RoutConstants";
export const adminSideBarData: NavInterface[] = [
	{
		name: "Master Setup",

		list: [
			{
				name: "Create Wing",
				link: "/admin/wings/create",
				permissions: [],
			},
			{
				name: "Wings",
				link: "/admin/wings",
				permissions: [],
			},
			{
				name: "Create Bank",
				link: "/admin/banks/create",
				permissions: [],
			},
			{
				name: "Banks",
				link: "/admin/banks",
				permissions: [],
			},
		],
	},
	{
		name: "User Management",
		list: [
			{
				name: "Create User",
				link: "/admin/users/create",
				permissions: [],
			},
			{
				name: "Users",
				link: "/admin/users",
				permissions: [],
			},
			{
				name: "Create Role",
				link: "/admin/roles/create",
				permissions: [],
			},
			{
				name: "Roles",
				link: "/admin/roles",
				permissions: [],
			},
		],
	},
	{
		name: "Doctor",
		list: [
			{
				name: "Add Doctor",
				link: ROUTE_LIST.createDoctor,
				permissions: [],
			},
			{
				name: "List Doctors",
				link: ROUTE_LIST.listDoctors,
				permissions: [],
			},

		
		],
	},
	{
		name: "Patient",
		list: [
			{
				name: "Add Patient",
				link: "/admin/patients/create",
				permissions: [],
			},
			{
				name: "List Patients",
				link: "/admin/patients",
				permissions: [],
			},

		
		],
	},
	{
		name: "Appointment",
		list: [
			{
				name: "Add Appointment",
				link: ROUTE_LIST.createAppointment,
				permissions: [],
			},
			{
				name: "List Appointments",
				link: ROUTE_LIST.listAppointment,
				permissions: [],
			},

		
		],
	},
	{
		name: "Laboratory Tests",
		list: [
			{
				name: "Add Sample",
				link: ROUTE_LIST.createReportTemplate,
				permissions: [],
			},
			{
				name: "List Sample",
				link: ROUTE_LIST.listReportTemplate,
				permissions: [],
			},

		
		],
	},
	{
		name: "Product",
		list: [
			{
				name: "Add Product",
				link: "/admin/products/create",
				permissions: [],
			},
			{
				name: "List Products",
				link: "/admin/products",
				permissions: [],
			},

			{
				name: "Brands",
				link: "/admin/brands",
				permissions: [],
			},
		],
	},
	{
		name: "Requisition",
		list: [
			{
				name: "Create Requisition",
				link: "/admin/requisitions/create",
				permissions: ["create requisition"],
			},
			{
				name: "Requisitions",
				link: "/admin/requisitions",
				permissions: [
					"approve requisition",
					"cancel requisition",
					"create requisition",
				],
			},
			{
				name: "Requisitions Return",
				link: "/admin/requisitions/return",
				permissions: ["approve requisition", "cancel requisition"],
			},

			{
				name: "Requisitions Report",
				link: "/admin/requisitions/report",
				permissions: ["approve requisition", "cancel requisition"],
			},
		],
	},
	{
		name: "Parchase",
		list: [
			{
				name: "Parchase Create",
				link: "/admin/parchases/create",
				permissions: ["create purchase"],
			},
			{
				name: "Purchases",
				link: "/admin/parchases",
				permissions: ["purchase return", "create purchase"],
			},
			{
				name: "Purchases Return",
				link: "/admin/parchases/return",
				permissions: ["purchase return", "cancel requisition"],
			},

			{
				name: "Purchases Report",
				link: "/admin/parchases/report",
				permissions: ["purchase return"],
			},
		],
	},
	{
		name: "Income",
		list: [
			{
				name: "Revenue Create",
				link: "/admin/revenues/create",
				permissions: ["add revenue"],
			},
			{
				name: "List Revenue",
				link: "/admin/revenues",
				permissions: ["approve revenue", "add revenue"],
			},
			{
				name: "Credit Note Create",
				link: "/admin/credits/create",
				permissions: ["add credit voucher"],
			},
			{
				name: "List Credit Note",
				link: "/admin/credits",
				permissions: ["voucher approval", "add credit voucher"],
			},
			{
				name: "Income Report",
				link: "/admin/income/report",
				permissions: [],
			},
		],
	},
	{
		name: "Expense",
		list: [
			{
				name: "Bill Create",
				link: "/admin/bills/create",
				permissions: [],
			},
			{
				name: "Bill",
				link: "/admin/bills",
				permissions: [],
			},

			{
				name: "Payment Create",
				link: "/admin/payments/create",
				permissions: ["add payment"],
			},
			{
				name: "Payment",
				link: "/admin/payments",
				permissions: ["approve payment", "add payment"],
			},
			{
				name: "Debit Note Create",
				link: "/admin/debitNotes/create",
				permissions: ["add debit voucher"],
			},
			{
				name: "Debit Note",
				link: "/admin/debitNotes",
				permissions: ["approve voucher", "add debit voucher"],
			},
			{
				name: "Expense Report",
				link: "/admin/expense/report",
				permissions: [],
			},
		],
	},
	{
		name: "Balance",
		list: [
			{
				name: "Bank Balance",
				link: "/admin/bank/balance",
				permissions: [],
			},
			// {
			// 	name: "Balance Transfer",
			// 	link: "/admin/bank/transfer",
			// 	permissions: ["transfer fund"],
			// },
			// {
			// 	name: "Balance Transfer History",
			// 	link: "/admin/bank/transfer/history",
			// 	permissions: [],
			// },
		],
	},
	{
		name: "Double Entry",
		list: [
			{
				name: "Create Account",
				link: "/admin/chart-of-account/create",
				permissions: [],
			},
			{
				name: "Chart of Accounts",
				link: "/admin/chart-of-account/list",
				permissions: [],
			},
		],
	},
];
