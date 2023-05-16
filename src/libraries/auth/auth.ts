import NextAuth, { NextAuthOptions } from "next-auth"
import { URLSearchParams } from "url"

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
	if (process.env.DECATHLON_TOKEN && process.env.SALESFORECAST_CLIENT_ID && process.env.NEXTAUTH_SECRET) {
		//const router = useRouter()
		try {
			const url =
				process.env.DECATHLON_TOKEN +
				new URLSearchParams({
					grant_type: "refresh_token",
					refresh_token: token.refresh_token,
				})
			const response = await fetch(url, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					//client_id: process.env.SALESFORECAST_CLIENT_ID,
					//client_secret: process.env.NEXTAUTH_SECRET,
					grant_type: "refresh_token",
					refresh_token: token.refresh_token,
				},
				method: "POST",
			})

			const refreshedTokens = await response.json()

			if (!response.ok) {
				throw refreshedTokens
			}

			return {
				...token,
				accessToken: refreshedTokens.access_token,
				accessTokenExpires: Date.now() + refreshedTokens.expires_in,
				refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
			}
		} catch (error) {
			console.log("RefreshAccessTokenError", error)
			return {
				...token,
				error: "RefreshAccessTokenError",
			}
		}
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		{
			id: "decathlon",
			name: "Decathlon",
			type: "oauth",
			clientId: process.env.SALESFORECAST_CLIENT_ID,
			clientSecret: process.env.NEXTAUTH_SECRET,
			wellKnown: process.env.DECATHLON_WELL_KNOWN_URL,
			authorization: {
				params: {
					scope: "openid profile",
					response_type: "code",
					redirect_uri: process.env.SALESFORECAST_REDIRECT_URI,
				},
			},

			profile(profile) {
				return {
					id: profile.sub,
					name: profile.displayName,
					email: profile.mail,
					image: profile.photourl,
				}
			},
		},
	],
	session: {
		strategy: "jwt",
	},
	theme: {
		colorScheme: "light",
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token
				token.refreshToken = account.refresh_token
				if (account.providerAccountId) token.userId = account.providerAccountId
				if (account.expires_at) {
					token.accessTokenExpires = account.expires_at * 1000
				}
			}
			// Return previous token if the access token has not expired yet
			const time = token.accessTokenExpires as number
			if (Date.now() < time) {
				return token
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token)
		},
		async session({ session, token }) {
			
			return session
		},
	},
}

export default NextAuth(authOptions)