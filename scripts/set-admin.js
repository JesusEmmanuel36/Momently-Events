import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

const input = process.argv[2];
if (!input) { console.error("Uso: npm run set-admin -- <UID o email>"); process.exit(1); }
const required = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
if (required.some((name) => !process.env[name])) { console.error("Faltan variables Firebase Admin. Cárgalas en el entorno antes de ejecutar el script."); process.exit(1); }
const app = getApps()[0] || initializeApp({ credential: cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") }) });
const auth = getAuth(app);
try { const user = input.includes("@") ? await auth.getUserByEmail(input.toLowerCase()) : await auth.getUser(input); await auth.setCustomUserClaims(user.uid, { ...user.customClaims, admin: true }); console.log(`Administrador configurado para UID ${user.uid}. Cierra sesión y vuelve a entrar para renovar el token.`); } catch (error) { console.error("No fue posible configurar el administrador:", error.message); process.exit(1); }
