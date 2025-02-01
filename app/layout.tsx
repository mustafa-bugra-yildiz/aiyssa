import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "AIyssa",
	description: "Your Personal Data Assistant",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<SignedOut>
						<SignIn />
					</SignedOut>
					<SignedIn>
						{children}
					</SignedIn>
				</body>
			</html>
		</ClerkProvider>
	);
}

function SignIn() {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<h1 className="text-4xl font-bold">AIyssa</h1>
			<p className="text-lg text-gray-500">Your Personal Data Assistant</p>
			<SignInButton />
		</div>
	)
}
