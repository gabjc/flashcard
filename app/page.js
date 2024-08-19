"use client";

import Image from "next/image";
import { SignedIn, SignedOut, UserButton, ClerkProvider } from "@clerk/nextjs";
import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	Box,
	Grid,
	Container,
} from "@mui/material";
import getStripe from "@/utils/get-stripe";
import Head from "next/head";

export default function Home() {
	const handleSubmit = async () => {
		const checkoutSession = await fetch("/api/checkout_sessions", {
			method: "POST",
			headers: { origin: "http://localhost:3000" },
		});
		const checkoutSessionJson = await checkoutSession.json();

		const stripe = await getStripe();
		const { error } = await stripe.redirectToCheckout({
			sessionId: checkoutSessionJson.id,
		});

		if (error) {
			console.warn(error.message);
		}
	};

	return (
		<>
			<Head>
				<title>Flashcard SaaS</title>
				<meta
					name="description"
					content="The easiest way to create flashcards from your text."
				/>
			</Head>

			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						Flashcard SaaS
					</Typography>
					<ClerkProvider>
						<SignedOut>
							<Button color="inherit" href="/sign-in">
								Login
							</Button>
							<Button color="inherit" href="/sign-up">
								Sign Up
							</Button>
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</ClerkProvider>
				</Toolbar>
			</AppBar>

			<Container maxWidth="lg" sx={{ mt: 4 }}>
				<Box sx={{ textAlign: "center", my: 4 }}>
					<Typography variant="h2" component="h1" gutterBottom>
						Welcome to Flashcard SaaS
					</Typography>
					<Typography variant="h5" component="h2" gutterBottom>
						The easiest way to create flashcards from your text.
					</Typography>
					<Button
						variant="contained"
						color="primary"
						sx={{ mt: 2, mr: 2 }}
						href="/generate">
						Get Started
					</Button>
				</Box>

				<Box sx={{ my: 6 }}>
					<Typography variant="h4" component="h2" gutterBottom>
						Features
					</Typography>
					<Grid container spacing={4}>
						<Grid item xs={12} md={4}>
							<Box
								sx={{
									p: 3,
									textAlign: "begin",
									borderColor: "grey.300",
								}}>
								<Typography variant="h5" gutterBottom>
									Easy Text Input
								</Typography>
								<Typography variant="h7" gutterBottom>
									Simply input your text and let our software do the rest.
									Creating flashcards has never been easier
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box
								sx={{
									p: 3,
									textAlign: "begin",
									borderColor: "grey.300",
								}}>
								<Typography variant="h5" gutterBottom>
									Smart Flashcards
								</Typography>
								<Typography variant="h7" gutterBottom>
									Our AI intelligently breaks down your text into concise
									flashcards perfect for studying
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box
								sx={{
									p: 3,
									textAlign: "begin",
									borderColor: "grey.300",
								}}>
								<Typography variant="h5" gutterBottom>
									Accessible Anywhere
								</Typography>
								<Typography variant="h7" gutterBottom>
									Access your flashcards from any device at any time. Study on
									the go with these.
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<Box sx={{ my: 6, textAlign: "center" }}>
					<Typography variant="h4" component="h2" gutterBottom>
						Pricing
					</Typography>
					<Grid container spacing={4} justifyContent="center">
						<Grid item xs={12} md={4}>
							<Box
								sx={{
									p: 3,
									border: 1,
									borderRadius: 2,
									textAlign: "center",
									borderColor: "grey.300",
								}}>
								<Typography variant="h6" gutterBottom>
									Basic
								</Typography>
								<Typography variant="h6" gutterBottom>
									$5/month
								</Typography>
								<Typography>
									Access to all flashcard features and limited storage
								</Typography>
								<Button
									variant="contained"
									color="primary"
									sx={{ mt: 2 }}
									onClick={handleSubmit}>
									Choose Basic
								</Button>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box
								sx={{
									p: 3,
									border: 1,
									borderRadius: 2,
									textAlign: "center",
									borderColor: "grey.300",
								}}>
								<Typography variant="h6" gutterBottom>
									Pro
								</Typography>
								<Typography variant="h6" gutterBottom>
									$10/month
								</Typography>
								<Typography>
									Unlimited flashcard and storage, with priority support
								</Typography>
								<Button
									variant="contained"
									color="primary"
									sx={{ mt: 2 }}
									onClick={handleSubmit}>
									Choose Pro
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}
