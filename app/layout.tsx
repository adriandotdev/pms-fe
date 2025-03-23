import { AppSidebar } from "@/components/app-sidebar";
import QueryProvider from "@/components/query-provider";
import { ModeToggle } from "@/components/theme-dropdown";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Yan-yan Product Management System",
	description: "A sample app for managing products.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<SidebarProvider>
							<AppSidebar />
							<main className="py-3 px-5 w-full">
								<div>
									<SidebarTrigger />
									<ModeToggle />
								</div>

								{children}
							</main>
						</SidebarProvider>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
